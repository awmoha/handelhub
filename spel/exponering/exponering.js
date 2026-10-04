/* BYGG SKYLTFÖNSTRET – Exponering
   Uppdrag -> planera -> bygg (dra och släpp, egen rubrik, färger, ljus) -> granskning */

const WALLS = [
  ["#F4F1EA", "Vit"], ["#E6D8BE", "Beige"], ["#E8A25C", "Orange"], ["#8B6B4A", "Brun"], ["#F0D36B", "Gul"],
  ["#6E9A74", "Grön"], ["#2F5D45", "Mörkgrön"], ["#4FB3B3", "Turkos"], ["#8FBFE0", "Ljusblå"], ["#3F78B5", "Blå"],
  ["#8E6BB0", "Lila"], ["#E8B4C0", "Rosa"], ["#C0392B", "Röd"], ["#A9A9A9", "Grå"], ["#2B2B2B", "Svart"]
];
const FLOORS = [["#B79B7A", "Trä"], ["#8A8A8A", "Betong"], ["#EDEDED", "Vitt"], ["#3B3B3B", "Svart"], ["#7A5C3E", "Mörkt trä"]];
const SIGN_COLORS = ["#FFFFFF", "#1E3F2F", "#F0D36B", "#E8B4C0", "#6FA3D4", "#C0392B", "#2B2B2B"];

const LIGHTS = [
  { k: "off", n: "Ingen extra", cost: 0, bg: "none" },
  { k: "warm", n: "Varmt ljus", cost: 40, bg: "radial-gradient(ellipse at 50% 20%,rgba(255,200,110,.55),rgba(255,200,110,0) 70%)" },
  { k: "cool", n: "Kallt ljus", cost: 40, bg: "radial-gradient(ellipse at 50% 20%,rgba(190,225,255,.55),rgba(190,225,255,0) 70%)" },
  { k: "spot", n: "Spotlight", cost: 80, bg: "radial-gradient(circle at 50% 55%,rgba(255,255,230,.6),rgba(0,0,0,.18) 75%)" }
];

