/* =====================================================
   HANDELHUB – KUNDBEMÖTANDE
   Enkel interaktiv kundbemötande-träning
   ===================================================== */


/* -----------------------------------------------------
   SPELAR
----------------------------------------------------- */

let playerName = "";

let currentQuestion = 0;

let score = 0;

let correctAnswers = 0;

let answered = false;


/* -----------------------------------------------------
   KUNDER OCH SITUATIONER
----------------------------------------------------- */

// const situations = [

//   {
//     customer: "Sara",
//     text: "Hej! Jag letar efter en jacka, men jag vet inte riktigt vilken jag ska välja.",

//     answers: [

//       {
//         text: "Kan du berätta lite mer om vad du behöver jackan till?",
//         correct: true,
//         points: 10,
//         feedback:
//           "Du ställer en öppen fråga. Det hjälper dig att förstå kundens behov och ger kunden möjlighet att berätta mer."
//       },

//       {
//         text: "Jackorna finns där borta.",
//         correct: false,
//         points: 0,
//         feedback:
//           "Det svaret ger inte kunden så mycket hjälp. Försök först förstå vad kunden behöver."
//       },

//       {
//         text: "Ta den här. Den är bra.",
//         correct: false,
//         points: 0,
//         feedback:
//           "Du rekommenderar en produkt direkt utan att först ta reda på kundens behov."
//       },

//       {
//         text: "Jag vet inte heller vilken jacka du ska köpa.",
//         correct: false,
//         points: 0,
//         feedback:
//           "Som säljare behöver du försöka hjälpa kunden genom att ställa frågor och lyssna."
//       }

//     ]
//   },


//   {
//     customer: "Ali",
//     text: "Jag behöver köpa skor till jobbet. Jag står och går nästan hela dagen.",

//     answers: [

//       {
//         text: "Vilken typ av arbete har du och vad är viktigast för dig när du väljer skor?",
//         correct: true,
//         points: 10,
//         feedback:
//           "Bra. Du ställer frågor för att förstå kundens situation och behov. Det är kundanpassad service."
//       },

//       {
//         text: "Ta de dyraste skorna.",
//         correct: false,
//         points: 0,
//         feedback:
//           "Pris är inte automatiskt det viktigaste. Du behöver först förstå vad kunden behöver."
//       },

//       {
//         text: "Alla skor fungerar lika bra.",
//         correct: false,
//         points: 0,
//         feedback:
//           "Olika kunder har olika behov. En kund som står och går mycket kan behöva andra egenskaper."
//       },

//       {
//         text: "Du får titta själv.",
//         correct: false,
//         points: 0,
//         feedback:
//           "Ett sådant svar visar inte ett aktivt kundbemötande."
//       }

//     ]
//   },


//   {
//     customer: "Maria",
//     text: "Jag har väntat länge. Ingen har hjälpt mig!",

//     answers: [

//       {
//         text: "Jag förstår att du har fått vänta. Jag ska hjälpa dig så snart jag kan.",
//         correct: true,
//         points: 10,
//         feedback:
//           "Bra. Du visar förståelse och behåller en lugn och professionell attityd."
//       },

//       {
//         text: "Det är inte mitt fel.",
//         correct: false,
//         points: 0,
//         feedback:
//           "Ett sådant svar kan göra kunden ännu mer missnöjd. Försök i stället visa förståelse och hjälpa kunden."
//       },

//       {
//         text: "Du får vänta lite till.",
//         correct: false,
//         points: 0,
//         feedback:
//           "Det löser inte kundens problem och kan skapa en ännu sämre kundupplevelse."
//       },

//       {
//         text: "Du behöver inte vara arg.",
//         correct: false,
//         points: 0,
//         feedback:
//           "Det är bättre att först lyssna på kunden och visa förståelse för situationen."
//       }

//     ]
//   },


//   {
//     customer: "Johan",
//     text: "Jag vill köpa en present till min syster. Jag vet inte vad hon tycker om.",

//     answers: [

//       {
//         text: "Kan du berätta lite om henne och vad hon brukar tycka om?",
//         correct: true,
//         points: 10,
//         feedback:
//           "Bra. Du använder en öppen fråga för att få mer information och förstå kundens behov."
//       },

//       {
//         text: "Köp den här.",
//         correct: false,
//         points: 0,
//         feedback:
//           "Du rekommenderar något utan att först ta reda på vad systern tycker om."
//       },

