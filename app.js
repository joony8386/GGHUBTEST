(function(){
  "use strict";

  var PEOPLE = [
    {key:'grace', name:'พี่เกรซ', full:'เกรซ กัญญ์สราลักษณ์ ตรัยอันธยา', role:'Commercial Operations Manager', dept:'Commercial & Operations', contact:'093-565-6236 · หยุดทุกวันอาทิตย์ 10:00–19:00 น.', color:'#d9764a'},
    {key:'natt', name:'พี่นัท', full:'ปัณณวิชญ์ บัวขจร', role:'CEO Assistant', dept:'Sale & Event Marketing (gudslip)', contact:'091-596-5120', color:'#4a7cbf'},
    {key:'pete', name:'พี่พีท', full:'พีท', role:'CEO Assistant', dept:'Sale & Event Marketing (gudslip)', contact:'', color:'#5aa859'},
    {key:'chokun', name:'พี่โชกุน', full:'โชกุน', role:'Content Creator', dept:'Content & Creative — 3 แบรนด์', contact:'Glaiganplace Hotel / gudslip / Sunglaigan', color:'#a56bc2'},
    {key:'botun', name:'พี่โบตั๋น', full:'กนกอร สอนสา', role:'ผู้ช่วยบัญชี', dept:'Accounting & Finance — ใกล้กัน เมดิเทค', contact:'097-050-3581 · botunsonsa@gmail.com', color:'#c99a2e'},
    {key:'jiab', name:'พี่เจี๊ยบ', full:'เจี๊ยบ', role:'Chief Account', dept:'Accounting & Finance', contact:'รายงานต่อ K.Sun / K.Joon / K.Grace', color:'#3fa3a0'},
    {key:'sun', name:'ซัน', full:'K.Sun', role:'CEO', dept:'ใกล้กัน — ภาพรวมทุกแบรนด์', contact:'Meditech / Gudslip / GoodSpace / Glaiganplace Hotel / Sunglaigan', color:'#b23c4e'}
  ];

  function personByKey(key){
    for(var i=0;i<PEOPLE.length;i++){ if(PEOPLE[i].key===key) return PEOPLE[i]; }
    return null;
  }

  var FREQ_LABEL = {daily:'รายวัน', weekly:'รายสัปดาห์', monthly:'รายเดือน', tax:'ภาษี', asneeded:'ตามความจำเป็น', ongoing:'งานประจำ'};

  // ---------- English subtitles: Thai source text -> English ----------
  var EN = {
    // people
    'พี่เกรซ':'Grace', 'พี่นัท':'Natt', 'พี่พีท':'Pete', 'พี่โชกุน':'Chokun', 'พี่โบตั๋น':'Botun', 'พี่เจี๊ยบ':'Jiab', 'ซัน':'Sun',
    'เกรซ กัญญ์สราลักษณ์ ตรัยอันธยา':'Grace Kansaralak Traianthaya',
    'ปัณณวิชญ์ บัวขจร':'Pannawit Buakhajon',
    'พีท':'Pete', 'โชกุน':'Chokun', 'กนกอร สอนสา':'Kanok-on Sonsa', 'เจี๊ยบ':'Jiab',
    'ผู้ช่วยบัญชี':'Accounting Assistant',
    'Content & Creative — 3 แบรนด์':'Content & Creative — 3 brands',
    'Accounting & Finance — ใกล้กัน เมดิเทค':'Accounting & Finance — Glaigan Meditech',
    'ใกล้กัน — ภาพรวมทุกแบรนด์':'Glaigan — oversight of all brands',
    '093-565-6236 · หยุดทุกวันอาทิตย์ 10:00–19:00 น.':'Off every Sunday · hours 10:00–19:00',
    'รายงานต่อ K.Sun / K.Joon / K.Grace':'Reports to K.Sun / K.Joon / K.Grace',

    // job-description groups
    'บริหารและประสานงาน':'Management & coordination',
    'นำเข้าและขึ้นทะเบียนสินค้า':'Import & product registration',
    'บริษัทภาซุ เทรดดิ้ง และเอาโซ ซิสเต็ม':'Phasu Trading & Auso System (companies)',
    'งานประมูล':'Tenders / bids',
    'Event และ Sponsor':'Events & sponsorship',
    'จัดซื้อและบุคลากร':'Procurement & staffing',
    'เอกสารและสื่อการขาย':'Sales documents & materials',
    'เงินกองกลาง':'Company petty-cash fund',
    'ออเดอร์และแพ็คสินค้า':'Orders & packing',
    'การเงิน':'Finance',
    'สรุปยอดขาย':'Sales summaries',
    'สต็อกสินค้า':'Inventory',
    'เอกสารบัญชี':'Accounting documents',
    'สนับสนุนอื่น ๆ':'Other support',
    'งานประจำวัน':'Daily tasks',
    'งานประจำสัปดาห์':'Weekly tasks',
    'งานปิดบัญชีประจำเดือน':'Month-end close',
    'งานด้านภาษี':'Tax',
    'การควบคุมภายใน':'Internal control',
    'บริหารภาพรวมองค์กร':'Company-wide management',
    'อนุมัติค่าใช้จ่ายและงบประมาณ':'Expense & budget approvals',
    'ตัดสินใจ/ชี้ขาด':'Decisions / final calls',
    'ภาพลักษณ์และความสัมพันธ์ภายนอก':'Image & external relations',

    // GRACE
    'มอบหมาย ติดตาม และตรวจสอบเอกสาร การทำงานของทีม':'Assign, follow up on and review the team\'s documents and work',
    'ประสานงานกับฝ่ายขาย ลูกค้า คู่ค้า และหน่วยงานที่เกี่ยวข้อง':'Coordinate with sales, customers, partners and relevant agencies',
    'ติดตามงานค้าง กำหนดส่ง และสรุปความคืบหน้าให้ผู้บริหาร':'Track outstanding work and deadlines; summarise progress for management',
    'ประสานงานกับทีม Customs และ Product Registration':'Coordinate with the Customs and Product Registration teams',
    'จัดทำเอกสาร Packing List, Invoice ส่งให้ทีม Customs':'Prepare packing lists and invoices for the Customs team',
    'ติดต่อ Supplier เพื่อตรวจสอบความถูกต้องของเอกสาร':'Contact suppliers to verify document accuracy',
    'ประสานงานเอกสาร PO, Quotation และ Invoice':'Coordinate POs, quotations and invoices',
    'จัดเตรียมและจัดส่งสินค้า':'Prepare and ship products',
    'จัดหา ติดตั้ง และจัดส่งอุปกรณ์ออกบูธตามโรงพยาบาลต่าง ๆ':'Source, set up and deliver booth equipment for hospital exhibitions',
    'ทำคู่เทียบราคา (ใบเสนอราคา + รายละเอียดคุณลักษณะ)':'Prepare comparison quotes (quotation + specifications)',
    'ตรวจสอบเงื่อนไขและจัดหาราคาสินค้าจาก Supplier':'Review tender terms and get product pricing from suppliers',
    'จัดทำใบเสนอราคาและขอเอกสารประมูล':'Prepare quotations and request tender documents',
    'เตรียมและยื่นเอกสารประมูล ติดตามผล และประสานส่งมอบสินค้า':'Prepare and submit tender documents, follow up on results and coordinate delivery',
    'ตรวจสอบยอดขายและค่าคอมมิชชั่นของทีม Sales ประจำเดือน':'Review the sales team\'s monthly sales and commissions',
    'วางแผนสินค้าและสต็อกสำหรับรอบขายเดือนถัดไป':'Plan products and stock for next month\'s sales cycle',
    'วางระบบและกระบวนการขายใน JUBILI CRM':'Set up the sales system and process in JUBILI CRM',
    'จัดทำ Sales Toolkit, Sales Playbook และเอกสารประกอบการขาย':'Build the sales toolkit, sales playbook and supporting sales documents',
    'อบรม ประเมิน และติดตาม Pipeline ของทีม Sales':'Train and evaluate the sales team and track its pipeline',
    'กำหนดนโยบายราคา รูปแบบการขาย และอนุมัติส่วนลด':'Set pricing policy and sales models; approve discounts',
    'ติดต่อนำเสนอเงื่อนไขกับลูกค้า B2B และ Partner + ทำสัญญาการขาย':'Pitch terms to B2B customers and partners; draw up sales contracts',
    'ดูแล Key Account ติดตามคำสั่งซื้อ การชำระเงิน และการจัดส่ง':'Manage key accounts: track orders, payments and deliveries',
    'ประสานงานกับ HR ในการสรรหา สัมภาษณ์ และคัดเลือกทีม Sales':'Work with HR to recruit, interview and select sales staff',
    'คัดเลือกและประสานงานการเข้าร่วม Event หรือกิจกรรมสปอนเซอร์':'Select and coordinate participation in events or sponsorships',
    'เจรจาพื้นที่ ค่าใช้จ่าย และสิทธิประโยชน์':'Negotiate space, costs and benefits',
    'วางรูปแบบบูธ โปรโมชั่น และเป้าหมายการขายของแต่ละงาน':'Plan booth layout, promotions and sales targets for each event',
    'จัดเตรียมสินค้า โบรชัวร์ Company Sheet นามบัตร และอุปกรณ์ออกบูธ':'Prepare products, brochures, company sheet, business cards and booth equipment',
    'ดูแลการขนส่ง ติดตั้ง รื้อถอน และสรุปผลหลังจบงาน':'Handle transport, setup and teardown; write the post-event summary',
    'สรรหา เปรียบเทียบราคา และจัดซื้อสินค้า/อุปกรณ์ที่จำเป็น':'Source, compare prices and purchase necessary goods/equipment',
    'กำหนดคุณสมบัติ สัมภาษณ์ และคัดเลือกพนักงานในทีม':'Define requirements, interview and select team staff',
    'ดูแลการฝึกอบรมและประเมินผลพนักงานในทีม':'Oversee training and performance reviews for team staff',
    'จัดทำและปรับปรุง Company Profile, Product Catalogue, Presentation':'Create and update the company profile, product catalogue and presentations',
    'ตรวจสอบเนื้อหา ราคา และข้อความประชาสัมพันธ์ให้ตรงแนวทางบริษัท':'Check content, pricing and PR messaging against company guidelines',
    'ดูแลเอกสารสัญญา ใบเสนอราคา และข้อมูลสินค้าในทุกช่องทาง':'Maintain contracts, quotations and product information across all channels',
    'ดูแลเงินกองกลางของบริษัทและอนุมัติค่าใช้จ่ายที่เกี่ยวข้อง':'Manage the company petty-cash fund and approve related expenses',
    'ชำระค่าใช้จ่าย เช่น ค่าโทรศัพท์ ค่าจัดส่งสินค้า ค่าอุปกรณ์สำนักงาน ค่าเดินทาง':'Pay expenses such as phone bills, shipping, office supplies and travel',
    'รวบรวมใบเสร็จและหลักฐานการชำระเงินส่งให้ฝ่ายบัญชี':'Collect receipts and proof of payment and send them to accounting',

    // NATT & PETE
    'ประสานงานระหว่าง CEO กับทีมงาน':'Coordinate between the CEO and the team',
    'ประสานงานกับหน่วยงานราชการ หรือหน่วยงานอื่น ๆ':'Coordinate with government agencies and other organisations',
    'จัดรับ–จัดส่งเอกสารตามที่ได้รับมอบหมาย':'Pick up and deliver documents as assigned',
    'จัดหา Event หรืองานที่น่าสนใจสำหรับการเข้าร่วม':'Find events or shows worth taking part in',
    'เตรียมอุปกรณ์ + ตรวจเช็คสภาพอุปกรณ์ก่อนออกงาน':'Prepare equipment and check its condition before each event',
    'ติดตั้งบูธ + ขายสินค้า + ให้ข้อมูลสินค้าหน้างาน':'Set up the booth, sell products and explain them on site',
    'จัดหาร้านขายยา ฟิตเนส โรงแรม และร้านอื่น ๆ สำหรับวางขาย gudslip':'Find pharmacies, gyms, hotels and other shops to stock gudslip',
    'ติดต่อนำเสนอขายสินค้าของ gudslip ให้ร้านค้าใหม่':'Pitch gudslip products to new retailers',
    'บริการหลังการขายให้ร้านค้า/ลูกค้าที่ดูแลอยู่':'Provide after-sales service to existing retailers/customers',
    'ปฏิบัติงานอื่น ๆ ตามที่ CEO มอบหมาย':'Other duties as assigned by the CEO',

    // CHOKUN
    'คิดหัวข้อและไอเดียคอนเทนต์ให้ครบทั้ง 3 แบรนด์':'Come up with content topics and ideas for all 3 brands',
    'วาง Content Pillar / Content Calendar ของแต่ละแบรนด์':'Set content pillars and the content calendar for each brand',
    'คิด Hook / Story / Direction ของคอนเทนต์แต่ละชิ้น':'Develop the hook, story and direction for each piece',
    'Brainstorm แนวทางคอนเทนต์ใหม่ ๆ ร่วมกับทีม':'Brainstorm new content directions with the team',
    'วางแผนคอนเทนต์ให้เหมาะกับแต่ละแพลตฟอร์ม (TikTok/IG/FB/YouTube)':'Plan content to suit each platform (TikTok/IG/FB/YouTube)',
    'ถ่ายวิดีโอ / เก็บ Footage ตามแผนที่วางไว้':'Shoot video / capture footage according to plan',
    'เก็บ B-roll, Atmosphere, Lifestyle Shot ของแต่ละแบรนด์':'Capture B-roll, atmosphere and lifestyle shots for each brand',
    'ถ่าย Event / Activity / Interview เมื่อมีงาน':'Film events, activities and interviews when they happen',
    'คิดมุมกล้องและ Mood ของภาพให้เข้ากับแต่ละแบรนด์':'Plan camera angles and visual mood to fit each brand',
    'ตัดต่อ Short-form Video สำหรับ TikTok / IG Reels / Facebook / YouTube':'Edit short-form video for TikTok / IG Reels / Facebook / YouTube',
    'เลือก Footage และเรียงลำดับเรื่องราว (Story)':'Select footage and sequence the story',
    'ตัด Interview ให้กระชับได้ใจความ':'Cut interviews down so they are tight and clear',
    'ใส่ Subtitle / SFX / Transition / Music':'Add subtitles, SFX, transitions and music',
    'ปรับ Color / Mood ให้เข้ากับ Content และแบรนด์':'Grade colour and mood to fit the content and brand',
    'ปรับ Hook และจังหวะตัดต่อให้คนดูอยากดูต่อ':'Tune the hook and edit pacing to keep viewers watching',
    'กำหนด Mood & Tone และ Visual Direction โดยรวม':'Define the overall mood, tone and visual direction',
    'ทำ Moodboard และหา Reference ใหม่ ๆ':'Make moodboards and find new references',
    'คิดรูปแบบการเล่าเรื่องและสิ่งที่แต่ละแบรนด์ควรสื่อผ่านคอนเทนต์':'Shape the storytelling style and what each brand should say through its content',
    'ปรับแนวทาง Content ให้เหมาะกับ Glaiganplace Hotel / gudslip / Sunglaigan':'Adapt the content approach for Glaiganplace Hotel / gudslip / Sunglaigan',
    'สร้าง Character และดูแลภาพลักษณ์ให้แต่ละแบรนด์แตกต่างกันชัดเจน':'Build each brand\'s character and keep their images clearly distinct',
    'ทบทวนคอนเทนต์เดือนที่ผ่านมาว่าตรงเป้าหมายของแต่ละแบรนด์หรือไม่':'Review last month\'s content against each brand\'s goals',

    // BOTUN
    'ตรวจเช็ครับ Order ช่วงเช้าในทุกช่องทาง (Shopee/TikTok/Lazada) และยืนยันรับสินค้าในแอป':'Check incoming orders each morning on every channel (Shopee/TikTok/Lazada) and confirm them in the apps',
    'ลงบันทึกยอดขายแต่ละออเดอร์ และปริ้นออเดอร์เพื่อแพ็ค–จัดส่ง':'Record sales for each order and print orders for packing and shipping',
    'ตรวจสอบความถูกต้องหลังแพ็ค และแพ็ค/ส่งคำสั่งซื้อที่เข้าก่อน 12:00 น. ให้ทัน':'Check accuracy after packing; make sure orders received before 12:00 are packed and shipped the same day',
    'เช็คออเดอร์ที่เข้าหลังแพ็ค และติดตามขนส่งแต่ละเจ้าให้มารับสินค้า':'Check orders that come in after packing; chase each courier to collect parcels',
    'บันทึกเงินสดย่อยเมื่อมีรายการจ่าย และทำเบิกขออนุมัติเงินกองกลาง':'Record petty-cash payments and submit reimbursement requests from the company fund',
    'สรุปยอดขายประจำเดือน ทำรายงาน Canva P&L เทียบกับเดือนก่อน':'Summarise monthly sales; make a Canva P&L report compared with last month',
    'ทำ Canva สรุปยอดขายรายวัน เทียบกับเป้าที่ต้องขายให้ถึงเดือนนั้น':'Make a daily Canva sales summary against that month\'s sales target',
    'ทำตาราง Stock Movement รายวัน สรุปยอดคงเหลือหลังขายในแต่ละวัน':'Keep the daily stock-movement table; summarise remaining stock after each day\'s sales',
    'สรุป Stock Movement รายสัปดาห์ และเช็คสินค้าที่ต้องเติมของ':'Summarise weekly stock movement and check which items need restocking',
    'ช่วยพี่เจี๊ยบเก็บเอกสารบัญชี (ใบกำกับภาษีซื้อ-ขาย / ภ.ง.ด.1 / ภ.ง.ด.3 / ภ.ง.ด.53) ส่งสำนักงานบัญชีก่อนกำหนด':'Help Jiab collect accounting documents (purchase/sales tax invoices, PND 1 / PND 3 / PND 53) and send them to the accounting firm before the deadline',
    'ช่วยแพ็คส่งสินค้าเมื่อมีออเดอร์เครื่องมือแพทย์':'Help pack and ship when medical-device orders come in',
    'ทำเบิกจ่ายค่าใช้จ่ายพนักงาน (ค่าน้ำมัน ฯลฯ) เมื่อออกทำงานนอกสถานที่':'Process staff expense claims (fuel etc.) for off-site work',
    'ตามใส่ตารางสรุปยอดขาย/ค่าคอม AMS ในสมุดบัญชี (ยอดโชว์หลังส่งของแล้ว ~1 สัปดาห์)':'Enter the AMS sales/commission summary into the ledger (figures appear ~1 week after delivery)',

    // JIAB
    'ตรวจสอบ Bank / Cash — ยอดคงเหลือและรายการเคลื่อนไหวทุกบัญชี':'Check bank/cash — balances and movements on every account',
    'ตรวจสอบ Sales / Invoice / Receipt และเอกสารประกอบ':'Check sales, invoices, receipts and supporting documents',
    'ตรวจสอบ Collection — เงินรับจากลูกค้าและตัดรับชำระ AR':'Check collections — customer receipts and clearing AR',
    'ติดตามลูกหนี้คงค้าง (AR) และรายการผิดปกติ':'Follow up on outstanding receivables (AR) and irregular items',
    'ตรวจสอบเจ้าหนี้ (AP) เอกสารจ่าย และ Due Date':'Check payables (AP), payment documents and due dates',
    'บันทึก/ตรวจสอบรายการบัญชีในระบบ PEAK':'Record/review accounting entries in PEAK',
    'ตรวจสอบเอกสาร VAT / WHT และรายการที่ต้องหัก ณ ที่จ่าย':'Check VAT/WHT documents and items subject to withholding tax',
    'ตรวจสอบ Stock — รับเข้า ขายออก และยอดคงเหลือ':'Check stock — goods in, goods sold and balance',
    'สรุปเงินเข้า–ออก (Daily Cash Flow)':'Summarise money in and out (daily cash flow)',
    'สรุปตัวเลขสำคัญและประเด็นค้างรายงานผู้บริหาร':'Report key figures and open issues to management',
    'ตรวจสอบ AR Aging และติดตามรายการค้าง':'Review AR aging and chase overdue items',
    'ตรวจสอบ AP Aging / Due List':'Review AP aging / due list',
    'ทำ Bank Reconciliation':'Do the bank reconciliation',
    'ตรวจสอบ Stock Movement รายสัปดาห์':'Review weekly stock movement',
    'สรุปค่าใช้จ่ายแยก Project (Meditech / Gudslip / GoodSpace)':'Summarise expenses by project (Meditech / Gudslip / GoodSpace)',
    'สรุป Cash Flow และภาระจ่ายที่กำลังจะถึงให้ผู้บริหาร':'Summarise cash flow and upcoming payment obligations for management',
    'ปิดบัญชีประจำเดือน ตรวจสอบรายการค้าง และปรับปรุงบัญชี':'Close the month: review open items and post adjustments',
    'จัดทำ Profit & Loss':'Prepare the profit & loss statement',
    'จัดทำ Balance Sheet':'Prepare the balance sheet',
    'จัดทำ Cash Flow ประจำเดือน':'Prepare the monthly cash-flow statement',
    'จัดทำ Project P&L แยก Meditech / Gudslip / GoodSpace':'Prepare project P&Ls for Meditech / Gudslip / GoodSpace',
    'จัดทำ Management Report สรุป KPI ให้ผู้บริหาร':'Prepare the management report with KPI summary',
    'จัดทำ Payroll ตรวจสอบเงินเดือน/รายการหัก และยอดจ่ายสุทธิ':'Run payroll: check salaries, deductions and net pay',
    'นำส่งเงินสมทบประกันสังคมของพนักงาน':'Remit employee social-security contributions',
    'ประสานงานสำนักงานบัญชีภายนอก':'Coordinate with the external accounting firm',
    'ยื่น ภ.พ.30 (VAT)':'File PP 30 (VAT return)',
    'ยื่น ภ.ง.ด.1 / 3 / 53':'File PND 1 / 3 / 53 (withholding-tax returns)',
    'ตรวจสอบภาษีหัก ณ ที่จ่าย และเตรียมหนังสือรับรอง':'Check withholding tax and prepare WHT certificates',
    'ตรวจสอบ VAT ซื้อ–ขาย':'Check input and output VAT',
    'ตรวจสอบเอกสารนำเข้าและภาษีนำเข้า':'Check import documents and import duties',
    'จัดเตรียมข้อมูลภาษีสำหรับหน่วยงานที่เกี่ยวข้อง':'Prepare tax information for the relevant authorities',
    'ตรวจสอบเอกสารก่อนบันทึกบัญชี และการอนุมัติค่าใช้จ่าย':'Check documents and expense approvals before booking entries',
    'ควบคุม AR / AP และ Stock ให้ตรงกับข้อมูลจริง':'Keep AR / AP and stock in line with actual figures',
    'ตรวจสอบความถูกต้องของข้อมูลในระบบ PEAK':'Verify the accuracy of data in PEAK',
    'จัดเก็บเอกสารทางบัญชีให้ครบถ้วนและค้นหาได้':'File accounting documents completely and keep them easy to find',

    // SUN
    'กำหนดทิศทาง นโยบาย และเป้าหมายของแต่ละแบรนด์ (Meditech / Gudslip / GoodSpace / Glaiganplace Hotel / Sunglaigan)':'Set direction, policy and goals for each brand (Meditech / Gudslip / GoodSpace / Glaiganplace Hotel / Sunglaigan)',
    'รับทราบสรุปงานและประเด็นค้างจากหัวหน้าแต่ละส่วนงาน':'Receive work summaries and open issues from each department head',
    'ประชุมทีมใหญ่ / อัปเดตและมอบหมายงานประจำสัปดาห์':'All-hands meeting / weekly updates and task assignment',
    'ทบทวน Management Report และ KPI ของบริษัทประจำเดือน':'Review the monthly management report and company KPIs',
    'อนุมัติการใช้เงินกองกลางและค่าใช้จ่ายที่เกินอำนาจของแต่ละแผนก':'Approve petty-cash use and expenses beyond each department\'s authority',
    'อนุมัติสปอนเซอร์ งบการตลาด และค่าใช้จ่ายอีเวนต์':'Approve sponsorships, marketing budgets and event costs',
    'อนุมัติส่วนลดและเงื่อนไขราคาสำหรับลูกค้า B2B รายสำคัญ':'Approve discounts and pricing terms for key B2B customers',
    'พิจารณาและเซ็นอนุมัติสัญญา/ข้อเสนอที่มีผลผูกพันบริษัท':'Review and sign contracts/offers that bind the company',
    'ตัดสินใจเรื่องสำคัญที่ทีมส่งเข้ามาขออนุมัติ หรือเรื่องที่ติดขัดข้ามแผนก':'Decide on major matters sent up for approval or cross-department blockers',
    'ดูแลความสัมพันธ์กับพาร์ทเนอร์ ลูกค้ารายสำคัญ และหน่วยงานภายนอก':'Manage relationships with partners, key customers and external bodies',

    // September 2026 calendar (whiteboard transcription)
    'จัดบูธ Decathlon 11:00 น.':'Decathlon booth setup 11:00',
    'Demo Jubili 14:00 น.':'Jubili demo 14:00',
    'คอร์ส/Academy — งานการเงิน':'Course/Academy — finance',
    'Decathlon บางนา':'Decathlon Bangna',
    'ไปตลาด':'Market visit',
    'ประชุมทีม 11:00 น.':'Team meeting 11:00',
    'ปิดยอด PL 13:00 น.':'Close P&L figures 13:00',
    'ประชุมแผนก':'Department meeting',
    'วิ่ง Decathlon Thailand (~1,500 คนทั่วประเทศ)':'Decathlon Thailand run (~1,500 runners nationwide)',
    'อัปเดต/Assign งาน โดย พลอย':'Task update/assignment by Ploy',
    'Thai Miss — ทีม K.Sun':'Thai Miss — K.Sun\'s team',
    'ประชุม / Assign งาน':'Meeting / task assignment',
    'นัดหมาย (โปรดตรวจสอบ)':'Appointment (please confirm)',
    'งานจากปฏิทิน':'Task from calendar'
  };
  var FREQ_EN = {daily:'Daily', weekly:'Weekly', monthly:'Monthly', tax:'Tax', asneeded:'As needed', ongoing:'Ongoing'};
  var EN_MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var EN_MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  function enOf(th){ return Object.prototype.hasOwnProperty.call(EN, th) ? EN[th] : ''; }
  // Thai text followed by an English subtitle line (block). For strings with no translation, Thai only.
  function bi(th, escape){
    var main = escape ? escHtml(th) : th;
    var en = enOf(th);
    return en ? main+'<span class="en">'+escHtml(en)+'</span>' : main;
  }
  // inline variant for chips/badges/buttons: "ไทย · English"
  function biI(th, en){
    en = en || enOf(th);
    return en ? th+' <span class="en-i">· '+escHtml(en)+'</span>' : th;
  }
  function enDate(d){ var x = fmtDue(d).split(' / '); return x[1]||x[0]; }
  function enMonth(mk){ return monthLabel(mk).split(' · ')[1]; }
  function freqLabel(f){ return FREQ_LABEL[f]+' · '+FREQ_EN[f]; }

  function T(p,id,freq,group,text){ return {p:p,id:id,freq:freq,group:group,text:text}; }

  var TASKS = [];

  // ---------- GRACE ----------
  (function(){
    var g='grace', n=1;
    var add=function(freq,group,text){ TASKS.push(T(g,'g'+(n++),freq,group,text)); };
    add('ongoing','บริหารและประสานงาน','มอบหมาย ติดตาม และตรวจสอบเอกสาร การทำงานของทีม');
    add('ongoing','บริหารและประสานงาน','ประสานงานกับฝ่ายขาย ลูกค้า คู่ค้า และหน่วยงานที่เกี่ยวข้อง');
    add('ongoing','บริหารและประสานงาน','ติดตามงานค้าง กำหนดส่ง และสรุปความคืบหน้าให้ผู้บริหาร');
    add('ongoing','นำเข้าและขึ้นทะเบียนสินค้า','ประสานงานกับทีม Customs และ Product Registration');
    add('ongoing','นำเข้าและขึ้นทะเบียนสินค้า','จัดทำเอกสาร Packing List, Invoice ส่งให้ทีม Customs');
    add('ongoing','นำเข้าและขึ้นทะเบียนสินค้า','ติดต่อ Supplier เพื่อตรวจสอบความถูกต้องของเอกสาร');
    add('ongoing','บริษัทภาซุ เทรดดิ้ง และเอาโซ ซิสเต็ม','ประสานงานเอกสาร PO, Quotation และ Invoice');
    add('ongoing','บริษัทภาซุ เทรดดิ้ง และเอาโซ ซิสเต็ม','จัดเตรียมและจัดส่งสินค้า');
    add('ongoing','บริษัทภาซุ เทรดดิ้ง และเอาโซ ซิสเต็ม','จัดหา ติดตั้ง และจัดส่งอุปกรณ์ออกบูธตามโรงพยาบาลต่าง ๆ');
    add('ongoing','บริษัทภาซุ เทรดดิ้ง และเอาโซ ซิสเต็ม','ทำคู่เทียบราคา (ใบเสนอราคา + รายละเอียดคุณลักษณะ)');
    add('asneeded','งานประมูล','ตรวจสอบเงื่อนไขและจัดหาราคาสินค้าจาก Supplier');
    add('asneeded','งานประมูล','จัดทำใบเสนอราคาและขอเอกสารประมูล');
    add('asneeded','งานประมูล','เตรียมและยื่นเอกสารประมูล ติดตามผล และประสานส่งมอบสินค้า');
    add('monthly','Gudslip / Gudsport B2B','ตรวจสอบยอดขายและค่าคอมมิชชั่นของทีม Sales ประจำเดือน');
    add('monthly','Gudslip / Gudsport B2B','วางแผนสินค้าและสต็อกสำหรับรอบขายเดือนถัดไป');
    add('ongoing','Gudslip / Gudsport B2B','วางระบบและกระบวนการขายใน JUBILI CRM');
    add('ongoing','Gudslip / Gudsport B2B','จัดทำ Sales Toolkit, Sales Playbook และเอกสารประกอบการขาย');
    add('ongoing','Gudslip / Gudsport B2B','อบรม ประเมิน และติดตาม Pipeline ของทีม Sales');
    add('ongoing','Gudslip / Gudsport B2B','กำหนดนโยบายราคา รูปแบบการขาย และอนุมัติส่วนลด');
    add('ongoing','Gudslip / Gudsport B2B','ติดต่อนำเสนอเงื่อนไขกับลูกค้า B2B และ Partner + ทำสัญญาการขาย');
    add('ongoing','Gudslip / Gudsport B2B','ดูแล Key Account ติดตามคำสั่งซื้อ การชำระเงิน และการจัดส่ง');
    add('asneeded','Gudslip / Gudsport B2B','ประสานงานกับ HR ในการสรรหา สัมภาษณ์ และคัดเลือกทีม Sales');
    add('asneeded','Event และ Sponsor','คัดเลือกและประสานงานการเข้าร่วม Event หรือกิจกรรมสปอนเซอร์');
    add('asneeded','Event และ Sponsor','เจรจาพื้นที่ ค่าใช้จ่าย และสิทธิประโยชน์');
    add('asneeded','Event และ Sponsor','วางรูปแบบบูธ โปรโมชั่น และเป้าหมายการขายของแต่ละงาน');
    add('asneeded','Event และ Sponsor','จัดเตรียมสินค้า โบรชัวร์ Company Sheet นามบัตร และอุปกรณ์ออกบูธ');
    add('asneeded','Event และ Sponsor','ดูแลการขนส่ง ติดตั้ง รื้อถอน และสรุปผลหลังจบงาน');
    add('ongoing','จัดซื้อและบุคลากร','สรรหา เปรียบเทียบราคา และจัดซื้อสินค้า/อุปกรณ์ที่จำเป็น');
    add('ongoing','จัดซื้อและบุคลากร','กำหนดคุณสมบัติ สัมภาษณ์ และคัดเลือกพนักงานในทีม');
    add('ongoing','จัดซื้อและบุคลากร','ดูแลการฝึกอบรมและประเมินผลพนักงานในทีม');
    add('ongoing','เอกสารและสื่อการขาย','จัดทำและปรับปรุง Company Profile, Product Catalogue, Presentation');
    add('ongoing','เอกสารและสื่อการขาย','ตรวจสอบเนื้อหา ราคา และข้อความประชาสัมพันธ์ให้ตรงแนวทางบริษัท');
    add('ongoing','เอกสารและสื่อการขาย','ดูแลเอกสารสัญญา ใบเสนอราคา และข้อมูลสินค้าในทุกช่องทาง');
    add('monthly','เงินกองกลาง','ดูแลเงินกองกลางของบริษัทและอนุมัติค่าใช้จ่ายที่เกี่ยวข้อง');
    add('monthly','เงินกองกลาง','ชำระค่าใช้จ่าย เช่น ค่าโทรศัพท์ ค่าจัดส่งสินค้า ค่าอุปกรณ์สำนักงาน ค่าเดินทาง');
    add('monthly','เงินกองกลาง','รวบรวมใบเสร็จและหลักฐานการชำระเงินส่งให้ฝ่ายบัญชี');
  })();

  // ---------- NATT & PETE (same JD, Sale & Event Marketing - gudslip) ----------
  ['natt','pete'].forEach(function(p){
    var n=1;
    var add=function(freq,group,text){ TASKS.push(T(p,p[0]+(n++),freq,group,text)); };
    add('ongoing','Coordinator','ประสานงานระหว่าง CEO กับทีมงาน');
    add('ongoing','Coordinator','ประสานงานกับหน่วยงานราชการ หรือหน่วยงานอื่น ๆ');
    add('ongoing','Coordinator','จัดรับ–จัดส่งเอกสารตามที่ได้รับมอบหมาย');
    add('asneeded','Event Marketing','จัดหา Event หรืองานที่น่าสนใจสำหรับการเข้าร่วม');
    add('asneeded','Event Marketing','เตรียมอุปกรณ์ + ตรวจเช็คสภาพอุปกรณ์ก่อนออกงาน');
    add('asneeded','Event Marketing','ติดตั้งบูธ + ขายสินค้า + ให้ข้อมูลสินค้าหน้างาน');
    add('ongoing','Sale','จัดหาร้านขายยา ฟิตเนส โรงแรม และร้านอื่น ๆ สำหรับวางขาย gudslip');
    add('ongoing','Sale','ติดต่อนำเสนอขายสินค้าของ gudslip ให้ร้านค้าใหม่');
    add('ongoing','Sale','บริการหลังการขายให้ร้านค้า/ลูกค้าที่ดูแลอยู่');
    add('asneeded','CEO Assistant','ปฏิบัติงานอื่น ๆ ตามที่ CEO มอบหมาย');
  });

  // ---------- CHOKUN (Content, 3 brands) ----------
  (function(){
    var g='chokun', n=1;
    var add=function(freq,group,text){ TASKS.push(T(g,'c'+(n++),freq,group,text)); };
    add('weekly','Content Planning','คิดหัวข้อและไอเดียคอนเทนต์ให้ครบทั้ง 3 แบรนด์');
    add('weekly','Content Planning','วาง Content Pillar / Content Calendar ของแต่ละแบรนด์');
    add('weekly','Content Planning','คิด Hook / Story / Direction ของคอนเทนต์แต่ละชิ้น');
    add('weekly','Content Planning','Brainstorm แนวทางคอนเทนต์ใหม่ ๆ ร่วมกับทีม');
    add('weekly','Content Planning','วางแผนคอนเทนต์ให้เหมาะกับแต่ละแพลตฟอร์ม (TikTok/IG/FB/YouTube)');
    add('weekly','Content Production','ถ่ายวิดีโอ / เก็บ Footage ตามแผนที่วางไว้');
    add('weekly','Content Production','เก็บ B-roll, Atmosphere, Lifestyle Shot ของแต่ละแบรนด์');
    add('asneeded','Content Production','ถ่าย Event / Activity / Interview เมื่อมีงาน');
    add('ongoing','Content Production','คิดมุมกล้องและ Mood ของภาพให้เข้ากับแต่ละแบรนด์');
    add('weekly','Video Editing','ตัดต่อ Short-form Video สำหรับ TikTok / IG Reels / Facebook / YouTube');
    add('weekly','Video Editing','เลือก Footage และเรียงลำดับเรื่องราว (Story)');
    add('weekly','Video Editing','ตัด Interview ให้กระชับได้ใจความ');
    add('weekly','Video Editing','ใส่ Subtitle / SFX / Transition / Music');
    add('weekly','Video Editing','ปรับ Color / Mood ให้เข้ากับ Content และแบรนด์');
    add('weekly','Video Editing','ปรับ Hook และจังหวะตัดต่อให้คนดูอยากดูต่อ');
    add('ongoing','Creative Direction','กำหนด Mood & Tone และ Visual Direction โดยรวม');
    add('ongoing','Creative Direction','ทำ Moodboard และหา Reference ใหม่ ๆ');
    add('ongoing','Creative Direction','คิดรูปแบบการเล่าเรื่องและสิ่งที่แต่ละแบรนด์ควรสื่อผ่านคอนเทนต์');
    add('monthly','Brand Content Management','ปรับแนวทาง Content ให้เหมาะกับ Glaiganplace Hotel / gudslip / Sunglaigan');
    add('monthly','Brand Content Management','สร้าง Character และดูแลภาพลักษณ์ให้แต่ละแบรนด์แตกต่างกันชัดเจน');
    add('monthly','Brand Content Management','ทบทวนคอนเทนต์เดือนที่ผ่านมาว่าตรงเป้าหมายของแต่ละแบรนด์หรือไม่');
  })();

  // ---------- BOTUN (Accounting Assistant, ใกล้กัน เมดิเทค) ----------
  (function(){
    var g='botun', n=1;
    var add=function(freq,group,text){ TASKS.push(T(g,'b'+(n++),freq,group,text)); };
    add('daily','ออเดอร์และแพ็คสินค้า','ตรวจเช็ครับ Order ช่วงเช้าในทุกช่องทาง (Shopee/TikTok/Lazada) และยืนยันรับสินค้าในแอป');
    add('daily','ออเดอร์และแพ็คสินค้า','ลงบันทึกยอดขายแต่ละออเดอร์ และปริ้นออเดอร์เพื่อแพ็ค–จัดส่ง');
    add('daily','ออเดอร์และแพ็คสินค้า','ตรวจสอบความถูกต้องหลังแพ็ค และแพ็ค/ส่งคำสั่งซื้อที่เข้าก่อน 12:00 น. ให้ทัน');
    add('daily','ออเดอร์และแพ็คสินค้า','เช็คออเดอร์ที่เข้าหลังแพ็ค และติดตามขนส่งแต่ละเจ้าให้มารับสินค้า');
    add('asneeded','การเงิน','บันทึกเงินสดย่อยเมื่อมีรายการจ่าย และทำเบิกขออนุมัติเงินกองกลาง');
    add('monthly','สรุปยอดขาย','สรุปยอดขายประจำเดือน ทำรายงาน Canva P&L เทียบกับเดือนก่อน');
    add('daily','สรุปยอดขาย','ทำ Canva สรุปยอดขายรายวัน เทียบกับเป้าที่ต้องขายให้ถึงเดือนนั้น');
    add('daily','สต็อกสินค้า','ทำตาราง Stock Movement รายวัน สรุปยอดคงเหลือหลังขายในแต่ละวัน');
    add('weekly','สต็อกสินค้า','สรุป Stock Movement รายสัปดาห์ และเช็คสินค้าที่ต้องเติมของ');
    add('monthly','เอกสารบัญชี','ช่วยพี่เจี๊ยบเก็บเอกสารบัญชี (ใบกำกับภาษีซื้อ-ขาย / ภ.ง.ด.1 / ภ.ง.ด.3 / ภ.ง.ด.53) ส่งสำนักงานบัญชีก่อนกำหนด');
    add('asneeded','สนับสนุนอื่น ๆ','ช่วยแพ็คส่งสินค้าเมื่อมีออเดอร์เครื่องมือแพทย์');
    add('asneeded','สนับสนุนอื่น ๆ','ทำเบิกจ่ายค่าใช้จ่ายพนักงาน (ค่าน้ำมัน ฯลฯ) เมื่อออกทำงานนอกสถานที่');
    add('weekly','สนับสนุนอื่น ๆ','ตามใส่ตารางสรุปยอดขาย/ค่าคอม AMS ในสมุดบัญชี (ยอดโชว์หลังส่งของแล้ว ~1 สัปดาห์)');
  })();

  // ---------- JIAB (Chief Account) ----------
  (function(){
    var g='jiab', n=1;
    var add=function(freq,group,text){ TASKS.push(T(g,'j'+(n++),freq,group,text)); };
    add('daily','งานประจำวัน','ตรวจสอบ Bank / Cash — ยอดคงเหลือและรายการเคลื่อนไหวทุกบัญชี');
    add('daily','งานประจำวัน','ตรวจสอบ Sales / Invoice / Receipt และเอกสารประกอบ');
    add('daily','งานประจำวัน','ตรวจสอบ Collection — เงินรับจากลูกค้าและตัดรับชำระ AR');
    add('daily','งานประจำวัน','ติดตามลูกหนี้คงค้าง (AR) และรายการผิดปกติ');
    add('daily','งานประจำวัน','ตรวจสอบเจ้าหนี้ (AP) เอกสารจ่าย และ Due Date');
    add('daily','งานประจำวัน','บันทึก/ตรวจสอบรายการบัญชีในระบบ PEAK');
    add('daily','งานประจำวัน','ตรวจสอบเอกสาร VAT / WHT และรายการที่ต้องหัก ณ ที่จ่าย');
    add('daily','งานประจำวัน','ตรวจสอบ Stock — รับเข้า ขายออก และยอดคงเหลือ');
    add('daily','งานประจำวัน','สรุปเงินเข้า–ออก (Daily Cash Flow)');
    add('daily','งานประจำวัน','สรุปตัวเลขสำคัญและประเด็นค้างรายงานผู้บริหาร');
    add('weekly','งานประจำสัปดาห์','ตรวจสอบ AR Aging และติดตามรายการค้าง');
    add('weekly','งานประจำสัปดาห์','ตรวจสอบ AP Aging / Due List');
    add('weekly','งานประจำสัปดาห์','ทำ Bank Reconciliation');
    add('weekly','งานประจำสัปดาห์','ตรวจสอบ Stock Movement รายสัปดาห์');
    add('weekly','งานประจำสัปดาห์','สรุปค่าใช้จ่ายแยก Project (Meditech / Gudslip / GoodSpace)');
    add('weekly','งานประจำสัปดาห์','สรุป Cash Flow และภาระจ่ายที่กำลังจะถึงให้ผู้บริหาร');
    add('monthly','งานปิดบัญชีประจำเดือน','ปิดบัญชีประจำเดือน ตรวจสอบรายการค้าง และปรับปรุงบัญชี');
    add('monthly','งานปิดบัญชีประจำเดือน','จัดทำ Profit & Loss');
    add('monthly','งานปิดบัญชีประจำเดือน','จัดทำ Balance Sheet');
    add('monthly','งานปิดบัญชีประจำเดือน','จัดทำ Cash Flow ประจำเดือน');
    add('monthly','งานปิดบัญชีประจำเดือน','จัดทำ Project P&L แยก Meditech / Gudslip / GoodSpace');
    add('monthly','งานปิดบัญชีประจำเดือน','จัดทำ Management Report สรุป KPI ให้ผู้บริหาร');
    add('monthly','งานปิดบัญชีประจำเดือน','จัดทำ Payroll ตรวจสอบเงินเดือน/รายการหัก และยอดจ่ายสุทธิ');
    add('monthly','งานปิดบัญชีประจำเดือน','นำส่งเงินสมทบประกันสังคมของพนักงาน');
    add('monthly','งานปิดบัญชีประจำเดือน','ประสานงานสำนักงานบัญชีภายนอก');
    add('tax','งานด้านภาษี','ยื่น ภ.พ.30 (VAT)');
    add('tax','งานด้านภาษี','ยื่น ภ.ง.ด.1 / 3 / 53');
    add('tax','งานด้านภาษี','ตรวจสอบภาษีหัก ณ ที่จ่าย และเตรียมหนังสือรับรอง');
    add('tax','งานด้านภาษี','ตรวจสอบ VAT ซื้อ–ขาย');
    add('tax','งานด้านภาษี','ตรวจสอบเอกสารนำเข้าและภาษีนำเข้า');
    add('tax','งานด้านภาษี','จัดเตรียมข้อมูลภาษีสำหรับหน่วยงานที่เกี่ยวข้อง');
    add('ongoing','การควบคุมภายใน','ตรวจสอบเอกสารก่อนบันทึกบัญชี และการอนุมัติค่าใช้จ่าย');
    add('ongoing','การควบคุมภายใน','ควบคุม AR / AP และ Stock ให้ตรงกับข้อมูลจริง');
    add('ongoing','การควบคุมภายใน','ตรวจสอบความถูกต้องของข้อมูลในระบบ PEAK');
    add('ongoing','การควบคุมภายใน','จัดเก็บเอกสารทางบัญชีให้ครบถ้วนและค้นหาได้');
  })();

  // ---------- SUN (CEO) ---------- ดึงจากงานของแผนกต่าง ๆ ที่ต้องผ่าน/รอ K.Sun อยู่แล้ว
  (function(){
    var g='sun', n=1;
    var add=function(freq,group,text){ TASKS.push(T(g,'s'+(n++),freq,group,text)); };
    add('ongoing','บริหารภาพรวมองค์กร','กำหนดทิศทาง นโยบาย และเป้าหมายของแต่ละแบรนด์ (Meditech / Gudslip / GoodSpace / Glaiganplace Hotel / Sunglaigan)');
    add('ongoing','บริหารภาพรวมองค์กร','รับทราบสรุปงานและประเด็นค้างจากหัวหน้าแต่ละส่วนงาน');
    add('weekly','บริหารภาพรวมองค์กร','ประชุมทีมใหญ่ / อัปเดตและมอบหมายงานประจำสัปดาห์');
    add('monthly','บริหารภาพรวมองค์กร','ทบทวน Management Report และ KPI ของบริษัทประจำเดือน');
    add('asneeded','อนุมัติค่าใช้จ่ายและงบประมาณ','อนุมัติการใช้เงินกองกลางและค่าใช้จ่ายที่เกินอำนาจของแต่ละแผนก');
    add('asneeded','อนุมัติค่าใช้จ่ายและงบประมาณ','อนุมัติสปอนเซอร์ งบการตลาด และค่าใช้จ่ายอีเวนต์');
    add('asneeded','อนุมัติค่าใช้จ่ายและงบประมาณ','อนุมัติส่วนลดและเงื่อนไขราคาสำหรับลูกค้า B2B รายสำคัญ');
    add('asneeded','อนุมัติค่าใช้จ่ายและงบประมาณ','พิจารณาและเซ็นอนุมัติสัญญา/ข้อเสนอที่มีผลผูกพันบริษัท');
    add('asneeded','ตัดสินใจ/ชี้ขาด','ตัดสินใจเรื่องสำคัญที่ทีมส่งเข้ามาขออนุมัติ หรือเรื่องที่ติดขัดข้ามแผนก');
    add('ongoing','ภาพลักษณ์และความสัมพันธ์ภายนอก','ดูแลความสัมพันธ์กับพาร์ทเนอร์ ลูกค้ารายสำคัญ และหน่วยงานภายนอก');
  })();

  // ---------- state ----------
  var today = new Date();
  var currentMonth = today.getFullYear()+'-'+String(today.getMonth()+1).padStart(2,'0'); // real current month; JD is reference-only now, so this no longer scrolls
  var activeTab = 'overview';
  var activeFreq = {}; // per person filter
  var db = null, dbReady = false;
  var ACTION_ITEMS = []; // {p,id,text,due:'YYYY-MM-DD',done:bool,createdAt}
  var actionUnsub = null;
  var actionLocalSeq = 1;
  var CAL_CUSTOM_CACHE = {}; // monthKey -> [{id,day,text,tag}]
  var calUnsub = null;
  var calLocalSeq = 1;
  var EVENT_META_CACHE = {}; // eventKey -> {responsible:[], due, note}
  var eventMetaAllUnsub = null;
  var ALL_DYN_EVENTS = {}; // id -> {month, day, text, tag} — every user-added calendar event, any month
  var allCalUnsub = null;
  var SUN_OFFICE = {}; // 'YYYY-MM-DD' -> 'in' | 'out'
  var SHOW_STAFF_ON_CAL = true;
  try{ SHOW_STAFF_ON_CAL = localStorage.getItem('gg_cal_staff') !== '0'; }catch(e){}
  var sunOfficeUnsub = null;

  // full (unfiltered by month) subscription so the overview's "urgent" list can resolve
  // an event's label even when nobody currently has that month open on the calendar tab
  function loadAllCalEvents(){
    if(!db) return;
    if(allCalUnsub){ allCalUnsub(); allCalUnsub = null; }
    allCalUnsub = db.collection('calEvents').onSnapshot(function(snap){
      var next = {};
      snap.docs.forEach(function(doc){
        var d = doc.data() || {};
        next[doc.id] = {month:d.month, day:d.day, text:d.text||'', tag:!!d.tag};
      });
      ALL_DYN_EVENTS = next;
      renderAll();
    }, function(err){ console.warn('calEvents (all) error', err); });
  }

  function labelForEventKey(key){
    if(key.indexOf('static__')===0){
      var parts = key.split('__');
      var mk = parts[1], day = parseInt(parts[2],10), idx = parseInt(parts[3],10);
      var evs = (CAL_STATIC[mk]||{})[day];
      return (evs && evs[idx]) ? evs[idx].t : null;
    }
    if(key.indexOf('dyn__')===0){
      var e = ALL_DYN_EVENTS[key.slice(5)];
      return e ? e.text : null;
    }
    return null;
  }

  // calendar-assigned deadlines landing within the next 3 days — surfaced on the overview tab
  function urgentEvents(){
    var limitI = isoDate(new Date(today.getFullYear(), today.getMonth(), today.getDate()+3));
    var out = [];
    Object.keys(EVENT_META_CACHE).forEach(function(key){
      var meta = EVENT_META_CACHE[key];
      if(!meta || !meta.due) return;
      if(meta.due < TODAY_ISO || meta.due > limitI) return;
      var label = labelForEventKey(key);
      if(!label) return; // event since deleted, or its month's label isn't loaded yet
      out.push({key:key, label:label, due:meta.due, responsible:meta.responsible||[]});
    });
    out.sort(function(a,b){ return a.due.localeCompare(b.due); });
    return out;
  }

  function renderUrgent(){
    var host = document.getElementById('urgentBox');
    if(!host) return;
    var items = urgentEvents();
    if(!items.length){ host.innerHTML = ''; return; }
    var html = '<div class="urgent-box"><div class="title">⚠️ ใกล้ถึงกำหนด (ภายใน 3 วัน) <span class="en-i">· Due soon (within 3 days)</span></div>';
    items.forEach(function(it){
      var isToday = it.due===TODAY_ISO;
      html += '<div class="urgent-item">';
      html += '  <span class="u-txt">'+bi(it.label,true)+'</span>';
      html += '  <span class="u-due">'+(isToday?'วันนี้ · Today':fmtDue(it.due))+'</span>';
      html += '  <span class="u-who">';
      if(it.responsible.length){
        it.responsible.forEach(function(pk){
          var p = personByKey(pk);
          if(!p) return;
          html += '<span class="u-chip" style="background:'+p.color+';" data-urgent-jump="'+pk+'">'+biI(p.name)+'</span>';
        });
      } else {
        html += '<span class="u-chip" style="background:var(--ink-faint);">'+biI('ยังไม่มอบหมาย','Unassigned')+'</span>';
      }
      html += '  </span>';
      html += '</div>';
    });
    html += '</div>';
    host.innerHTML = html;
    host.querySelectorAll('[data-urgent-jump]').forEach(function(chip){
      chip.addEventListener('click', function(){
        activeTab = chip.getAttribute('data-urgent-jump');
        renderAll();
      });
    });
  }

  function loadSunOffice(){
    if(!db) return;
    if(sunOfficeUnsub){ sunOfficeUnsub(); sunOfficeUnsub = null; }
    sunOfficeUnsub = db.collection('sunOffice').onSnapshot(function(snap){
      var next = {};
      snap.docs.forEach(function(doc){
        var d = doc.data() || {};
        if(d.status) next[doc.id] = d.status;
      });
      SUN_OFFICE = next;
      renderAll();
    }, function(err){ console.warn('sunOffice error', err); });
  }

  // click cycles a day: unset -> เข้าออฟฟิศ -> ไม่เข้าออฟฟิศ -> unset
  function cycleSunOffice(dateIso){
    var cur = SUN_OFFICE[dateIso] || '';
    var next = cur==='' ? 'in' : (cur==='in' ? 'out' : '');
    if(db){
      if(next===''){
        db.collection('sunOffice').doc(dateIso).delete().catch(function(e){ console.warn('sunOffice clear failed', e); });
      } else {
        db.collection('sunOffice').doc(dateIso).set({status:next, updatedAt:Date.now()}).catch(function(e){ console.warn('sunOffice save failed', e); });
      }
    }
    if(next==='') delete SUN_OFFICE[dateIso]; else SUN_OFFICE[dateIso] = next;
    renderAll();
  }

  function loadAllEventMeta(){
    if(!db) return;
    if(eventMetaAllUnsub){ eventMetaAllUnsub(); eventMetaAllUnsub = null; }
    eventMetaAllUnsub = db.collection('eventMeta').onSnapshot(function(snap){
      var next = {};
      snap.docs.forEach(function(doc){ next[doc.id] = doc.data() || {}; });
      EVENT_META_CACHE = next;
      renderAll();
    }, function(err){ console.warn('eventMeta list error', err); });
  }
  var HIDDEN_TASKS = {}; // "p__id" -> true  (permanently removed built-in tasks, per person)
  var hiddenUnsub = null;
  var jdOpen = {}; // per-person: whether the "หน้าที่หลัก" disclosure is expanded (default true)

  var THAI_MONTHS = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];

  function monthLabel(mk){
    var parts = mk.split('-'); var y = parseInt(parts[0],10)+543; var m = parseInt(parts[1],10)-1;
    return THAI_MONTHS[m] + ' ' + y + ' · ' + EN_MONTHS[m] + ' ' + (y-543);
  }
  function shiftMonth(mk, delta){
    var parts = mk.split('-'); var y = parseInt(parts[0],10); var m = parseInt(parts[1],10)-1+delta;
    var d = new Date(y, m, 1);
    return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0');
  }
  var THAI_MONTHS_SHORT = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
  function fmtDue(due){
    if(!due) return '—';
    var parts = due.split('-');
    if(parts.length!==3) return due;
    var y = (parseInt(parts[0],10)+543).toString().slice(-2);
    var m = THAI_MONTHS_SHORT[parseInt(parts[1],10)-1] || parts[1];
    var d = parseInt(parts[2],10);
    var mi = parseInt(parts[1],10)-1;
    return d+' '+m+' '+y+(EN_MONTHS_SHORT[mi] ? ' / '+d+' '+EN_MONTHS_SHORT[mi] : '');
  }

  function allTasksFor(p){
    return TASKS.filter(function(t){ return t.p===p; });
  }
  function tasksFor(p){
    return allTasksFor(p).filter(function(t){ return !HIDDEN_TASKS[p+'__'+t.id]; });
  }
  function hiddenTasksFor(p){
    return allTasksFor(p).filter(function(t){ return !!HIDDEN_TASKS[p+'__'+t.id]; });
  }

  function hideTask(p, id){
    if(db){
      db.collection('hiddenTasks').doc(p+'__'+id).set({p:p, id:id, hiddenAt:Date.now()}).catch(function(e){
        console.warn('hide failed', e);
      });
    } else {
      HIDDEN_TASKS[p+'__'+id] = true;
      renderAll();
    }
  }
  function restoreTask(p, id){
    if(db){
      db.collection('hiddenTasks').doc(p+'__'+id).delete().catch(function(e){ console.warn('restore failed', e); });
    } else {
      delete HIDDEN_TASKS[p+'__'+id];
      renderAll();
    }
  }
  function loadHiddenTasks(){
    if(!db) return;
    if(hiddenUnsub){ hiddenUnsub(); hiddenUnsub = null; }
    hiddenUnsub = db.collection('hiddenTasks').onSnapshot(function(snap){
      var map = {};
      snap.docs.forEach(function(doc){
        var d = doc.data() || {};
        if(d.p && d.id) map[d.p+'__'+d.id] = true;
      });
      HIDDEN_TASKS = map;
      renderAll();
    }, function(err){ console.warn('hiddenTasks error', err); });
  }

  // ---------- action items: ad-hoc tasks with a real due date, bucketed for the Monday recap ----------
  function isoDate(d){ return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
  var TODAY_ISO = isoDate(today);

  function weekRanges(){
    var now = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    var day = now.getDay(); // 0=Sun
    var diffToMon = (day===0 ? -6 : 1-day);
    var thisMon = new Date(now); thisMon.setDate(now.getDate()+diffToMon);
    var thisSun = new Date(thisMon); thisSun.setDate(thisMon.getDate()+6);
    var lastMon = new Date(thisMon); lastMon.setDate(thisMon.getDate()-7);
    var lastSun = new Date(thisMon); lastSun.setDate(thisMon.getDate()-1);
    var monthEnd = new Date(now.getFullYear(), now.getMonth()+1, 0);
    return {thisMon:thisMon, thisSun:thisSun, lastMon:lastMon, lastSun:lastSun, monthEnd:monthEnd};
  }

  function actionItemsFor(p){
    return ACTION_ITEMS.filter(function(t){ return t.p===p; });
  }

  function bucketActionItems(p, filterFn, flat){
    var r = weekRanges();
    var lastMonI = isoDate(r.lastMon), lastSunI = isoDate(r.lastSun);
    var thisMonI = isoDate(r.thisMon), thisSunI = isoDate(r.thisSun);
    var monthEndI = isoDate(r.monthEnd);
    var buckets = {lastWeek:[], thisWeek:[], restOfMonth:[], older:[], flatMonth:null,
      ranges:{lastMonI:lastMonI,lastSunI:lastSunI,thisMonI:thisMonI,thisSunI:thisSunI,monthEndI:monthEndI}};

    var items = actionItemsFor(p);
    if(filterFn) items = items.filter(filterFn);

    if(flat){
      // one plain list, no weekly grouping — sorted straight down by due date.
      // still respects the month nav: shows the browsed month, plus any still-open
      // overdue items from before it so nothing gets lost.
      var flatItems;
      if(currentMonth === TODAY_ISO.slice(0,7)){
        flatItems = items.filter(function(t){
          var d = t.due||'';
          if(!d) return true;
          if(d < lastMonI) return !t.done;
          return d <= monthEndI;
        });
      } else {
        flatItems = items.filter(function(t){ return (t.due||'').slice(0,7)===currentMonth; });
      }
      buckets.flatMonth = flatItems.sort(function(a,b){ return (a.due||'').localeCompare(b.due||''); });
      return buckets;
    }

    // browsing today's real month → keep the Monday-recap weekly breakdown (relative to actual "today")
    // browsing any other month (via the month nav) → just list everything due that month, flat, sorted
    if(currentMonth === TODAY_ISO.slice(0,7)){
      items.forEach(function(t){
        var d = t.due || '';
        if(!d){ buckets.thisWeek.push(t); return; }
        if(d < lastMonI){ if(!t.done) buckets.older.push(t); }
        else if(d <= lastSunI){ buckets.lastWeek.push(t); }
        else if(d <= thisSunI){ buckets.thisWeek.push(t); }
        else if(d <= monthEndI){ buckets.restOfMonth.push(t); }
      });
      ['lastWeek','thisWeek','restOfMonth','older'].forEach(function(k){
        buckets[k].sort(function(a,b){ return (a.due||'').localeCompare(b.due||''); });
      });
    } else {
      buckets.flatMonth = items.filter(function(t){
        return (t.due||'').slice(0,7)===currentMonth;
      }).sort(function(a,b){ return (a.due||'').localeCompare(b.due||''); });
    }
    return buckets;
  }

  function addActionItem(p, text, due, link, evKey, requester){
    text = (text||'').trim();
    due = due || TODAY_ISO;
    link = (link||'').trim();
    evKey = evKey || '';
    requester = (requester||'').trim();
    if(!text) return;
    if(db){
      db.collection('actionItems').add({p:p, text:text, due:due, link:link, evKey:evKey, requester:requester, done:false, createdAt:Date.now()}).catch(function(e){
        console.warn('add action item failed', e);
      });
    } else {
      ACTION_ITEMS.push({p:p, id:'local'+(actionLocalSeq++), text:text, due:due, link:link, evKey:evKey, requester:requester, done:false});
      renderAll();
    }
  }

  function toggleActionDone(item, val){
    item.done = val; // optimistic
    if(db && item.id.indexOf('local')!==0){
      db.collection('actionItems').doc(item.id).update({done:val}).catch(function(e){ console.warn('update failed', e); });
    }
    renderAll();
  }

  function deleteActionItem(id){
    if(db && id.indexOf('local')!==0){
      db.collection('actionItems').doc(id).delete().catch(function(e){ console.warn('delete failed', e); });
    } else {
      ACTION_ITEMS = ACTION_ITEMS.filter(function(t){ return t.id!==id; });
      renderAll();
    }
  }

  function loadActionItems(){
    if(!db) return;
    if(actionUnsub){ actionUnsub(); actionUnsub = null; }
    actionUnsub = db.collection('actionItems').onSnapshot(function(snap){
      ACTION_ITEMS = snap.docs.map(function(doc){
        var d = doc.data() || {};
        return {p:d.p, id:doc.id, text:d.text||'', due:d.due||'', link:d.link||'', evKey:d.evKey||'', requester:d.requester||'', done:!!d.done};
      });
      renderAll();
    }, function(err){ console.warn('actionItems error', err); });
  }

  // JD ("หน้าที่หลักตามตำแหน่ง") เป็นข้อมูลอ้างอิงล้วน ไม่มีการติ๊กเสร็จ เพราะเป็นหน้าที่ประจำตัวอยู่แล้ว
  // "ต้องเสร็จภายในเดือนนี้" จึงผูกกับ "ความรับผิดชอบปัจจุบัน" (action item ที่มีวันครบกำหนดจริง) เท่านั้น
  function progressFor(p){
    var actionThisMonth = actionItemsFor(p).filter(function(t){ return (t.due||'').slice(0,7)===currentMonth; });
    var total = actionThisMonth.length;
    if(!total) return {done:0,total:0,pct:0};
    var done = actionThisMonth.filter(function(t){ return t.done; }).length;
    return {done:done, total:total, pct: Math.round(done/total*100)};
  }

  // ---------- render: tabs ----------
  function renderTabs(){
    var tabs = document.getElementById('tabs');
    var defs = [{key:'overview', label:'ภาพรวมทีม', en:'Team overview'}]
      .concat(PEOPLE.map(function(p){ return {key:p.key, label:p.name}; }))
      .concat([{key:'calendar', label:'ปฏิทินบริษัท', en:'Company calendar'}]);
    tabs.innerHTML = '';
    defs.forEach(function(d){
      var b = document.createElement('button');
      var tabEn = d.en || enOf(d.label);
      b.innerHTML = escHtml(d.label)+(tabEn ? '<span class="en">'+escHtml(tabEn)+'</span>' : '');
      b.className = d.key===activeTab ? 'active' : '';
      var pc = personByKey(d.key);
      if(pc){
        b.style.setProperty('--dot-color', pc.color);
        b.style.borderBottom = '3px solid '+pc.color;
        if(d.key===activeTab){ b.style.background = pc.color+'22'; b.style.color = pc.color; }
      }
      b.onclick = function(){ activeTab = d.key; renderAll(); };
      tabs.appendChild(b);
    });
  }

  function showPanel(key){
    document.querySelectorAll('section.panel').forEach(function(s){ s.classList.remove('active'); });
    var el = document.getElementById('panel-'+key);
    if(el) el.classList.add('active');
  }

  // ---------- render: overview ----------
  function renderOverview(){
    var grid = document.getElementById('overviewGrid');
    grid.innerHTML = '';
    PEOPLE.forEach(function(p){
      var prog = progressFor(p.key);
      var card = document.createElement('div');
      card.className = 'card p-card';
      card.style.borderLeft = '4px solid '+p.color;
      card.onclick = function(){ activeTab = p.key; renderAll(); };
      card.innerHTML =
        '<div class="name" style="color:'+p.color+';">'+bi(p.name)+'</div>'+
        '<div class="role">'+bi(p.role)+'</div>'+
        '<div class="dept">'+bi(p.dept)+'</div>'+
        '<div class="bar"><i style="width:'+prog.pct+'%"></i></div>'+
        '<div class="stat"><span>ต้องเสร็จ / Due: '+monthLabel(currentMonth)+'</span><span>'+prog.done+' / '+prog.total+'</span></div>';
      grid.appendChild(card);
    });
  }

  // ---------- render: person panels ----------
  function renderPersonPanels(){
    var host = document.getElementById('personPanels');
    host.innerHTML = '';
    PEOPLE.forEach(function(p){
      var sec = document.createElement('section');
      sec.className = 'panel';
      sec.id = 'panel-'+p.key;

      var prog = progressFor(p.key);
      var groups = {};
      tasksFor(p.key).forEach(function(t){
        groups[t.group] = groups[t.group] || [];
        groups[t.group].push(t);
      });

      var freqsPresent = Array.from(new Set(tasksFor(p.key).map(function(t){return t.freq;})));
      var curFilter = activeFreq[p.key] || 'all';

      var html = '';
      html += '<div class="person-head" style="border-left:4px solid '+p.color+'; padding-left:14px;">';
      html += '  <div class="who"><h2><span style="color:'+p.color+';">'+p.name+'</span> <span style="font-weight:400;color:var(--ink-soft);font-size:14px;">'+p.full+'</span>'+((enOf(p.name)||enOf(p.full)) ? '<span class="en" style="font-size:13px;">'+escHtml(enOf(p.full)||enOf(p.name))+'</span>' : '')+'</h2>';
      html += '    <div class="role">'+bi(p.role)+'</div>';
      html += '    <div class="dept">'+bi(p.dept)+'</div>';
      if(p.contact) html += '    <div class="contact">'+bi(p.contact)+'</div>';
      html += '  </div>';
      html += '  <div class="progress-box"><div class="pct">'+prog.pct+'%</div><div class="lbl">งานที่ต้องเสร็จภายใน '+monthLabel(currentMonth)+' — เสร็จแล้ว '+prog.done+' จาก '+prog.total+'<span class="en">Tasks due this month — '+prog.done+' of '+prog.total+' done</span></div></div>';
      html += '</div>';

      // ---- Sun only: office attendance calendar ----
      if(p.key==='sun'){
        html += '<div class="section-title" style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap;">';
        html += '  <span>ปฏิทินเข้า-ออกออฟฟิศ<span class="en">Office attendance calendar</span></span>';
        html += '  <span style="display:flex; align-items:center; gap:6px; font-weight:400; font-size:13px; text-transform:none; letter-spacing:0;">';
        html += '    <button type="button" class="chip" data-month-act="prev" title="เดือนก่อนหน้า / Previous month">‹</button>';
        html += '    <span style="min-width:104px; text-align:center;">'+monthLabel(currentMonth)+'</span>';
        html += '    <button type="button" class="chip" data-month-act="next" title="เดือนถัดไป / Next month">›</button>';
        html += '  </span>';
        html += '</div>';
        html += '<p class="note-line" style="margin-top:-4px;">คลิกที่วันที่เพื่อวนสถานะ: ยังไม่ระบุ → เข้าออฟฟิศ → ไม่เข้าออฟฟิศ → ยังไม่ระบุ<span class="en">Click a day to cycle its status: not set → in office → out of office → not set</span></p>';
        html += '<div class="cal-wrap"><table class="cal"><thead><tr><th>อา<span class="en">Sun</span></th><th>จ<span class="en">Mon</span></th><th>อ<span class="en">Tue</span></th><th>พ<span class="en">Wed</span></th><th>พฤ<span class="en">Thu</span></th><th>ศ<span class="en">Fri</span></th><th>ส<span class="en">Sat</span></th></tr></thead><tbody>';
        var sDim = daysInMonthOf(currentMonth), sFw = firstWeekdayOf(currentMonth);
        var sCells = [];
        for(var si=0; si<sFw; si++) sCells.push(null);
        for(var sd=1; sd<=sDim; sd++) sCells.push(sd);
        while(sCells.length % 7 !== 0) sCells.push(null);
        for(var sr=0; sr<sCells.length/7; sr++){
          html += '<tr>';
          for(var sc=0; sc<7; sc++){
            var sDay = sCells[sr*7+sc];
            if(sDay===null){ html += '<td class="blank"></td>'; continue; }
            var sIso = currentMonth+'-'+String(sDay).padStart(2,'0');
            var sSt = SUN_OFFICE[sIso] || '';
            var sCls = sSt==='in' ? ' in' : (sSt==='out' ? ' out' : '');
            var sLbl = sSt==='in' ? 'เข้าออฟฟิศ<span class="en">In office</span>' : (sSt==='out' ? 'ไม่เข้าออฟฟิศ<span class="en">Out of office</span>' : '');
            html += '<td class="sun-day'+sCls+'" data-sun-day="'+sIso+'"><span class="d">'+sDay+'</span>'+(sLbl?'<span class="lbl">'+sLbl+'</span>':'')+'</td>';
          }
          html += '</tr>';
        }
        html += '</tbody></table></div>';
      }

      // ---- Section 1: ความรับผิดชอบปัจจุบัน ----
      var isSun = p.key==='sun';
      // Sun's page splits into two independent lists: employee-submitted requests (has requester)
      // vs Sun's own self-entered tasks (no requester) — everyone else just has one combined list.
      var buckets = bucketActionItems(p.key, isSun ? function(t){ return !!t.requester; } : null, isSun);
      var selfBuckets = isSun ? bucketActionItems(p.key, function(t){ return !t.requester; }) : null;
      var R = buckets.ranges;
      var todayStr = TODAY_ISO;

      var isRealCurrentMonth = currentMonth === TODAY_ISO.slice(0,7);
      html += '<div class="section-title" style="margin-top:0; padding-top:0; border-top:none; display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap;">';
      html += '  <span>'+(isSun ? 'คำขอให้เซ็น / อนุมัติ<span class="en">Signature / approval requests</span>' : 'ความรับผิดชอบปัจจุบัน<span class="en">Current responsibilities</span>')+'</span>';
      html += '  <span style="display:flex; align-items:center; gap:6px; font-weight:400; font-size:13px; text-transform:none; letter-spacing:0;">';
      html += '    <button type="button" class="chip" data-month-act="prev" title="เดือนก่อนหน้า / Previous month">‹</button>';
      html += '    <span style="min-width:104px; text-align:center;">'+monthLabel(currentMonth)+'</span>';
      html += '    <button type="button" class="chip" data-month-act="next" title="เดือนถัดไป / Next month">›</button>';
      if(!isRealCurrentMonth) html += '    <button type="button" class="chip" data-month-act="today">เดือนนี้ · This month</button>';
      html += '  </span>';
      html += '</div>';
      html += '<p class="note-line" style="margin-top:-4px;">'+(isSun
        ? 'พนักงานกรอกคำขอที่ต้องให้ซันเซ็น/อนุมัติ พร้อมวันที่ต้องการ — ระบบจะเรียงตามวันให้อัตโนมัติ และเช็คให้ว่าวันนั้นซันเข้าออฟฟิศหรือไม่<span class="en">Staff enter anything Sun needs to sign/approve, with the date they need it — the list sorts by date automatically and checks whether Sun is in the office that day.</span>'
        : (isRealCurrentMonth
          ? 'เช็คว่าสัปดาห์ที่แล้วทำอะไรไปบ้าง ติ๊กที่ทำเสร็จ แล้วลงงานที่ต้องทำสัปดาห์นี้ / เดือนนี้เพิ่มได้เลย<span class="en">Review what got done last week, tick off finished items, then add what needs doing this week / this month.</span>'
          : 'กำลังดูงานของเดือน '+monthLabel(currentMonth)+' — กด "เดือนนี้" เพื่อกลับไปดูสัปดาห์ปัจจุบัน<span class="en">Viewing tasks for '+monthLabel(currentMonth).split(' · ')[1]+' — press "This month" to return to the current week.</span>'))+'</p>';

      var defaultAddDue = isRealCurrentMonth ? todayStr : (currentMonth+'-01');
      html += '<div class="addtask">';
      html += '  <input type="text" placeholder="'+(isSun ? 'เรื่องที่ต้องให้ซันเซ็น/อนุมัติ… / Item for Sun to sign/approve…' : 'กรอกงานที่ต้องทำ… / Enter a task…')+'" data-ai-text style="flex:2 1 220px;">';
      html += '  <input type="date" data-ai-due value="'+defaultAddDue+'"'+(isSun ? ' data-sun-due' : '')+'>';
      if(isSun) html += '  <input type="text" placeholder="ชื่อผู้ขอ / Requester name" data-ai-requester style="flex:1 1 120px;">';
      html += '  <input type="text" placeholder="แนบลิงก์'+(isSun ? 'เอกสาร' : 'ส่งงาน')+' (ถ้ามี) / '+(isSun ? 'Document' : 'Deliverable')+' link (optional)" data-ai-link style="flex:1.2 1 170px;">';
      html += '  <button type="button" class="submit" data-ai-submit>'+(isSun ? '+ ส่งคำขอ <span class="en-i">· Send request</span>' : '+ เพิ่มงาน <span class="en-i">· Add task</span>')+'</button>';
      html += '  <span class="hint" data-sun-hint>'+(isSun
        ? 'ใส่วันที่ต้องการให้เซ็น ระบบจะเช็คให้ว่าวันนั้นซันเข้าออฟฟิศหรือไม่ · ต้องกรอกชื่อผู้ขอ<span class="en">Enter the date you need the signature — the board checks whether Sun is in the office that day · Requester name is required</span>'
        : 'ใส่วันที่ต้องเสร็จ ระบบจะจัดเข้ากลุ่มสัปดาห์ให้อัตโนมัติ · แนบลิงก์ได้ไม่บังคับ<span class="en">Enter the due date and the task is grouped into the right week automatically · Link is optional</span>')+'</span>';
      html += '</div>';

      function renderBucket(title, list, emptyMsg, warn, titleEn, emptyEn){
        html += '<div class="bucket-head'+(warn?' warn':'')+'">'+title+(titleEn?'<span class="en">'+titleEn+'</span>':'')+'</div>';
        if(!list.length){
          html += '<p class="note-line" style="margin:0 0 16px;">'+emptyMsg+(emptyEn?'<span class="en">'+emptyEn+'</span>':'')+'</p>';
        } else {
          html += '<div class="group" style="margin-bottom:18px;">';
          list.forEach(function(t){
            var overdue = !t.done && t.due && t.due < todayStr;
            html += '<label class="task'+(t.done?' done':'')+'">';
            html += '  <input type="checkbox" data-ai-id="'+t.id+'" '+(t.done?'checked':'')+'>';
            html += '  <span class="txt">'+escHtml(t.text)+
                    '<span class="badge'+(overdue?' overdue':' duebadge')+'">'+(overdue?'เลยกำหนด / Overdue · ':'กำหนดเสร็จ / Due ')+fmtDue(t.due)+'</span>'+
                    (t.evKey?' <span class="badge duebadge">📅 จากปฏิทิน / From calendar</span>':'')+
                    (t.requester?' <span class="badge duebadge">🙋 ขอโดย / Requested by '+escHtml(t.requester)+'</span>':'')+
                    (t.link?' <a href="'+escHtml(t.link)+'" target="_blank" rel="noopener" class="badge duebadge" style="text-decoration:none;">🔗 ลิงก์งาน / Link</a>':'')+
                    (enOf(t.text)?'<span class="en">'+escHtml(enOf(t.text))+'</span>':'')+
                    '</span>';
            html += '  <button type="button" class="del" data-ai-del="'+t.id+'" title="ลบงานนี้ / Delete this task">✕</button>';
            html += '</label>';
          });
          html += '</div>';
        }
      }

      if(isSun){
        renderBucket('คำขอทั้งหมด — เรียงตามวันที่', buckets.flatMonth||[],
          'ยังไม่มีคำขอในเดือนนี้', false, 'All requests — sorted by date', 'No requests this month yet');
      } else if(isRealCurrentMonth){
        renderBucket('สัปดาห์ที่แล้ว ('+fmtDue(R.lastMonI)+' – '+fmtDue(R.lastSunI)+') — ทำอะไรไปบ้าง', buckets.lastWeek,
          'ไม่มีงานที่ถึงกำหนดสัปดาห์ที่แล้ว', false, 'Last week ('+enDate(R.lastMonI)+' – '+enDate(R.lastSunI)+') — what got done', 'Nothing was due last week');
        renderBucket('สัปดาห์นี้ ('+fmtDue(R.thisMonI)+' – '+fmtDue(R.thisSunI)+') — ต้องทำ', buckets.thisWeek,
          'ยังไม่มีงานของสัปดาห์นี้ — เพิ่มจากช่องด้านบน', false, 'This week ('+enDate(R.thisMonI)+' – '+enDate(R.thisSunI)+') — to do', 'No tasks for this week yet — add one above');
        renderBucket('เดือนนี้ที่เหลือ (หลัง '+fmtDue(R.thisSunI)+' – '+fmtDue(R.monthEndI)+')', buckets.restOfMonth,
          'ยังไม่มีงานที่ต้องทำในช่วงที่เหลือของเดือนนี้', false, 'Rest of this month (after '+enDate(R.thisSunI)+' – '+enDate(R.monthEndI)+')', 'Nothing due for the rest of this month yet');
        if(buckets.older.length){
          renderBucket('ค้างจากก่อนหน้า — เลยกำหนดมานาน', buckets.older, '', true, 'Carried over — long overdue');
        }
      } else {
        renderBucket('งานในเดือน '+monthLabel(currentMonth), buckets.flatMonth||[],
          'ยังไม่มีงานที่ต้องทำในเดือนนี้', false, 'Tasks in '+enMonth(currentMonth), 'No tasks this month yet');
      }

      // ---- Sun only: self-entered task list, separate from employee requests above ----
      if(isSun){
        html += '<div class="section-title" style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap;">';
        html += '  <span>งานที่ซันกรอกเอง<span class="en">Sun\'s own tasks</span></span>';
        html += '</div>';
        html += '<p class="note-line" style="margin-top:-4px;">ซันใส่งาน/สิ่งที่ต้องทำของตัวเองตรงนี้ได้เลย แยกต่างหากจากคำขอที่พนักงานส่งมาด้านบน<span class="en">Sun can add his own to-dos here, kept separate from the staff requests above.</span></p>';

        html += '<div class="addtask">';
        html += '  <input type="text" placeholder="งานที่ต้องทำ… / Task…" data-ai-text-self style="flex:2 1 220px;">';
        html += '  <input type="date" data-ai-due-self value="'+defaultAddDue+'">';
        html += '  <input type="text" placeholder="แนบลิงก์ (ถ้ามี) / Link (optional)" data-ai-link-self style="flex:1.2 1 170px;">';
        html += '  <button type="button" class="submit" data-ai-submit-self>+ เพิ่มงาน <span class="en-i">· Add task</span></button>';
        html += '</div>';

        (function(){
          function renderSelfBucket(title, list, emptyMsg, warn, titleEn, emptyEn){
            html += '<div class="bucket-head'+(warn?' warn':'')+'">'+title+(titleEn?'<span class="en">'+titleEn+'</span>':'')+'</div>';
            if(!list.length){
              html += '<p class="note-line" style="margin:0 0 16px;">'+emptyMsg+(emptyEn?'<span class="en">'+emptyEn+'</span>':'')+'</p>';
            } else {
              html += '<div class="group" style="margin-bottom:18px;">';
              list.forEach(function(t){
                var overdue = !t.done && t.due && t.due < todayStr;
                html += '<label class="task'+(t.done?' done':'')+'">';
                html += '  <input type="checkbox" data-ai-id="'+t.id+'" '+(t.done?'checked':'')+'>';
                html += '  <span class="txt">'+escHtml(t.text)+
                        '<span class="badge'+(overdue?' overdue':' duebadge')+'">'+(overdue?'เลยกำหนด / Overdue · ':'กำหนดเสร็จ / Due ')+fmtDue(t.due)+'</span>'+
                        (t.evKey?' <span class="badge duebadge">📅 จากปฏิทิน / From calendar</span>':'')+
                        (t.link?' <a href="'+escHtml(t.link)+'" target="_blank" rel="noopener" class="badge duebadge" style="text-decoration:none;">🔗 ลิงก์งาน / Link</a>':'')+
                    (enOf(t.text)?'<span class="en">'+escHtml(enOf(t.text))+'</span>':'')+
                        '</span>';
                html += '  <button type="button" class="del" data-ai-del="'+t.id+'" title="ลบงานนี้ / Delete this task">✕</button>';
                html += '</label>';
              });
              html += '</div>';
            }
          }
          if(isRealCurrentMonth){
            renderSelfBucket('สัปดาห์ที่แล้ว ('+fmtDue(R.lastMonI)+' – '+fmtDue(R.lastSunI)+')', selfBuckets.lastWeek,
              'ไม่มีงานที่ถึงกำหนดสัปดาห์ที่แล้ว', false, 'Last week ('+enDate(R.lastMonI)+' – '+enDate(R.lastSunI)+')', 'Nothing was due last week');
            renderSelfBucket('สัปดาห์นี้ ('+fmtDue(R.thisMonI)+' – '+fmtDue(R.thisSunI)+')', selfBuckets.thisWeek,
              'ยังไม่มีงานของสัปดาห์นี้ — เพิ่มจากช่องด้านบน', false, 'This week ('+enDate(R.thisMonI)+' – '+enDate(R.thisSunI)+')', 'No tasks for this week yet — add one above');
            renderSelfBucket('เดือนนี้ที่เหลือ (หลัง '+fmtDue(R.thisSunI)+' – '+fmtDue(R.monthEndI)+')', selfBuckets.restOfMonth,
              'ยังไม่มีงานที่ต้องทำในช่วงที่เหลือของเดือนนี้', false, 'Rest of this month (after '+enDate(R.thisSunI)+' – '+enDate(R.monthEndI)+')', 'Nothing due for the rest of this month yet');
            if(selfBuckets.older.length){
              renderSelfBucket('ค้างจากก่อนหน้า — เลยกำหนดมานาน', selfBuckets.older, '', true, 'Carried over — long overdue');
            }
          } else {
            renderSelfBucket('งานในเดือน '+monthLabel(currentMonth), selfBuckets.flatMonth||[],
              'ยังไม่มีงานที่ต้องทำในเดือนนี้', false, 'Tasks in '+enMonth(currentMonth), 'No tasks this month yet');
          }
        })();
      }

      // ---- Section 2: หน้าที่หลักตามตำแหน่ง (Job Description) — collapsible reference checklist ----
      html += '<details data-jd-details'+(jdOpen[p.key]!==false?' open':'')+' style="margin-top:8px;">';
      html += '  <summary class="section-title" style="cursor:pointer; user-select:none; display:inline-block;">หน้าที่หลักตามตำแหน่ง<span class="en" style="display:inline; margin-left:6px;">Core duties (job description)</span></summary>';

      html += '  <div class="freq-filter">';
      html += '    <button class="chip'+(curFilter==='all'?' active':'')+'" data-freq="all">ทั้งหมด · All</button>';
      freqsPresent.forEach(function(f){
        html += '    <button class="chip'+(curFilter===f?' active':'')+'" data-freq="'+f+'">'+freqLabel(f)+'</button>';
      });
      html += '  </div>';

      Object.keys(groups).forEach(function(gname){
        var items = groups[gname].filter(function(t){ return curFilter==='all' || t.freq===curFilter; });
        if(!items.length) return;
        html += '  <div class="group"><h3>'+bi(gname)+'</h3>';
        items.forEach(function(t){
          html += '  <div class="task">';
          html += '    <span class="txt">'+t.text+'<span class="badge '+t.freq+'">'+freqLabel(t.freq)+'</span>'+(enOf(t.text)?'<span class="en">'+escHtml(enOf(t.text))+'</span>':'')+'</span>';
          html += '    <button type="button" class="del" data-hide="'+t.id+'" title="เอางานนี้ออกจากลิสต์ / Remove from list">✕</button>';
          html += '  </div>';
        });
        html += '  </div>';
      });

      var hiddenList = hiddenTasksFor(p.key);
      if(hiddenList.length){
        html += '  <div class="group"><h3>ซ่อนไว้ ('+hiddenList.length+')<span class="en">Hidden ('+hiddenList.length+')</span></h3>';
        hiddenList.forEach(function(t){
          html += '  <label class="task" style="opacity:.6;">';
          html += '    <span class="txt">'+t.text+'<span class="badge '+t.freq+'">'+freqLabel(t.freq)+'</span>'+(enOf(t.text)?'<span class="en">'+escHtml(enOf(t.text))+'</span>':'')+'</span>';
          html += '    <button type="button" class="del" data-restore="'+t.id+'" title="กู้คืนงานนี้ / Restore this task">↺ กู้คืน · Restore</button>';
          html += '  </label>';
        });
        html += '  </div>';
      }
      html += '</details>';

      sec.innerHTML = html;
      host.appendChild(sec);

      var jdDetails = sec.querySelector('[data-jd-details]');
      if(jdDetails){
        jdDetails.addEventListener('toggle', function(){ jdOpen[p.key] = jdDetails.open; });
      }

      var aiBtn = sec.querySelector('[data-ai-submit]');
      var sunDueEl = sec.querySelector('[data-sun-due]');
      var sunHintEl = sec.querySelector('[data-sun-hint]');
      var sunHintDefault = sunHintEl ? sunHintEl.innerHTML : '';

      // for Sun's request form: block sending a request on a day he's marked "ไม่เข้าออฟฟิศ"
      function refreshSunConflictState(){
        if(!isSun || !sunDueEl || !aiBtn) return;
        var st = SUN_OFFICE[sunDueEl.value] || '';
        if(st==='out'){
          aiBtn.disabled = true;
          if(sunHintEl){ sunHintEl.innerHTML = '⚠️ วันที่ '+fmtDue(sunDueEl.value)+' ซันไม่เข้าออฟฟิศ — เลือกวันอื่นก่อนส่งคำขอ<span class="en" style="color:inherit;">Sun is out of the office on '+(fmtDue(sunDueEl.value).split(' / ')[1]||sunDueEl.value)+' — pick another date before sending.</span>'; sunHintEl.style.color = 'var(--danger)'; }
        } else {
          aiBtn.disabled = false;
          if(sunHintEl){ sunHintEl.innerHTML = sunHintDefault; sunHintEl.style.color = ''; }
        }
      }
      if(isSun && sunDueEl){
        refreshSunConflictState();
        sunDueEl.addEventListener('change', refreshSunConflictState);
      }

      if(aiBtn){
        aiBtn.addEventListener('click', function(){
          var txtEl = sec.querySelector('[data-ai-text]');
          var dueEl = sec.querySelector('[data-ai-due]');
          var linkEl = sec.querySelector('[data-ai-link]');
          var requesterEl = sec.querySelector('[data-ai-requester]');
          if(isSun){
            // guard again at submit time — don't trust only the disabled attribute
            if((SUN_OFFICE[dueEl.value]||'')==='out'){ refreshSunConflictState(); return; }
            if(requesterEl && !requesterEl.value.trim()){
              requesterEl.style.borderColor = 'var(--danger)';
              requesterEl.focus();
              return;
            }
          }
          addActionItem(p.key, txtEl.value, dueEl.value, linkEl ? linkEl.value : '', '', requesterEl ? requesterEl.value : '');
          txtEl.value='';
          if(linkEl) linkEl.value='';
          if(requesterEl){ requesterEl.value=''; requesterEl.style.borderColor=''; }
        });
        sec.querySelector('[data-ai-text]').addEventListener('keydown', function(e){
          if(e.key==='Enter'){ e.preventDefault(); aiBtn.click(); }
        });
      }

      var aiBtnSelf = sec.querySelector('[data-ai-submit-self]');
      if(aiBtnSelf){
        aiBtnSelf.addEventListener('click', function(){
          var txtEl = sec.querySelector('[data-ai-text-self]');
          var dueEl = sec.querySelector('[data-ai-due-self]');
          var linkEl = sec.querySelector('[data-ai-link-self]');
          addActionItem(p.key, txtEl.value, dueEl.value, linkEl ? linkEl.value : '', '', '');
          txtEl.value='';
          if(linkEl) linkEl.value='';
        });
        sec.querySelector('[data-ai-text-self]').addEventListener('keydown', function(e){
          if(e.key==='Enter'){ e.preventDefault(); aiBtnSelf.click(); }
        });
      }
      sec.querySelectorAll('[data-ai-id]').forEach(function(cb){
        cb.addEventListener('change', function(){
          var id = cb.getAttribute('data-ai-id');
          var item = ACTION_ITEMS.filter(function(t){ return t.id===id; })[0];
          if(item) toggleActionDone(item, cb.checked);
        });
      });
      sec.querySelectorAll('[data-ai-del]').forEach(function(btn){
        btn.addEventListener('click', function(e){
          e.preventDefault();
          deleteActionItem(btn.getAttribute('data-ai-del'));
        });
      });
      sec.querySelectorAll('[data-hide]').forEach(function(btn){
        btn.addEventListener('click', function(e){
          e.preventDefault();
          hideTask(p.key, btn.getAttribute('data-hide'));
        });
      });
      sec.querySelectorAll('[data-restore]').forEach(function(btn){
        btn.addEventListener('click', function(e){
          e.preventDefault();
          restoreTask(p.key, btn.getAttribute('data-restore'));
        });
      });
      sec.querySelectorAll('[data-month-act]').forEach(function(btn){
        btn.addEventListener('click', function(){
          goToMonth(btn.getAttribute('data-month-act'));
        });
      });
      sec.querySelectorAll('[data-sun-day]').forEach(function(td){
        td.addEventListener('click', function(){
          cycleSunOffice(td.getAttribute('data-sun-day'));
        });
      });

      sec.querySelectorAll('[data-freq]').forEach(function(btn){
        btn.addEventListener('click', function(){
          activeFreq[p.key] = btn.getAttribute('data-freq');
          renderAll();
        });
      });
    });
  }

  // ---------- calendar: static whiteboard transcription (Sept 2026 only) + dynamic added events ----------
  var CAL_STATIC = {
    '2026-09': {
      1:[{tag:true,t:'จัดบูธ Decathlon 11:00 น.'}],
      2:[{tag:true,t:'Demo Jubili 14:00 น.'}],
      6:[{t:'คอร์ส/Academy — งานการเงิน'},{t:'Decathlon บางนา'},{t:'Wink Clinic'}],
      9:[{t:'ไปตลาด'}],
      16:[{t:'ประชุมทีม 11:00 น.'},{t:'ปิดยอด PL 13:00 น.'}],
      17:[{t:'ประชุมแผนก'}],
      19:[{tag:true,t:'วิ่ง Decathlon Thailand (~1,500 คนทั่วประเทศ)'}],
      21:[{t:'อัปเดต/Assign งาน โดย พลอย'}],
      23:[{tag:true,t:'Thai Miss — ทีม K.Sun'}],
      24:[{tag:true,t:'Thai Miss — ทีม K.Sun'}],
      25:[{tag:true,t:'Thai Miss'}],
      26:[{tag:true,t:'Thai Miss'},{t:'Grace — 4EC'}],
      28:[{t:'ประชุม / Assign งาน'}],
      29:[{t:'นัดหมาย (โปรดตรวจสอบ)'}]
    }
  };

  function daysInMonthOf(mk){
    var parts = mk.split('-'); var y = parseInt(parts[0],10), m = parseInt(parts[1],10);
    return new Date(y, m, 0).getDate();
  }
  function firstWeekdayOf(mk){
    var parts = mk.split('-'); var y = parseInt(parts[0],10), m = parseInt(parts[1],10)-1;
    return new Date(y, m, 1).getDay(); // 0=Sun
  }

  function addCalEvent(mk, day, text, tag){
    text = (text||'').trim();
    if(!text || !day) return;
    if(db){
      db.collection('calEvents').add({month:mk, day:parseInt(day,10), text:text, tag:!!tag, createdAt:Date.now()}).catch(function(e){
        console.warn('add event failed', e);
      });
    } else {
      var arr = CAL_CUSTOM_CACHE[mk] = CAL_CUSTOM_CACHE[mk] || [];
      arr.push({id:'local'+(calLocalSeq++), day:parseInt(day,10), text:text, tag:!!tag});
      renderAll();
    }
  }
  function deleteCalEvent(mk, id){
    if(db && id.indexOf('local')!==0){
      db.collection('calEvents').doc(id).delete().catch(function(e){ console.warn('delete event failed', e); });
    } else {
      CAL_CUSTOM_CACHE[mk] = (CAL_CUSTOM_CACHE[mk]||[]).filter(function(e){ return e.id!==id; });
      renderAll();
    }
  }
  function loadCalEvents(mk){
    if(!db) return;
    if(calUnsub){ calUnsub(); calUnsub = null; }
    calUnsub = db.collection('calEvents').where('month','==',mk).onSnapshot(function(snap){
      CAL_CUSTOM_CACHE[mk] = snap.docs.map(function(doc){
        var d = doc.data() || {};
        return {id:doc.id, day:d.day, text:d.text||'', tag:!!d.tag};
      });
      if(currentMonth===mk) renderAll();
    }, function(err){ console.warn('calEvents error', err); });
  }

  function renderCalendar(){
    var label = document.getElementById('calMonthLabel');
    var cap = document.getElementById('calCaption');
    if(label) label.textContent = monthLabel(currentMonth);
    if(cap) cap.innerHTML = 'ปฏิทินกิจกรรมบริษัท — '+monthLabel(currentMonth)+'<span class="en">Company Events Calendar</span>';

    var daySel = document.getElementById('calAddDay');
    if(daySel){
      var dim = daysInMonthOf(currentMonth);
      var opts = '';
      for(var dd=1; dd<=dim; dd++) opts += '<option value="'+dd+'">วันที่ '+dd+' / Day '+dd+'</option>';
      daySel.innerHTML = opts;
    }

    var body = document.getElementById('calBody');
    body.innerHTML = '';
    var firstWeekday = firstWeekdayOf(currentMonth);
    var daysInMonth = daysInMonthOf(currentMonth);
    var staticEvs = CAL_STATIC[currentMonth] || {};
    var dynEvs = CAL_CUSTOM_CACHE[currentMonth] || [];
    var cells = [];
    for(var i=0;i<firstWeekday;i++) cells.push(null);
    for(var d=1; d<=daysInMonth; d++) cells.push(d);
    while(cells.length % 7 !== 0) cells.push(null);
    for(var r=0; r<cells.length/7; r++){
      var tr = document.createElement('tr');
      for(var c=0;c<7;c++){
        var day = cells[r*7+c];
        var td = document.createElement('td');
        if(day===null){ td.className='blank'; tr.appendChild(td); continue; }
        var evDateIso = currentMonth+'-'+String(day).padStart(2,'0');
        var sunSt = SUN_OFFICE[evDateIso] || '';
        var h = '<span class="d">'+day+'</span>'+
          (sunSt==='in' ? '<span class="sun-flag in" title="ซันเข้าออฟฟิศ / Sun in office">ซัน ✓ · Sun in</span>' : '')+
          (sunSt==='out' ? '<span class="sun-flag out" title="ซันไม่เข้าออฟฟิศ / Sun out of office">ซัน ✕ · Sun out</span>' : '');
        if(evDateIso===TODAY_ISO) td.className = 'today';
        (staticEvs[day]||[]).forEach(function(e, idx){
          var key = 'static__'+currentMonth+'__'+day+'__'+idx;
          h += '<span class="ev'+(e.tag?' tag':'')+'" data-ev-key="'+key+'" data-ev-label="'+escAttr(e.t)+'" data-ev-date="'+evDateIso+'">'+respDots(key)+bi(e.t,true)+'</span>';
        });
        dynEvs.filter(function(e){ return e.day===day; }).forEach(function(e){
          var key = 'dyn__'+e.id;
          h += '<span class="ev'+(e.tag?' tag':'')+'" style="display:flex;gap:4px;align-items:flex-start;justify-content:space-between;">'+
               '<span data-ev-key="'+key+'" data-ev-label="'+escAttr(e.text)+'" data-ev-date="'+evDateIso+'">'+respDots(key)+bi(e.text,true)+'</span>'+
               '<button type="button" class="del" data-cal-del="'+e.id+'" title="ลบ / Delete" style="margin-left:0;">✕</button></span>';
        });
        // every staff member's own tasks + requests to Sun, on their due date
        // (tasks created from a calendar event are skipped — the event is already shown)
        if(SHOW_STAFF_ON_CAL){
          ACTION_ITEMS.filter(function(t){ return !t.evKey && t.due===evDateIso; }).forEach(function(t){
            var p = personByKey(t.p);
            if(!p) return;
            var who = t.requester ? escHtml(t.requester)+' → '+p.name : p.name;
            h += '<span class="ev staff'+(t.done?' done':'')+(t.requester?' req':'')+'" data-staff-jump="'+t.p+'" title="'+escAttr(t.text)+'">'+
                 '<i class="dot" style="background:'+p.color+';"></i>'+
                 '<span><span class="who" style="color:'+p.color+';">'+who+'</span> '+escHtml(t.text)+'</span></span>';
          });
        }
        td.innerHTML = h;
        tr.appendChild(td);
      }
      body.appendChild(tr);
    }
    body.querySelectorAll('[data-staff-jump]').forEach(function(el){
      el.addEventListener('click', function(e){
        e.stopPropagation();
        activeTab = el.getAttribute('data-staff-jump');
        renderAll();
        window.scrollTo({top:0, behavior:'smooth'});
      });
    });
    var legend = document.getElementById('calLegend');
    if(legend){
      legend.innerHTML = PEOPLE.map(function(p){
        return '<span><i style="background:'+p.color+';"></i>'+p.name+' · '+escHtml(enOf(p.name))+'</span>';
      }).join('') + '<span style="opacity:.8;">🟩 ซัน ✓ = เข้าออฟฟิศ · Sun in office</span>';
    }
    body.querySelectorAll('[data-cal-del]').forEach(function(btn){
      btn.addEventListener('click', function(e){
        e.stopPropagation();
        deleteCalEvent(currentMonth, btn.getAttribute('data-cal-del'));
      });
    });
    body.querySelectorAll('[data-ev-key]').forEach(function(el){
      el.addEventListener('click', function(e){
        e.stopPropagation();
        openEventModal(el.getAttribute('data-ev-key'), el.getAttribute('data-ev-label'), el.getAttribute('data-ev-date'));
      });
    });
  }

  function respDots(key){
    var meta = EVENT_META_CACHE[key];
    if(!meta || !meta.responsible || !meta.responsible.length) return '';
    var out = '<span style="display:inline-flex;gap:2px;margin-right:4px;vertical-align:middle;">';
    meta.responsible.forEach(function(pk){
      var p = personByKey(pk);
      if(!p) return;
      out += '<span style="display:inline-block;width:7px;height:7px;border-radius:99px;background:'+p.color+';" title="'+p.name+'"></span>';
    });
    out += '</span>';
    return out;
  }

  function escAttr(s){
    return String(s||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
  }

  // Several data updates can arrive at once — draw at most once per frame,
  // and keep anything a person is in the middle of typing.
  var renderQueued = false;
  function renderAll(){
    if(renderQueued) return;
    renderQueued = true;
    (window.requestAnimationFrame || setTimeout)(function(){ renderQueued = false; renderAllNow(); });
  }
  function inputKeyOf(el){
    var sec = el.closest('section.panel');
    for(var i=0;i<el.attributes.length;i++){
      var n = el.attributes[i].name;
      if(n.indexOf('data-ai-')===0) return (sec?sec.id:'')+'|'+n;
    }
    return null;
  }
  function renderAllNow(){
    var saved = {}, focusKey = null, selStart = null, selEnd = null;
    document.querySelectorAll('#personPanels input').forEach(function(el){
      var k = inputKeyOf(el); if(k) saved[k] = el.value;
    });
    var ae = document.activeElement;
    if(ae && ae.closest && ae.closest('#personPanels')){
      focusKey = inputKeyOf(ae);
      try{ selStart = ae.selectionStart; selEnd = ae.selectionEnd; }catch(e){}
    }
    renderTabs();
    renderUrgent();
    renderOverview();
    renderPersonPanels();
    renderCalendar();
    showPanel(activeTab);
    document.querySelectorAll('#personPanels input').forEach(function(el){
      var k = inputKeyOf(el);
      if(k && saved.hasOwnProperty(k)){
        el.value = saved[k];
        if(el.hasAttribute('data-sun-due')) el.dispatchEvent(new Event('change'));
      }
      if(k && k===focusKey){
        el.focus();
        try{ if(selStart!==null) el.setSelectionRange(selStart, selEnd); }catch(e){}
      }
    });
  }

  // ---------- event modal: responsible person + comments ----------
  var currentEventKey = null;
  var currentEventLabel = '';
  var currentEventDate = ''; // the calendar day the event actually falls on ('YYYY-MM-DD') — this is the default due date
  var metaUnsub = null, commentsUnsub = null;
  var currentMeta = {responsible:[], due:'', note:''};

  function openEventModal(key, label, evDate){
    currentEventKey = key;
    currentEventLabel = label || '';
    currentEventDate = evDate || TODAY_ISO;
    document.getElementById('eventModalTitle').innerHTML = bi(label||'', true);
    document.getElementById('eventDue').value = currentEventDate; // default: due date = the event's own date on the calendar
    document.getElementById('eventNote').value = '';
    renderRespChips([]);
    document.getElementById('eventComments').innerHTML = '<div class="comment-empty">กำลังโหลด… · Loading…</div>';
    var savedAuthor = '';
    try{ savedAuthor = localStorage.getItem('khg_commenter_name') || ''; }catch(e){}
    document.getElementById('commentAuthor').value = savedAuthor;
    document.getElementById('eventModalBackdrop').classList.add('open');

    if(metaUnsub){ metaUnsub(); metaUnsub = null; }
    if(commentsUnsub){ commentsUnsub(); commentsUnsub = null; }

    if(db){
      metaUnsub = db.doc('eventMeta/'+key).onSnapshot(function(snap){
        var d = snap.exists ? (snap.data()||{}) : {};
        currentMeta = {responsible:d.responsible||[], due:d.due||currentEventDate, note:d.note||''};
        document.getElementById('eventDue').value = currentMeta.due;
        document.getElementById('eventNote').value = currentMeta.note;
        renderRespChips(currentMeta.responsible);
      }, function(err){ console.warn('meta error', err); });

      commentsUnsub = db.doc('eventMeta/'+key).collection('comments').orderBy('createdAt','asc').limit(100).onSnapshot(function(snap){
        var list = document.getElementById('eventComments');
        if(!snap.size){ list.innerHTML = '<div class="comment-empty">ยังไม่มีการอัพเดทความคืบหน้า · No progress updates yet</div>'; return; }
        var html = '';
        snap.docs.forEach(function(doc){
          var c = doc.data() || {};
          var when = c.createdAt ? new Date(c.createdAt).toLocaleString('th-TH',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}) : '';
          html += '<div class="comment-item"><span class="who">'+escHtml(c.author||'ไม่ระบุชื่อ · Anonymous')+'</span><span class="when">'+when+'</span><div class="body">'+escHtml(c.text||'')+'</div></div>';
        });
        list.innerHTML = html;
        list.scrollTop = list.scrollHeight;
      }, function(err){ console.warn('comments error', err); });
    } else {
      document.getElementById('eventComments').innerHTML = '<div class="comment-empty">โหมดออฟไลน์ — ไม่สามารถบันทึกได้ในเซสชันนี้ · Offline mode — changes can\'t be saved in this session</div>';
    }
  }

  function closeEventModal(){
    document.getElementById('eventModalBackdrop').classList.remove('open');
    if(metaUnsub){ metaUnsub(); metaUnsub = null; }
    if(commentsUnsub){ commentsUnsub(); commentsUnsub = null; }
    currentEventKey = null;
  }

  function escHtml(s){
    return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function renderRespChips(active){
    var host = document.getElementById('eventRespChips');
    host.innerHTML = '';
    PEOPLE.forEach(function(p){
      var b = document.createElement('button');
      b.type = 'button';
      var isOn = active.indexOf(p.key)>=0;
      b.className = 'resp-chip'+(isOn ? ' on' : '');
      if(isOn){ b.style.background = p.color; b.style.borderColor = p.color; b.style.color = '#fff'; }
      else { b.style.borderColor = p.color; b.style.color = p.color; }
      b.innerHTML = biI(p.name);
      b.addEventListener('click', function(){
        var idx = currentMeta.responsible.indexOf(p.key);
        var turningOn = idx<0;
        if(idx>=0) currentMeta.responsible.splice(idx,1);
        else currentMeta.responsible.push(p.key);
        renderRespChips(currentMeta.responsible);
        persistCurrentMeta();
        // toggling on immediately drops the task into that person's list, but keep the
        // modal open so more than one person can be picked before jumping anywhere
        if(turningOn) ensureTaskForAssignment(p.key);
      });
      host.appendChild(b);
    });
  }

  // when a calendar event is assigned to someone, also drop it into their
  // "ความรับผิดชอบปัจจุบัน" list so it actually shows up as a task for them
  function ensureTaskForAssignment(personKey){
    if(!currentEventKey) return;
    var already = ACTION_ITEMS.some(function(t){ return t.p===personKey && t.evKey===currentEventKey; });
    if(already) return;
    var due = (document.getElementById('eventDue').value || currentMeta.due || currentEventDate || TODAY_ISO);
    addActionItem(personKey, currentEventLabel || 'งานจากปฏิทิน', due, '', currentEventKey);
  }

  function persistCurrentMeta(){
    if(!currentEventKey) return;
    var savingKey = currentEventKey;
    var due = document.getElementById('eventDue').value;
    var note = document.getElementById('eventNote').value;
    var body = {responsible:currentMeta.responsible, due:due, note:note, updatedAt:Date.now()};
    if(db){
      db.doc('eventMeta/'+savingKey).set(body).catch(function(e){ console.warn('save meta failed', e); });
    }
    EVENT_META_CACHE[savingKey] = body; // optimistic local update so dots/jump reflect immediately
    renderCalendar();
  }

  function saveEventMeta(){
    persistCurrentMeta();
    var resp = currentMeta.responsible;
    if(resp.length===1){
      // exactly one person assigned → it's unambiguous, jump straight to their dashboard
      var jumpTo = resp[0];
      closeEventModal();
      activeTab = jumpTo;
      renderAll();
    } else {
      // zero or multiple people assigned → nothing single to jump to, just close
      closeEventModal();
      renderAll();
    }
  }

  function submitComment(){
    if(!currentEventKey) return;
    var authorEl = document.getElementById('commentAuthor');
    var textEl = document.getElementById('commentText');
    var author = (authorEl.value||'').trim() || 'ไม่ระบุชื่อ · Anonymous';
    var text = (textEl.value||'').trim();
    if(!text) return;
    try{ localStorage.setItem('khg_commenter_name', author); }catch(e){}
    if(db){
      db.doc('eventMeta/'+currentEventKey).collection('comments').add({author:author, text:text, createdAt:Date.now()}).catch(function(e){
        console.warn('comment failed', e);
      });
    }
    textEl.value = '';
  }

  function bindEventModal(){
    document.getElementById('eventModalClose').addEventListener('click', closeEventModal);
    document.getElementById('eventModalBackdrop').addEventListener('click', function(e){
      if(e.target === e.currentTarget) closeEventModal();
    });
    document.getElementById('eventSaveMeta').addEventListener('click', saveEventMeta);
    document.getElementById('commentSubmit').addEventListener('click', submitComment);
    document.getElementById('commentText').addEventListener('keydown', function(e){
      if(e.key==='Enter'){ e.preventDefault(); submitComment(); }
    });
    document.addEventListener('keydown', function(e){
      if(e.key==='Escape') closeEventModal();
    });
  }

  // shared month navigation: used by the calendar's own nav AND by each person's
  // task-list month nav, so both stay in sync on the same currentMonth
  function goToMonth(act){
    if(act==='prev') currentMonth = shiftMonth(currentMonth,-1);
    else if(act==='next') currentMonth = shiftMonth(currentMonth,1);
    else if(act==='today') currentMonth = TODAY_ISO.slice(0,7);
    if(db) loadCalEvents(currentMonth); // resubscribe to the newly selected month
    renderAll();
  }

  function bindCalendarControls(){
    var staffToggle = document.getElementById('calShowStaff');
    if(staffToggle){
      staffToggle.checked = SHOW_STAFF_ON_CAL;
      staffToggle.addEventListener('change', function(){
        SHOW_STAFF_ON_CAL = staffToggle.checked;
        try{ localStorage.setItem('gg_cal_staff', SHOW_STAFF_ON_CAL ? '1' : '0'); }catch(e){}
        renderCalendar();
      });
    }
    document.querySelectorAll('#calMonthNav [data-cal-act]').forEach(function(btn){
      btn.addEventListener('click', function(){
        goToMonth(btn.getAttribute('data-cal-act'));
      });
    });
    var submitBtn = document.getElementById('calAddSubmit');
    if(submitBtn){
      submitBtn.addEventListener('click', function(){
        var day = document.getElementById('calAddDay').value;
        var text = document.getElementById('calAddText').value;
        var tag = document.getElementById('calAddTag').checked;
        addCalEvent(currentMonth, day, text, tag);
        document.getElementById('calAddText').value = '';
        document.getElementById('calAddTag').checked = false;
      });
      var textInput = document.getElementById('calAddText');
      textInput.addEventListener('keydown', function(e){
        if(e.key==='Enter'){ e.preventDefault(); submitBtn.click(); }
      });
    }
  }

  // ---------- db wiring: Google Sheets via Apps Script (see sheets-db.js) ----------
  var CFG = window.GG_CONFIG || {};
  var KEY_STORE = 'gg_team_key';
  function getSavedKey(){ try{ return localStorage.getItem(KEY_STORE) || ''; }catch(e){ return ''; } }
  function saveKey(k){ try{ localStorage.setItem(KEY_STORE, k); }catch(e){} }
  function forgetKey(){ try{ localStorage.removeItem(KEY_STORE); }catch(e){} }

  function setPill(state, extra){
    var pill = document.getElementById('statusPill');
    if(!pill) return;
    pill.classList.remove('err','saving');
    if(state==='ok'){
      var t = new Date();
      pill.textContent = 'ซิงก์แล้ว · Synced '+String(t.getHours()).padStart(2,'0')+':'+String(t.getMinutes()).padStart(2,'0')+':'+String(t.getSeconds()).padStart(2,'0');
    } else if(state==='saving'){
      pill.classList.add('saving'); pill.textContent = 'กำลังบันทึก… · Saving…';
    } else if(state==='error'){
      pill.classList.add('err'); pill.textContent = 'เชื่อมต่อไม่ได้ กำลังลองใหม่ · Connection problem — retrying';
    } else if(state==='unauthorized'){
      pill.classList.add('err'); pill.textContent = 'รหัสทีมไม่ถูกต้อง · Wrong team passcode';
    } else if(state==='offline'){
      pill.classList.add('err'); pill.textContent = 'ยังไม่ได้ตั้งค่า API_URL ใน config.js · Not connected — set API_URL in config.js';
    } else {
      pill.textContent = 'กำลังเชื่อมต่อ… · Connecting…';
    }
  }

  function startListeners(){
    loadActionItems();
    loadCalEvents(currentMonth);
    loadHiddenTasks();
    loadAllEventMeta();
    loadSunOffice();
    loadAllCalEvents();
  }

  function showGate(wrong){
    var gate = document.getElementById('gate');
    gate.hidden = false;
    document.getElementById('gateErr').hidden = !wrong;
    var input = document.getElementById('gateKey');
    input.value = '';
    setTimeout(function(){ input.focus(); }, 50);
  }

  function connect(key){
    if(db && db.stop) db.stop();
    setPill('connecting');
    var conn = SheetsDB.create({
      url: CFG.API_URL, key: key, pollSeconds: CFG.POLL_SECONDS || 8,
      onStatus: function(state){
        if(state==='unauthorized'){ forgetKey(); conn.stop(); showGate(true); }
        setPill(state);
      }
    });
    conn.ready.then(function(){
      saveKey(key);
      document.getElementById('gate').hidden = true;
      db = conn;
      startListeners();
    }, function(err){
      if(err && err.code==='unauthorized') return; // gate already shown
      // network problem on first load: keep retrying in the background
      db = conn;
      startListeners();
    });
  }

  function bindGate(){
    document.getElementById('gateForm').addEventListener('submit', function(e){
      e.preventDefault();
      var k = document.getElementById('gateKey').value.trim();
      if(!k) return;
      document.getElementById('gateErr').hidden = true;
      connect(k);
    });
  }

  function init(){
    bindCalendarControls();
    bindEventModal();
    bindGate();
    renderAll(); // draw immediately with empty data, fill in once the sheet loads
    var configured = CFG.API_URL && CFG.API_URL.indexOf('PASTE_') !== 0 && window.SheetsDB;
    if(!configured){
      setPill('offline');
      CAL_CUSTOM_CACHE[currentMonth] = [];
      return;
    }
    var k = getSavedKey();
    if(k) connect(k); else showGate(false);
  }

  init();
})();
