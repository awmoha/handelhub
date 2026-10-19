/* CASE-MOTOR – gemensam för alla case.
   Texterna (scener, val, feedback) ligger i varje cases egen scenes.js (const CASE).
   Flöde per scen: läs ärendet -> välj -> skriv reflektion -> se vad som händer -> nästa.
   Ingen timer. */

const $ = id => document.getElementById(id);
const LABELS = ["Mindre bra", "Delvis bra", "Bra", "Mycket bra"];
const MOOD_DELTA = [-12, -3, 8, 15];

let name = "", i = 0, score = 0, mood = 0, facts = [], log = [];
let current = [], picked = null, locked = false;

const words = t => t.trim().split(/\s+/).filter(Boolean).length;
const maxScore = () => CASE.scenes.length * 3;
const shuffle = a => {
  const r = a.slice();
  for (let k = r.length - 1; k > 0; k--) {
    const j = Math.floor(Math.random() * (k + 1));
    [r[k], r[j]] = [r[j], r[k]];
  }
  return r;
};

function show(id) {
  ["startScreen", "gameScreen", "resultScreen"].forEach(s => {
    $(s).style.display = s === id ? "block" : "none";
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------- START ---------- */
function startGame() {
  const n = $("playerName").value.trim();
  if (!n) { $("playerName").focus(); $("playerName").style.borderColor = "#a75c52"; return; }

  name = n; i = 0; score = 0; mood = CASE.startMood; log = [];
  facts = [...CASE.startFacts];

  $("playerDisplay").textContent = name;
  $("customerName").textContent = CASE.customer;
  $("score").textContent = 0;
  show("gameScreen");
  loadScene();
}

/* ---------- NY SCEN ---------- */
function loadScene() {
  const s = CASE.scenes[i], n = CASE.scenes.length;
  facts.push(...(s.facts || []));
  locked = false;
  picked = null;

  $("sceneTitle").textContent = s.title;
  $("sceneNumber").textContent = `Scen ${i + 1} av ${n}`;
  $("progressFill").style.width = `${(i / n) * 100}%`;
  $("story").textContent = s.story;
  $("speaker").textContent = s.who;
  $("say").textContent = s.say;
  $("askTitle").textContent = s.ask;

  const ul = $("caseFacts");
  ul.innerHTML = "";
  facts.forEach(f => {
    const li = document.createElement("li");
    li.textContent = f;
    ul.appendChild(li);
  });

  ["reflectBox", "feedback", "nextBtn"].forEach(id => ($(id).style.display = "none"));
  $("reflectText").value = "";
  updateCount();
  updateMood();

  current = shuffle(s.options);
  const list = $("answers");
  list.innerHTML = "";
  current.forEach((o, k) => {
    const b = document.createElement("button");
    b.className = "answer-button";
    b.textContent = `${"ABCD"[k]}. ${o.t}`;
    b.onclick = () => pick(k);
    list.appendChild(b);
  });
}

function updateMood() {
  $("moodFill").style.width = `${mood}%`;
  $("moodFill").style.background = mood < 25 ? "#a75c52" : mood < 50 ? "#c9873b" : "#367254";
  $("moodText").textContent = `${mood} %`;
  $("customerFigure").textContent = mood < 25 ? "😠" : mood < 50 ? "😕" : mood < 75 ? "🙂" : "😊";
}

/* ---------- STEG 1: VÄLJ ---------- */
function pick(k) {
  if (locked) return;
  locked = true;
  picked = current[k];

  document.querySelectorAll("#answers .answer-button").forEach((b, idx) => {
    b.disabled = true;
    if (idx === k) b.classList.add("picked");
  });

  $("reflectPrompt").textContent = CASE.scenes[i].reflect;
  $("reflectBox").style.display = "block";
  $("reflectText").focus();
  $("reflectBox").scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function updateCount() {
  const w = words($("reflectText").value), min = CASE.minWords;
  $("wordCount").textContent = w >= min ? `${w} ord ✓` : `${w} av minst ${min} ord`;
  $("reflectBtn").disabled = w < min;
}

/* ---------- STEG 2: REFLEKTERA, SEN FEEDBACK ---------- */
function submitReflection() {
  const s = CASE.scenes[i], text = $("reflectText").value.trim();
  if (!picked || words(text) < CASE.minWords) return;

  const p = picked.p, best = current.find(o => o.p === 3);
  log.push({ title: s.title, label: LABELS[p], choice: picked.t, reflection: text });

  score += p;
  mood = Math.max(0, Math.min(100, mood + MOOD_DELTA[p]));
  $("score").textContent = score;
  updateMood();

  document.querySelectorAll("#answers .answer-button").forEach((b, idx) => {
    b.classList.remove("picked");
    if (current[idx].p === 3) b.classList.add("correct");
    else if (current[idx] === picked) b.classList.add(p >= 2 ? "correct" : "incorrect");
  });

  $("reflectBox").style.display = "none";
  $("fbTitle").textContent = `${LABELS[p]} (+${p} poäng)`;
  $("fbReaction").textContent = picked.r;
  $("fbText").textContent = picked.fb;
  $("fbBest").textContent = p < 3 ? "Bästa svaret var: " + best.t : "";
  $("fbBest").style.display = p < 3 ? "block" : "none";
  $("fbKnow").textContent = s.know;
  $("fbThink").textContent = s.think;

  $("feedback").className = "feedback " + (p >= 2 ? "correct" : "incorrect");
  $("feedback").style.display = "block";
  $("nextBtn").textContent = i === CASE.scenes.length - 1 ? "Se resultat →" : "Nästa scen →";
  $("nextBtn").style.display = "inline-block";
  $("feedback").scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function nextScene() {
  i++;
  if (i < CASE.scenes.length) { loadScene(); window.scrollTo({ top: 0, behavior: "smooth" }); }
  else showResult();
}

/* ---------- RESULTAT + RAPPORT ---------- */
function showResult() {
  const pct = Math.round((score / maxScore()) * 100);
  const bestCount = log.filter(l => l.label === LABELS[3]).length;

  $("resultName").textContent = name;
  $("finalScore").textContent = `${score} / ${maxScore()} poäng`;
  $("resultInfo").innerHTML =
    `${CASE.customer}s förtroende: <strong>${mood} %</strong><br>` +
    `Mycket bra val: <strong>${bestCount}</strong> av ${log.length} scener`;
  $("resultMessage").textContent =
    pct >= 85 ? "Du hanterade ärendet mycket professionellt. Du lyssnade, tog reda på fakta och höll dig till lagen."
    : pct >= 60 ? "Bra jobbat! Du fattade flera kloka beslut. Läs feedbacken i rapporten och se var du kan bli ännu bättre."
    : "Du har en bra start. Spela igen och tänk extra på att lyssna först, ta reda på fakta och kontrollera vad lagen säger.";

  const box = $("reportList");
  box.innerHTML = "";
  log.forEach((l, k) => {
    const d = document.createElement("div");
    d.className = "report-item";
    const h = document.createElement("strong");
    h.textContent = `Scen ${k + 1} – ${l.title}`;
    const r = document.createElement("span");
    r.className = "rating";
    r.textContent = l.label;
    const c = document.createElement("p");
    c.textContent = "Ditt val: " + l.choice;
    const t = document.createElement("p");
    t.textContent = "Din reflektion: " + l.reflection;
    d.append(h, r, c, t);
    box.appendChild(d);
  });

  $("finalPrompt").textContent = CASE.finalPrompt;
  $("finalReflect").value = "";
  $("copyMsg").textContent = "";
  updateFinal();
  show("resultScreen");
}

function updateFinal() {
  const w = words($("finalReflect").value), min = CASE.finalWords;
  $("finalCount").textContent = w >= min ? `${w} ord ✓` : `${w} av minst ${min} ord`;
  $("copyBtn").disabled = $("printBtn").disabled = w < min;
}

function reportText() {
  return [
    `Reflektionsrapport – ${CASE.title}`,
    `Namn: ${name}`,
    `Poäng: ${score} av ${maxScore()} · ${CASE.customer}s förtroende: ${mood} %`,
    "",
    ...log.map((l, k) =>
      `Scen ${k + 1} – ${l.title} (${l.label})\nMitt val: ${l.choice}\nMin reflektion: ${l.reflection}\n`),
    "Slutreflektion:",
    $("finalReflect").value.trim()
  ].join("\n");
}

function copyReport() {
  const t = reportText();
  const ok = () => { $("copyMsg").textContent = "✓ Rapporten är kopierad. Klistra in den i ett dokument."; };
  const fallback = () => {
    const a = document.createElement("textarea");
    a.value = t;
    document.body.appendChild(a);
    a.select();
    document.execCommand("copy");
    a.remove();
    ok();
  };
  if (navigator.clipboard) navigator.clipboard.writeText(t).then(ok).catch(fallback);
  else fallback();
}

function restartGame() { show("startScreen"); }

$("reflectText").addEventListener("input", updateCount);
$("finalReflect").addEventListener("input", updateFinal);
$("playerName").addEventListener("keydown", e => { if (e.key === "Enter") startGame(); });