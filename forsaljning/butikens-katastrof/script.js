/* =========================================================
   BUTIKENS KATASTROF – Handelhub
   Version med riktig FIFO-kö och längre kundtålamod
========================================================= */

const CONFIG = {
  startSatMin: 42, startSatMax: 68,
  spawnMin: 4000, spawnMax: 9000,
  eventMin: 20000, eventMax: 30000, firstEvent: 12000,
  payMin: 5000, payMax: 8000,
  shopMin: 20000, shopMax: 45000,
  maxActive: 10, maxTotal: 25,
  leaveBelow: 5,            // kunder går först när de är riktigt arga
  patienceShop: 40000,      // ms i butiken innan nöjdheten börjar sjunka
  patienceQueue: 45000,     // ms i kön innan nöjdheten börjar sjunka
  shopDrain: 0.015,          // sänkning per sekund i butiken
  queueDrain: 0.04,         // sänkning per sekund i kön
  queueDrainMax: 0.09       // max sänkning per sekund efter lång väntan
};

const game = {
  storeName: "Min butik", running: false,
  problemsSolved: 0, totalProblems: 3,
  money: 8500, sales: 70, customerSatisfaction: 75, sustainability: 65,
  hour: 9, minutes: 0,
  customers: [], queue: [], customerId: 0, totalCustomersCreated: 0,
  activeProblems: [], extraCashierUntil: 0,
  staff: {
    sara:  { name: "Sara",  role: "Kundservice", energy: 85 },
    ahmed: { name: "Ahmed", role: "Lager",       energy: 85 },
    lina:  { name: "Lina",  role: "Exponering",  energy: 85 }
  },
  stock: { popular: 80, milk: 25, bread: 10, juice: 65, coffee: 30 },
  timers: { nextEvent: null, firstEvent: null, tick: null, move: null, clock: null, spawn: null }
};

/* ---------- Hjälpfunktioner ---------- */
const getElement = id => document.getElementById(id);
const setText = (id, v) => { const e = getElement(id); if (e) e.textContent = v; };
const clamp = v => Math.max(0, Math.min(100, v));
const randomNumber = (a, b) => Math.floor(Math.random() * (b - a + 1) + a);
const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];
const containsAny = (text, words) => words.some(w => text.includes(w));

const startScreen = getElement("startScreen");
const setupScreen = getElement("setupScreen");
const gameScreen = getElement("gameScreen");
const resultScreen = getElement("resultScreen");
const modal = getElement("modal");
const modalContent = getElement("modalContent");
const customerArea = getElement("customerArea");
const problemList = getElement("problemList");
const alertIndicator = getElement("alertIndicator");
const eventBanner = getElement("eventBanner");
const toast = getElement("toast");

