/* MIN FÖRSTA APL-DAG – SCEN -> VAL -> KONSEKVENS -> NY SCEN
   fx: k=Kundservice s=Samarbete m=Kommunikation a=Ansvar p=Problemlösning
       H=handledare O=kollegor C=kunder (relationer) */

const STAT = { k: "Kundservice", s: "Samarbete", m: "Kommunikation", a: "Ansvar", p: "Problemlösning" };
const REL = { H: "Handledare", O: "Kollegor", C: "Kunder" };

const WORDS = {
  apl: "APL = arbetsplatsförlagt lärande. Du lär dig på en riktig arbetsplats.",
  handledare: "Handledare = personen som hjälper dig och visar dig jobbet.",
  kollega: "Kollega = en person som jobbar på samma plats som du.",
  kassa: "Kassa = där kunden betalar.",
  lager: "Lager = rummet där butiken har extra varor.",
  rast: "Rast = paus från jobbet. Du äter eller vilar.",
  hylla: "Hylla = där varorna står i butiken.",
  leverans: "Leverans = nya varor som kommer till butiken.",
  prioritera: "Prioritera = välja vad som är viktigast att göra först.",
  personalrum: "Personalrum = rum där personalen äter och vilar.",
  arbetskläder: "Arbetskläder = kläder som man har på jobbet.",
  kö: "Kö = många människor som väntar på rad.",
  misstag: "Misstag = något du gör fel av misstag.",
  rutiner: "Rutiner = hur man brukar göra på arbetsplatsen.",
  retur: "Retur = kunden lämnar tillbaka en vara.",
  pris: "Pris = vad en vara kostar.",
  chef: "Chef = personen som bestämmer på arbetsplatsen.",
  varningsskylt: "Varningsskylt = en skylt som säger: Se upp!"
};

const EVENTS = [
  { p: "Lager", e: "🚚", n: "Chaufför",
    s: "En chaufför kommer med en leverans. Handledaren är upptagen. Chauffören vill ha en underskrift.",
    c: [["Jag hämtar en kollega och frågar vad jag ska göra.", { s: 6, a: 6, p: 6, O: 4 }, "Kollega: Bra att du frågade. Jag tar leveransen med dig."],
        ["Jag skriver under själv.", { a: -8, H: -5 }, "Handledare: Hoppsan. Du ska fråga mig innan du skriver under. Nu kollar vi att allt kom med."],
        ["Jag ber honom komma tillbaka senare.", { k: -4, a: -4, p: -2 }, "Chauffören suckar. Han har bråttom och blir irriterad."]],
    tip: "Skriv inte under saker själv. Fråga någon som vet." },
  { p: "Butik", e: "🧑", n: "Kund",
    s: "Kunden säger: 'Var finns mjölken? Hyllan är tom.'",
    c: [["Jag kollar i lagret. Sedan frågar jag en kollega.", { k: 8, p: 8, m: 3, C: 5 }, "Kunden: Tack! Vad snällt."],
        ["Den är slut.", { k: -7, C: -5 }, "Kunden: Okej... men finns det mer? Du hjälpte mig inte."],
        ["Gå till en annan butik.", { k: -10, C: -8 }, "Kunden tittar förvånat och går ut."]],
    tip: "Kolla alltid lagret eller fråga en kollega innan du säger att något är slut." },
  { p: "Butik", e: "💥", n: "Du",
    s: "Oj! Du tappar en flaska. Golvet är blött och glas ligger på golvet.",
    c: [["Jag sätter ut en varningsskylt, tar hjälp och berättar för handledaren.", { a: 10, p: 6, m: 4, H: 6 }, "Handledare: Bra. Du tänkte på säkerheten. Det är det viktigaste."],
        ["Jag torkar själv och säger inget.", { a: -6, H: -4 }, "En kund halkar nästan. Handledaren frågar vad som hände."],
        ["Jag går därifrån.", { a: -12, H: -10 }, "Handledare: Vi pratar efteråt. Du ska alltid säga till direkt."]],
    tip: "Efter ett olycksfall ska du säga till direkt. Säkerhet kommer först." },
  { p: "Kundyta", e: "👥", n: "Butiken",
    s: "En stor grupp kunder kommer in. Alla vill ha hjälp samtidigt.",
    c: [["Jag hälsar och ber en kollega hjälpa till.", { k: 6, s: 8, m: 5, O: 5 }, "Kollega: Bra. Jag tar halva gruppen."],
        ["Jag gömmer mig på lagret.", { k: -10, a: -8, C: -6 }, "Kunderna väntar. En kollega måste göra allt själv."],
        ["Jag hjälper en kund i taget och är lugn.", { k: 7, p: 4, C: 4 }, "Alla får hjälp, men några väntar lite."]],
    tip: "När det är många kunder: var lugn och be om hjälp." },
  { p: "Butik", e: "🧑‍💼", n: "Handledare",
    s: "Handledaren säger: 'Kan du också göra nya prisskyltar? Det tar tio minuter.' Du har en uppgift kvar.",
    c: [["Ja. Men jag har en uppgift kvar. Vilken gör jag först?", { m: 8, p: 8, a: 5, H: 6 }, "Handledare: Bra fråga! Gör prisskyltarna först."],
        ["Ja.", { a: -6, m: -3, H: -3 }, "Du glömmer den första uppgiften. Handledaren undrar var den är."],
        ["Det är inte mitt jobb.", { s: -8, H: -10 }, "Handledare: På APL hjälper vi alla till. Vi pratar om det."]],
    tip: "Om du har flera uppgifter, fråga vad som är viktigast." },
  { p: "Kundyta", e: "🧑", n: "Kund",
    s: "Kunden säger: 'På hyllan står 29 kr. I kassan blir det 39 kr.'",
    c: [["Förlåt. Jag kollar priset med min handledare.", { k: 8, p: 7, m: 4, C: 5 }, "Kunden: Tack. Det är bra att ni kollar."],
        ["Kassan har rätt.", { k: -8, C: -6 }, "Kunden blir arg: 'Så kan ni inte säga!'"],
        ["Jag vet inte.", { k: -6, m: -4, C: -4 }, "Kunden väntar. Du går därifrån."]],
    tip: "Rätt pris är viktigt. Kolla alltid med någon som vet." }
];

