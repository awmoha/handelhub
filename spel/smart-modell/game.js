
const $ = (id) => document.getElementById(id);

let player = "";
let score = 0;
let level = 0;
let task = 0;
let hints = 2;
let hintUsed = false;
let answered = false;
let selection = null;

let matchAnswers = {};
let sortAnswers = {};

let buildAnswers = {
  specific: "",
  measurable: "",
  accepted: "",
  relevant: "",
  timeBound: ""
};

// =====================================
// LEVELS AND QUESTIONS
// =====================================

const levels = [
  {
    title: "Hitta rätt mål",
    desc: "Granska mål och upptäck vad som gör dem SMARTa.",
    tasks: [
      {
        type: "choice",
        story: "Sarah vill utveckla butiken och har skrivit ett förslag till mål.",
        q: "Vilket mål är tydligast och mest möjligt att följa upp?",
        opts: [
          "Vi ska bli mycket bättre på service.",
          "Vi ska öka kundnöjdheten med 10 procent före den 30 juni genom att utbilda personalen.",
          "Alla kunder ska alltid vara nöjda.",
          "Vi ska arbeta hårdare med kunderna."
        ],
        a: 1,
        why: "Det är tydligt vad som ska förbättras, hur mycket, när och genom vilken insats.",
        hint: "Leta efter ett mål som säger vad som ska förbättras, hur det mäts och när det ska vara klart."
      },
      {
        type: "choice",
        story: "En medarbetare föreslår ett mål för butikens skyltfönster.",
        q: "Vilken del saknas tydligast i målet: Vi ska göra skyltfönstret mer attraktivt?",
        opts: [
          "Det saknar ett tydligt sätt att mäta resultatet.",
          "Det är redan tidsbundet.",
          "Det är för specifikt.",
          "Det är automatiskt accepterat."
        ],
        a: 0,
        why: "Mer attraktivt är otydligt. Butiken behöver bestämma hur resultatet ska bedömas eller mätas.",
        hint: "Hur vet personalen om skyltfönstret faktiskt blev bättre?"
      },
      {
        type: "choice",
        story: "Sarah visar ett mål: Vi ska bli bättre på kundservice.",
        q: "Vad är den viktigaste svagheten?",
        opts: [
          "Det är för specifikt och innehåller för många detaljer.",
          "Det är otydligt och saknar ett sätt att följa upp resultatet.",
          "Det är alltid ett kvantitativt mål.",
          "Det är ett internt mål och kan därför inte användas."
        ],
        a: 1,
        why: "Målet säger inte vad bättre kundservice betyder eller hur butiken ska mäta utvecklingen.",
        hint: "Tänk på orden bättre och bra. Hur kan de göras tydliga och mätbara?"
      },
      {
        type: "choice",
        story: "Butiken vill sätta ett mål som personalen kan arbeta mot tillsammans.",
        q: "Varför är det viktigt att målet är accepterat?",
        opts: [
          "För att målet ska vara hemligt för personalen.",
          "För att de som arbetar mot målet ska förstå och kunna ställa sig bakom det.",
          "För att målet inte ska behöva följas upp.",
          "För att det alltid ska vara enkelt."
        ],
        a: 1,
        why: "Ett accepterat mål skapar förståelse och motivation hos dem som ska arbeta för att nå det.",
        hint: "Fundera på hur personalens delaktighet påverkar möjligheten att nå målet."
      },
      {
        type: "choice",
        story: "Sarah vill att butikens mål ska bidra till verksamhetens utveckling.",
        q: "Vilken SMART-del handlar om att målet ska vara viktigt för verksamheten?",
        opts: [
          "Specifikt",
          "Mätbart",
          "Relevant",
          "Tidsbundet"
        ],
        a: 2,
        why: "Relevant betyder att målet har betydelse och passar verksamhetens behov och utveckling.",
        hint: "Ordet börjar på R. Är målet viktigt för butikens riktning?"
      }
    ]
  },

  {
    title: "SMART-byggaren",
    desc: "Matcha varje SMART-bokstav med rätt förklaring.",
    tasks: [
      {
        type: "match",
        story: "Sarah vill att du visar att du kan SMART-modellens fem delar. Välj en bokstav i varje rad.",
        hint: "S = vad? M = hur mäta? A = vilka står bakom målet? R = varför viktigt? T = när?"
      }
    ]
  },

  {
    title: "Sortera målen",
    desc: "Skilj mellan kvantitativa och kvalitativa mål.",
    tasks: [
      {
        type: "sort",
        story: "Kvantitativa mål kan räknas i siffror. Kvalitativa mål handlar om egenskaper, upplevelser eller kvalitet.",
        items: [
          ["Skapa en trevligare butiksmiljö.", "K"],
          ["Öka försäljningen med 10 procent på tre månader.", "Q"],
          ["Skapa en mer välkomnande känsla i butiken.", "K"],
          ["Minska väntetiden i kassan till högst tre minuter.", "Q"],
          ["Förbättra kundernas upplevelse av bemötandet.", "K"],
          ["Få 20 nya medlemmar i kundklubben före sommaren.", "Q"]
        ],
        hint: "Kan målet uttryckas som ett antal, en andel eller en tid? Då är det kvantitativt."
      }
    ]
  },

  {
    title: "Butikens problem",
    desc: "Använd SMART-modellen när Sarah möter verkliga situationer.",
    tasks: [
      {
        type: "choice",
        story: "Butiken får kommentarer om att kunder ibland får vänta länge vid kassan.",
        q: "Vilket mål är bäst formulerat?",
        opts: [
          "Vi ska bli snabbare i kassan.",
          "Vi ska minska den genomsnittliga väntetiden från fem till tre minuter före den 1 maj.",
          "Kunderna ska aldrig behöva vänta.",
          "Vi ska tänka mer på kassakön."
        ],
        a: 1,
        why: "Målet är konkret, mätbart och har en tydlig tidsgräns.",
        hint: "Ett bra mål anger en mätbar förändring och en tidsgräns."
      },
      {
        type: "choice",
        story: "Personalen vill förbättra hur kunderna blir bemötta.",
        q: "Vilket sätt hjälper bäst butiken att följa upp ett kvalitativt mål?",
        opts: [
          "Räkna hur många tröjor som säljs.",
          "Samla in kundernas synpunkter genom en kort enkät och följa upp svaren.",
          "Gissa om kunderna verkar glada.",
          "Mäta butikens elförbrukning."
        ],
        a: 1,
        why: "Kundernas upplevelser kan följas upp genom enkäter och återkoppling.",
        hint: "Kvalitativt handlar om upplevelser och kvalitet. Vilken metod kan samla in sådana uppgifter?"
      },
      {
        type: "choice",
        story: "Sarah har satt ett mål som personalen tycker är svårt att förstå och inte känner sig delaktig i.",
        q: "Vad bör Sarah göra först?",
        opts: [
          "Behålla målet och kräva att alla följer det.",
          "Förklara syftet, diskutera målet med personalen och göra det tydligare tillsammans.",
          "Ta bort all uppföljning.",
          "Byta till ett mål som inte har någon tidsgräns."
        ],
        a: 1,
        why: "Delaktighet och tydlighet gör målet mer accepterat och lättare att arbeta mot.",
        hint: "Koppla situationen till A i SMART."
      }
    ]
  },

  {
    title: "Slutprovet",
    desc: "Sätt ihop dina kunskaper och skapa ett eget mål för Sarahs butik.",
    tasks: [
      {
        type: "choice",
        story: "Sarah sammanfattar: Ett mål ska vara tydligt, möjligt att mäta, accepterat, relevant och ha en tidsgräns.",
        q: "Vilket alternativ beskriver SMART korrekt?",
        opts: [
          "Specifikt, Mätbart, Accepterat, Relevant, Tidsbundet.",
          "Snabbt, Modernt, Aktivt, Roligt, Tydligt.",
          "Specifikt, Möjligt, Allmänt, Rimligt, Troligt.",
          "Strategiskt, Mätbart, Automatiskt, Rörligt, Tydligt."
        ],
        a: 0,
        why: "SMART står för Specifikt, Mätbart, Accepterat, Relevant och Tidsbundet.",
        hint: "Titta på SMART-modellens fem delar."
      },
      {
        type: "build",
        story: "Nu får du skapa ett eget mål åt Sarah. Välj ett område i butikens vardag och formulera ett mål som går att följa upp.",
        hint: "Skriv vad som ska förbättras, hur det ska mätas, vilka som ska vara delaktiga, varför det är viktigt och när det ska vara klart."
      }
    ]
  }
];

