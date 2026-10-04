/* BUTIKEN INFÖR LAGEN – lärspel. Ärende -> val -> rätt/fel -> analysfråga -> nästa. */

const K = "https://www.konsumentverket.se/";
const LAW = {
  kkl:     ["Konsumentköplagen", K + "lagar/konsumentkoplagen-konsument/"],
  rekl:    ["Reklamation (fel på varan)", K + "konsumentratt-process/reklamera-vara/"],
  oppet:   ["Öppet köp och bytesrätt", K + "omrade/konsumentratt/"],
  distans: ["Ångerrätt vid nätköp", K + "lagar/lagen-om-distansavtal-och-avtal-utanfor-affarslokaler-konsument/"],
  marknad: ["Marknadsföring och reklam", K + "omrade/marknadsratt/"],
  pris:    ["Prisinformation", K + "lagar/prisinformationslagen-konsument/"],
  leverans:["Sen leverans", K + "konsumentratt-process/forsenad-leverans-vara/"],
  saker:   ["Produktsäkerhet", K + "omrade/produktsakerhet/"],
  ce:      ["CE-märkning", K + "omrade/produktsakerhet/"],
  mat:     ["Livsmedel och allergener", "https://www.livsmedelsverket.se/"],
  gdpr:    ["Personuppgifter (GDPR)", "https://www.imy.se/"],
  arn:     ["ARN – när butik och kund är oense", "https://www.arn.se/konsument/"]
};

const STORES = {
  fashion: "Klädbutik",
  food: "Livsmedelsbutik",
  digital: "Digitalbutik"
};