//       {
//         text: "Då kan jag inte hjälpa dig.",
//         correct: false,
//         points: 0,
//         feedback:
//           "En säljare kan hjälpa kunden genom att ställa frågor och undersöka behovet."
//       },

//       {
//         text: "Det finns många saker i butiken.",
//         correct: false,
//         points: 0,
//         feedback:
//           "Svaret ger inte kunden hjälp att hitta en passande present."
//       }

//     ]
//   },


//   {
//     customer: "Fatima",
//     text: "Jag köpte den här tröjan för två dagar sedan, men jag är inte nöjd.",

//     answers: [

//       {
//         text: "Jag förstår. Kan du berätta vad du inte är nöjd med?",
//         correct: true,
//         points: 10,
//         feedback:
//           "Bra. Du lyssnar på kunden och ställer en fråga för att förstå problemet."
//       },

//       {
//         text: "Det är inget fel på tröjan.",
//         correct: false,
//         points: 0,
//         feedback:
//           "Du avfärdar kundens upplevelse innan du har lyssnat på problemet."
//       },

//       {
//         text: "Det får du prata med chefen om.",
//         correct: false,
//         points: 0,
//         feedback:
//           "Försök först lyssna och förstå kundens problem. Därefter kan du följa arbetsplatsens rutiner."
//       },

//       {
//         text: "Du borde ha valt en annan tröja.",
//         correct: false,
//         points: 0,
//         feedback:
//           "Det kan uppfattas som att du lägger ansvaret på kunden. Börja med att lyssna och förstå."
//       }

//     ]
//   },


//   {
//     customer: "David",
//     text: "Kan du hjälpa mig? Jag har väldigt bråttom.",

//     answers: [

//       {
//         text: "Absolut. Vad letar du efter?",
//         correct: true,
//         points: 10,
//         feedback:
//           "Bra. Du är vänlig och ställer en tydlig fråga som snabbt hjälper dig att förstå kundens behov."
//       },

//       {
//         text: "Alla kunder måste vänta.",
//         correct: false,
//         points: 0,
//         feedback:
//           "Det kan uppfattas som ovänligt. Försök hjälpa kunden på ett professionellt sätt."
//       },

//       {
//         text: "Jag har också bråttom.",
//         correct: false,
//         points: 0,
//         feedback:
//           "Det hjälper inte kunden och visar inte ett professionellt kundbemötande."
//       },

//       {
//         text: "Titta runt själv.",
//         correct: false,
//         points: 0,
//         feedback:
//           "Kunden ber om hjälp. Försök förstå vad kunden behöver."
//       }

//     ]
//   },


//   {
//     customer: "Nora",
//     text: "Jag tittar bara.",

//     answers: [

//       {
//         text: "Självklart. Säg gärna till om du vill ha hjälp.",
//         correct: true,
//         points: 10,
//         feedback:
//           "Bra. Du respekterar kunden och visar samtidigt att du finns tillgänglig om kunden behöver hjälp."
//       },

//       {
//         text: "Du måste köpa något.",
//         correct: false,
//         points: 0,
//         feedback:
//           "Kunden behöver inte känna sig pressad. Ett respektfullt bemötande är viktigt."
//       },

//       {
//         text: "Varför tittar du bara?",
//         correct: false,
//         points: 0,
//         feedback:
//           "Frågan kan uppfattas som pressande. Ge kunden utrymme."
//       },

//       {
//         text: "Okej. Gå då.",
//         correct: false,
//         points: 0,
//         feedback:
//           "Ett professionellt bemötande innebär att vara vänlig och visa att du kan hjälpa kunden."
//       }

//     ]
//   },


//   {
//     customer: "Erik",
//     text: "Jag förstår inte vad personalen sa till mig.",

//     answers: [

//       {
//         text: "Jag kan förklara det på ett enklare sätt. Vad var oklart?",
//         correct: true,
//         points: 10,
//         feedback:
//           "Bra. Du anpassar kommunikationen efter kunden och försöker kontrollera vad kunden inte förstod."
//       },

//       {
//         text: "Jag har redan sagt det.",
//         correct: false,
//         points: 0,
//         feedback:
//           "Kunden behöver hjälp att förstå. Försök kommunicera på ett tydligare sätt."
//       },