// =====================================
// MATCHING DATA
// =====================================

const matchDefs = [
  ["A", "Målet ska vara tydligt och konkret."],
  ["B", "Målet ska ha en bestämd tidsperiod."],
  ["C", "Målet ska vara viktigt för företagets utveckling."],
  ["D", "Det ska gå att följa upp med siffror eller resultat."],
  ["E", "Målet ska vara rimligt och motiverande för dem som ska nå det."]
];

const matchCorrect = {
  S: "A",
  M: "D",
  A: "E",
  R: "C",
  T: "B"
};

const matchLetters = [
  ["S", "Specifikt"],
  ["M", "Mätbart"],
  ["A", "Accepterat"],
  ["R", "Relevant"],
  ["T", "Tidsbundet"]
];

// =====================================
// SMART BUILDER FIELDS
// =====================================

const smartFields = [
  {
    key: "specific",
    letter: "S",
    title: "Specifikt",
    question: "Vad vill butiken förbättra?",
    placeholder: "Exempel: Öka försäljningen av kläder."
  },
  {
    key: "measurable",
    letter: "M",
    title: "Mätbart",
    question: "Hur mycket ska resultatet förbättras?",
    placeholder: "Exempel: Med 10 procent."
  },
  {
    key: "accepted",
    letter: "A",
    title: "Accepterat",
    question: "Vilka ska vara delaktiga i målet?",
    placeholder: "Exempel: Hela butikspersonalen har diskuterat och accepterat målet."
  },
  {
    key: "relevant",
    letter: "R",
    title: "Relevant",
    question: "Varför är målet viktigt för butiken?",
    placeholder: "Exempel: För att förbättra butikens resultat och kundernas upplevelse."
  },
  {
    key: "timeBound",
    letter: "T",
    title: "Tidsbundet",
    question: "När ska målet vara uppnått?",
    placeholder: "Exempel: Senast den 30 juni."
  }
];

