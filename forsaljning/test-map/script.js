const topics = [
  {
    id:"purpose", icon:"🎯", eyebrow:"GRUNDEN", title:"Syfte och mål",
    intro:"Konsumenträtt handlar om regler som skyddar personer när de köper varor eller tjänster av företag.",
    body:`<p>Reglerna ska göra handeln tryggare och tydligare. Kunden ska få det som företaget har lovat och kunna få hjälp om något blir fel.</p><ul><li>Kunden ska få tydlig information.</li><li>Företaget ska följa de lagar som gäller för köpet.</li><li>Kunden ska veta vart hen kan vända sig vid problem.</li></ul>`,
    example:"En kund köper en mobiltelefon. Butiken berättar att mobilen har 128 GB lagring. Om kunden får en modell med mindre lagring stämmer varan inte med informationen som gavs.",
    remember:"Kom ihåg: Konsumenträtt = regler som skyddar kunden när kunden handlar av ett företag.",
    question:"Varför finns konsumentlagarna?",
    answer:"För att skydda kunden och skapa tydliga och rättvisa regler mellan kunden och företaget."
  },
  {
    id:"laws", icon:"📚", eyebrow:"LAGAR ATT KÄNNA TILL", title:"Viktiga konsumentlagar",
    intro:"Olika lagar gäller i olika situationer. En butiksägare behöver veta vilken lag som passar till köpet.",
    body:`<ul><li><strong>Konsumentköplagen:</strong> gäller när en privatperson köper en vara av ett företag.</li><li><strong>Konsumenttjänstlagen:</strong> gäller vissa tjänster som företag utför åt privatpersoner, till exempel reparation av en cykel.</li><li><strong>Distansavtalslagen:</strong> gäller bland annat köp på nätet och via telefon. Den ger ofta 14 dagars ångerrätt.</li><li><strong>Marknadsföringslagen:</strong> reklam får inte vara vilseledande eller ge fel bild.</li><li><strong>Prisinformationslagen:</strong> prisinformation ska vara tydlig och korrekt.</li><li><strong>Avtalsvillkorslagen:</strong> skyddar konsumenter mot oskäliga villkor i avtal.</li><li><strong>Produktsäkerhetslagen:</strong> företag får inte tillhandahålla farliga konsumentprodukter.</li><li><strong>Köplagen:</strong> gäller bland annat köp mellan företag och mellan privatpersoner.</li></ul>`,
    example:"En butik skriver ”50 % rabatt” på en skylt. Då måste erbjudandet vara korrekt och prisinformationen får inte lura kunden.",
    remember:"Kom ihåg: Konsumentköplagen gäller varor. Konsumenttjänstlagen gäller vissa arbeten och tjänster.",
    question:"Vilken lag gäller vanligtvis när en privatperson köper en vara av en butik?",
    answer:"Konsumentköplagen."
  },
  {
    id:"contracts", icon:"🤝", eyebrow:"VEM KÖPER AV VEM?", title:"Köp och avtalsformer",
    intro:"Bokstäverna visar vilka som köper och säljer. Det hjälper oss att förstå vilka regler som gäller.",
    body:`<ul><li><strong>B2B – Business to Business:</strong> ett företag säljer till ett annat företag. Exempel: en grossist säljer varor till en butik.</li><li><strong>B2C – Business to Consumer:</strong> ett företag säljer till en privatperson. Exempel: en butik säljer skor till en kund.</li><li><strong>C2C – Consumer to Consumer:</strong> en privatperson säljer till en annan privatperson. Exempel: någon säljer en begagnad cykel till en granne.</li></ul><p>Vid B2C gäller ofta konsumentlagar. Vid B2B och C2C kan till exempel köplagen gälla. Avtalet och situationen spelar också roll.</p>`,
    example:"En skoaffär säljer ett par skor till Sara. Det är B2C eftersom säljaren är ett företag och köparen är en privatperson.",
    remember:"Minnesregel: B = Business (företag). C = Consumer (konsument/privatperson).",
    question:"En butik säljer en jacka till en privatperson. Är det B2B, B2C eller C2C?",
    answer:"B2C – ett företag säljer till en privatperson."
  },
  {
    id:"goods", icon:"📦", eyebrow:"NÄR EN VARA HAR FEL", title:"Reklamation av vara",
    intro:"Att reklamera betyder att kunden kontaktar butiken och klagar på ett fel på en vara.",
    body:`<p>Om en privatperson köper en vara av ett företag gäller konsumentköplagen.</p><ul><li>Kunden har normalt <strong>3 år</strong> på sig att reklamera fel på varan.</li><li>Kunden ska klaga inom <strong>2 månader</strong> från att felet upptäcktes. Då räknas reklamationen alltid som gjord i rätt tid.</li><li>Felet ska vara ett fel som företaget ansvarar för – till exempel ett ursprungligt fel eller att varan inte stämmer med vad som avtalats.</li><li>Under de första <strong>2 åren</strong> är utgångspunkten att företaget ansvarar för fel som visar sig, om företaget inte kan visa något annat.</li></ul><p>En lösning kan vara att butiken lagar varan eller byter den. I vissa fall kan kunden få prisavdrag eller häva köpet.</p>`,
    example:"En kund köper hörlurar. Efter fyra månader slutar ena sidan att fungera trots normal användning. Kunden kontaktar butiken och reklamerar. Butiken behöver undersöka felet och hantera kundens krav enligt lagen.",
    remember:"Viktigt: 3 år är reklamationstiden för varor – det betyder inte att alla skador automatiskt ersätts. Felet måste omfattas av lagen.",
    question:"Hur lång är reklamationsrätten för en vara som en privatperson köper av ett företag?",
    answer:"Normalt 3 år. Kunden ska också klaga inom 2 månader från att felet upptäcktes."
  },
  {
    id:"services", icon:"🛠️", eyebrow:"NÄR ETT ARBETE HAR FEL", title:"Reklamation av tjänst",
    intro:"En tjänst är ett arbete som ett företag gör åt en kund. Kunden kan klaga om arbetet inte är gjort på rätt sätt.",
    body:`<p>Konsumenttjänstlagen gäller bland annat arbete på saker, till exempel reparation av en cykel eller bil, och arbete på hus eller andra byggnader.</p><ul><li>Arbetet ska utföras på ett fackmässigt sätt – alltså ordentligt och med rätt kunskap.</li><li>Företaget ska ta hänsyn till kundens intressen.</li><li>Kunden ska klaga inom rimlig tid efter att felet upptäckts.</li><li>För arbete på lösa saker är reklamationstiden normalt 3 år. För arbete på byggnader och annan fast egendom kan den vara 10 år.</li></ul>`,
    example:"En kund lämnar in sin cykel för reparation. När kunden hämtar cykeln fungerar bromsen fortfarande dåligt. Kunden kan klaga på arbetet och be verkstaden rätta till felet.",
    remember:"Fackmässigt betyder att arbetet ska göras på ett professionellt och kunnigt sätt.",
    question:"Vilken lag gäller ofta när en verkstad reparerar en privatpersons cykel?",
    answer:"Konsumenttjänstlagen."
  },
  {
    id:"returns", icon:"↩️", eyebrow:"TRE OLIKA BEGREPP", title:"Garanti, öppet köp och ångerrätt",
    intro:"De här tre begreppen betyder olika saker. Det är viktigt att butiken inte blandar ihop dem.",
    body:`<ul><li><strong>Garanti:</strong> ett frivilligt löfte från företaget eller tillverkaren. Garantin ger extra rättigheter, men får inte ta bort kundens rätt enligt lagen.</li><li><strong>Öppet köp:</strong> butiken låter kunden lämna tillbaka en vara och få pengarna tillbaka. Butiken bestämmer om den erbjuder öppet köp och vilka villkor som gäller.</li><li><strong>Bytesrätt:</strong> butiken låter kunden byta till en annan vara. Det är frivilligt för butiken.</li><li><strong>Ångerrätt:</strong> vid många köp på nätet eller via telefon har kunden 14 dagar på sig att ångra köpet. Det finns undantag. Vid vanliga köp i fysisk butik finns ingen lagstadgad ångerrätt.</li></ul>`,
    example:"Ali köper en tröja i en fysisk butik och ångrar färgen hemma. Han har inte automatiskt rätt att lämna tillbaka den. Men om butiken erbjuder öppet köp kan han följa butikens villkor. Om han i stället köper tröjan på nätet har han normalt 14 dagars ångerrätt, med vissa undantag.",
    remember:"Minnesregel: Garanti = extra löfte. Öppet köp = butikens erbjudande. Ångerrätt = rätt enligt lag vid många distansköp.",
    question:"Har kunden alltid 14 dagars ångerrätt när kunden handlar i en vanlig fysisk butik?",
    answer:"Nej. Ångerrätt gäller normalt vid distansköp, till exempel på nätet. I fysisk butik är öppet köp frivilligt."
  },
  {
    id:"disputes", icon:"⚖️", eyebrow:"NÄR MAN INTE KOMMER ÖVERENS", title:"Myndigheter och tvister",
    intro:"En tvist betyder att kunden och företaget inte är överens. Det finns platser där kunden kan få information eller få saken prövad.",
    body:`<ul><li><strong>Konsumentverket:</strong> arbetar för att företag ska följa konsumentregler. Här finns information om konsumenters rättigheter.</li><li><strong>ARN – Allmänna reklamationsnämnden:</strong> prövar många tvister mellan konsumenter och företag. ARN ger en rekommendation om hur tvisten bör lösas.</li><li><strong>Kommunal konsumentvägledning:</strong> vissa kommuner erbjuder hjälp och vägledning till konsumenter.</li><li><strong>Domstol:</strong> en tvist kan i vissa fall tas vidare till domstol.</li></ul><p>Kunden bör först kontakta företaget och förklara problemet. Det är bra att spara kvitto, mejl, bilder och annan information.</p>`,
    example:"En kund reklamerar en trasig vara, men butiken säger nej. Kunden och butiken kommer inte överens. Kunden kan läsa om sina rättigheter och undersöka om ärendet kan anmälas till ARN.",
    remember:"ARN bestämmer inte åt kunden i alla situationer. Nämnden prövar ärendet och lämnar en rekommendation.",
    question:"Vad står ARN för?",
    answer:"Allmänna reklamationsnämnden."
  }
];