/* tags = uppdrag som saken passar. col = färgfamilj. eco = återbruk/naturligt */
const ITEMS = [
  { id: "jacka", e: "🧥", n: "Jacka", cost: 150, time: 10, col: "brun", tags: ["host"], px: 74 },
  { id: "skor", e: "👟", n: "Skor", cost: 120, time: 6, col: "vit", tags: ["host", "sommar"], px: 44 },
  { id: "ryggsack", e: "🎒", n: "Ryggsäck", cost: 100, time: 6, col: "orange", tags: ["host"], px: 56 },
  { id: "halsduk", e: "🧣", n: "Halsduk", cost: 60, time: 5, col: "orange", tags: ["host"], px: 50 },
  { id: "lov", e: "🍂", n: "Höstlöv", cost: 10, time: 4, col: "orange", tags: ["host"], px: 40, eco: true },
  { id: "lonn", e: "🍁", n: "Lönnlöv", cost: 10, time: 3, col: "röd", tags: ["host"], px: 40, eco: true },
  { id: "applen", e: "🍎", n: "Äpplen", cost: 25, time: 3, col: "röd", tags: ["host"], px: 42, eco: true },
  { id: "pumpa", e: "🎃", n: "Pumpa", cost: 30, time: 4, col: "orange", tags: ["host"], px: 52, eco: true },
  { id: "blommor", e: "🌸", n: "Blommor", cost: 40, time: 4, col: "rosa", tags: ["mors"], px: 44, eco: true },
  { id: "tulpan", e: "🌷", n: "Tulpaner", cost: 45, time: 4, col: "rosa", tags: ["mors"], px: 46, eco: true },
  { id: "lila", e: "🪻", n: "Lila blommor", cost: 45, time: 4, col: "lila", tags: ["mors"], px: 46, eco: true },
  { id: "bukett", e: "💐", n: "Bukett", cost: 90, time: 6, col: "rosa", tags: ["mors"], px: 70 },
  { id: "present", e: "🎁", n: "Present", cost: 50, time: 5, col: "rosa", tags: ["mors"], px: 56 },
  { id: "rosett", e: "🎀", n: "Rosett", cost: 20, time: 3, col: "rosa", tags: ["mors"], px: 40 },
  { id: "ljus", e: "🕯️", n: "Ljus", cost: 30, time: 3, col: "gul", tags: ["host", "mors"], px: 40 },
  { id: "pall", e: "🪑", n: "Pall (återbruk)", cost: 0, time: 5, col: "brun", tags: ["host", "mors", "sommar"], px: 66, eco: true },
  { id: "vaxt", e: "🪴", n: "Växt", cost: 35, time: 4, col: "grön", tags: ["mors", "host"], px: 56, eco: true },
  { id: "kvist", e: "🌿", n: "Kvistar", cost: 0, time: 3, col: "grön", tags: ["mors", "host"], px: 42, eco: true },
  { id: "boll", e: "⚽", n: "Boll", cost: 80, time: 4, col: "vit", tags: ["sommar"], px: 46 },
  { id: "volley", e: "🏐", n: "Volleyboll", cost: 70, time: 4, col: "gul", tags: ["sommar"], px: 46 },
  { id: "glasogon", e: "🕶️", n: "Solglasögon", cost: 70, time: 4, col: "svart", tags: ["sommar"], px: 40 },
  { id: "parasoll", e: "⛱️", n: "Parasoll", cost: 110, time: 8, col: "blå", tags: ["sommar"], px: 80 },
  { id: "tofflor", e: "🩴", n: "Flip-flops", cost: 50, time: 4, col: "blå", tags: ["sommar"], px: 42 },
  { id: "keps", e: "🧢", n: "Keps", cost: 55, time: 4, col: "blå", tags: ["sommar"], px: 44 },
  { id: "snacka", e: "🐚", n: "Snäckor", cost: 0, time: 3, col: "vit", tags: ["sommar"], px: 38, eco: true },
  { id: "hatt", e: "👒", n: "Solhatt", cost: 60, time: 4, col: "gul", tags: ["sommar", "mors"], px: 50 },
  { id: "solros", e: "🌻", n: "Solros", cost: 25, time: 3, col: "gul", tags: ["sommar", "mors"], px: 46, eco: true },
  { id: "pris", e: "🏷️", n: "Prisskylt", cost: 15, time: 3, col: "gul", tags: ["host", "mors", "sommar"], px: 40, price: true }
];

/* keys = ord som visar att rubriken passar. wrong = ord som inte passar uppdraget */
const BRIEFS = [
  { id: "host", butik: "Klädbutik", titel: "Höstkampanj", mal: "Ungdomar 15–25 år", budskap: "Nytt för hösten", budget: 700, tid: 70,
    pal: ["orange", "brun", "grön", "röd"], light: ["warm", "spot"], needPrice: false,
    keys: ["höst", "nyhet", "nytt", "ny ", "favorit", "kollektion", "trend"], wrong: ["sommar", "jul", "semester", "vår"],
    pass: [["🧑", "Ungdom: Snygga färger! Jag går in."], ["👩", "Förälder: Det ser mysigt ut."], ["🧓", "Äldre kund: Fint, men jag vet inte vad som säljs."]] },
  { id: "mors", butik: "Blomsterbutik", titel: "Mors dag", mal: "Vuxna som vill ge present", budskap: "Säg tack med blommor", budget: 500, tid: 60,
    pal: ["rosa", "vit", "grön", "lila"], light: ["warm"], needPrice: false,
    keys: ["mors", "mamma", "tack", "blomm", "present", "bukett", "kärlek"], wrong: ["däck", "svart fredag", "rea", "höst"],
    pass: [["👨", "Man: Perfekt, jag köper en bukett."], ["👩", "Kvinna: Så vackert fönster!"], ["🧑", "Tonåring: Vad är det för present?"]] },
  { id: "sommar", butik: "Sportbutik", titel: "Sommarerbjudande", mal: "Familjer och unga", budskap: "Sommar –30 %", budget: 800, tid: 80,
    pal: ["blå", "gul", "vit", "turkos"], light: ["cool", "spot"], needPrice: true,
    keys: ["sommar", "sol", "rea", "%", "30", "erbjudande", "kampanj"], wrong: ["höst", "vinter", "jul"],
    pass: [["👨‍👩‍👧", "Familj: Rea! Vi går in."], ["🧑", "Ung: Coola grejer."], ["👵", "Äldre: Vad kostar det?"]] }
];