// =====================================
// TOP BAR AND NAVIGATION
// =====================================

function updateTop() {
  $("topScore").textContent = score;
  $("topLevel").textContent = level + 1;

  const progress =
    (level * 100) / 5 +
    (task / levels[level].tasks.length) * 20;

  $("topProgress").style.width = progress + "%";

  $("scoreBottom").textContent = score;
}

function navUpdate() {
  document.querySelectorAll(".navitem[data-nav]").forEach((item, i) => {
    item.classList.toggle("active", i === level);
    item.classList.toggle("done", i < level);
    item.classList.toggle("locked", i > level);
  });
}

// =====================================
// START GAME
// =====================================

function start() {
  player = $("playerName").value.trim();

  if (!player) {
    $("playerName").focus();
    $("playerName").style.borderColor = "#b96b60";
    return;
  }

  $("startScreen").classList.add("hidden");
  $("gameScreen").classList.remove("hidden");

  render();
}

// =====================================
// RENDER CURRENT TASK
// =====================================

function render() {
  answered = false;
  selection = null;

  matchAnswers = {};
  sortAnswers = {};

  hintUsed = false;

  $("feedback").className = "feedback";
  $("feedback").textContent = "";

  $("checkBtn").classList.remove("hidden");
  $("nextBtn").classList.add("hidden");

  $("hintText").textContent =
    "Tryck på Visa ledtråd om du behöver hjälp.";

  $("hintBtn").disabled = hints <= 0;
  $("hintBtn").textContent = "Visa ledtråd";

  const currentLevel = levels[level];
  const currentTask = currentLevel.tasks[task];

  $("levelPill").textContent = `Nivå ${level + 1} av 5`;
  $("taskCount").textContent =
    `Uppdrag ${task + 1} av ${currentLevel.tasks.length}`;

  $("taskTitle").textContent = currentLevel.title;
  $("taskDesc").textContent = currentLevel.desc;

  $("taskHeading").textContent =
    currentTask.type === "match"
      ? "Para ihop bokstav och förklaring"
      : currentTask.type === "sort"
        ? "Kvantitativt eller kvalitativt?"
        : currentTask.type === "build"
          ? "Formulera ett eget SMART-mål"
          : "Lös uppdraget";

  $("taskPoints").textContent = `${score} poäng`;
  $("story").textContent = currentTask.story;

  $("sarahSpeech").innerHTML =
    `<b>Sarah säger:</b><br>${
      level === 0
        ? "Vi börjar med att granska några mål. Läs noga!"
        : level === 1
          ? "Matcha varje bokstav med rätt betydelse. Du väljer själv!"
          : level === 2
            ? "Nu ska vi sortera olika mål från butikens vardag."
            : level === 3
              ? "Vad skulle du göra i den här situationen?"
              : "Visa vad du har lärt dig och hjälp mig med ett eget mål."
    }`;

  const area = $("taskArea");
  area.innerHTML = "";

  // CHOICE QUESTIONS
  if (currentTask.type === "choice") {
    const question = document.createElement("div");
    question.className = "question";
    question.textContent = currentTask.q;

    const options = document.createElement("div");
    options.className = "options";

    currentTask.opts.forEach((option, i) => {
      const button = document.createElement("button");

      button.className = "opt";
      button.textContent =
        String.fromCharCode(65 + i) + ". " + option;

      button.onclick = () => {
        if (answered) return;

        selection = i;

        options.querySelectorAll(".opt").forEach((item) => {
          item.classList.remove("selected");
        });

        button.classList.add("selected");
      };

      options.appendChild(button);
    });

    area.append(question, options);
  }

  // MATCHING TASK
  if (currentTask.type === "match") {
    const grid = document.createElement("div");
    grid.className = "matchgrid";

    const left = document.createElement("div");
    const right = document.createElement("div");

    left.className = "matchcol";
    right.className = "matchcol";

    left.innerHTML = "<h3>SMART-bokstäver</h3>";
    right.innerHTML = "<h3>Förklaringar</h3>";

    matchLetters.forEach(([letter, name]) => {
      const row = document.createElement("div");
      row.className = "matchrow";

      const letterBox = document.createElement("div");
      letterBox.className = "letter";
      letterBox.textContent = letter;

      const nameBox = document.createElement("div");
      nameBox.className = "definition";
      nameBox.textContent = name;

      const select = document.createElement("select");
      select.className = "matchselect";

      select.innerHTML =
        '<option value="">Välj</option>' +
        matchDefs
          .map(([key]) => `<option value="${key}">${key}</option>`)
          .join("");

      select.onchange = () => {
        matchAnswers[letter] = select.value;
      };

      row.append(letterBox, nameBox, select);
      left.appendChild(row);
    });

    const shuffled = [...matchDefs].sort(() => Math.random() - 0.5);

    shuffled.forEach(([key, definition]) => {
      const box = document.createElement("div");
      box.className = "definition";

      const badge = document.createElement("span");
      badge.className = "defletter";
      badge.textContent = key;

      const text = document.createElement("span");
      text.textContent = definition;

      box.append(badge, text);
      right.appendChild(box);
    });

    grid.append(left, right);
    area.appendChild(grid);
  }

  // SORTING TASK
  if (currentTask.type === "sort") {
    currentTask.items.forEach(([text]) => {
      const row = document.createElement("div");
      row.className = "sortrow";

      const paragraph = document.createElement("p");
      paragraph.textContent = text;

      row.appendChild(paragraph);

      ["Kvantitativt", "Kvalitativt"].forEach((label, i) => {
        const button = document.createElement("button");

        button.className = "choicebtn";
        button.textContent = label;

        button.onclick = () => {
          if (answered) return;

          sortAnswers[text] = i === 0 ? "Q" : "K";

          row.querySelectorAll("button").forEach((item) => {
            item.classList.remove("chosen");
          });

          button.classList.add("chosen");
        };

        row.appendChild(button);
      });

      area.appendChild(row);
    });
  }

  // SMART BUILDER
  if (currentTask.type === "build") {
    smartFields.forEach((field) => {
      const box = document.createElement("div");
box.className = "sortrow smart-field";
      const heading = document.createElement("h3");
      heading.textContent = `${field.letter} – ${field.title}`;

      const question = document.createElement("p");
      question.textContent = field.question;

      const input = document.createElement("textarea");
      input.placeholder = field.placeholder;
      input.value = buildAnswers[field.key];

      input.oninput = () => {
        buildAnswers[field.key] = input.value;
      };

      box.append(heading, question, input);
      area.appendChild(box);
    });
  }

  updateTop();
  navUpdate();
}