const buttons = [...document.querySelectorAll(".branch")];
let current = 0;
const byId = id => topics.findIndex(t => t.id === id);

function renderTopic(index) {
  current = Math.max(0, Math.min(topics.length - 1, index));
  const t = topics[current];
  buttons.forEach((button, i) => {
    const active = i === current;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.getElementById("detailIcon").textContent = t.icon;
  document.getElementById("detailEyebrow").textContent = t.eyebrow;
  document.getElementById("detailTitle").textContent = t.title;
  document.getElementById("detailIntro").textContent = t.intro;
  document.getElementById("detailBody").innerHTML = t.body;
  document.getElementById("detailExample").textContent = t.example;
  document.getElementById("detailRemember").textContent = t.remember;
  document.getElementById("detailQuestion").textContent = t.question;
  const answer = document.getElementById("detailAnswer");
  answer.textContent = "Svar: " + t.answer;
  answer.hidden = true;
  document.getElementById("revealAnswer").innerHTML = 'Visa svar <span>＋</span>';
  document.getElementById("detailStep").textContent = `OMRÅDE ${String(current + 1).padStart(2,"0")} AV 07`;
  document.getElementById("navPosition").textContent = `${current + 1} / ${topics.length}`;
  document.getElementById("prevTopic").disabled = current === 0;
  document.getElementById("nextTopic").disabled = current === topics.length - 1;
  const card = document.querySelector(".detail-card");
  card.style.animation = "none";
  void card.offsetWidth;
  card.style.animation = "rise .35s ease both";
}

buttons.forEach(button => button.addEventListener("click", () => {
  renderTopic(byId(button.dataset.topic));
  if (window.innerWidth < 720) document.getElementById("detail").scrollIntoView({behavior:"smooth",block:"start"});
}));
document.getElementById("prevTopic").addEventListener("click", () => renderTopic(current - 1));
document.getElementById("nextTopic").addEventListener("click", () => renderTopic(current + 1));
document.getElementById("revealAnswer").addEventListener("click", () => {
  const answer = document.getElementById("detailAnswer");
  answer.hidden = !answer.hidden;
  document.getElementById("revealAnswer").innerHTML = answer.hidden ? 'Visa svar <span>＋</span>' : 'Dölj svar <span>−</span>';
});
renderTopic(0);

// Open/close the vertical tree branches. Only one branch stays open at a time.
document.querySelectorAll(".tree-branch").forEach(button => {
  button.addEventListener("click", () => {
    const topic = button.dataset.topic;
    const panel = document.querySelector(`[data-child="${topic}"]`);
    const shouldOpen = button.getAttribute("aria-expanded") !== "true";
    document.querySelectorAll(".tree-branch").forEach(other => {
      other.setAttribute("aria-expanded","false");
      const otherPanel = document.querySelector(`[data-child="${other.dataset.topic}"]`);
      if (otherPanel) otherPanel.hidden = true;
    });
    if (shouldOpen) {
      button.setAttribute("aria-expanded","true");
      panel.hidden = false;
    }
  });
});
document.querySelectorAll(".tree-open-detail").forEach(button => {
  button.addEventListener("click", () => {
    const index = topics.findIndex(t => t.id === button.dataset.openTopic);
    renderTopic(index);
    document.getElementById("detail").scrollIntoView({behavior:"smooth",block:"start"});
  });
});