//       {
//         text: "Det är enkelt.",
//         correct: false,
//         points: 0,
//         feedback:
//           "Att något är enkelt för dig betyder inte att kunden förstår. Anpassa kommunikationen."
//       },

//       {
//         text: "Fråga någon annan.",
//         correct: false,
//         points: 0,
//         feedback:
//           "Försök hjälpa kunden och anpassa kommunikationen efter situationen."
//       }

//     ]
//   },


//   {
//     customer: "Lina",
//     text: "Jag är osäker på om den här produkten passar mig.",

//     answers: [

//       {
//         text: "Vad är viktigast för dig när du väljer en sådan produkt?",
//         correct: true,
//         points: 10,
//         feedback:
//           "Bra. Du undersöker kundens behov innan du rekommenderar en produkt."
//       },

//       {
//         text: "Den passar alla.",
//         correct: false,
//         points: 0,
//         feedback:
//           "Alla kunder har inte samma behov. Därför är det viktigt att ställa frågor."
//       },

//       {
//         text: "Ta den bara.",
//         correct: false,
//         points: 0,
//         feedback:
//           "Du behöver först förstå vad kunden behöver."
//       },

//       {
//         text: "Det får du bestämma själv.",
//         correct: false,
//         points: 0,
//         feedback:
//           "Kunden ber om hjälp. Du kan hjälpa genom att ställa frågor och ge relevant information."
//       }

//     ]
//   },


//   {
//     customer: "Omar",
//     text: "Tack för hjälpen! Du lyssnade verkligen på vad jag behövde.",

//     answers: [

//       {
//         text: "Tack själv. Det var roligt att hjälpa dig.",
//         correct: true,
//         points: 10,
//         feedback:
//           "Bra. Du avslutar kundmötet på ett vänligt och professionellt sätt."
//       },

//       {
//         text: "Okej.",
//         correct: false,
//         points: 0,
//         feedback:
//           "Svaret är inte direkt fel, men det ger ett mindre personligt avslut på kundmötet."
//       },

//       {
//         text: "Det var väl inget.",
//         correct: false,
//         points: 0,
//         feedback:
//           "Ett positivt och vänligt avslut passar bättre i ett professionellt kundmöte."
//       },

//       {
//         text: "Ja, jag vet.",
//         correct: false,
//         points: 0,
//         feedback:
//           "Det kan uppfattas som otrevligt. Ett vänligt svar skapar ett bättre avslut."
//       }

//     ]
//   }

