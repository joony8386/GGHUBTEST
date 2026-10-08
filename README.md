# GG Task Hub · ตารางงานกลางของทีม

Shared task board and company calendar for the Glaigan team (Thai, with English subtitles).

- **Website:** static files in this repository, served by GitHub Pages.
- **Data:** a private Google Sheet, reached through a Google Apps Script web app (`apps-script/Code.gs`).
- **Access:** a team passcode, checked by the Apps Script. Entered once per device.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page layout |
| `styles.css` | Styling |
| `app.js` | App logic, staff list (`PEOPLE`), job descriptions, English subtitles (`EN`) |
| `sheets-db.js` | Talks to the Google Sheet, checks for updates every few seconds |
| `config.js` | **Your Apps Script Web app URL goes here** |
| `apps-script/Code.gs` | Backend — paste into the Sheet's Extensions → Apps Script (not used by GitHub) |

## Setup in short

1. New Google Sheet → Extensions → Apps Script → paste `apps-script/Code.gs` → run `setup`.
2. Project Settings → Script Properties → set `TEAM_KEY` to the team passcode.
3. Deploy → New deployment → Web app (Execute as: Me · Who has access: Anyone) → copy the `/exec` URL.
4. Paste that URL into `config.js` here and commit.
5. Settings → Pages → Deploy from a branch → `main` / root → Save.

## Updating

- Edit staff or duties in `app.js` and commit; the site updates in 1–2 minutes.
- After changing `Code.gs`: Deploy → Manage deployments → Edit → **New version** (keeps the same URL).
- Change the passcode any time in Script Properties (`TEAM_KEY`).