/* [kund, ämne, kunden säger, RÄTT svar, fel svar 1, fel svar 2, förklaring, lag] */
const CASES = {
  fashion: [
    ["Elin","Reklamation","Dragkedjan i min jacka gick sönder efter tre veckor. Jag vill reklamera den.",
      "Jag tittar på felet och tar emot din reklamation.","Använda kläder kan inte reklameras.","Du får bara reklamera om butiken har garanti.",
      "Reklamationsrätten följer av lag och gäller fel på varan. Garanti är frivillig. Du har reklamationsrätt i 3 år.","rekl"],
    ["Sara","Öppet köp","Jag köpte tröjan i butiken i går och har ångrat mig. Kan jag få pengarna tillbaka?",
      "Öppet köp är frivilligt. Jag kollar vad vår butik erbjuder och vilka villkor som gäller.","Ja, alla har 14 dagars ångerrätt i butik.","Nej, man kan aldrig lämna tillbaka något.",
      "Öppet köp och bytesrätt är inte lag. Butiken bestämmer själv om och hur länge den erbjuder det.","oppet"],
    ["Noah","Nätköp","Jag beställde skor i er webbshop och fick dem för tre dagar sedan. Jag vill ångra köpet.",
      "Vid köp på nätet finns i regel 14 dagars ångerrätt. Jag förklarar hur du går tillväga.","På kläder finns aldrig ångerrätt.","Du har alltid 30 dagar vid nätköp.",
      "Vid distansköp är ångerrätten i regel 14 dagar från att du fått varan.","distans"],
    ["Maja","Pris","På hyllan står 399 kr men i kassan blir det 499 kr. Vilket pris gäller?",
      "Jag kontrollerar skylten och kassapriset och reder ut felet.","Kassan har alltid rätt.","Du får välja vilket pris du vill.",
      "Prisinformationen ska vara korrekt och tydlig. Därför ska du undersöka felet och inte gissa.","pris"],
    ["Leo","Reklam","Er annons säger '50 % på ALLA jackor' men flera jackor är inte rabatterade.",
      "Jag kontrollerar annonsen. Reklam får inte vara vilseledande.","Det är bara reklam, det behöver inte stämma.","Priset står på lappen, så annonsen spelar ingen roll.",
      "Marknadsföring får inte vilseleda. Ordet 'alla' måste stämma.","marknad"],
    ["Ida","Reklamation utan kvitto","Min tröja har fått hål efter ett år, men jag har tappat kvittot.",
      "Du kan visa köpet på annat sätt, till exempel med ett kontoutdrag. Jag tar emot reklamationen.","Utan kvitto kan vi inte hjälpa dig.","Efter ett år är det för sent att reklamera.",
      "Reklamationsrätten är 3 år. Kvitto är bara ett sätt att visa köpet.","rekl"],
    ["Omar","Reklamera i tid","Sömmen på skjortan gick upp för tre månader sedan. Jag reklamerar först nu.",
      "Man ska klaga inom 2 månader från att man upptäckte felet. Jag förklarar det och tar ändå emot ärendet.","Man kan reklamera hur sent som helst.","Man måste reklamera samma dag.",
      "Du ska reklamera inom skälig tid, och 2 månader efter att du upptäckte felet räknas som skäligt. Annars kan du förlora rätten.","rekl"],
    ["Alva","Sen leverans","Jag beställde skor för 40 dagar sedan. Ingen leveranstid angavs. Var är de?",
      "Utan angiven tid är varan sen efter 30 dagar. Jag kollar din order direkt.","Leverans kan ta hur lång tid som helst.","Du måste ändå betala nu.",
      "Om ingen leveranstid är avtalad är varan sen efter 30 dagar. Då kan du kräva leverans.","leverans"],
    ["Hugo","Rea","Jag köpte en klänning på rea. Nu är sömmen trasig. Går det att reklamera?",
      "Ja, reklamationsrätten gäller även varor som sålts till nedsatt pris.","Nej, rea-varor kan inte reklameras.","Rea-varor har bara 1 månads reklamationsrätt.",
      "Konsumentköplagen gäller även varor till nedsatt pris.","kkl"],
    ["Nora","Begagnat","Jag köpte en begagnad jacka i er secondhand-butik. Den är trasig. Kan jag klaga?",
      "Ja. Konsumentköplagen gäller även begagnade varor när du köper av ett företag.","Nej, begagnat säljs utan rättigheter.","Bara nya varor kan reklameras.",
      "Lagen gäller köp av företag, även begagnade varor.","kkl"],
    ["Samir","Skylt","Er skylt säger 'Ingen reklamation på varor'. Stämmer det?",
      "Nej. Företag får inte ge sämre rättigheter än lagen, så skylten gäller inte.","Ja, skylten är butikens regel.","Ja, du har accepterat den genom att handla.",
      "Konsumentköplagen är tvingande. Butiken får ge bättre villkor, aldrig sämre.","kkl"],
    ["Ella","För sent för ångerrätt","Jag beställde en tröja på nätet för 20 dagar sedan och vill ångra köpet nu.",
      "Den vanliga ångerfristen är 14 dagar, så den har gått ut. Jag kollar om vi ger längre tid.","Du kan ångra när du vill.","Du har alltid 30 dagars ångerrätt.",
      "Lagstadgad ångerrätt vid distansköp är i regel 14 dagar. Butiken kan frivilligt ge mer.","distans"],
    ["Adam","Fri frakt","Annonsen sa 'fri frakt' men i kassan kostar frakten 79 kr.",
      "Jag kontrollerar annonsen. Villkor och priser ska vara tydliga, annars kan den vilseleda.","Små villkor behöver inte stå i annonsen.","Det är kundens fel som inte läste.",
      "Marknadsföring får inte vilseleda om pris och villkor.","marknad"],
    ["Mira","Prislapp saknas","Det finns ingen prislapp på klänningen. Vad kostar den?",
      "Jag kollar priset och sätter upp en prislapp direkt. Priset ska synas.","Du får fråga i kassan, då sätter vi priset.","Vi bestämmer priset när du betalar.",
      "Butiken ska ange priset tydligt, till exempel på varan eller hyllkanten.","pris"],
    ["Lucas","Reklamation efter 2,5 år","Min väska gick sönder efter två och ett halvt år. Kan jag reklamera?",
      "Ja, reklamationsrätten är 3 år. Efter 2 år måste du dock själv kunna visa att felet fanns från början.","Nej, efter ett år är det slut.","Nej, efter 2 år är det slut.",
      "Reklamationsrätten är 3 år. De första 2 åren måste företaget bevisa att felet inte fanns från början, därefter kunden.","rekl"]
  ],

  food: [
    ["Amina","Allergi","Jag är allergisk mot mjölk. Innehåller den här färdigmaten mjölk?",
      "Jag kontrollerar innehållsförteckningen innan jag svarar.","Jag tror inte det.","Du får googla själv.",
      "Gissa aldrig om allergener. Kontrollera produktens information.","mat"],
    ["Oskar","Olika pris","Samma vara har olika pris på två hyllor. Vilket gäller?",
      "Jag kontrollerar vilken vara skyltarna gäller och rättar felet.","Jag tar bort den billigaste skylten utan att kolla.","Kassan gäller, punkt slut.",
      "Prisinformationen ska vara korrekt och tydlig. Undersök först.","pris"],
    ["Fatima","Trasig vara","Jag köpte en vara här som är trasig. Jag vill reklamera.",
      "Jag tar reda på vad felet är och när varan köptes.","Varor kan aldrig reklameras.","Kasta den och köp en ny.",
      "Livsmedel räknas som varor. Konsumentköplagen gäller när en konsument köper av ett företag.","kkl"],
    ["Vera","Svenska jordgubbar","Skylten säger 'svenska jordgubbar' men förpackningen visar ett annat land.",
      "Jag kontrollerar uppgifterna och rättar skylten.","Reklam får säga vad som helst.","Strunta i skylten.",
      "Påståenden om en produkt måste stämma, annars är det vilseledande marknadsföring.","marknad"],
    ["Bo","Sista förbrukningsdag","Yoghurten har 'sista förbrukningsdag' i går. Kan jag köpa den?",
      "Nej. Varor efter sista förbrukningsdag ska inte säljas. Jag tar bort den.","Ja, vi sänker priset.","Ja, den är säkert bra ändå.",
      "'Sista förbrukningsdag' handlar om livsmedelssäkerhet. Efter datumet får varan inte säljas.","mat"],
    ["Klara","Bäst före","Mjölken har 'bäst före' i går. Måste ni kasta den direkt?",
      "Bäst före handlar om kvalitet. Varan kan ofta säljas om den är bra. Jag kontrollerar den.","Ja, det är förbjudet att sälja varor efter bäst före.","Bäst före betyder att den är farlig.",
      "Efter 'bäst före' kan varan ofta vara bra, medan 'sista förbrukningsdag' är ett säkerhetsdatum.","mat"],
    ["Tobias","Nötallergi","Jag är allergisk mot nötter. Finns det nötter i bakverken i disken?",
      "Jag kollar innehållet och frågar ansvarig. Allergiinformation måste finnas.","Allergi är kundens ansvar.","Jag gissar att det är okej.",
      "Allergeninformation är viktig. Kontrollera hellre en gång för mycket.","mat"],
    ["Hanna","Kyldisk","Kycklingen i kyldisken känns varm. Är den okej?",
      "Jag meddelar ansvarig och tar bort varan tills temperaturen är kontrollerad.","Kyckling klarar rumstemperatur.","Vi sänker priset och säljer den.",
      "Kylvaror måste hållas kalla för att vara säkra.","mat"],
    ["Joel","Erbjudande","Skylten säger '2 för 40 kr' men kassan tar 25 kr per vara.",
      "Jag kontrollerar erbjudandet och ser till att priset stämmer med skylten.","Kassan gäller alltid.","Det är kundens problem.",
      "Priser ska vara korrekta och tydliga. Rätta felet.","pris"],
    ["Elsa","Mögligt bröd","Brödet jag köpte i går är mögligt. Jag vill reklamera.",
      "Det är fel på varan. Jag tar emot reklamationen och erbjuder pengarna tillbaka eller en ny vara.","Bröd kan inte reklameras.","Du fick ju äta det först.",
      "Fel på en vara ska åtgärdas utan kostnad för kunden.","rekl"],
    ["Max","Kundklubb","Jag vill gå med i er kundklubb. Vad gör ni med mina uppgifter?",
      "Jag förklarar vilka uppgifter som behövs och varför. Vi samlar bara in det som behövs.","Vi samlar in allt, det kan vara bra senare.","GDPR gäller bara banker.",
      "Personuppgifter ska ha ett tydligt syfte och bara det som behövs ska samlas in.","gdpr"],
    ["Zara","Ekologiskt","Skylten säger 'ekologiskt', men förpackningen visar inget ekomärke.",
      "Jag kontrollerar att påståendet stämmer innan skylten sitter kvar.","Skylten får säga vad som helst.","Kunden ska inte bry sig.",
      "Påståenden i marknadsföringen måste vara riktiga.","marknad"],
    ["Ali","Kvitto kastat","Jag köpte frysta fiskpinnar som är dåliga, men kvittot är borta.",
      "Du kan visa köpet med ett kontoutdrag. Jag tar emot reklamationen.","Utan kvitto kan vi inte göra något.","Du får bara klaga med kvitto.",
      "Kvitto är ett sätt att visa köpet, men inte det enda.","rekl"],
    ["Frida","Sen leverans","Jag beställde en kaffemaskin för fem veckor sedan. Ingen leveranstid var avtalad.",
      "Då är varan sen efter 30 dagar. Jag kollar ordern och ser till att den levereras.","Leverans kan ta hur lång tid som helst.","Du måste betala igen.",
      "Utan avtalad leveranstid är varan sen efter 30 dagar.","leverans"],
    ["Gustav","Butiken säger nej","Er butik sa nej till min reklamation, men jag tycker att jag har rätt. Vad kan jag göra?",
      "Du kan anmäla till ARN, Allmänna reklamationsnämnden, som ger en rekommendation.","Då finns inget du kan göra.","Du måste köpa en ny vara.",
      "ARN prövar tvister mellan konsument och företag. De flesta företag följer deras rekommendation.","arn"]
  ],

  digital: [
    ["Daniel","Reklamation","Mina hörlurar slutade fungera efter en tid. Jag vill reklamera.",
      "Jag tar reda på felet och när köpet gjordes. Reklamationsrätten följer av lag.","Elektronik kan bara reklameras om vi har garanti.","Du måste köpa nya.",
      "Garanti är frivillig, reklamationsrätt är lag.","rekl"],
    ["Nora","Farlig laddare","Laddaren blir väldigt varm och luktar konstigt. Kan jag köpa den ändå?",
      "Nej. Jag stoppar försäljningen tills säkerheten är kontrollerad.","Det är kundens val.","Vi sänker priset och varnar.",
      "Produkter som säljs till konsumenter ska vara säkra. Pris eller varning ändrar inte det.","saker"],
    ["Isak","CE-märkning","Måste den här elektroniska produkten vara CE-märkt?",
      "Jag kontrollerar om produktkategorin kräver CE-märkning.","Alla produkter måste alltid ha CE.","Butiken kan sätta dit CE själv.",
      "CE krävs för vissa produktkategorier. Det är tillverkaren som CE-märker.","ce"],
    ["Linnea","Nätköp","Jag beställde ett tangentbord för fyra dagar sedan och vill ångra köpet.",
      "Vid nätköp finns i regel 14 dagars ångerrätt. Jag förklarar hur du gör.","Elektronik har aldrig ångerrätt.","Hitta en ny köpare själv.",
      "Distansavtalslagen ger i regel 14 dagars ångerrätt vid köp på nätet.","distans"],
    ["Elias","Kundklubb","Jag vill gå med i er kundklubb. Vilka uppgifter behöver ni?",
      "Jag förklarar vilka uppgifter som behövs och varför.","Vi samlar in allt vi kan få.","GDPR gäller bara myndigheter.",
      "Samla bara in det som behövs och förklara syftet.","gdpr"],
    ["Ravi","Spel som kraschar","Spelet jag köpte i er webbshop startar inte. Kan jag klaga?",
      "Ja. Lagen gäller även digitalt innehåll. Fel som visar sig inom ett år är företagets ansvar.","Nej, digitala varor kan inte reklameras.","Bara fysiska varor har rättigheter.",
      "Konsumentköplagen gäller även appar, spel och digitala tjänster.","kkl"],
    ["Sofia","Mobil efter 1,5 år","Min mobil har gått sönder efter ett och ett halvt år. Jag vill reklamera.",
      "Inom två år räknas felet som ursprungligt, och företaget måste visa att felet inte fanns från början.","Efter 6 månader är det kundens ansvar.","Efter ett år har du inga rättigheter.",
      "De första 2 åren har företaget bevisbördan. Det gäller sedan 2022.","rekl"],
    ["Ville","Tappad mobil","Jag tappade mobilen i vatten. Kan jag reklamera den?",
      "Fel som du själv orsakat omfattas inte. Vi undersöker ändå vad som hänt.","Alla fel kan alltid reklameras.","Vi byter alltid mobilen gratis.",
      "Företaget ansvarar för ursprungliga fel, inte för skador kunden orsakat.","rekl"],
    ["Maja","Fel vara","Jag beställde en svart skärm men fick en vit. Vad gäller?",
      "Varan avviker från det ni kom överens om. Det är ett fel och jag tar emot reklamationen.","Det är inget fel, det är bara en färg.","Du måste köpa den vita.",
      "En vara är felaktig om den avviker från avtalet.","rekl"],
    ["Kim","Återkallad powerbank","Leverantören har återkallat powerbanken som står på hyllan.",
      "Jag tar bort den från hyllan, stoppar försäljningen och informerar kunderna.","Vi säljer slut den först.","Vi väntar tills någon klagar.",
      "Farliga produkter ska inte säljas. Vid återkallelse ska butiken agera direkt.","saker"],
    ["Elin","Radera konto","Jag vill att ni raderar mitt kundkonto och mina uppgifter.",
      "I många fall har du rätt att få uppgifter raderade. Jag lämnar vidare till ansvarig.","Vi sparar alltid uppgifterna.","GDPR gäller inte butiker.",
      "Enligt GDPR har kunden ofta rätt att få personuppgifter raderade.","gdpr"],
    ["Jonas","Gratis hörlurar","Annonsen sa 'gratis hörlurar', men man måste köpa en dyr mobil.",
      "Jag kontrollerar annonsen. Villkoren måste vara tydliga, annars kan den vilseleda.","Det är okej att dölja villkor.","Det är kundens fel.",
      "Villkor ska framgå tydligt. Annars kan reklamen vara vilseledande.","marknad"],
    ["Tilda","Datorpris","Datorn kostar 4 999 kr i hyllan men 5 999 kr i kassan.",
      "Jag kontrollerar prisinformationen och rättar felet.","Kassan har alltid rätt.","Du får bestämma priset.",
      "Prisinformationen ska vara korrekt och tydlig.","pris"],
    ["Ahmad","Sen leverans","Jag beställde en skärm för 35 dagar sedan. Ingen leveranstid angavs.",
      "Då är varan sen efter 30 dagar. Jag kollar ordern och ser till att den levereras.","Leverans kan ta hur lång tid som helst.","Du måste vänta ett år.",
      "Utan avtalad leveranstid är varan sen efter 30 dagar.","leverans"],
    ["Siri","CE är inte kvalitet","Är CE-märket ett bevis på att produkten har bäst kvalitet?",
      "Nej. CE visar att tillverkaren säger att kraven i EU är uppfyllda. Det är inget kvalitetsbetyg.","Ja, CE betyder bäst kvalitet.","CE betyder 'tillverkad i Europa'.",
      "CE-märket är ett krav på vissa produkter, inte ett betyg.","ce"],
    ["Anton","Nätköp, fel vara","Jag ångrade mitt nätköp av ett headset efter 9 dagar. Kan jag lämna tillbaka?",
      "Ja, du ligger inom de 14 dagarna. Jag förklarar hur du ångrar köpet.","Nej, headset kan aldrig lämnas tillbaka.","Nej, bara efter 30 dagar.",
      "Vid distansköp finns i regel 14 dagars ångerrätt.","distans"]
  ]
};