// ];
const situations = [

  {
    customer: "Sara",
    text: "Hej! Jag letar efter en jacka, men jag vet inte riktigt vilken jag ska välja.",

    answers: [
      {
        text: "Vilken färg tycker du bäst om?",
        correct: false,
        points: 0,
        feedback: "Det kan vara en relevant fråga, men börja med att ta reda på vad kunden behöver jackan till."
      },
      {
        text: "Kan du berätta vad du behöver jackan till?",
        correct: true,
        points: 10,
        feedback: "Bra. Du ställer en öppen fråga och försöker förstå kundens behov innan du rekommenderar något."
      },
      {
        text: "Vilken storlek brukar du använda?",
        correct: false,
        points: 0,
        feedback: "Storlek kan vara viktigt senare, men först behöver du förstå vad kunden söker."
      },
      {
        text: "Har du sett någon jacka du tycker om?",
        correct: false,
        points: 0,
        feedback: "Det är en möjlig fråga, men den hjälper dig inte lika mycket att förstå kundens behov."
      }
    ]
  },


  {
    customer: "Ali",
    text: "Jag behöver köpa skor till jobbet. Jag står och går nästan hela dagen.",

    answers: [
      {
        text: "Vilken färg vill du helst ha?",
        correct: false,
        points: 0,
        feedback: "Färg kan vara viktigt, men kundens arbetssituation är mer relevant här."
      },
      {
        text: "Vilken storlek brukar du köpa?",
        correct: false,
        points: 0,
        feedback: "Storleken behöver du veta senare, men först behöver du förstå kundens behov."
      },
      {
        text: "Vad är viktigt för dig när du väljer arbetsskor?",
        correct: true,
        points: 10,
        feedback: "Bra. Frågan hjälper dig att förstå vilka egenskaper kunden behöver i sina skor."
      },
      {
        text: "Har du köpt arbetsskor tidigare?",
        correct: false,
        points: 0,
        feedback: "Det kan ge information, men frågan hjälper inte direkt dig att förstå vad kunden behöver nu."
      }
    ]
  },


  {
    customer: "Maria",
    text: "Jag har väntat länge. Ingen har hjälpt mig!",

    answers: [
      {
        text: "Jag förstår. Vad behöver du hjälp med?",
        correct: true,
        points: 10,
        feedback: "Bra. Du visar förståelse och försöker samtidigt ta reda på hur du kan hjälpa kunden."
      },
      {
        text: "Hur länge har du väntat?",
        correct: false,
        points: 0,
        feedback: "Frågan handlar om väntetiden men hjälper dig inte direkt att lösa kundens behov."
      },
      {
        text: "Varför frågade du ingen annan?",
        correct: false,
        points: 0,
        feedback: "Frågan kan uppfattas som att du lägger ansvaret på kunden."
      },
      {
        text: "Vad vill du köpa?",
        correct: false,
        points: 0,
        feedback: "Det kan vara relevant, men du behöver först visa förståelse för kundens situation."
      }
    ]
  },


  {
    customer: "Johan",
    text: "Jag vill köpa en present till min syster. Jag vet inte vad hon tycker om.",

    answers: [
      {
        text: "Vilken prisklass tänker du dig?",
        correct: false,
        points: 0,
        feedback: "Priset kan vara viktigt, men du behöver också förstå vad mottagaren tycker om."
      },
      {
        text: "Vilken färg brukar hon använda?",
        correct: false,
        points: 0,
        feedback: "Det kan vara användbart, men en bredare fråga ger mer information."
      },
      {
        text: "Har hon fått presenter från dig tidigare?",
        correct: false,
        points: 0,
        feedback: "Det kan ge lite information, men frågan fokuserar inte direkt på hennes intressen."
      },
      {
        text: "Kan du berätta lite om henne och vad hon brukar tycka om?",
        correct: true,
        points: 10,
        feedback: "Bra. Du använder en öppen fråga för att få mer information om kundens behov."
      }
    ]
  },


  {
    customer: "Fatima",
    text: "Jag köpte den här tröjan för två dagar sedan, men jag är inte nöjd.",

    answers: [
      {
        text: "Vad var det som gjorde dig missnöjd?",
        correct: true,
        points: 10,
        feedback: "Bra. Du lyssnar på kunden och försöker förstå problemet innan du bestämmer hur du ska hjälpa."
      },
      {
        text: "Vilken storlek köpte du?",
        correct: false,
        points: 0,
        feedback: "Storleken kan vara viktig, men först behöver du förstå varför kunden inte är nöjd."
      },
      {
        text: "Vad kostade tröjan?",
        correct: false,
        points: 0,
        feedback: "Priset ger inte direkt information om varför kunden är missnöjd."
      },
      {
        text: "När började du använda tröjan?",
        correct: false,
        points: 0,
        feedback: "Det kan vara relevant senare, men börja med att förstå vad kunden är missnöjd med."
      }
    ]
  },


  {
    customer: "David",
    text: "Kan du hjälpa mig? Jag har väldigt bråttom.",

    answers: [
      {
        text: "Vad har du tänkt köpa?",
        correct: true,
        points: 10,
        feedback: "Bra. Du är tydlig och försöker snabbt förstå vad kunden behöver."
      },
      {
        text: "Hur mycket tid har du?",
        correct: false,
        points: 0,
        feedback: "Frågan handlar om tiden men hjälper dig inte direkt att hitta kundens behov."
      },
      {
        text: "Har du varit här tidigare?",
        correct: false,
        points: 0,
        feedback: "Det är inte den viktigaste informationen när kunden behöver snabb hjälp."
      },
      {
        text: "Vilken avdelning brukar du gå till?",
        correct: false,
        points: 0,
        feedback: "Det kan vara relevant, men det är bättre att först ta reda på vad kunden söker."
      }
    ]
  },


  {
    customer: "Nora",
    text: "Jag tittar bara.",

    answers: [
      {
        text: "Är det första gången du besöker butiken?",
        correct: false,
        points: 0,
        feedback: "Frågan kan vara relevant, men kunden har just sagt att hon tittar."
      },
      {
        text: "Letar du efter något särskilt?",
        correct: false,
        points: 0,
        feedback: "Det är en vanlig fråga, men kunden har sagt att hon bara tittar. Ge henne först lite utrymme."
      },
      {
        text: "Vilken avdelning tycker du bäst om?",
        correct: false,
        points: 0,
        feedback: "Frågan behövs inte just nu. Kunden har inte bett om hjälp."
      },
      {
        text: "Självklart. Säg gärna till om du vill ha hjälp.",
        correct: true,
        points: 10,
        feedback: "Bra. Du respekterar kunden och visar samtidigt att du finns tillgänglig."
      }
    ]
  },


  {
    customer: "Erik",
    text: "Jag förstår inte vad personalen sa till mig.",

    answers: [
      {
        text: "Vilken del var svårast att förstå?",
        correct: true,
        points: 10,
        feedback: "Bra. Du försöker ta reda på vad kunden inte förstod så att du kan anpassa kommunikationen."
      },
      {
        text: "Vad sa personalen?",
        correct: false,
        points: 0,
        feedback: "Det kan ge information, men det är bättre att först ta reda på vilken del kunden inte förstod."
      },
      {
        text: "Har du problem med svenska?",
        correct: false,
        points: 0,
        feedback: "Frågan kan uppfattas som negativ. Fokusera i stället på vad kunden behöver hjälp med."
      },
      {
        text: "Kan du läsa informationen igen?",
        correct: false,
        points: 0,
        feedback: "Det lägger ansvaret på kunden i stället för att först försöka hjälpa."
      }
    ]
  },


  {
    customer: "Lina",
    text: "Jag är osäker på om den här produkten passar mig.",

    answers: [
      {
        text: "Vilken färg hade du tänkt dig?",
        correct: false,
        points: 0,
        feedback: "Färgen kan vara viktig, men du behöver först förstå vad kunden behöver."
      },
      {
        text: "Vad är viktigast för dig när du väljer en sådan produkt?",
        correct: true,
        points: 10,
        feedback: "Bra. Du undersöker kundens behov innan du rekommenderar en produkt."
      },
      {
        text: "Har du sett någon annan produkt?",
        correct: false,
        points: 0,
        feedback: "Det kan ge viss information, men frågan hjälper dig inte lika mycket att förstå kundens behov."
      },
      {
        text: "Vilket pris tycker du är lagom?",
        correct: false,
        points: 0,
        feedback: "Pris kan vara en del av kundens behov, men frågan är ganska begränsad."
      }
    ]
  },


  {
    customer: "Omar",
    text: "Tack för hjälpen! Du lyssnade verkligen på vad jag behövde.",

    answers: [
      {
        text: "Tack. Jag hoppas att du blir nöjd med ditt köp.",
        correct: true,
        points: 10,
        feedback: "Bra. Du avslutar kundmötet på ett vänligt och professionellt sätt."
      },
      {
        text: "Vad bra att du säger det.",
        correct: false,
        points: 0,
        feedback: "Det fungerar, men ett tydligt och vänligt avslut passar bättre."
      },
      {
        text: "Jag gjorde bara mitt jobb.",
        correct: false,
        points: 0,
        feedback: "Svaret kan uppfattas som mindre personligt och engagerat."
      },
      {
        text: "Okej, då var vi klara.",
        correct: false,
        points: 0,
        feedback: "Det avslutar samtalet snabbt men ger inte samma positiva avslut."
      }
    ]
  }

];

