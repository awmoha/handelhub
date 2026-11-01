(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const $ = (id) => document.getElementById(id);
    const requiredIds = [
      "startScreen","gameScreen","resultScreen","startButton","restartButton",
      "scoreValue","playerName","nameError","missionLabel","gameTitle","progressText",
      "progressFill","taskKicker","taskTitle","taskDescription","sellerText",
      "productName","productArt","productPrice","answerLabel","answerUnit",
      "calculationList","answerInput","calcDisplay","calcKeys","checkButton",
      "roundHint","feedback","feedbackTitle","feedbackText","nextButton",
      "sideTip","completedCount","finalScore","finalCompleted","finalPercent","resultMessage"
    ];
    const missing = requiredIds.filter(id => !$(id));
    if (missing.length) {
      console.error("Butikens priskoll: HTML saknar:", missing.join(", "));
      return;
    }

    let missions = [];
    let playerName = "";
    let current = 0;
    let score = 0;
    let completed = 0;
    let firstTryCorrect = 0;
    let attempts = 0;
    let locked = false;
    let calcExpression = "";

    const randomFrom = (values) => values[Math.floor(Math.random() * values.length)];
    const money = (value) => new Intl.NumberFormat("sv-SE", {
      minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
      maximumFractionDigits: 2
    }).format(value);

    // Alla uppgifter byggs från samma slumpade värden.
    // Facit beräknas här – det finns inga fristående, hårdkodade svar.
    function createMissions() {
      const purchase = randomFrom([100, 120, 140, 160, 180, 200]);
      const transport = randomFrom([20, 40]);
      const insurance = randomFrom([20, 40]);
      const costOfGoods = purchase + transport + insurance;

      const markupRate = randomFrom([25, 50]);
      const markupAmount = costOfGoods * markupRate / 100;
      const priceBeforeVat = costOfGoods + markupAmount;

      const vatRate = 25;
      const vatAmount = priceBeforeVat * vatRate / 100;
      const priceIncludingVat = priceBeforeVat + vatAmount;

      const rent = randomFrom([8000, 9000, 10000, 11000]);
      const marketing = randomFrom([1000, 1500, 2000, 2500]);
      const technology = randomFrom([400, 500, 600, 800]);
      const operatingCosts = rent + marketing + technology;

      return [
        {
          title: "Räkna ut varukostnaden",
          kicker: "UPPDRAG 1 · KOSTNADER",
          product: "Bas-T-shirt", art: "👕",
          price: "Kostnaden räknas ut",
          seller: "Vi ska börja sälja en ny T-shirt. Först behöver vi veta vad varan faktiskt kostar butiken. Kan du hjälpa mig?",
          description: `Butiken köper in en T-shirt för ${money(purchase)} kr. Transporten kostar ${money(transport)} kr och försäkringen kostar ${money(insurance)} kr. Räkna ut varukostnaden.`,
          rows: [["Inköpspris", `${money(purchase)} kr`], ["Transport", `${money(transport)} kr`], ["Försäkring", `${money(insurance)} kr`]],
          label: "Vad blir varukostnaden?",
          answer: costOfGoods,
          hint: "Varukostnaden består av inköpspriset plus anskaffningskostnader. Tänk på att ta med både transport och försäkring.",
          correct: "Rätt! Du har räknat med inköpspriset och kostnaderna för att få varan till butiken.",
          explanation: "Varukostnad är inköpspris plus anskaffningskostnader, till exempel transport och försäkring."
        },
        {
          title: "Räkna ut pålägget",
          kicker: "UPPDRAG 2 · PÅLÄGG",
          product: "Bas-T-shirt", art: "👕",
          price: `Varukostnad: ${money(costOfGoods)} kr`,
          seller: "Nu behöver vi lägga till ett pålägg. Butiken har bestämt hur många procent pålägget ska vara.",
          description: `Varukostnaden är ${money(costOfGoods)} kr. Pålägget är ${markupRate} %. Räkna ut hur många kronor pålägget blir.`,
          rows: [["Varukostnad", `${money(costOfGoods)} kr`], ["Pålägg", `${markupRate} %`]],
          label: "Hur många kronor är pålägget?",
          answer: markupAmount,
          hint: "Pålägget är en procentandel av varukostnaden. Formelbladet visar hur du räknar procent till kronor.",
          correct: "Rätt! Du har räknat ut pålägget i kronor.",
          explanation: "Pålägg är en procentsats som läggs till ovanpå varukostnaden för att täcka andra kostnader."
        },
        {
          title: "Hitta priset utan moms",
          kicker: "UPPDRAG 3 · FÖRSÄLJNINGSPRIS",
          product: "Bas-T-shirt", art: "👕",
          price: "Pris före moms ska räknas ut",
          seller: "Nu ska vi ta fram priset före moms. Butiken behöver lägga ihop varukostnaden och pålägget.",
          description: `Varukostnaden är ${money(costOfGoods)} kr och pålägget är ${money(markupAmount)} kr. Räkna ut priset före moms.`,
          rows: [["Varukostnad", `${money(costOfGoods)} kr`], ["Pålägg", `${money(markupAmount)} kr`]],
          label: "Vad blir priset före moms?",
          answer: priceBeforeVat,
          hint: "Priset före moms får du genom att lägga ihop varukostnaden och pålägget.",
          correct: "Rätt! Du har lagt ihop varukostnaden och pålägget.",
          explanation: "I den här uppgiften består priset före moms av varukostnaden plus pålägget."
        },
        {
          title: "Räkna ut momsen",
          kicker: "UPPDRAG 4 · MOMS",
          product: "Bas-T-shirt", art: "👕",
          price: `Pris före moms: ${money(priceBeforeVat)} kr`,
          seller: "Nu ska vi räkna ut momsen. I det här klädexemplet använder vi 25 % moms.",
          description: `Priset före moms är ${money(priceBeforeVat)} kr. Momsen är ${vatRate} %. Räkna ut momsbeloppet i kronor.`,
          rows: [["Pris före moms", `${money(priceBeforeVat)} kr`], ["Moms", `${vatRate} %`]],
          label: "Hur många kronor är momsen?",
          answer: vatAmount,
          hint: "Momsbeloppet är en procentandel av priset före moms. Använd formeln för att räkna ut procent i kronor.",
          correct: "Rätt! Du har räknat ut momsbeloppet.",
          explanation: "Moms är en skatt som läggs på priset. I spelets klädexempel är momsen 25 %."
        },
        {
          title: "Bestäm kundens pris",
          kicker: "UPPDRAG 5 · PRIS MED MOMS",
          product: "Bas-T-shirt", art: "👕",
          price: "Kundens pris ska räknas ut",
          seller: "Nu ska vi ta fram priset som kunden betalar. Lägg momsen till priset före moms.",
          description: `Priset före moms är ${money(priceBeforeVat)} kr och momsen är ${money(vatAmount)} kr. Räkna ut kundens pris inklusive moms.`,
          rows: [["Pris före moms", `${money(priceBeforeVat)} kr`], ["Moms", `${money(vatAmount)} kr`]],
          label: "Vad blir priset inklusive moms?",
          answer: priceIncludingVat,
          hint: "Kundens pris inklusive moms består av priset före moms plus momsbeloppet.",
          correct: "Rätt! Du har räknat fram kundens pris inklusive moms.",
          explanation: "Pris inklusive moms = pris före moms + moms."
        },
        {
          title: "Räkna butikens driftskostnader",
          kicker: "UPPDRAG 6 · DRIFTSKOSTNADER",
          product: "Butikens kostnader", art: "🏬",
          price: "Månadens kostnader",
          seller: "Sista uppdraget! Butiken behöver också ha koll på kostnaderna för att driva verksamheten.",
          description: `Under en månad betalar butiken ${money(rent)} kr i hyra, ${money(marketing)} kr för marknadsföring och ${money(technology)} kr för teknik. Lägg ihop kostnaderna.`,
          rows: [["Hyra", `${money(rent)} kr`], ["Marknadsföring", `${money(marketing)} kr`], ["Teknik", `${money(technology)} kr`]],
          label: "Hur stora är driftskostnaderna tillsammans?",
          answer: operatingCosts,
          hint: "Driftskostnader är kostnader för att hålla butiken igång. Lägg ihop hyra, marknadsföring och teknik.",
          correct: "Rätt! Du har räknat ihop butikens driftskostnader för månaden.",
          explanation: "Driftskostnader är kostnader som inte hör direkt till en viss vara, till exempel hyra, marknadsföring och teknik."
        }
      ];
    }

    function showScreen(screenName) {
      ["startScreen", "gameScreen", "resultScreen"].forEach(id => $(id).classList.remove("active"));
      $(screenName).classList.add("active");
    }

    function escapeHtml(value) {
      return String(value).replace(/[&<>"']/g, ch => ({
        "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
      })[ch]);
    }

    function renderMission() {
      const m = missions[current];
      attempts = 0;
      locked = false;

      $("missionLabel").textContent = `UPPDRAG ${current + 1} AV ${missions.length}`;
      $("gameTitle").textContent = m.title;
      $("progressText").textContent = `Steg ${current + 1} av ${missions.length}`;
      $("progressFill").style.width = `${(current / missions.length) * 100}%`;
      $("taskKicker").textContent = m.kicker;
      $("taskTitle").textContent = m.title;
      $("taskDescription").textContent = m.description;
      $("sellerText").textContent = `${playerName}, ${m.seller}`;
      $("productName").textContent = m.product;
      $("productArt").textContent = m.art;
      $("productPrice").textContent = m.price;
      $("answerLabel").textContent = m.label;
      $("answerUnit").textContent = "kr";
      // Endast uppgiftens uppgifter visas. Ingen färdig uträkning visas för eleven.
      $("calculationList").innerHTML = m.rows.map(([label, value]) =>
        `<div class="calc-row"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`
      ).join("");

      $("answerInput").value = "";
      $("answerInput").disabled = false;
      $("checkButton").style.display = "inline-block";
      $("feedback").className = "feedback";
      $("feedbackTitle").textContent = "";
      $("feedbackText").textContent = "";
      $("nextButton").classList.remove("show");
      $("nextButton").textContent = current === missions.length - 1 ? "Se resultat →" : "Nästa uppdrag →";
      $("roundHint").textContent = "Skriv beloppet i kronor.";
      $("sideTip").textContent = m.hint;
      $("completedCount").textContent = `${completed} / ${missions.length}`;
      $("scoreValue").textContent = String(score);
      resetCalculator();
    }

    function resetCalculator() {
      calcExpression = "";
      $("calcDisplay").textContent = "0";
    }

    function checkAnswer() {
      if (locked) return;
      const raw = $("answerInput").value.trim().replace(",", ".");
      if (!raw) {
        $("roundHint").textContent = "Skriv ett belopp innan du kontrollerar svaret.";
        $("answerInput").focus();
        return;
      }
      const value = Number(raw);
      if (!Number.isFinite(value)) {
        $("roundHint").textContent = "Skriv ett giltigt tal, till exempel 52,50.";
        $("answerInput").focus();
        return;
      }

      const m = missions[current];
      attempts += 1;
      const correct = Math.abs(value - m.answer) < 0.011;
      $("feedback").className = `feedback show ${correct ? "correct" : "incorrect"}`;

      if (correct) {
        score += attempts === 1 ? 20 : 10;
        if (attempts === 1) firstTryCorrect += 1;
        completed += 1;
        locked = true;
        $("feedbackTitle").textContent = "Rätt räknat!";
        $("feedbackText").textContent = `${m.correct} ${m.explanation}`;
        $("answerInput").disabled = true;
        $("checkButton").style.display = "none";
        $("nextButton").classList.add("show");
        $("productPrice").textContent = `${money(m.answer)} kr`;
        $("completedCount").textContent = `${completed} / ${missions.length}`;
        $("progressFill").style.width = `${((current + 1) / missions.length) * 100}%`;
        $("scoreValue").textContent = String(score);
      } else {
        $("feedbackTitle").textContent = "Försök igen";
        $("feedbackText").textContent = `Inte riktigt. ${m.hint}`;
        $("roundHint").textContent = "Använd ledtråden och försök igen.";
      }
    }

    function nextMission() {
      if (!locked) return;
      if (current < missions.length - 1) {
        current += 1;
        renderMission();
      } else {
        finishGame();
      }
    }

    function finishGame() {
      showScreen("resultScreen");
      $("finalScore").textContent = String(score);
      $("finalCompleted").textContent = `${completed}/${missions.length}`;
      $("finalPercent").textContent = `${Math.round(firstTryCorrect / missions.length * 100)}%`;
      $("resultMessage").textContent = firstTryCorrect === missions.length
        ? `Snyggt jobbat, ${playerName}! Du klarade alla uppdrag direkt.`
        : `Bra arbetat, ${playerName}! Du har tränat på varukostnad, pålägg, moms och butikens kostnader.`;
    }

    // Miniräknare med säker, begränsad beräkning.
    function calculate(expression) {
      const tokens = expression.match(/(?:\d+(?:[.,]\d*)?|[.,]\d+)|[()+\-*/]/g);
      const compact = expression.replace(/\s/g, "");
      if (!tokens || tokens.join("").replace(/,/g, ".") !== compact.replace(/,/g, ".")) {
        throw new Error("Kontrollera uträkningen");
      }
      let index = 0;
      function primary() {
        const token = tokens[index++];
        if (token === "(") {
          const value = addSub();
          if (tokens[index++] !== ")") throw new Error("Saknar parentes");
          return value;
        }
        if (token === "-") return -primary();
        if (token === "+") return primary();
        const value = Number(String(token).replace(",", "."));
        if (!Number.isFinite(value)) throw new Error("Ogiltigt tal");
        return value;
      }
      function mulDiv() {
        let value = primary();
        while (tokens[index] === "*" || tokens[index] === "/") {
          const operator = tokens[index++];
          const next = primary();
          if (operator === "/" && next === 0) throw new Error("Det går inte att dela med noll");
          value = operator === "*" ? value * next : value / next;
        }
        return value;
      }
      function addSub() {
        let value = mulDiv();
        while (tokens[index] === "+" || tokens[index] === "-") {
          const operator = tokens[index++];
          const next = mulDiv();
          value = operator === "+" ? value + next : value - next;
        }
        return value;
      }
      const result = addSub();
      if (index !== tokens.length || !Number.isFinite(result)) throw new Error("Kontrollera uträkningen");
      return result;
    }

    function calculatorPress(key) {
      if (key === "clear") {
        resetCalculator();
        return;
      }
      if (key === "=") {
        if (!calcExpression) return;
        try {
          const result = calculate(calcExpression);
          $("calcDisplay").textContent = money(result);
          $("answerInput").value = String(Number(result.toFixed(2)));
          $("answerInput").focus();
        } catch (error) {
          $("calcDisplay").textContent = error.message;
        }
        return;
      }
      if (/^[0-9.,()+\-*/]$/.test(key)) {
        calcExpression += key === "," ? "." : key;
        $("calcDisplay").textContent = calcExpression.replace(/\*/g, " × ").replace(/\//g, " ÷ ");
      }
    }

    function startGame() {
      playerName = $("playerName").value.trim();
      if (!playerName) {
        $("nameError").textContent = "Skriv ditt namn innan du börjar.";
        $("playerName").focus();
        return;
      }
      $("nameError").textContent = "";
      missions = createMissions(); // Nya tal för varje spelomgång.
      current = 0;
      score = 0;
      completed = 0;
      firstTryCorrect = 0;
      document.body.classList.add("game-started");
      showScreen("gameScreen");
      renderMission();
    }

    $("startButton").addEventListener("click", startGame);
    $("playerName").addEventListener("keydown", event => {
      if (event.key === "Enter") startGame();
    });
    $("checkButton").addEventListener("click", checkAnswer);
    $("nextButton").addEventListener("click", nextMission);
    $("answerInput").addEventListener("keydown", event => {
      if (event.key === "Enter") checkAnswer();
    });
    $("calcKeys").addEventListener("click", event => {
      const button = event.target.closest("button[data-key]");
      if (button) calculatorPress(button.dataset.key);
    });
    // = ligger i calc-actions utanför #calcKeys och behöver därför en egen lyssnare.
    const equalsButton = document.querySelector(".calc-equals");
    if (equalsButton) {
      equalsButton.addEventListener("click", () => calculatorPress("="));
    }

    $("restartButton").addEventListener("click", () => {
      $("scoreValue").textContent = "0";
      $("playerName").value = playerName;
      document.body.classList.remove("game-started");
      showScreen("startScreen");
    });

    showScreen("startScreen");
  });
})();