// =====================================
// HINTS
// =====================================

function showHint() {
  const currentTask = levels[level].tasks[task];

  if (hints <= 0 || hintUsed) return;

  hints--;
  hintUsed = true;

  $("hintText").textContent = currentTask.hint;
  $("hintBtn").textContent = "Ledtråd visad";
  $("hintBtn").disabled = true;

  $("hintsLeft").textContent = `Ledtrådar: ${hints} kvar`;
}

// =====================================
// FEEDBACK
// =====================================

function feedback(ok, message) {
  $("feedback").className =
    "feedback show " + (ok ? "good" : "retry");

  $("feedback").textContent = message;
}

// =====================================
// CHECK SMART BUILDER
// =====================================

function checkSMARTBuilder() {
  const checks = {
    specific:
      buildAnswers.specific.trim().length >= 10,

    measurable:
      /(\d|procent|antal|minut|timm|veck|månad)/i
        .test(buildAnswers.measurable),

    accepted:
      buildAnswers.accepted.trim().length >= 10,

    relevant:
      buildAnswers.relevant.trim().length >= 10,

    timeBound:
      /(\d|före|senast|inom|juni|maj|april|mars|augusti)/i
        .test(buildAnswers.timeBound)
  };

  const labels = {
    specific: "Specifikt",
    measurable: "Mätbart",
    accepted: "Accepterat",
    relevant: "Relevant",
    timeBound: "Tidsbundet"
  };

  const passed = Object.values(checks).filter(Boolean).length;

  const missing = Object.keys(checks)
    .filter((key) => !checks[key])
    .map((key) => labels[key]);

  if (passed < 5) {
    feedback(
      false,
      `Du har klarat ${passed} av 5 delar. Kontrollera följande: ${missing.join(", ")}. Förbättra dina svar och försök igen.`
    );

    return false;
  }

  score += 25;

  feedback(
    true,
    "Utmärkt! Du har fyllt i alla fem delar av SMART-modellen. Du får 25 poäng för ditt arbete med Sarahs mål."
  );

  return true;
}