const SCENES = [
  { t: "07:30", p: "Hemma", e: "🏠", n: "Du",
    s: "Det är din första APL-dag. Du ska börja klockan 09:00. När går du hemifrån?",
    c: [["Jag går tidigt. Jag vill vara där 08:45.", { a: 10, H: 8 }, "Du kommer i tid och är lugn."],
        ["Jag går så jag kommer precis 09:00.", { a: 3 }, "Det går bra, men det är knappt."],
        ["Jag sover lite längre. Jag kommer 09:15.", { a: -10, H: -8 }, "Du blir sen. Handledaren väntar på dig.", "late"]],
    tip: "På APL är det bra att komma 10–15 minuter tidigt." },
  { t: "07:40", p: "Hemma", e: "👕", n: "Du",
    s: "Vad tar du på dig?",
    c: [["Rena, enkla kläder och sköna skor. Jag frågar om arbetskläder.", { a: 8, m: 4, H: 4 }, "Bra val. Du kan röra dig lätt och du ser ren ut."],
        ["Fina kläder och höga klackar.", { a: -3, p: -3 }, "Det är svårt att bära kartonger i de skorna."],
        ["Mina gamla slitna kläder.", { a: -8, H: -5 }, "Handledaren ser kläderna och säger inget. Men första intrycket blev inte bra."]],
    tip: "Rena kläder och bra skor ger ett bra första intryck." },
  { t: "07:50", p: "Hemma", e: "🎒", n: "Du",
    s: "Vad tar du med dig?",
    c: [["Lunch, vatten, penna, block och en laddad telefon.", { a: 8, p: 5 }, "Du är förberedd. Du kan skriva ner det du lär dig."],
        ["Bara telefonen.", { a: -3 }, "Du har ingen lunch och ingen penna. Det blir svårt."],
        ["Ingenting. Butiken har allt.", { a: -8 }, "Du blir hungrig. Du har inget att skriva på."]],
    tip: "Ta med lunch, vatten och något att skriva med." },
  { t: "08:20", p: "Buss", e: "🚌", n: "Du",
    s: "Bussen står still. Du blir kanske sen. Vad gör du?",
    c: [["Jag ringer handledaren och säger att jag blir sen.", { m: 10, a: 8, H: 6 }, "Handledare: Tack för att du ringde. Det är inga problem."],
        ["Jag springer och säger inget.", { m: -6, a: -3 }, "Du kommer 10 minuter sent. Handledaren undrar var du är.", "late"],
        ["Jag åker hem.", { a: -12, H: -10 }, "Du ångrar dig och kommer 30 minuter för sent.", "late"]],
    tip: "Om du blir sen: ring eller skriv direkt. Det visar ansvar." },
  { t: "08:55", p: "Entré", e: "🧑‍💼", n: "Handledare Maria",
    s: S => S.flags.late ? "Hej. Du är lite sen. Är det din första dag?" : "Hej! Välkommen till oss. Är det din första dag?",
    c: [[S => `Hej! Jag heter ${S.name}. Det är min första dag. Tack för att jag får vara här.`, { m: 10, H: 8 }, "Handledare: Trevligt! Kom, så visar jag butiken."],
        ["Hej.", { m: -4, H: -2 }, "Handledare: Okej... Kom med mig."],
        ["Ja. (Du tittar på telefonen.)", { m: -8, H: -8 }, "Handledare: Ta bort telefonen nu, tack. Det är viktigt att du lyssnar."]],
    tip: "Hälsa, titta på personen och säg ditt namn. Det ger ett bra första intryck." },
  { t: "09:20", p: "Butik", e: "🧑‍💼", n: "Handledare Maria",
    s: "Kan du fylla på hyllan med de här kartongerna?",
    c: [["Ja, självklart.", { a: 3, p: -3 }, "Du börjar direkt. Efter en stund står några varor på fel hylla.", "wrong"],
        ["Jag förstår inte riktigt. Kan du visa mig?", { m: 10, a: 5, H: 8 }, "Handledare: Okej, jag visar dig hur man gör. Titta här."],
        ["Nej, jag vill göra något annat.", { a: -8, H: -10 }, "Handledare: På APL gör vi det som behövs. Jag förklarar varför."]],
    tip: "Det är bra att fråga när du inte förstår. Handledaren vill hjälpa dig." },
  { t: "10:00", p: "Butik", e: "🧑", n: "Kollega Ali",
    s: "Hej! Kan du hjälpa mig med de här lådorna? (Du har redan en uppgift från handledaren.)",
    c: [["Ja, jag hjälper dig nu!", { s: 6, a: -5, O: 6 }, "Ali blir glad. Men din första uppgift blir inte klar."],
        ["Jag har en uppgift. Jag kan hjälpa dig sen.", { m: 5, a: 4, s: 3, O: 2 }, "Ali: Okej, tack. Säg till när du är klar."],
        ["Vad är viktigast att göra först?", { p: 10, m: 8, s: 6, O: 5 }, "Ali: Bra fråga! Gör din uppgift först. Sedan kommer du."]],
    tip: "Samarbete är att prata och välja vad som är viktigast." },
  { t: "10:30", p: "Kundyta", e: "🧑", n: "Kund",
    s: "Ursäkta, kan du hjälpa mig?",
    c: [["Hej! Ja. Vad söker du?", { k: 10, m: 6, C: 6 }, "Kunden: Jag letar efter en present."],
        ["Jag jobbar nu. Fråga någon annan.", { k: -10, C: -8 }, "Kunden ser besviken ut och går."],
        ["Jag är ny. Jag hämtar en kollega.", { k: 4, a: 4, m: 3, C: 2 }, "Kunden: Tack, jag väntar."]],
    tip: "Hälsa vänligt och fråga vad kunden behöver." },
  { t: "10:45", p: "Kundyta", e: "🧑", n: "Kund",
    s: "Har ni den här tröjan i en annan färg?",
    c: [["Ja, den finns nog i blått.", { k: -6, a: -8, C: -6 }, "Kunden letar efter blå tröja. Den finns inte. Kunden blir irriterad."],
        ["Jag vet inte.", { k: -6, m: -3, C: -4 }, "Du går därifrån. Kunden står kvar utan hjälp."],
        ["Jag vet inte, men jag frågar min kollega.", { k: 10, m: 8, p: 8, C: 6 }, "Kollega: Ja, den finns i blått. Kunden blir glad."]],
    tip: "Det är okej att inte veta. Det viktiga är att fråga och hitta svaret." },
  { t: "11:15", p: "Butik", e: "😬", n: "Du",
    s: "Du ser att du har ställt varor på fel hylla. En kund har redan frågat efter dem.",
    c: [["Jag berättar för handledaren och flyttar varorna.", { a: 12, m: 6, H: 8 }, "Handledare: Tack för att du sa det. Alla gör misstag."],
        ["Jag flyttar dem tyst och säger inget.", { a: 3, m: -3 }, "Det går bra, men kunden väntade lite. Handledaren vet inget."],
        ["Jag låter dem stå. Ingen ser.", { a: -12, H: -6 }, "Senare hittar en kollega varorna. Handledaren undrar vem som gjorde det.", "hid"]],
    tip: "Alla gör misstag. Det viktiga är att berätta och rätta till." },
  { t: "12:00", p: "Personalrum", e: "🍽️", n: "Handledare Maria",
    s: "Nu är det rast. Du har 30 minuter. Rasten slutar 12:30.",
    c: [["Tack! Jag äter i personalrummet. Jag är tillbaka 12:30.", { a: 8, H: 4 }, "Handledare: Bra. Vi ses då."],
        ["Jag går till stan. Jag kommer tillbaka 12:50.", { a: -8, H: -8 }, "Du är 20 minuter sen. Kollegorna har jobbat själva."],
        ["Var kan jag äta och lägga mina saker?", { m: 8, a: 6, H: 6 }, "Handledare: Bra fråga. Skåpen är där borta."]],
    tip: "Rutiner: kom i tid efter rasten och fråga om reglerna." },
  { t: "12:35", p: "Butik", e: "📱", n: "Du",
    s: "Du får ett meddelande från en vän. Du är på jobbet.",
    c: [["Jag lägger telefonen i skåpet. Jag svarar på rasten.", { a: 8, k: 3 }, "Du jobbar utan att bli störd."],
        ["Jag frågar: Får jag använda telefonen här?", { m: 8, a: 8, H: 6 }, "Handledare: Bra fråga! Här använder vi telefonen bara på rasten."],
        ["Jag svarar snabbt vid kassan.", { k: -8, a: -8, H: -8 }, "En kund väntar. Handledaren ser det och blir inte glad."]],
    tip: "Olika arbetsplatser har olika regler om telefon. Fråga!" },
  { t: "13:30", p: "Kassa", e: "😵", n: "Butiken",
    s: "Allt händer nu! En kund väntar. Telefonen ringer. Ali behöver hjälp. Kön växer. Handledaren väntar på en lista.",
    c: [["Jag hjälper kunden först.", { k: 8, a: -2, H: -3 }, "Kunden är nöjd. Men telefonen slutar ringa och handledaren får vänta."],
        ["Jag frågar handledaren vad som är viktigast.", { p: 10, m: 6, k: -3 }, "Handledare: Kunden först. Sedan telefonen. Jag väntar. Kunden väntar några minuter."],
        ["Jag svarar telefonen.", { m: 3, k: -8, C: -5 }, "Kön blir längre och några kunder suckar."]],
    tip: "Det finns inget enkelt rätt svar. Varje val får en konsekvens." },
  { t: "14:00", p: "Kassa", e: "😠", n: "Kund",
    s: "Jag har väntat jättelänge!",
    c: [["Förlåt att du har väntat. Jag hjälper dig nu.", { k: 12, m: 10, C: 8 }, "Kunden lugnar sig: Tack. Jag förstår att ni har mycket att göra."],
        ["Det är inte mitt fel. Vi har mycket att göra.", { k: -12, m: -8, C: -10 }, "Kunden blir ännu argare och vill prata med chefen."],
        ["Jag hämtar min handledare.", { p: 5, k: 3, a: 3, C: 2 }, "Handledaren tar över och löser problemet."]],
    tip: "Var lugn och artig. Säg förlåt och visa att du hjälper." },
  { t: "14:30", p: "Butik", e: "🏷️", n: "Du",
    s: "Du ser att Ali har satt fel pris på en vara.",
    c: [["Jag säger inget.", { a: -8, k: -5, s: -3 }, "En kund betalar fel pris. Det blir problem i kassan."],
        ["Ali, jag tror att priset är fel här. Kan du kolla?", { s: 10, m: 10, O: 8 }, "Ali: Oj, tack! Jag rättar det."],
        ["Jag berättar direkt för chefen.", { a: 4, s: -6, O: -8 }, "Ali blir ledsen. Han ville rätta det själv."],
        ["Jag frågar handledaren hur man ska göra.", { p: 8, a: 8, m: 6, H: 4 }, "Handledare: Bra! Vi går till Ali tillsammans."]],
    tip: "Prata respektfullt med kollegor. Fråga handledaren om du är osäker." },
  { t: "15:00", p: "Kassa", e: "🧾", n: "Handledare Maria",
    s: "Kan du hjälpa en kund med en retur i kassan? (Du har aldrig gjort det.)",
    c: [["Kan du hjälpa mig? Jag har inte gjort det förut.", { m: 10, a: 8, H: 8 }, "Handledare: Självklart. Jag står bredvid dig."],
        ["Ja, jag fixar det.", { a: -8, k: -6, H: -4 }, "Du trycker fel. Kunden får fel summa tillbaka."],
        ["Kan du visa en gång först?", { m: 8, p: 6, a: 6, H: 6 }, "Handledare: Titta noga. Sedan försöker du själv."]],
    tip: "Att be om hjälp är bra. Då blir arbetet rätt." },
  { t: "16:00", p: "Personalrum", e: "🧑‍💼", n: "Handledare Maria",
    s: "Bra jobbat idag. Hur tyckte du att det gick?",
    c: [["Bra! Jag lärde mig mycket. Jag vill öva mer på kassan.", { m: 10, a: 6, H: 8 }, "Handledare: Bra tänkt. Vi gör det nästa gång."],
        ["Okej.", { m: -2 }, "Handledare: Bra. Tack för idag."],
        ["Jag är trött. Men jag vill komma tillbaka. Tack för hjälpen!", { m: 8, a: 4, H: 6 }, "Handledare: Ärligt och bra. Välkommen tillbaka."]],
    tip: "Tacka och berätta ärligt hur det gick." }
];