const $ = id => document.getElementById(id);
const clamp = (v, a = 0, b = 100) => Math.max(a, Math.min(b, v));
const shuffle = a => a.map(v => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map(x => x[1]);

/* ---------- Färghjälp ---------- */
function hexToHsl(hex) {
  const n = parseInt(hex.slice(1), 16), r = (n >> 16) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
  let h = 0, s = 0;
  if (d) {
    s = d / (1 - Math.abs(2 * l - 1));
    h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h = (h * 60 + 360) % 360;
  }
  return { h, s, l };
}
function familyOf(hex) {
  const { h, s, l } = hexToHsl(hex);
  if (l < 0.14) return "svart";
  if (l > 0.86 && s < 0.5) return "vit";
  if (s < 0.15) return "grå";
  if (h < 15 || h >= 345) return l > 0.7 ? "rosa" : "röd";
  if (h < 45) return l < 0.4 ? "brun" : "orange";
  if (h < 70) return "gul";
  if (h < 165) return "grön";
  if (h < 200) return "turkos";
  if (h < 255) return "blå";
  if (h < 295) return "lila";
  return "rosa";
}
function textOn(hex) {
  const n = parseInt(hex.slice(1), 16);
  const lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return lum > 0.6 ? "#1E3F2F" : "#FFFFFF";
}

/* ---------- Rubrik: pris ---------- */
const headCost = len => (len ? 20 + 4 * len : 0);
const headTime = len => (len ? 5 + Math.ceil(len / 10) : 0);

let S = null;

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  $(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startGame() {
  const name = $("name").value.trim();
  if (!name) { $("name").focus(); $("name").style.borderColor = "#9A5B50"; return; }
  S = { name, brief: BRIEFS[Math.floor(Math.random() * BRIEFS.length)], wall: "#F4F1EA", floor: "#B79B7A", light: "off",
    headText: "", signBg: "#FFFFFF", placed: [], sel: null, uid: 0, night: false };
  setupBuild();
  showScreen("s-build");
}

function setupBuild() {
  const b = S.brief;
  $("bTitle").textContent = `Uppdrag: ${b.titel} i ${b.butik.toLowerCase()}`;
  $("brief").innerHTML = [["Butik", b.butik], ["Målgrupp", b.mal], ["Budskap", b.budskap], ["Budget", b.budget + " kr"], ["Tid", b.tid + " min"], ["Tips", b.needPrice ? "Visa priset!" : "Välj färger som passar"]]
    .map(([k, v]) => `<div><b>${k}</b>${v}</div>`).join("");

  $("walls").innerHTML = WALLS.map(([c, n]) => `<div class="sw" title="${n}" data-c="${c}" style="background:${c}"></div>`).join("");
  $("floors").innerHTML = FLOORS.map(([c, n]) => `<div class="sw" title="${n}" data-c="${c}" style="background:${c}"></div>`).join("");
  $("signColors").innerHTML = SIGN_COLORS.map(c => `<div class="sw" data-c="${c}" style="background:${c}"></div>`).join("");
  $("lights").innerHTML = LIGHTS.map(l => `<button class="chip" data-k="${l.k}">${l.n}${l.cost ? ` (${l.cost} kr)` : ""}</button>`).join("");
  $("tray").innerHTML = ITEMS.map(it => `<div class="tr" data-id="${it.id}"><span>${it.e}</span><b style="font-size:14px">${it.n}</b><small>${it.cost} kr · ${it.time} min</small></div>`).join("");
  $("headText").value = "";
  $("wallPick").value = S.wall;
  $("items").innerHTML = "";
  $("win").classList.remove("night");
  $("nightBtn").textContent = "🌙 Se fönstret på kvällen";
  applyScene();
  updateMeters();
  renderTools();
}

function applyScene() {
  $("win").style.background = S.wall;
  $("floor").style.background = S.floor;
  $("light").style.background = LIGHTS.find(l => l.k === S.light).bg;

  const sign = $("sign"), t = S.headText.trim();
  if (!t) sign.style.display = "none";
  else {
    sign.style.display = "block";
    sign.textContent = t;
    sign.style.background = S.signBg;
    sign.style.color = textOn(S.signBg);
    sign.style.fontSize = (t.length > 30 ? 15 : t.length > 20 ? 17 : 20) + "px";
  }
  const mark = (id, val) => document.querySelectorAll(`#${id} .sw`).forEach(e => e.classList.toggle("on", e.dataset.c.toLowerCase() === val.toLowerCase()));
  mark("walls", S.wall); mark("floors", S.floor); mark("signColors", S.signBg);
  document.querySelectorAll("#lights .chip").forEach(e => e.classList.toggle("on", e.dataset.k === S.light));

  const len = t.length;
  $("headInfo").textContent = len
    ? `${len} tecken = ${headCost(len)} kr och ${headTime(len)} min.${len > 30 ? " Lång rubrik: dyrare och svårare att läsa från gatan." : " Bra längd."}`
    : "Ingen rubrik än. En rubrik kostar 20 kr + 4 kr per tecken. Kort och tydligt är billigare.";
}

function totals() {
  let cost = 0, time = 0;
  S.placed.forEach(p => { const it = ITEMS.find(i => i.id === p.id); cost += it.cost; time += it.time; });
  cost += LIGHTS.find(l => l.k === S.light).cost;
  if (S.light !== "off") time += 5;
  const len = S.headText.trim().length;
  cost += headCost(len); time += headTime(len);
  return { cost, time };
}

function updateMeters() {
  const t = totals(), b = S.brief;
  $("mCost").textContent = `💰 ${t.cost} / ${b.budget} kr`;
  $("mCost").classList.toggle("over", t.cost > b.budget);
  $("mTime").textContent = `⏱ ${t.time} / ${b.tid} min`;
  $("mTime").classList.toggle("over", t.time > b.tid);
  $("mCount").textContent = `🧺 ${S.placed.length} saker`;
}

/* ---------- Saker i fönstret ---------- */
function renderItems() {
  $("items").innerHTML = "";
  S.placed.forEach(p => {
    const it = ITEMS.find(i => i.id === p.id);
    const el = document.createElement("div");
    el.className = "it" + (S.sel === p.uid ? " sel" : "");
    el.textContent = it.e;
    el.style.left = p.x + "%";
    el.style.top = p.y + "%";
    el.style.fontSize = it.px * p.s + "px";
    el.style.zIndex = Math.round(p.y);
    el.addEventListener("pointerdown", e => startMove(e, p));
    $("items").appendChild(el);
  });
  updateMeters();
  renderTools();
}

function renderTools() {
  const p = S.placed.find(x => x.uid === S.sel);
  if (!p) { $("tools").innerHTML = `<span class="hint">Tryck på en sak i fönstret för att ändra den.</span>`; return; }
  const it = ITEMS.find(i => i.id === p.id);
  $("tools").innerHTML = `<b>${it.e} ${it.n}:</b>
    <button class="chip" data-a="up">Större</button><button class="chip" data-a="down">Mindre</button><button class="chip" data-a="del">Ta bort</button>`;
}

function winPos(e) {
  const r = $("win").getBoundingClientRect();
  return { x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100,
    inside: e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom };
}

function startMove(e, p) {
  e.preventDefault();
  S.sel = p.uid;
  const el = e.currentTarget;
  el.classList.add("sel");
  el.setPointerCapture(e.pointerId);
  const move = ev => {
    const q = winPos(ev);
    p.x = clamp(q.x, 6, 94); p.y = clamp(q.y, 12, 92);
    el.style.left = p.x + "%"; el.style.top = p.y + "%"; el.style.zIndex = Math.round(p.y);
  };
  const up = () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerup", up); renderItems(); };
  el.addEventListener("pointermove", move);
  el.addEventListener("pointerup", up);
}

function addItem(id, x, y) {
  S.uid++;
  S.placed.push({ uid: S.uid, id, x: clamp(x, 6, 94), y: clamp(y, 12, 92), s: 1 });
  S.sel = S.uid;
  renderItems();
}

/* Dra från lådan */
$("tray").addEventListener("pointerdown", e => {
  const tr = e.target.closest(".tr");
  if (!tr) return;
  e.preventDefault();
  const it = ITEMS.find(i => i.id === tr.dataset.id);
  const ghost = document.createElement("div");
  ghost.className = "ghost";
  ghost.textContent = it.e;
  document.body.appendChild(ghost);
  const sx = e.clientX, sy = e.clientY;
  const pos = ev => { ghost.style.left = ev.clientX + "px"; ghost.style.top = ev.clientY + "px"; };
  pos(e);
  const up = ev => {
    document.removeEventListener("pointermove", pos);
    document.removeEventListener("pointerup", up);
    ghost.remove();
    const q = winPos(ev);
    const moved = Math.hypot(ev.clientX - sx, ev.clientY - sy) > 8;
    if (moved && q.inside) addItem(it.id, q.x, q.y);
    else if (!moved) addItem(it.id, 30 + Math.random() * 40, 55 + Math.random() * 15);
  };
  document.addEventListener("pointermove", pos);
  document.addEventListener("pointerup", up);
});

$("tools").addEventListener("click", e => {
  const a = e.target.dataset.a;
  const i = S.placed.findIndex(x => x.uid === S.sel);
  if (!a || i < 0) return;
  if (a === "up") S.placed[i].s = Math.min(2, +(S.placed[i].s + 0.25).toFixed(2));
  if (a === "down") S.placed[i].s = Math.max(0.5, +(S.placed[i].s - 0.25).toFixed(2));
  if (a === "del") { S.placed.splice(i, 1); S.sel = null; }
  renderItems();
});

$("win").addEventListener("pointerdown", e => {
  if (e.target.id === "win" || e.target.id === "floor") { S.sel = null; renderItems(); }
});

/* Färger, ljus och rubrik */
$("walls").addEventListener("click", e => { if (e.target.dataset.c) { S.wall = e.target.dataset.c; $("wallPick").value = S.wall; applyScene(); } });
$("wallPick").addEventListener("input", e => { S.wall = e.target.value; applyScene(); });
$("floors").addEventListener("click", e => { if (e.target.dataset.c) { S.floor = e.target.dataset.c; applyScene(); } });
$("signColors").addEventListener("click", e => { if (e.target.dataset.c) { S.signBg = e.target.dataset.c; applyScene(); } });
$("lights").addEventListener("click", e => { if (e.target.dataset.k) { S.light = e.target.dataset.k; applyScene(); updateMeters(); } });
$("headText").addEventListener("input", e => { S.headText = e.target.value; applyScene(); updateMeters(); });

$("nightBtn").addEventListener("click", () => {
  S.night = !S.night;
  $("win").classList.toggle("night", S.night);
  $("nightBtn").textContent = S.night ? "☀️ Se fönstret på dagen" : "🌙 Se fönstret på kvällen";
});

/* ---------- Granskning ---------- */
function evaluate() {
  const b = S.brief, t = totals();
  const list = S.placed.map(p => ({ ...p, it: ITEMS.find(i => i.id === p.id) }));
  const n = list.length;
  const rel = n ? list.filter(x => x.it.tags.includes(b.id)).length / n : 0;
  const hasPrice = list.some(x => x.it.price);

  /* rubrik (högst 35 poäng) */
  const text = S.headText.trim(), low = " " + text.toLowerCase() + " ", len = text.length;
  const wrongHit = b.wrong.some(w => low.includes(w));
  const keyHit = b.keys.some(k => low.includes(k));
  let head = 0, headState = "none";
  if (len) {
    if (wrongHit) { head = 0; headState = "wrong"; }
    else if (keyHit) { head = 25 + (len >= 8 && len <= 30 ? 10 : 3); headState = len > 30 ? "long" : "ok"; }
    else { head = 8 + (len >= 8 && len <= 30 ? 5 : 0); headState = "vague"; }
  }
  const msg = clamp(Math.round(40 * rel + head + (b.needPrice ? (hasPrice ? 25 : 0) : 25)));

  const fam = familyOf(S.wall), wallOk = b.pal.includes(fam);
  const harm = n ? list.filter(x => b.pal.includes(x.it.col) || x.it.col === "vit").length / n : 0;
  const color = clamp(Math.round((wallOk ? 40 : 15) + 60 * harm));

  let comp = 0;
  comp += n >= 5 && n <= 9 ? 30 : (n >= 3 && n <= 12 ? 15 : 0);
  if (n) {
    const big = list.reduce((m, x) => (x.s * x.it.px > m.s * m.it.px ? x : m), list[0]);
    comp += big.s >= 1.25 && big.x >= 35 && big.x <= 65 ? 30 : 10;
    const mass = side => list.filter(side).reduce((s, x) => s + x.s * x.it.px, 0);
    const l = mass(x => x.x < 50), r = mass(x => x.x >= 50);
    comp += Math.abs(l - r) / ((l + r) || 1) < 0.3 ? 25 : 10;
    const ys = list.map(x => x.y);
    comp += Math.max(...ys) - Math.min(...ys) >= 25 ? 15 : 5;
  }
  comp = clamp(comp);

  const light = b.light.includes(S.light) ? 100 : S.light === "off" ? 30 : 55;
  const over = Math.max(0, t.cost / b.budget - 1) + Math.max(0, t.time / b.tid - 1);
  const cost = n < 3 ? 40 : clamp(Math.round(100 - over * 150));
  const eco = n ? list.filter(x => x.it.eco).length / n : 0;
  const green = clamp(Math.round(30 + 70 * eco));
  const total = Math.round((msg + color + comp + light + cost + green) / 6);
  return { msg, color, comp, light, cost, green, total, n, t, hasPrice, wallOk, fam, headState, len };
}

function feedback(r) {
  const b = S.brief, out = [];
  const add = (ok, good, bad) => out.push([ok, ok ? good : bad]);
  add(r.msg >= 75, `Budskap och målgrupp: Bra. Ditt fönster passar ${b.mal.toLowerCase()} och budskapet "${b.budskap}".`,
    `Budskap och målgrupp: Fönstret når inte hela vägen fram. Välj saker som passar ${b.mal.toLowerCase()}${b.needPrice && !r.hasPrice ? " och lägg till en prisskylt" : ""}.`);

  const hm = {
    none: [false, "Rubrik: Du skrev ingen rubrik. En rubrik hjälper kunden att förstå budskapet direkt."],
    wrong: [false, `Rubrik: "${S.headText.trim()}" passar inte uppdraget. Rubriken ska säga "${b.budskap}" eller något liknande.`],
    vague: [false, `Rubrik: Rubriken är tydlig men säger inte uppdragets budskap ("${b.budskap}"). Prova att använda ord från budskapet.`],
    long: [false, `Rubrik: Rubriken passar, men den är lång (${r.len} tecken). Den kostar mer och är svår att läsa från gatan. Korta ner den.`],
    ok: [true, `Rubrik: Bra! Rubriken passar budskapet och har lagom längd (${r.len} tecken).`]
  }[r.headState];
  out.push(hm);

  add(r.color >= 75, `Färg: Bra harmoni. Väggen (${r.fam}) och sakerna hör ihop och ger en tydlig stämning.`,
    `Färg: Färgerna hjälper inte budskapet. Väggen blev ${r.fam}. Prova ${b.pal.join(", ")} och saker i samma färgfamilj.`);
  add(r.comp >= 75, "Komposition: Bra! Du har en tydlig tyngdpunkt, balans mellan vänster och höger och olika höjder.",
    "Komposition: Gör en sak störst och placera den nära mitten. Fördela sakerna jämnt vänster och höger, och ha både höga och låga saker. 5–9 saker brukar vara lagom.");
  add(r.light >= 75, "Ljus: Ljuset passar stämningen och lyfter fönstret, även på kvällen.",
    `Ljus: Ljuset passar inte riktigt. Det här uppdraget fungerar bäst med ${b.light.map(k => LIGHTS.find(l => l.k === k).n.toLowerCase()).join(" eller ")}.`);
  add(r.cost >= 75, `Kostnad och tid: Du höll dig inom budget (${r.t.cost} kr) och tid (${r.t.time} min). Bra planering!`,
    `Kostnad och tid: Du ${r.n < 3 ? "har för få saker" : "gick över budget eller tid"}. Tid och kostnad påverkar kvaliteten, så planera innan du bygger.`);
  add(r.green >= 75, "Hållbarhet: Du använde mycket återbruk och naturliga material. Bra för miljön!",
    "Hållbarhet: Använd mer återbruk och naturmaterial, till exempel pall, kvistar, växter och löv. Det är billigare och bättre för miljön.");
  return out;
}

function review() {
  const r = evaluate();
  $("rTitle").textContent = `${S.brief.titel} – ${S.brief.butik.toLowerCase()}`;
  $("rSub").textContent = `Skyltfönster av ${S.name}. Helhetsbetyg: ${r.total}/100`;
  const rw = $("rWin");
  rw.innerHTML = "";
  const clone = $("win").cloneNode(true);
  clone.removeAttribute("id");
  clone.querySelectorAll("[id]").forEach(e => e.removeAttribute("id"));
  clone.classList.remove("night");
  rw.appendChild(clone);

  const rows = [["Budskap och målgrupp", r.msg], ["Färg", r.color], ["Komposition", r.comp], ["Ljus", r.light], ["Kostnad och tid", r.cost], ["Hållbarhet", r.green]];
  $("rScores").innerHTML = rows.map(([l, v]) => `<div class="row"><span>${l}</span><div class="bar"><span style="width:${v}%"></span></div><strong>${v}/100</strong></div>`).join("") +
    `<div class="row"><b>Helhet</b><strong>${r.total}/100</strong></div>`;

  const idx = r.total >= 75 ? 0 : r.total >= 50 ? 1 : 2;
  const reactions = r.total >= 75 ? ["Wow! Det här fönstret stannar jag och tittar på.", "Det är tydligt vad butiken vill säga.", "Jag förstår direkt. Jag går in."]
    : r.total >= 50 ? ["Ganska fint, men det saknas något.", "Jag förstår nästan vad det handlar om.", "Jag tittar kort och går vidare."]
    : ["Det är rörigt. Jag förstår inte budskapet.", "Det ser tomt eller fullt ut. Jag går förbi.", "Jag vet inte vad butiken säljer."];
  $("rTalk").innerHTML = S.brief.pass.map((p, i) => `<div class="talk"><i>${p[0]}</i><span>${reactions[(i + idx) % 3]}</span></div>`).join("") +
    `<p class="hint">Kunderna går förbi ditt fönster. Fönstret ska väcka intresse på några sekunder.</p>`;

  $("rFeed").innerHTML = feedback(r).map(([ok, t]) => `<div class="row"><span class="${ok ? "good" : "bad"}">${ok ? "✔" : "✘"} ${t}</span></div>`).join("");
  showScreen("s-review");
}

$("startBtn").addEventListener("click", startGame);
$("name").addEventListener("keydown", e => { if (e.key === "Enter") startGame(); });
$("doneBtn").addEventListener("click", () => {
  if (S.placed.length < 2) { alert("Lägg minst 2 saker i fönstret först."); return; }
  review();
});
$("backBtn").addEventListener("click", () => showScreen("s-build"));
$("printBtn").addEventListener("click", () => window.print());
$("newBtn").addEventListener("click", () => { $("name").value = ""; showScreen("s-start"); });