// =====================================
// CHECK ANSWERS
// =====================================

function check() {
  if (answered) return;

  const currentTask = levels[level].tasks[task];

  let ok = false;
  let message = "";

  // CHOICE
  if (currentTask.type === "choice") {
    if (selection === null) {
      feedback(false, "Välj ett svar innan du kontrollerar.");
      return;
    }

    ok = selection === currentTask.a;

    message = ok
      ? "Rätt! " + currentTask.why
      : "Inte riktigt. Läs ledtråden och fundera på vad frågan faktiskt ber om. Försök igen.";

    if (ok) score += 10;
  }

  // MATCH
  if (currentTask.type === "match") {
    if (
      Object.keys(matchAnswers).length !== 5 ||
      Object.values(matchAnswers).some((value) => !value)
    ) {
      feedback(
        false,
        "Välj en förklaring för alla fem bokstäver innan du kontrollerar."
      );
      return;
    }

    ok = Object.keys(matchCorrect).every(
      (key) => matchAnswers[key] === matchCorrect[key]
    );

    message = ok
      ? "Alla fem matchningar är rätt! Du kan SMART-modellen."
      : "Några par stämmer inte ännu. Ändra dina val och kontrollera igen.";

    if (ok) score += 20;
  }

  // SORT
  if (currentTask.type === "sort") {
    if (Object.keys(sortAnswers).length !== currentTask.items.length) {
      feedback(false, "Sortera alla sex mål innan du kontrollerar.");
      return;
    }

    ok = currentTask.items.every(
      ([text, answer]) => sortAnswers[text] === answer
    );

    message = ok
      ? "Bra sorterat! Kvantitativa mål kan uttryckas i siffror, medan kvalitativa mål handlar om kvalitet och upplevelser."
      : "Minst en sortering är fel. Kom ihåg: Kvantitativt = siffror och kvalitativt = kvalitet och upplevelser.";

    if (ok) score += 15;
  }

  // SMART BUILDER
  if (currentTask.type === "build") {
    ok = checkSMARTBuilder();

    if (!ok) return;

    message = "";
  }

  // SUCCESS
  if (ok) {
    answered = true;

    $("checkBtn").classList.add("hidden");
    $("nextBtn").classList.remove("hidden");

    $("taskPoints").textContent = `${score} poäng`;
    $("scoreBottom").textContent = score;
    $("topScore").textContent = score;
  } else {
    feedback(false, message);
  }
}