const GOOD = {
  k: "Du hjälpte kunder på ett vänligt sätt.",
  s: "Du samarbetade med dina kollegor.",
  m: "Du vågade fråga och pratade tydligt.",
  a: "Du tog ansvar och var i tid.",
  p: "Du tänkte efter och prioriterade."
};
const TRAIN = {
  k: "Träna på att hälsa på kunder och fråga vad de behöver.",
  s: "Träna på att hjälpa kollegor och prata om vad som är viktigast.",
  m: "Träna på att fråga när du inte förstår och på att prata tydligt.",
  a: "Träna på att komma i tid, följa regler och berätta om misstag.",
  p: "Träna på att prioritera när flera saker händer samtidigt."
};

const $ = id => document.getElementById(id);
const val = x => (typeof x === "function" ? x(S) : x);
const shuffle = a => a.map(v => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map(x => x[1]);
const clamp = v => Math.max(0, Math.min(100, v));

let S;

function newState(name) {
  return { name, i: 0, seq: [], stats: { k: 50, s: 50, m: 50, a: 50, p: 50 }, rel: { H: 50, O: 50, C: 50 }, flags: {}, done: false };
}

function buildSequence() {
  const ev = shuffle(EVENTS).slice(0, 2);
  const seq = SCENES.slice();
  seq.splice(12, 0, Object.assign({ t: "13:00" }, ev[0]));
  seq.splice(seq.length - 1, 0, Object.assign({ t: "15:20" }, ev[1]));
  return seq;
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  $(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* Klickbara ord */
function glossary(text) {
  const keys = Object.keys(WORDS).sort((a, b) => b.length - a.length).join("|");
  const re = new RegExp("(?<![a-zåäö])(" + keys + ")([a-zåäö]*)", "gi");
  return text.replace(re, (m, k, rest) => `<span class="w" data-w="${k.toLowerCase()}">${m}</span>`);
}

function renderStats() {
  $("stats").innerHTML = Object.entries(STAT).map(([k, label]) =>
    `<div class="st">${label}<div class="bar"><span style="width:${S.stats[k]}%"></span></div></div>`).join("");
}

function loadScene() {
  const sc = S.seq[S.i];
  S.done = false;
  $("clock").textContent = sc.t;
  $("place").textContent = sc.p;
  $("face").textContent = sc.e;
  $("speaker").textContent = sc.n;
  $("text").innerHTML = glossary(val(sc.s));
  $("result").className = "result";
  $("wordBox").style.display = "none";

  const box = $("choices");
  box.innerHTML = "";
  sc.c.forEach(ch => {
    const b = document.createElement("button");
    b.className = "choice";
    b.innerHTML = glossary(val(ch[0]));
    b.addEventListener("click", e => {
      if (e.target.closest(".w")) return;   // klick på ett ord = visa förklaring, välj inte svaret
      choose(ch, b);
    });
    box.appendChild(b);
  });
  renderStats();
}

function choose(ch, btn) {
  if (S.done) return;
  S.done = true;
  const sc = S.seq[S.i];
  document.querySelectorAll(".choice").forEach(b => (b.disabled = true));
  btn.classList.add("picked");

  Object.entries(ch[1]).forEach(([k, v]) => {
    if (S.stats[k] !== undefined) S.stats[k] = clamp(S.stats[k] + v);
    else if (S.rel[k] !== undefined) S.rel[k] = clamp(S.rel[k] + v);
  });
  if (ch[3]) S.flags[ch[3]] = true;

  $("reply").innerHTML = glossary(val(ch[2]));
  $("tip").innerHTML = "<strong>Tips:</strong> " + glossary(sc.tip);
  $("result").className = "result show";
  $("nextBtn").textContent = S.i === S.seq.length - 1 ? "Se din dag" : "Fortsätt";
  renderStats();
  $("result").scrollIntoView({ behavior: "smooth", block: "center" });
}

function next() {
  if (S.i < S.seq.length - 1) { S.i++; loadScene(); window.scrollTo({ top: 0, behavior: "smooth" }); }
  else showEnd();
}

function relText(v) { return v >= 65 ? "😊 Nöjd" : v >= 40 ? "😐 Okej" : "😕 Inte nöjd"; }

function showEnd() {
  $("endIntro").textContent = `${S.name}, din första APL-dag är klar. Så här gick det:`;
  $("scores").innerHTML = Object.entries(STAT).map(([k, l]) =>
    `<div class="row"><span>${l}</span><strong>${S.stats[k]}/100</strong></div>`).join("");

  const sorted = Object.keys(STAT).sort((a, b) => S.stats[b] - S.stats[a]);
  const good = sorted.slice(0, 3).filter(k => S.stats[k] >= 55).map(k => GOOD[k]);
  const train = sorted.slice(-2).reverse().map(k => TRAIN[k]);
  if (S.flags.hid) train.push("Berätta alltid om ett misstag. Handledaren hittade varorna på fel hylla.");
  if (S.flags.late) train.push("Kom i tid eller säg till om du blir sen.");

  $("good").innerHTML = (good.length ? good : ["Du klarade din första dag. Det är ett bra första steg!"]).map(t => `<li>${t}</li>`).join("");
  $("train").innerHTML = train.map(t => `<li>${t}</li>`).join("");
  $("rels").innerHTML = Object.entries(REL).map(([k, l]) =>
    `<div class="row"><span>${l}</span><strong>${relText(S.rel[k])}</strong></div>`).join("");
  showScreen("end");
}

function start() {
  const n = $("name").value.trim();
  if (!n) { $("name").focus(); $("name").style.borderColor = "#9A5B50"; return; }
  S = newState(n);
  S.seq = buildSequence();
  loadScene();
  showScreen("game");
}

document.addEventListener("click", e => {
  const w = e.target.closest(".w");
  const box = $("wordBox");
  if (!w) return;
  box.innerHTML = `<strong>${w.textContent}</strong>: ${WORDS[w.dataset.w]}`;
  box.style.display = "block";
});

$("startBtn").addEventListener("click", start);
$("name").addEventListener("keydown", e => { if (e.key === "Enter") start(); });
$("nextBtn").addEventListener("click", next);
$("again").addEventListener("click", () => { $("name").value = ""; showScreen("start"); });