/* -----------------------------------------------------
   STARTA SPELET
----------------------------------------------------- */

function startGame() {
    const nameInput = document.getElementById("playerName").value.trim();

    if (nameInput === "") {
        alert("Skriv ditt namn först.");
        return;
    }

    playerName = nameInput;

    // Blanda kunderna
    situations.sort(() => Math.random() - 0.5);

    currentQuestion = 0;
    score = 0;

    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";

    showQuestion();
}


/* -----------------------------------------------------
   VISA FRÅGA
----------------------------------------------------- */

function showQuestion() {

  answered = false;

  const situation = situations[currentQuestion];

  const questionNumber = currentQuestion + 1;

  document.getElementById("questionNumber").textContent =
    `Fråga ${questionNumber} av ${situations.length}`;

  document.getElementById("progressFill").style.width =
    `${(questionNumber / situations.length) * 100}%`;

  document.getElementById("customerName").textContent =
    situation.customer;

  document.getElementById("customerLabel").textContent =
    `${situation.customer}, kund`;

  document.getElementById("customerText").textContent =
    situation.text;

  const answerList = document.getElementById("answerList");

  answerList.innerHTML = "";

  const feedback = document.getElementById("feedback");

  feedback.style.display = "none";

  const nextButton = document.getElementById("nextButton");

  nextButton.style.display = "none";

  situation.answers.forEach((answer, index) => {

    const button = document.createElement("button");

    button.className = "answer-button";

    button.textContent =
      `${String.fromCharCode(65 + index)}. ${answer.text}`;

    button.onclick = () => chooseAnswer(answer, button);

    answerList.appendChild(button);

  });

}