const $ = id => document.getElementById(id);
const shuffle = a => a.map(v => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map(x => x[1]);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

let S = {};

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  $(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function freshState() {
  return { name: "", store: null, i: 0, rep: 100, know: 0, solved: 0, wrong: [], answered: false, analysed: false };
}

function startGame() {
  const n = $("playerName").value.trim();
  if (!n) { $("playerName").focus(); $("playerName").style.borderColor = "#9A5B50"; return; }
  S.name = n;
  showScreen("screen-store");
}

function selectStore(store) {
  const name = S.name;
  S = freshState();
  S.name = name;
  S.store = store;
  S.cases = shuffle(CASES[store]);
  $("storeTitle").textContent = STORES[store];
  loadCase();
  showScreen("screen-game");
}

function dash() {
  $("reputation").textContent = S.rep;
  $("knowledge").textContent = S.know;
  $("solved").textContent = S.solved;
  $("storeName").textContent = STORES[S.store];
  $("progressBar").style.width = `${(S.i / S.cases.length) * 100}%`;
}

function loadCase() {
  const c = S.cases[S.i];
  S.answered = false;
  S.analysed = false;
  S.wasRight = false;

  $("gameStep").textContent = `ÄRENDE ${S.i + 1} AV ${S.cases.length}`;
  $("customerName").textContent = c[0];
  $("customerType").textContent = c[1];
  $("customerAvatar").textContent = c[0][0];
  $("customerSpeaker").textContent = c[0] + ":";
  $("customerMessage").textContent = c[2];
  $("feedback").className = "feedback-card";
  $("analysis").className = "feedback-card";
  $("nextBtn").style.display = "none";
  $("sourceLink").style.display = "none";

  const opts = shuffle([{ t: c[3], ok: true }, { t: c[4], ok: false }, { t: c[5], ok: false }]);
  const area = $("choiceArea");
  area.innerHTML = "";
  opts.forEach((o, idx) => {
    const b = document.createElement("button");
    b.className = "choice";
    b.innerHTML = `<strong>${"ABC"[idx]}</strong> ${o.t}`;
    b.addEventListener("click", () => answer(o.ok, b));
    area.appendChild(b);
  });
  dash();
}

function answer(ok, btn) {
  if (S.answered) return;
  S.answered = true;
  S.wasRight = ok;
  const c = S.cases[S.i];

  document.querySelectorAll(".choice").forEach(b => (b.disabled = true));
  btn.classList.add(ok ? "right" : "wrong");

  if (ok) { S.know += 1; }
  else { S.rep = clamp(S.rep - 8, 0, 100); S.wrong.push(c); }
  S.solved++;

  $("feedback").className = `feedback-card show ${ok ? "good" : "bad"}`;
  $("feedbackTitle").textContent = ok ? "✔ Rätt!" : "✘ Fel";
  $("feedbackText").textContent = ok
    ? c[6]
    : "Det svaret var inte bäst. Rätt svar var: " + c[3] + " " + c[6];

  showAnalysis(c);
  dash();
  $("feedback").scrollIntoView({ behavior: "smooth", block: "start" });
}

function showAnalysis(c) {
  const used = [...new Set(S.cases.map(x => x[7]))].filter(k => k !== c[7]);
  const options = shuffle([c[7], ...shuffle(used).slice(0, 2)]);
  $("analysis").className = "feedback-card show warn";
  $("analysisResult").textContent = "";
  const box = $("analysisChoices");
  box.innerHTML = "";
  options.forEach(k => {
    const b = document.createElement("button");
    b.className = "choice";
    b.textContent = LAW[k][0];
    b.addEventListener("click", () => analyse(k === c[7], b, c));
    box.appendChild(b);
  });
}

function analyse(ok, btn, c) {
  if (S.analysed) return;
  S.analysed = true;
  document.querySelectorAll("#analysisChoices .choice").forEach(b => (b.disabled = true));
  btn.classList.add(ok ? "right" : "wrong");

  if (ok) S.know += 1; else S.rep = clamp(S.rep - 3, 0, 100);

  $("analysisResult").textContent = ok
    ? "✔ Rätt analys! Ärendet handlar om " + LAW[c[7]][0] + "."
    : "✘ Fel. Ärendet handlar om " + LAW[c[7]][0] + ".";

  const link = $("sourceLink");
  link.href = LAW[c[7]][1];
  link.textContent = "Läs mer: " + LAW[c[7]][0];
  link.style.display = "inline-block";

  const next = $("nextBtn");
  next.textContent = S.i === S.cases.length - 1 ? "Visa resultat" : "Nästa ärende";
  next.style.display = "inline-block";
  dash();
}

function nextCase() {
  if (!S.analysed) return;
  if (S.i < S.cases.length - 1) { S.i++; loadCase(); window.scrollTo({ top: 0, behavior: "smooth" }); }
  else showResult();
}

function showResult() {
  const max = S.cases.length * 2;
  $("finalRep").textContent = S.rep;
  $("resultIntro").textContent = `${S.name}, din arbetsdag i ${STORES[S.store].toLowerCase()} är slut. Du fick ${S.know} av ${max} poäng.`;
  $("resultMessage").textContent =
    S.rep >= 90 ? "Mycket bra! Du höll butikens förtroende högt."
    : S.rep >= 70 ? "Bra jobbat. Titta på ärendena du missade nedan."
    : "Öva mer. Läs länkarna nedan och försök igen.";

  const list = $("resultList");
  if (S.wrong.length === 0) {
    list.innerHTML = "<li>Du svarade rätt på alla ärenden!</li>";
  } else {
    list.innerHTML = "<li><strong>Repetera dessa:</strong></li>" + S.wrong.map(c =>
      `<li>${c[0]} (${c[1]}): <a href="${LAW[c[7]][1]}" target="_blank" rel="noopener">${LAW[c[7]][0]}</a></li>`).join("");
  }
  showScreen("screen-result");
}

function showLawBook() {
  $("lawsTitle").textContent = STORES[S.store] + " – lagbok";
  $("lawsIntro").textContent = "Här är områdena som spelet tränar på. Klicka för att läsa mer hos myndigheten.";
  const keys = [...new Set(CASES[S.store].map(c => c[7]))];
  $("lawsList").innerHTML = keys.map(k =>
    `<div class="law-item"><strong>${LAW[k][0]}</strong> <a href="${LAW[k][1]}" target="_blank" rel="noopener">Läs mer →</a></div>`).join("");
  showScreen("screen-laws");
}

function restart() {
  S = freshState();
  $("playerName").value = "";
  showScreen("screen-start");
}

S = freshState();
$("startNameBtn").addEventListener("click", startGame);
$("playerName").addEventListener("keydown", e => { if (e.key === "Enter") startGame(); });
document.querySelectorAll(".store-choice").forEach(b => b.addEventListener("click", () => selectStore(b.dataset.store)));
$("nextBtn").addEventListener("click", nextCase);
$("restartBtn").addEventListener("click", restart);
$("showRulesBtn").addEventListener("click", showLawBook);
$("backToGameBtn").addEventListener("click", () => showScreen("screen-game"));