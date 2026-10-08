/**
 * sheets-db.js — a tiny Firestore-style database that stores everything
 * in your Google Sheet through the Apps Script web app (see apps-script/Code.gs).
 *
 *   var db = SheetsDB.create({ url, key, pollSeconds, onStatus });
 *   await db.ready;                       // first load finished
 *   db.collection('actionItems').onSnapshot(cb)
 *   db.collection('actionItems').add({...})
 *   db.collection('actionItems').doc(id).update({...})
 *   db.doc('eventMeta/xyz').collection('comments').orderBy('createdAt').limit(100).onSnapshot(cb)
 *
 * How it stays "live": every browser re-reads the sheet every few seconds
 * (one small request) and only re-draws when something actually changed.
 * Your own edits show instantly (optimistic update) and are then saved.
 */
(function (global) {
  'use strict';

  function clone(o) { return o === undefined ? undefined : JSON.parse(JSON.stringify(o)); }
  function newId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function makeSnap(docs) {
    return { docs: docs, size: docs.length, empty: !docs.length, forEach: function (fn) { docs.forEach(fn); } };
  }
  function makeDoc(rec) {
    return { id: rec.id, exists: true, data: function () { return clone(rec.data); } };
  }

  function create(opts) {
    var url = opts.url, key = opts.key;
    var pollMs = Math.max(4, opts.pollSeconds || 8) * 1000;
    var onStatus = opts.onStatus || function () {};

    var store = {};          // collection -> { id -> {id, parent, data} }
    var signatures = {};     // collection -> JSON string (for change detection)
    var listeners = [];      // {coll, fn}
    var loaded = false;
    var writeSeq = 0, pending = 0;
    var timer = null, inFlight = null;
    var resolveReady, rejectReady;
    var ready = new Promise(function (res, rej) { resolveReady = res; rejectReady = rej; });

    function coll(name) { return store[name] || (store[name] = {}); }

    function notify(names) {
      listeners.slice().forEach(function (l) {
        if (names === '*' || names.indexOf(l.coll) >= 0) {
          try { l.fn(); } catch (e) { console.warn('listener error', e); }
        }
      });
    }

    // ---------- network ----------
    function fetchAll() {
      if (inFlight) return inFlight;
      var seqAtStart = writeSeq;
      inFlight = fetch(url + '?action=all&key=' + encodeURIComponent(key) + '&t=' + Date.now(), { method: 'GET', redirect: 'follow' })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (!res.ok) {
            var err = new Error(res.error || 'error');
            err.code = res.error;
            throw err;
          }
          // a local write happened while we were reading → this copy may be stale, skip it
          if (pending > 0 || seqAtStart !== writeSeq) return;
          var changed = [];
          var data = res.data || {};
          Object.keys(data).forEach(function (name) {
            var sig = JSON.stringify(data[name]);
            if (!loaded || sig !== signatures[name]) {
              signatures[name] = sig;
              var map = {};
              data[name].forEach(function (rec) { map[rec.id] = rec; });
              store[name] = map;
              changed.push(name);
            }
          });
          var first = !loaded;
          loaded = true;
          onStatus('ok', res.time);
          if (first) { resolveReady(); notify('*'); }
          else if (changed.length) notify(changed);
        })
        .catch(function (e) {
          onStatus(e.code === 'unauthorized' ? 'unauthorized' : 'error', e);
          if (!loaded) rejectReady(e);
        })
        .then(function () { inFlight = null; });
      return inFlight;
    }

    function post(body) {
      body.key = key;
      return fetch(url, {
        method: 'POST',
        // text/plain avoids a CORS pre-flight, which Apps Script can't answer
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(body),
        redirect: 'follow'
      }).then(function (r) { return r.json(); }).then(function (res) {
        if (!res.ok) { var e = new Error(res.error || 'write failed'); e.code = res.error; throw e; }
        return res;
      });
    }

    function write(op, name, id, parent, data) {
      // 1) apply locally right away
      var c = coll(name);
      if (op === 'delete') delete c[id];
      else if (op === 'update' && c[id]) {
        var merged = clone(c[id].data) || {};
        Object.keys(data).forEach(function (k) { merged[k] = clone(data[k]); });
        c[id] = { id: id, parent: c[id].parent, data: merged };
      } else c[id] = { id: id, parent: parent || '', data: clone(data) };
      writeSeq++; pending++;
      notify([name]);
      onStatus('saving');
      // 2) save to the sheet
      return post({ op: op, collection: name, id: id, parent: parent || '', data: data || {} })
        .then(function (res) { onStatus('ok'); return res; })
        .catch(function (e) {
          onStatus(e.code === 'unauthorized' ? 'unauthorized' : 'error', e);
          throw e;
        })
        .then(function (res) {
          pending--; writeSeq++;
          if (pending === 0) setTimeout(fetchAll, 300);
          return res;
        }, function (e) {
          pending--; writeSeq++;
          if (pending === 0) setTimeout(fetchAll, 300);   // re-sync to the real data
          throw e;
        });
    }

    // ---------- query / refs ----------
    function Query(name, parent, filters, order, lim) {
      this._name = name; this._parent = parent || '';
      this._filters = filters || []; this._order = order || null; this._limit = lim || 0;
    }
    Query.prototype._docs = function () {
      var self = this;
      var recs = Object.keys(coll(this._name)).map(function (id) { return coll(self._name)[id]; })
        .filter(function (r) { return (r.parent || '') === self._parent; })
        .filter(function (r) {
          return self._filters.every(function (f) { return r.data && r.data[f.field] === f.value; });
        });
      if (this._order) {
        var f = this._order.field, dir = this._order.dir === 'desc' ? -1 : 1;
        recs.sort(function (a, b) {
          var x = a.data[f], y = b.data[f];
          return (x > y ? 1 : x < y ? -1 : 0) * dir;
        });
      }
      if (this._limit) recs = recs.slice(0, this._limit);
      return recs.map(makeDoc);
    };
    Query.prototype.where = function (field, op, value) {
      if (op !== '==') throw new Error('only == is supported');
      return new Query(this._name, this._parent, this._filters.concat([{ field: field, value: value }]), this._order, this._limit);
    };
    Query.prototype.orderBy = function (field, dir) {
      return new Query(this._name, this._parent, this._filters, { field: field, dir: dir || 'asc' }, this._limit);
    };
    Query.prototype.limit = function (n) {
      return new Query(this._name, this._parent, this._filters, this._order, n);
    };
    Query.prototype.onSnapshot = function (cb) {
      var self = this;
      var l = { coll: this._name, fn: function () { cb(makeSnap(self._docs())); } };
      listeners.push(l);
      if (loaded) setTimeout(l.fn, 0);
      return function () { listeners = listeners.filter(function (x) { return x !== l; }); };
    };
    Query.prototype.get = function () {
      var self = this;
      return ready.then(function () { return makeSnap(self._docs()); });
    };
    Query.prototype.add = function (data) {
      var id = newId();
      return write('set', this._name, id, this._parent, data).then(function () { return { id: id }; });
    };
    Query.prototype.doc = function (id) { return new DocRef(this._name, id, this._parent); };

    function DocRef(name, id, parent) { this._name = name; this.id = id; this._parent = parent || ''; }
    DocRef.prototype.set = function (data) { return write('set', this._name, this.id, this._parent, data); };
    DocRef.prototype.update = function (data) { return write('update', this._name, this.id, this._parent, data); };
    DocRef.prototype.delete = function () { return write('delete', this._name, this.id, this._parent); };
    DocRef.prototype._snap = function () {
      var rec = coll(this._name)[this.id];
      return rec ? makeDoc(rec) : { id: this.id, exists: false, data: function () { return undefined; } };
    };
    DocRef.prototype.onSnapshot = function (cb) {
      var self = this;
      var l = { coll: this._name, fn: function () { cb(self._snap()); } };
      listeners.push(l);
      if (loaded) setTimeout(l.fn, 0);
      return function () { listeners = listeners.filter(function (x) { return x !== l; }); };
    };
    DocRef.prototype.get = function () { var self = this; return ready.then(function () { return self._snap(); }); };
    DocRef.prototype.collection = function (sub) { return new Query(sub, this._name + '/' + this.id); };

    // ---------- polling ----------
    function start() {
      stop();
      timer = setInterval(function () { if (!document.hidden) fetchAll(); }, pollMs);
    }
    function stop() { if (timer) clearInterval(timer); timer = null; }
    document.addEventListener('visibilitychange', function () { if (!document.hidden) fetchAll(); });
    window.addEventListener('focus', function () { fetchAll(); });

    fetchAll();
    start();

    return {
      ready: ready,
      collection: function (name) { return new Query(name, ''); },
      doc: function (path) { var p = path.split('/'); return new DocRef(p[0], p[1], ''); },
      refresh: fetchAll,
      stop: stop
    };
  }

  global.SheetsDB = { create: create };
})(window);