/* -----------------------------------------------------
   VÄLJ SVAR
----------------------------------------------------- */

function chooseAnswer(answer, clickedButton) {

  if (answered) {
    return;
  }

  answered = true;

  const buttons =
    document.querySelectorAll(".answer-button");

  buttons.forEach(button => {
    button.disabled = true;
  });


  if (answer.correct) {

    score += answer.points;

    correctAnswers++;

    clickedButton.classList.add("correct");

    showFeedback(
      true,
      "Rätt svar!",
      answer.feedback
    );

  } else {

    clickedButton.classList.add("incorrect");

    showFeedback(
      false,
      "Inte rätt svar",
      answer.feedback
    );

    /*
      Markera rätt svar.
    */

    const situation = situations[currentQuestion];

    const answerButtons =
      document.querySelectorAll(".answer-button");

    situation.answers.forEach((item, index) => {

      if (item.correct) {

        answerButtons[index].classList.add("correct");

      }

    });

  }

  updateScore();

}


/* -----------------------------------------------------
   FEEDBACK
----------------------------------------------------- */

function showFeedback(isCorrect, title, text) {

  const feedback =
    document.getElementById("feedback");

  const feedbackTitle =
    document.getElementById("feedbackTitle");

  const feedbackText =
    document.getElementById("feedbackText");

  feedback.className =
    `feedback ${isCorrect ? "correct" : "incorrect"}`;

  feedbackTitle.textContent =
    isCorrect ? "✓ " + title : "✕ " + title;

  feedbackText.textContent =
    text;

  feedback.style.display = "block";

  document.getElementById("nextButton").style.display =
    "inline-block";

}


/* -----------------------------------------------------
   NÄSTA FRÅGA
----------------------------------------------------- */

function nextQuestion() {

  currentQuestion++;

  if (currentQuestion >= situations.length) {

    showResult();

    return;
  }

  showQuestion();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* -----------------------------------------------------
   UPPDATERA POÄNG
----------------------------------------------------- */

function updateScore() {

  document.getElementById("score").textContent =
    score;

}


/* -----------------------------------------------------
   RESULTAT
----------------------------------------------------- */

function showResult() {

  document.getElementById("gameScreen").style.display =
    "none";

  document.getElementById("resultScreen").style.display =
    "block";

  const totalQuestions = situations.length;

  const percentage =
    Math.round(
      (correctAnswers / totalQuestions) * 100
    );

  document.getElementById("resultName").textContent =
    playerName;

  document.getElementById("finalScore").textContent =
    `${score} poäng`;

  document.getElementById("resultInfo").innerHTML =
    `
      Rätt svar: <strong>${correctAnswers}</strong> av ${totalQuestions}<br>
      Fel svar: <strong>${totalQuestions - correctAnswers}</strong><br>
      Resultat: <strong>${percentage}%</strong>
    `;


  let message = "";

  if (percentage >= 90) {

    message =
      "Du visar mycket god förståelse för kundbemötande och kommunikation.";

  } else if (percentage >= 70) {

    message =
      "Bra arbete! Du visar att du förstår många viktiga delar av kundbemötande.";

  } else if (percentage >= 50) {

    message =
      "Bra försök! Fortsätt träna på att ställa frågor, lyssna och anpassa kommunikationen.";

  } else {

    message =
      "Fortsätt träna. Läs gärna igenom begreppen om kundbemötande och kommunikation och spela igen.";

  }

  document.getElementById("resultMessage").textContent =
    message;

  document.getElementById("score").textContent =
    score;

}


/* -----------------------------------------------------
   SPELA IGEN
----------------------------------------------------- */

function restartGame() {

  currentQuestion = 0;

  score = 0;

  correctAnswers = 0;

  answered = false;

  document.getElementById("resultScreen").style.display =
    "none";

  document.getElementById("gameScreen").style.display =
    "block";

  updateScore();

  showQuestion();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}