// =====================================
// NEXT TASK
// =====================================

function next() {
  const currentLevel = levels[level];

  if (task < currentLevel.tasks.length - 1) {
    task++;
    render();
    return;
  }

  if (level < levels.length - 1) {
    level++;
    task = 0;
    render();
    return;
  }

  finish();
}

// =====================================
// FINISH GAME
// =====================================

function finish() {
  $("gameScreen").classList.add("hidden");
  $("resultScreen").classList.remove("hidden");

  $("resultTitle").textContent = `Bra jobbat, ${player}!`;

  $("resultLead").textContent =
    "Du har hjälpt Sarah att arbeta mer strukturerat med butikens mål.";

  $("finalScore").textContent = score;

  $("resultDetails").innerHTML = `
    <div><b>Uppdrag 1:</b> Granska mål och hitta svagheter.</div>
    <div><b>Uppdrag 2:</b> Matcha SMART-modellens fem delar.</div>
    <div><b>Uppdrag 3:</b> Sortera kvantitativa och kvalitativa mål.</div>
    <div><b>Uppdrag 4:</b> Lösa situationer från butikens vardag.</div>
    <div><b>Uppdrag 5:</b> Skapa ett eget SMART-mål med fem delar.</div>
  `;

  $("topProgress").style.width = "100%";
}

// =====================================
// RESTART
// =====================================

function restart() {
  player = "";
  score = 0;
  level = 0;
  task = 0;
  hints = 2;
  hintUsed = false;
  answered = false;
  selection = null;

  matchAnswers = {};
  sortAnswers = {};

  buildAnswers = {
    specific: "",
    measurable: "",
    accepted: "",
    relevant: "",
    timeBound: ""
  };

  $("resultScreen").classList.add("hidden");
  $("gameScreen").classList.add("hidden");
$("startScreen").classList.remove("hidden");
  $("playerName").value = "";
  $("hintsLeft").textContent = "Ledtrådar: 2 kvar";

  updateTop();
  navUpdate();
}

// =====================================
// EVENT LISTENERS
// =====================================

$("startBtn").onclick = start;
$("checkBtn").onclick = check;
$("nextBtn").onclick = next;
$("hintBtn").onclick = showHint;
$("restartBtn").onclick = restart;

$("resultNav").onclick = () => {
  if (level === 4 && task === 1 && answered) {
    finish();
  }
};

$("playerName").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    start();
  }
});