function showScreen(screen) {
  if (!screen) return;
  document.querySelectorAll(".screen").forEach(e => e.classList.remove("active"));
  screen.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------- Start & butiksval ---------- */
const startGameBtn = getElement("startGameBtn");
if (startGameBtn) startGameBtn.addEventListener("click", () => setupScreen && showScreen(setupScreen));

document.querySelectorAll(".store-choice").forEach(b =>
  b.addEventListener("click", () => { game.storeName = b.dataset.store || "Min butik"; beginGame(); })
);

const customStoreBtn = getElement("customStoreBtn");
if (customStoreBtn) customStoreBtn.addEventListener("click", () => {
  const input = getElement("customStoreInput");
  if (!input) return;
  const name = input.value.trim();
  if (!name) return showToast("⚠️", "Skriv namnet på din butik först.");
  game.storeName = name;
  beginGame();
});

/* ---------- Starta / återställ ---------- */
function clearAllTimers() {
  clearTimeout(game.timers.nextEvent);
  clearTimeout(game.timers.firstEvent);
  clearTimeout(game.timers.spawn);
  clearInterval(game.timers.tick);
  clearInterval(game.timers.move);
  clearInterval(game.timers.clock);
}

function injectQueueStyles() {
  if (getElement("queueStyles")) return;
  const st = document.createElement("style");
  st.id = "queueStyles";
  st.textContent = `
.queue-panel{margin-top:14px;padding:12px;background:#fff;border:1px solid #d8d2c0;border-radius:14px}
.queue-title{font-weight:700;color:#1E3F2F;margin-bottom:8px}
.queue-list{display:flex;gap:10px;overflow-x:auto;padding-bottom:4px}
.queue-empty{color:#777;font-size:14px}
.queue-card{display:flex;align-items:center;gap:8px;min-width:170px;padding:8px 10px;background:#f7f4ea;border:1px solid #d8d2c0;border-radius:12px;cursor:pointer}
.queue-card.paying{background:#e4f1e8;border-color:#6aa583}
.queue-spot{min-width:28px;height:28px;padding:0 6px;display:flex;align-items:center;justify-content:center;background:#1E3F2F;color:#fff;border-radius:999px;font-size:12px;font-weight:700}
.queue-emoji{font-size:26px}
.queue-info{display:flex;flex-direction:column;line-height:1.25}
.queue-info small{color:#666;font-size:12px}
.customer{transition:left 1.2s,top 1.2s,opacity .4s,transform .4s}
.queue-badge{position:absolute;top:-6px;right:-6px;min-width:20px;height:20px;padding:0 5px;border-radius:999px;background:#1E3F2F;color:#fff;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;font-family:sans-serif}
`;
  document.head.appendChild(st);
}

function ensureQueuePanel() {
  injectQueueStyles();
  let panel = getElement("queuePanel");
  if (!panel) {
    panel = document.createElement("div");
    panel.id = "queuePanel";
    panel.className = "queue-panel";
    const floor = getElement("storeFloor");
    if (floor) floor.insertAdjacentElement("afterend", panel);
    // Lyssnaren läggs bara till en gång
    panel.addEventListener("click", e => {
      const card = e.target.closest("[data-queue-id]");
      if (!card) return;
      const c = game.customers.find(x => x.id === Number(card.dataset.queueId));
      if (c) openCustomer(c);
    });
  }
  return panel;
}

function resetGame() {
  clearAllTimers();
  Object.assign(game, {
    running: false, problemsSolved: 0, money: 8500, sales: 70,
    customerSatisfaction: 75, sustainability: 65, hour: 9, minutes: 0,
    customers: [], queue: [], customerId: 0, totalCustomersCreated: 0,
    activeProblems: [], extraCashierUntil: 0,
    stock: { popular: 80, milk: 25, bread: 10, juice: 65, coffee: 30 }
  });
  Object.values(game.staff).forEach(s => (s.energy = 85));
  if (customerArea) customerArea.innerHTML = "";
  const panel = getElement("queuePanel");
  if (panel) panel.innerHTML = "";
  updateProblemList();
  if (alertIndicator) alertIndicator.classList.add("hidden");
  if (eventBanner) eventBanner.classList.add("hidden");
}

function beginGame() {
  resetGame();
  ensureQueuePanel();
  game.running = true;
  setText("storeName", game.storeName);
  showScreen(gameScreen);
  updateUI();

  for (let i = 0; i < 3; i++) spawnCustomer();
  scheduleNextCustomer();

  game.timers.tick = setInterval(gameTick, 1000);
  game.timers.move = setInterval(() => game.running && moveCustomers(), 7000);
  game.timers.clock = setInterval(() => {
    if (!game.running) return;
    if (++game.minutes >= 60) { game.minutes = 0; game.hour++; }
    updateUI();
  }, 10000);

  game.timers.firstEvent = setTimeout(() => game.running && triggerEvent(events[0]), CONFIG.firstEvent);
}

/* ---------- Kunddata ---------- */
const customerNames = ["Maja","Ali","Sara","Emma","Noah","Liam","Sofia","Adam","Nora","Hugo","Ella","Omar","Leo","Amina","Lucas","Mira","Elias","Alva","Samir","Lina"];
const customerTypes = ["Stressad","Nyfiken","Prisfokuserad","Van kund","Ny kund","Familj","Snabb kund","Pratsam kund"];
const customerEmojis = ["👩","👨","👩‍🦱","👨‍🦱","👩‍🦰","👨‍🦰","🧑"];

function getCustomerMood(s) {
  if (s >= 70) return { emoji: "😊", text: "Nöjd" };
  if (s >= 55) return { emoji: "😐", text: "Neutral" };
  if (s >= 40) return { emoji: "😕", text: "Osäker" };
  if (s >= 28) return { emoji: "😠", text: "Missnöjd" };
  return { emoji: "😡", text: "Mycket missnöjd" };
}

/* ---------- Skapa kunder ---------- */
function scheduleNextCustomer() {
  if (!game.running || game.totalCustomersCreated >= CONFIG.maxTotal) return;
  game.timers.spawn = setTimeout(() => {
    if (!game.running) return;
    spawnCustomer();
    scheduleNextCustomer();
  }, randomNumber(CONFIG.spawnMin, CONFIG.spawnMax));
}

function spawnCustomer() {
  if (!game.running) return;
  if (game.totalCustomersCreated >= CONFIG.maxTotal) return;
  if (game.customers.length >= CONFIG.maxActive) return;

  game.customerId++;
  game.totalCustomersCreated++;

  const customer = {
    id: game.customerId,
    name: randomItem(customerNames),
    emoji: randomItem(customerEmojis),
    type: randomItem(customerTypes),
    satisfaction: randomNumber(CONFIG.startSatMin, CONFIG.startSatMax),
    x: randomNumber(10, 85), y: randomNumber(25, 70),
    state: "shopping",              // shopping | queued | paying
    enteredAt: Date.now(),
    shopUntil: Date.now() + randomNumber(CONFIG.shopMin, CONFIG.shopMax),
    queuedAt: 0, payUntil: 0, leaving: false
  };
  game.customers.push(customer);
  renderCustomer(customer);
  showToast("🚪", `${customer.name} kom in i butiken.`);
  updateUI();
}

function renderCustomer(c) {
  if (!customerArea) return;
  const el = document.createElement("div");
  el.className = "customer";
  el.dataset.id = c.id;
  el.style.left = `${c.x}%`;
  el.style.top = `${c.y}%`;
  el.innerHTML = `
    <div class="customer-icon">${getCustomerMood(c.satisfaction).emoji}</div>
    <div class="customer-name">${c.name}</div>`;
  el.addEventListener("click", () => openCustomer(c));
  customerArea.appendChild(el);
}

function moveCustomers() {
  const spots = [
    { x: 25, y: 38 }, { x: 62, y: 32 }, { x: 45, y: 52 },
    { x: 15, y: 70 }, { x: 18, y: 25 }
  ];
  game.customers.forEach(c => {
    if (c.leaving || c.state !== "shopping" || Math.random() < 0.35) return;
    const el = document.querySelector(`.customer[data-id="${c.id}"]`);
    if (!el) return;
    const s = randomItem(spots);
    c.x = s.x; c.y = s.y;
    el.style.left = `${c.x}%`;
    el.style.top = `${c.y}%`;
  });
}

/* ---------- Spelets "tick" (varje sekund) ---------- */
function gameTick() {
  if (!game.running) return;
  const now = Date.now();

  game.customers.slice().forEach(c => {
    if (c.leaving) return;

    if (c.state === "shopping") {
      // Tålamod: ingen sänkning de första sekunderna
      if (now - c.enteredAt > CONFIG.patienceShop) {
        c.satisfaction -= CONFIG.shopDrain;
      }
      if (now >= c.shopUntil) enqueueCustomer(c);

    } else if (c.state === "queued") {
      const waitMs = now - c.queuedAt;
      if (waitMs > CONFIG.patienceQueue) {
        const extra = Math.min((waitMs - CONFIG.patienceQueue) / 60000, 1);
        c.satisfaction -= CONFIG.queueDrain +
          extra * (CONFIG.queueDrainMax - CONFIG.queueDrain);
      }

    } else if (c.state === "paying" && now >= c.payUntil) {
      finishPayment(c);
      return;
    }

    if (c.state !== "paying" && !c.leaving && c.satisfaction < CONFIG.leaveBelow) {
      leaveCustomer(c.id, "angry");
    }
  });

  processQueue();

  // Kön påverkar totala nöjdheten, mjukt och först vid längre kö
  const q = game.queue.length;
  if (q >= 5) game.customerSatisfaction -= (q - 4) * 0.03;
  else if (q <= 1) game.customerSatisfaction += 0.03;
  game.customerSatisfaction = clamp(game.customerSatisfaction);

  updateCustomerMoods();
  renderQueue();
  updateUI();
}

/* ---------- Kassa & FIFO-kö ---------- */
function cashierCount() {
  return Date.now() < game.extraCashierUntil ? 2 : 1;
}

function enqueueCustomer(c) {
  c.state = "queued";
  c.queuedAt = Date.now();
  game.queue.push(c.id);                 // FIFO: sist in i kön
  showToast("🧾", `${c.name} ställde sig i kassakön.`);
  layoutQueue();
}

/* Placerar kunderna i en rad vid kassan (kassan = nedre höger) */
function layoutQueue() {
  const place = (c, x, y, badge) => {
    const el = document.querySelector(`.customer[data-id="${c.id}"]`);
    if (!el) return;
    c.x = x; c.y = y;
    el.style.left = `${x}%`;
    el.style.top = `${y}%`;
    el.style.position = el.style.position || "";
    let b = el.querySelector(".queue-badge");
    if (badge === null) { if (b) b.remove(); return; }
    if (!b) { b = document.createElement("div"); b.className = "queue-badge"; el.appendChild(b); }
    b.textContent = badge;
  };
  game.customers.filter(c => c.state === "paying" && !c.leaving)
    .forEach((c, i) => place(c, 84 - i * 7, 62, "💳"));
  game.queue.forEach((id, i) => {
    const c = game.customers.find(x => x.id === id);
    if (c) place(c, 70 - i * 7, 62, i + 1);
  });
}

function processQueue() {
  let paying = game.customers.filter(c => c.state === "paying" && !c.leaving).length;
  while (paying < cashierCount() && game.queue.length > 0) {
    const id = game.queue.shift();       // kund 1 betjänas först, resten flyttas fram
    const c = game.customers.find(x => x.id === id);
    if (!c || c.leaving) continue;
    c.state = "paying";
    c.payUntil = Date.now() + randomNumber(CONFIG.payMin, CONFIG.payMax);
    paying++;
  }
  layoutQueue();
}

function finishPayment(c) {
  game.money += randomNumber(150, 400);
  game.sales += 1;
  // Nöjd kund höjer, missnöjd sänker totalen
  game.customerSatisfaction = clamp(game.customerSatisfaction + (c.satisfaction - 50) / 25);
  leaveCustomer(c.id, "paid");
}

function renderQueue() {
  const panel = getElement("queuePanel");
  if (!panel) return;
  const now = Date.now();

  const paying = game.customers.filter(c => c.state === "paying" && !c.leaving);
  const cards = [];

  paying.forEach(c => {
    const left = Math.max(0, Math.ceil((c.payUntil - now) / 1000));
    cards.push(`
      <div class="queue-card paying" data-queue-id="${c.id}">
        <div class="queue-spot">Kassa</div>
        <div class="queue-emoji">${getCustomerMood(c.satisfaction).emoji}</div>
        <div class="queue-info">
          <strong>${c.name}</strong><small>${c.type}</small>
          <small>Betjänas… ${left}s</small>
        </div>
      </div>`);
  });

  game.queue.forEach((id, i) => {
    const c = game.customers.find(x => x.id === id);
    if (!c) return;
    const wait = Math.floor((now - c.queuedAt) / 1000);
    cards.push(`
      <div class="queue-card" data-queue-id="${c.id}">
        <div class="queue-spot">${i + 1}</div>
        <div class="queue-emoji">${getCustomerMood(c.satisfaction).emoji}</div>
        <div class="queue-info">
          <strong>${c.name}</strong><small>${c.type}</small>
          <small>⏱ ${wait}s</small>
        </div>
      </div>`);
  });

  panel.innerHTML = `
    <div class="queue-title">🧾 Kassakö (${game.queue.length}) • Kassor: ${cashierCount()}</div>
    <div class="queue-list">${cards.join("") || '<div class="queue-empty">Ingen kö just nu</div>'}</div>`;
}

/* ---------- Kunder lämnar ---------- */
function updateCustomerMoods() {
  game.customers.forEach(c => {
    const icon = document.querySelector(`.customer[data-id="${c.id}"] .customer-icon`);
    if (icon) icon.textContent = getCustomerMood(c.satisfaction).emoji;
  });
}

function leaveCustomer(id, reason) {
  const c = game.customers.find(x => x.id === id);
  if (!c || c.leaving) return;
  c.leaving = true;
  game.queue = game.queue.filter(q => q !== id);   // köplatserna uppdateras automatiskt

  const el = document.querySelector(`.customer[data-id="${id}"]`);
  if (el) { el.style.opacity = "0"; el.style.transform = "scale(0.6)"; }

  if (reason === "angry") {
    showToast("😡", `${c.name} blev för missnöjd och lämnade butiken.`);
    game.customerSatisfaction = clamp(game.customerSatisfaction - 5);
  } else if (reason === "paid") {
    showToast("✅", `${c.name} har betalat och lämnar butiken.`);
  }

  setTimeout(() => removeCustomer(id), 400);
  layoutQueue();
  renderQueue();
  updateUI();
}

function removeCustomer(id) {
  const el = document.querySelector(`.customer[data-id="${id}"]`);
  if (el) el.remove();
  game.customers = game.customers.filter(c => c.id !== id);
  updateUI();
}

/* ---------- Kundinteraktion ---------- */
function getCustomerMessage(c) {
  const wait = c.queuedAt ? Math.floor((Date.now() - c.queuedAt) / 1000) : 0;
  const pos = game.queue.indexOf(c.id) + 1;

  if (c.state === "paying") return "Tack, det går snabbt här!";
  if (c.state === "queued") {
    if (c.satisfaction < 28) return `Jag har stått här i ${wait} sekunder! Det här är löjligt!`;
    if (c.satisfaction < 40) return `Jag är nummer ${pos} i kön och det går så långsamt…`;
    if (c.type === "Stressad" || c.type === "Snabb kund") return "Jag har verkligen bråttom. Kan ni öppna fler kassor?";
    if (c.type === "Familj") return "Barnen börjar bli otåliga. Hur lång tid tar det?";
    if (c.type === "Prisfokuserad") return "Jag hoppas att priset i kassan stämmer med hyllan.";
    return `Jag står som nummer ${pos} i kön. Tack för att ni fixar det!`;
  }
  if (c.satisfaction < 28) return "Jag är verkligen missnöjd. Det här fungerar inte alls.";
  if (c.satisfaction < 45) return "Jag börjar bli frustrerad. Kan någon hjälpa mig?";
  if (c.type === "Stressad") return "Jag har bråttom. Kan du hjälpa mig snabbt?";
  if (c.type === "Nyfiken") return "Jag letar efter något men vet inte riktigt vad.";
  if (c.type === "Prisfokuserad") return "Finns den här produkten billigare någonstans?";
  if (c.type === "Van kund") return "Hej igen! Har ni fått in något nytt?";
  if (c.type === "Ny kund") return "Det är första gången jag är här. Kan du visa mig runt?";
  if (c.type === "Familj") return "Vi handlar för hela familjen. Har ni några bra erbjudanden?";
  if (c.type === "Pratsam kund") return "Härlig butik! Jag har faktiskt en fråga…";
  return "Hej! Kan du hjälpa mig?";
}

function openCustomer(c) {
  if (c.leaving) return;
  const mood = getCustomerMood(c.satisfaction);
  const status = c.state === "queued"
    ? `I kön (plats ${game.queue.indexOf(c.id) + 1})`
    : c.state === "paying" ? "Betalar i kassan" : "Handlar i butiken";

  openModal(`
    <div class="modal-icon">${mood.emoji}</div>
    <span class="small-label">KUND • ${c.type.toUpperCase()}</span>
    <h2>${c.name}</h2>
    <p>${getCustomerMessage(c)}</p>
    <p style="margin-top:10px;font-size:13px;">
      ${status} • Kundnöjdhet: <strong>${Math.round(c.satisfaction)}%</strong>
    </p>
    <div class="modal-options">
      <button class="modal-option" data-customer-action="listen"><strong>👂 Lyssna och fråga</strong><small>Ta reda på vad kunden faktiskt behöver.</small></button>
      <button class="modal-option" data-customer-action="recommend"><strong>💡 Ge en rekommendation</strong><small>Försök hitta en produkt eller lösning.</small></button>
      <button class="modal-option" data-customer-action="wait"><strong>⏳ Be kunden vänta</strong><small>Du prioriterar ett annat problem just nu.</small></button>
      <button class="modal-option" data-customer-action="ignore"><strong>🚶 Gå vidare</strong><small>Du väljer att inte hjälpa kunden just nu.</small></button>
    </div>`);

  document.querySelectorAll("[data-customer-action]").forEach(b =>
    b.addEventListener("click", () => handleCustomerAction(c, b.dataset.customerAction))
  );
}

function handleCustomerAction(c, action) {
  if (c.leaving) return;
  const up = (v, n) => Math.min(100, v + n);
  const down = (v, n) => Math.max(0, v - n);

  if (action === "listen") {
    c.satisfaction = up(c.satisfaction, 10);
    game.customerSatisfaction = up(game.customerSatisfaction, 6);
    game.sales += 2;
    showToast("😊", `${c.name} känner sig lyssnad på.`);
  } else if (action === "recommend") {
    c.satisfaction = up(c.satisfaction, 7);
    game.customerSatisfaction = up(game.customerSatisfaction, 4);
    game.sales += 5; game.money += 120;
    showToast("💡", `${c.name} fick hjälp med sitt köp.`);
  } else if (action === "wait") {
    c.satisfaction = down(c.satisfaction, 6);
    game.customerSatisfaction = down(game.customerSatisfaction, 3);
    showToast("😐", `${c.name} får vänta.`);
  } else if (action === "ignore") {
    c.satisfaction = down(c.satisfaction, 10);
    game.customerSatisfaction = down(game.customerSatisfaction, 5);
    showToast("😠", `${c.name} känner sig ignorerad.`);
  }

  closeModal();
  updateCustomerMoods();
  renderQueue();
  updateUI();
}

/* ---------- Händelser ---------- */
const events = [
  { id: 1, title: "Kunden hittar inte sin vara", icon: "🔎", type: "customer",
    message: "En kund går runt i butiken och letar efter något. Kunden verkar osäker.",
    rubric: { categories: {
      customer: ["kund","kunden"],
      listen: ["fråga","frågar","lyssna","lyssnar","prata","frågar vad"],
      help: ["hjälpa","hjälp","visa","följa","följer"],
      improvement: ["skylt","skyltning","exponering","placering","information"] } } },
  { id: 2, title: "Kön växer", icon: "🧾", type: "checkout",
    message: "Det börjar bli kö vid kassan. Flera kunder väntar.",
    rubric: { categories: {
      queue: ["kö","kön","väntar","väntetid"],
      staff: ["personal","medarbetare","anställd","kollega"],
      solution: ["öppna","kassa","självscanning","självscanna","hjälpa"] } } },
  { id: 3, title: "Fel pris på hyllan", icon: "💰", type: "price",
    message: "En kund säger att priset på hyllan inte stämmer med priset i kassan.",
    rubric: { categories: {
      check: ["kontrollera","undersöka","kolla","kontroll"],
      customer: ["kund","kunden","förklara","prata"],
      price: ["pris","priset","skylt","kassa"] } } },
  { id: 4, title: "En populär produkt håller på att ta slut", icon: "📦", type: "stock",
    message: "Flera kunder frågar efter samma produkt. Lagret börjar bli lågt.",
    rubric: { categories: {
      stock: ["lager","lagret","vara","produkt"],
      order: ["beställa","beställer","leverans","leverantör"],
      alternative: ["alternativ","annan","ersätta","ersättare"] } } },
  { id: 5, title: "En missnöjd kund", icon: "😠", type: "service",
    message: "En kund är missnöjd och vill prata med någon som ansvarar för butiken.",
    rubric: { categories: {
      listen: ["lyssna","lyssnar","höra","förstå"],
      apology: ["ursäkt","förlåt","beklagar"],
      solution: ["lösning","lösa","hjälpa","ersätta","kompensera"] } } },
  { id: 6, title: "En oväntad möjlighet", icon: "🤝", type: "opportunity",
    message: "En lokal förening frågar om butiken vill samarbeta med ett event.",
    rubric: { categories: {
      cooperation: ["samarbete","samarbeta","förening","event"],
      marketing: ["marknadsföring","reklam","sociala medier","synas"],
      economy: ["pengar","kostnad","ekonomi","budget"] } } }
];

function triggerEvent(event) {
  if (!game.running || game.activeProblems.length > 0) return;
  game.activeProblems.push(event);
  updateProblemList();
  if (alertIndicator) alertIndicator.classList.remove("hidden");
  if (eventBanner) eventBanner.classList.remove("hidden");
  setText("eventTitle", event.title);
  setText("eventMessage", event.message);
  setTimeout(() => game.running && openEvent(event), 800);
}

function openEvent(event) {
  openModal(`
    <div class="modal-icon">${event.icon}</div>
    <span class="small-label">🚨 HÄNDELSE</span>
    <h2>${event.title}</h2>
    <p>${event.message}</p>
    <div class="modal-options">
      <button class="modal-option" data-event-action="own"><strong>💡 Min egen lösning</strong><small>Tänk själv och bestäm vad du vill göra.</small></button>
      <button class="modal-option" data-event-action="investigate"><strong>🔎 Undersök först</strong><small>Ta reda på mer innan du bestämmer dig.</small></button>
      <button class="modal-option" data-event-action="quick"><strong>⚡ Lösa snabbt</strong><small>Fatta ett beslut direkt.</small></button>
    </div>`);

  document.querySelectorAll("[data-event-action]").forEach(b =>
    b.addEventListener("click", () => {
      const a = b.dataset.eventAction;
      if (a === "own") openCreativeDecision(event);
      else if (a === "investigate") investigateEvent(event);
      else if (a === "quick") quickDecision(event);
    })
  );
}

function openCreativeDecision(event) {
  const label = "display:block;color:#1E3F2F;font-weight:700;margin-bottom:6px;";
  openModal(`
    <div class="modal-icon">💡</div>
    <span class="small-label">TÄNK SJÄLV</span>
    <h2>${event.title}</h2>
    <p>Det finns inget exakt facit. Beskriv en lösning som faktiskt kan fungera i situationen.</p>
    <label style="${label}">Vad gör du?</label>
    <textarea id="creativeAction" class="modal-textarea" placeholder="Jag skulle..."></textarea><br>
    <label style="${label}">Varför väljer du detta?</label>
    <textarea id="creativeReason" class="modal-textarea" placeholder="Jag väljer detta eftersom..."></textarea><br>
    <button id="submitCreative" class="primary-button">Genomför min lösning</button>`);

  const submit = getElement("submitCreative");
  if (submit) submit.addEventListener("click", () => evaluateCreativeSolution(event));
}

function evaluateCreativeSolution(event) {
  const a = getElement("creativeAction"), r = getElement("creativeReason");
  if (!a || !r) return;
  const action = a.value.trim().toLowerCase();
  const reason = r.value.trim().toLowerCase();

  if (action.length < 15 || reason.length < 15) return showCreativeFeedback("tooShort", []);

  const combined = `${action} ${reason}`;
  const irrelevant = ["jag går hem","gå hem","går hem","jag sover","jag spelar","jag äter",
    "jag går till skolan","jag lämnar butiken","jag lämnar","vet inte","ingen aning","haha","lol","asdf","qwerty"];
  if (containsAny(combined, irrelevant)) return showCreativeFeedback("irrelevant", []);

  let points = 0;
  const matched = [];
  Object.entries(event.rubric.categories).forEach(([cat, kw]) => {
    if (containsAny(combined, kw)) { points++; matched.push(cat); }
  });
  if (action.length >= 60) points++;
  if (reason.length >= 50) points++;
  if (matched.length === 0) return showCreativeFeedback("notRelevant", []);

  const level = points >= 4 ? "strong" : points >= 2 ? "medium" : "develop";
  applyCreativeConsequences(event, level);
  showCreativeFeedback(level, matched);
}

function applyCreativeConsequences(event, level) {
  const add = { strong: [8, 5, 4], medium: [4, 3, 0], develop: [1, 0, 0] }[level];
  game.customerSatisfaction = Math.min(100, game.customerSatisfaction + add[0]);
  game.sales += add[1];
  game.sustainability = Math.min(100, game.sustainability + add[2]);
  if (event.type === "price") game.money -= 50;
  if (event.type === "opportunity") game.money -= 100;
  if (event.type === "checkout" && level !== "develop") game.extraCashierUntil = Date.now() + 30000;
  updateUI();
}

function showCreativeFeedback(level, matched) {
  const map = {
    strong:      ["🌟", "Genomtänkt lösning", "Din lösning tar hänsyn till situationen och flera delar som påverkar kunden eller butiken."],
    medium:      ["👍", "Möjlig lösning", "Din idé kan fungera. Fundera på vilka konsekvenser lösningen får för kunden och butiken."],
    develop:     ["🧠", "Du är på rätt väg", "Din lösning har en koppling till problemet, men fundera på hur du kan utveckla den."],
    tooShort:    ["✏️", "Utveckla din idé", "Skriv lite mer. Beskriv både vad du skulle göra och varför du tror att det skulle fungera."],
    irrelevant:  ["🤔", "Det löser inte problemet", "Din lösning verkar inte hjälpa till att lösa situationen i butiken."],
    notRelevant: ["🔎", "Försök igen", "Jag hittar ingen tydlig koppling mellan din lösning och problemet."]
  };
  const [icon, title, message] = map[level];
  const areas = matched.length
    ? `<p style="margin-top:12px;font-size:13px;"><strong>Din lösning berörde:</strong> ${matched.join(", ")}</p>` : "";

  openModal(`
    <div class="modal-icon">${icon}</div>
    <span class="small-label">DIN LÖSNING</span>
    <h2>${title}</h2><p>${message}</p>${areas}
    <button id="continueAfterCreative" class="primary-button">Fortsätt</button>`);

  const btn = getElement("continueAfterCreative");
  if (btn) btn.addEventListener("click", () => {
    closeModal();
    if (["irrelevant", "notRelevant", "tooShort"].includes(level)) {
      showToast("🔎", "Problemet finns fortfarande kvar. Försök igen.");
      setTimeout(() => game.activeProblems.length > 0 && openEvent(game.activeProblems[0]), 700);
      return;
    }
    solveCurrentProblem();
  });
}

function investigateEvent(event) {
  let content;
  if (event.type === "customer") {
    content = `<div class="modal-icon">🔎</div><span class="small-label">UNDERSÖK</span><h2>Titta närmare</h2>
      <p>Du observerar kunden och ser att skyltningen på en avdelning inte är särskilt tydlig.</p>`;
  } else if (event.type === "checkout") {
    content = `<div class="modal-icon">🧾</div><span class="small-label">UNDERSÖK</span><h2>Kassan just nu</h2>
      <p>Det står ${game.queue.length} kund(er) i kön och ${cashierCount()} kassa är öppen.</p>`;
  } else if (event.type === "stock") {
    content = `<div class="modal-icon">📦</div><span class="small-label">LAGER</span><h2>Kontrollera lagret</h2>
      <p>Du går till lagret för att se hur mycket som finns kvar.</p>
      <div class="modal-options">
        <div class="modal-option"><strong>Populär produkt</strong><small>${game.stock.popular}% kvar</small></div>
        <div class="modal-option"><strong>Kaffe</strong><small>${game.stock.coffee}% kvar</small></div>
        <div class="modal-option"><strong>Mjölk</strong><small>${game.stock.milk}% kvar</small></div>
      </div>`;
  } else {
    content = `<div class="modal-icon">🔎</div><span class="small-label">UNDERSÖK</span><h2>Du tittar närmare</h2>
      <p>Du tar dig tid att förstå situationen innan du fattar ett beslut.</p>`;
  }
  content += `<br><button id="finishInvestigation" class="primary-button">Jag har undersökt</button>`;
  openModal(content);

  const btn = getElement("finishInvestigation");
  if (btn) btn.addEventListener("click", () => {
    closeModal();
    game.customerSatisfaction = Math.min(100, game.customerSatisfaction + 2);
    updateUI();
    setTimeout(() => openCreativeDecision(event), 400);
  });
}

function quickDecision(event) {
  const penalty = event.type === "customer" ? 4 : event.type === "checkout" ? 5 : 3;
  game.customerSatisfaction = Math.max(0, game.customerSatisfaction - penalty);
  game.sales += 1;
  closeModal();
  updateUI();
  showToast("⚡", "Du fattade ett snabbt beslut.");
  setTimeout(solveCurrentProblem, 1200);
}

function solveCurrentProblem() {
  if (game.activeProblems.length === 0) return;
  game.activeProblems.shift();
  game.problemsSolved++;
  updateProblemList();
  if (alertIndicator) alertIndicator.classList.add("hidden");
  if (eventBanner) eventBanner.classList.add("hidden");
  updateUI();

  if (game.problemsSolved >= game.totalProblems) {
    showToast("🏪", "Arbetsdagen är slut.");
    setTimeout(finishGame, 2000);
    return;
  }
  scheduleNextEvent();
}

function scheduleNextEvent() {
  showToast("🕘", "Butiken fortsätter. Nästa händelse kommer snart.");
  game.timers.nextEvent = setTimeout(() => {
    if (!game.running) return;
    triggerEvent(events[game.problemsSolved % events.length]);
  }, randomNumber(CONFIG.eventMin, CONFIG.eventMax));
}

function updateProblemList() {
  if (!problemList) return;
  problemList.innerHTML = game.activeProblems.length === 0
    ? `<div class="empty-problems">✓ Inga akuta problem</div>`
    : game.activeProblems.map(p => `<div class="problem-item">🚨 ${p.title}</div>`).join("");
}

/* ---------- Zoner ---------- */
document.querySelectorAll(".store-zone").forEach(z =>
  z.addEventListener("click", () => openZone(z.dataset.zone))
);

function openZone(zone) {
  const data = {
    entrance: ["🚪", "Entrén", "Här kommer kunderna in. En tydlig entré hjälper kunden att förstå butiken."],
    products: ["🛒", "Produkter", "Här kan du kontrollera sortiment och hur produkterna exponeras."],
    clothes:  ["🎨", "Avdelning", "Exponeringen påverkar vad kunden ser och vilka produkter som får uppmärksamhet."],
    checkout: ["🧾", "Kassa", `Just nu står ${game.queue.length} kund(er) i kön. Väntetid och service påverkar kundens sista intryck.`]
  };
  if (zone === "stock") return openStockModal();
  const s = data[zone];
  if (!s) return;
  openModal(`
    <div class="modal-icon">${s[0]}</div><span class="small-label">BUTIKEN</span>
    <h2>${s[1]}</h2><p>${s[2]}</p>
    <button id="closeZone" class="primary-button">Fortsätt</button>`);
  const b = getElement("closeZone");
  if (b) b.addEventListener("click", closeModal);
}

function openStockModal() {
  const row = (n, v) => `<div class="modal-option"><strong>${n}</strong><small>${v}% kvar</small></div>`;
  openModal(`
    <div class="modal-icon">📦</div><span class="small-label">LAGER</span>
    <h2>Lagerstatus</h2><p>Du undersöker butikens lager.</p>
    <div class="modal-options">
      ${row("🥫 Populär produkt", game.stock.popular)}${row("☕ Kaffe", game.stock.coffee)}
      ${row("🥛 Mjölk", game.stock.milk)}${row("🍞 Bröd", game.stock.bread)}${row("🧃 Juice", game.stock.juice)}
    </div><br>
    <button id="closeStock" class="primary-button">Tillbaka till butiken</button>`);
  const b = getElement("closeStock");
  if (b) b.addEventListener("click", closeModal);
}

/* ---------- Personal ---------- */
function useStaff(staff) {
  staff.energy = Math.max(0, staff.energy - 10);
  game.customerSatisfaction = Math.min(100, game.customerSatisfaction + 3);
  closeModal();
  updateUI();
  showToast("👥", `${staff.name} hjälper till.`);
}

document.querySelectorAll(".staff-member").forEach(m =>
  m.addEventListener("click", () => openStaffMember(m.dataset.staff))
);

function openStaffMember(id) {
  const staff = game.staff[id];
  if (!staff) return;
  openModal(`
    <div class="modal-icon">👤</div><span class="small-label">PERSONAL</span>
    <h2>${staff.name}</h2><p>Roll: ${staff.role}</p>
    <div class="modal-option"><strong>Energi</strong><small>${staff.energy}%</small></div><br>
    <button id="assignStaff" class="primary-button">Be ${staff.name} hjälpa till</button>`);
  const b = getElement("assignStaff");
  if (b) b.addEventListener("click", () => {
    useStaff(staff);
    // Personal i kassan kortar nästa betjäning
    game.customers.filter(c => c.state === "paying").forEach(c => (c.payUntil -= 2000));
  });
}

function openStaffSelection() {
  openModal(`
    <div class="modal-icon">👥</div><span class="small-label">PERSONAL</span>
    <h2>Vem vill du använda?</h2><p>Varje medarbetare har olika styrkor.</p>
    <div class="modal-options">
      ${Object.entries(game.staff).map(([id, s]) => `
        <button class="modal-option" data-pick-staff="${id}">
          <strong>👤 ${s.name}</strong><small>${s.role} • Energi ${s.energy}%</small>
        </button>`).join("")}
    </div>`);
  document.querySelectorAll("[data-pick-staff]").forEach(b =>
    b.addEventListener("click", () => {
      const s = game.staff[b.dataset.pickStaff];
      if (s) useStaff(s);
    })
  );
}

/* ---------- Verktyg ---------- */
document.querySelectorAll(".tool-button").forEach(b =>
  b.addEventListener("click", () => handleTool(b.dataset.action))
);

function handleTool(action) {
  switch (action) {
    case "helpCustomer": {
      // Hjälp den mest missnöjda kunden (i kön eller i butiken)
      const c = game.customers
        .filter(x => !x.leaving && x.state !== "paying" && x.satisfaction < 60)
        .sort((a, b) => a.satisfaction - b.satisfaction)[0];
      if (c) openCustomer(c);
      else showToast("😊", "Alla kunder verkar vara ganska nöjda just nu.");
      break;
    }
    case "openCheckout":
      game.extraCashierUntil = Date.now() + 40000;   // 2 kassor i 40 sekunder
      game.sales += 2;
      showToast("🧾", "Du öppnade en extra kassa i 40 sekunder.");
      processQueue(); renderQueue(); updateUI();
      break;
    case "checkStock": openStockModal(); break;
    case "changeDisplay":
      game.customerSatisfaction = Math.min(100, game.customerSatisfaction + 3);
      game.sales += 4;
      showToast("🎨", "Du förbättrade exponeringen.");
      updateUI();
      break;
    case "callStaff": openStaffSelection(); break;
    case "creative":
      if (game.activeProblems.length > 0) openCreativeDecision(game.activeProblems[0]);
      else showToast("💡", "Det finns inget akut problem just nu.");
      break;
  }
}

/* ---------- UI ---------- */
function updateUI() {
  setText("moneyText", `${game.money.toLocaleString("sv-SE")} kr`);
  setText("customerText", Math.round(clamp(game.customerSatisfaction)));
  setText("salesText", Math.round(clamp(game.sales)));
  setText("sustainabilityText", Math.round(clamp(game.sustainability)));
  setText("dayText", "Arbetsdag");
  setText("timeText", `${String(game.hour).padStart(2, "0")}:${String(game.minutes).padStart(2, "0")}`);
  setText("problemsSolvedText", `${game.problemsSolved}/${game.totalProblems}`);
  setText("activeCustomersText", game.customers.length);
  setText("totalCustomersText", game.totalCustomersCreated);
}

/* ---------- Slut & resultat ---------- */
function finishGame() {
  game.running = false;
  clearAllTimers();
  if (eventBanner) eventBanner.classList.add("hidden");
  if (alertIndicator) alertIndicator.classList.add("hidden");
  calculateResult();
  showScreen(resultScreen);
}

function calculateResult() {
  const customer = clamp(game.customerSatisfaction);
  const sales = clamp(game.sales);
  const sust = clamp(game.sustainability);
  const avg = (customer + sales + sust) / 3;

  setText("finalMoney", `${game.money.toLocaleString("sv-SE")} kr`);
  setText("finalCustomer", `${Math.round(customer)}%`);
  setText("finalSales", `${Math.round(sales)}`);
  setText("finalSustainability", `${Math.round(sust)}%`);

  let r;
  if (avg >= 85) r = ["🌟", "Butiksdagen blev riktigt lyckad!", "Du hanterade problemen, tänkte på kunderna och tog beslut som påverkade butiken positivt."];
  else if (avg >= 70) r = ["👏", "Butiken klarade arbetsdagen!", "Du löste dagens problem och anpassade dig när nya situationer uppstod."];
  else if (avg >= 50) r = ["🧠", "Butiken klarade sig – men det finns saker att utveckla.", "Några beslut fungerade, medan andra skapade nya problem."];
  else r = ["🔎", "Butiken hade en tuff arbetsdag.", "Kunderna blev missnöjda och flera delar av butiken behöver utvecklas."];

  setText("resultEmoji", r[0]);
  setText("resultTitle", r[1]);
  setText("resultText", r[2]);
}

/* ---------- Modal & toast ---------- */
function openModal(content) {
  if (!modal || !modalContent) return;
  modalContent.innerHTML = content;
  modal.classList.remove("hidden");
}
function closeModal() { if (modal) modal.classList.add("hidden"); }

const closeModalButton = getElement("closeModal");
if (closeModalButton) closeModalButton.addEventListener("click", closeModal);
if (modal) modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });

let toastTimer = null;
function showToast(icon, message) {
  if (!toast) return;
  setText("toastIcon", icon);
  setText("toastText", message);
  toast.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add("hidden"), 3500);
}

/* ---------- Reflektion & omstart ---------- */
const saveReflectionBtn = getElement("saveReflectionBtn");
if (saveReflectionBtn) saveReflectionBtn.addEventListener("click", () => {
  const input = getElement("reflectionInput");
  if (!input) return;
  if (!input.value.trim()) return showToast("💭", "Skriv din reflektion först.");
  const saved = getElement("reflectionSaved");
  if (saved) saved.classList.remove("hidden");
  showToast("✓", "Din reflektion är sparad.");
});

const restartBtn = getElement("restartBtn");
if (restartBtn) restartBtn.addEventListener("click", () => {
  clearAllTimers();
  game.running = false;
  showScreen(startScreen);
});