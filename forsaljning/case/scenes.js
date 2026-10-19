/* CASE: Reklamationen utan kvitto
   Här ändrar du texterna. Spelmotorn finns i ../case.js.
   Varje val: t = text, p = poäng (3 = bäst, 0 = sämst), r = vad som händer, fb = förklaring. */

const CASE = {
  title: "Reklamationen utan kvitto",
  customer: "Karin",
  startMood: 30,
  minWords: 12,     // minsta antal ord i reflektionen per scen
  finalWords: 20,   // minsta antal ord i slutreflektionen
  finalPrompt:
    "Slutreflektion: Vad tar du med dig från det här caset? Vad skulle du göra annorlunda nästa gång du möter en arg kund som saknar kvitto?",

  startFacts: [
    "Kund: Karin",
    "Vara: en jacka som kostade 1 499 kronor",
    "Köpt: för ungefär åtta månader sedan",
    "Problem: dragkedjan har gått sönder",
    "Kvitto: saknas",
    "Karin vill ha pengarna tillbaka"
  ],

  scenes: [
    /* ---------------- SCEN 1 ---------------- */
    {
      title: "Kunden kommer in",
      who: "Karin (kund)",
      story: "Det är tisdag eftermiddag i Sportbutiken Aktiv. Karin kommer fram till kassan med en jacka i handen. Hon pratar högt och det står flera kunder i kön.",
      say: "Den här jackan har gått sönder! Jag vill ha pengarna tillbaka nu. Jag har tappat kvittot, men jag köpte den för ungefär åtta månader sedan!",
      ask: "Hur svarar du?",
      reflect: "Hur tror du att Karin känner sig just nu? Hur kan ditt första svar göra känslan bättre eller sämre?",
      know: "En arg kund vill först bli lyssnad på. Lyssna, visa förståelse och ta reda på fakta innan du lovar något.",
      think: "Många kunder är inte arga på dig, utan på problemet. Om du lyssnar först får du ofta en lugnare kund och bättre information.",
      options: [
        { t: "Visa att du förstår att hon är upprörd och be henne berätta vad som har hänt med jackan, innan du pratar om kvitto eller regler.", p: 3,
          r: "Karin tar ett andetag. 'Dragkedjan gick sönder förra veckan. Jag är bara så less.'",
          fb: "Du visar förståelse och ställer en öppen fråga innan du nämner kvitto eller regler. Då sjunker ofta ilskan, och du får information du behöver." },
        { t: "Säga att du förstår, men att det blir svårt utan kvitto, och att du ska se vad butiken kan göra.", p: 1,
          r: "'Svårt? Så ni tänker inte hjälpa mig?' Karin höjer rösten ännu mer.",
          fb: "Du är vänlig, men du säger 'svårt' innan du vet något. Kvitto är inte ett krav för att reklamera, så svaret skapar onödig konflikt. Lyssna först." },
        { t: "Be henne vänligt att lugna ner sig, så att du kan hjälpa henne bättre och de andra kunderna slipper höra.", p: 0,
          r: "'Lugna ner mig?! Jag har betalat 1 499 kronor för den här jackan!'",
          fb: "Att be en arg kund lugna sig upplevs ofta som att du inte tar henne på allvar. Det gör oftast kunden argare, även om du säger det vänligt." },
        { t: "Lova att hon får pengarna tillbaka direkt, så att hon lugnar sig och kön kan gå vidare.", p: 1,
          r: "Karin blir lugn direkt. 'Jaha, bra! Tack.' Men du har lovat något som du inte vet om du kan hålla.",
          fb: "Kunden blir nöjd för stunden, men du har lovat pengar tillbaka innan du vet vad som hänt. I första hand har kunden rätt till reparation eller ny vara. Ett löfte du inte kan hålla skadar förtroendet senare." }
      ]
    },

    /* ---------------- SCEN 2 ---------------- */
    {
      title: "Ta reda på fakta",
      who: "Karin (kund)",
      story: "Karin har lugnat sig lite. Du vill förstå vad som har hänt innan du bestämmer något. Hur du frågar spelar roll.",
      say: "Jackan är bara åtta månader gammal. Jag förstår inte hur den kan gå sönder så snabbt.",
      ask: "Vad gör du nu?",
      reflect: "Vilken information behöver du för att kunna bedöma ärendet? Hur kan sättet du frågar på visa om du litar på kunden eller inte?",
      know: "Kunden ska reklamera inom skälig tid. Två månader efter att felet upptäcktes räknas som skäligt. Karin kom direkt, så hon är i tid.",
      think: "Öppna frågor (när, hur, vad) ger mer information än ja/nej-frågor, och de visar att du är nyfiken i stället för misstänksam.",
      options: [
        { t: "Fråga öppet när hon köpte jackan, hur hon har använt den och när hon upptäckte att dragkedjan gick sönder.", p: 3,
          r: "'Jag köpte den i höstas och har haft den nästan varje dag i vinter. Dragkedjan gick sönder förra veckan, och jag kom hit direkt.'",
          fb: "Bra frågor. Du får veta tre viktiga saker: när hon köpte, hur hon använt jackan och när felet upptäcktes. Det behövs för att bedöma om det är ett fel och om hon reklamerar i tid." },
        { t: "Fråga varför hon inte sparade kvittot, eftersom det hade gjort det mycket enklare för alla.", p: 0,
          r: "'Vem sparar kvitton i åtta månader? Det är väl er sak att ha koll!'",
          fb: "Frågan låter som en anklagelse. Dessutom är kvitto inte ett krav för att reklamera, och du får ingen ny information om ärendet." },
        { t: "Fråga om dragkedjan kan ha gått sönder av något hon gjort, så att du vet om det är ett fel eller en skada.", p: 1,
          r: "'Gjort sönder? Jag har bara dragit upp den, som man gör med en jacka!'",
          fb: "Det kan vara viktigt att veta om en skada beror på ovarsam användning. Men om du börjar där låter det som misstro. Börja med öppna frågor om hur jackan har använts." },
        { t: "Hämta chefen direkt, eftersom ärendet gäller pengar och du inte vill fatta ett fel beslut.", p: 1,
          r: "'Ska jag berätta allt en gång till?' suckar Karin.",
          fb: "Att be om hjälp kan vara klokt. Men du hade kunnat ta reda på fakta först, så att chefen får ett tydligt underlag och kunden slipper berätta flera gånger." }
      ]
    },

    /* ---------------- SCEN 3 ---------------- */
    {
      title: "Köpet utan kvitto",
      who: "Karin (kund)",
      facts: [
        "Karin har använt jackan nästan varje dag i vinter.",
        "Dragkedjan gick sönder förra veckan, och hon kom hit direkt.",
        "Hon säger att hon betalade med sitt bankkort."
      ],
      story: "Nu vet du när hon köpte jackan och hur hon har använt den. Hon har inget kvitto, men hon säger att hon betalade med sitt bankkort.",
      say: "Jag kan inte visa något kvitto. Men jag har ju köpt den här! Tror ni inte på mig?",
      ask: "Hur går du vidare?",
      reflect: "Varför kan det vara orättvist att kräva kvitto? Vad behöver butiken ändå veta, och hur kan du ta reda på det utan att få kunden att känna sig misstänkt?",
      know: "Du behöver inte ha kvittot kvar för att reklamera. Köpet kan visas på andra sätt, till exempel med kontoutdrag, kortköp, kundklubbens köphistorik eller garantibevis.",
      think: "Kunden ska kunna visa att hon har handlat hos er, men butiken kan ofta hjälpa till. Ett rimligt krav på bevis är inte samma sak som att kräva ett visst papper.",
      options: [
        { t: "Be Karin visa köpet i sin mobilbank eller på kontoutdraget, så att du ser att det är betalt i just er butik.", p: 2,
          r: "Karin tar fram mobilen. 'Här! 14 oktober, Sportbutiken Aktiv, 1 499 kronor.'",
          fb: "Bra, ett kontoutdrag är ett fullgott bevis. Men du kan också kontrollera själv först, så att Karin slipper bevisa allt. Då känner hon sig mer trodd." },
        { t: "Känn igen jackan som en av era modeller och sök köpet i kassasystemet eller kundklubben. Be om kontoutdrag först om du inte hittar det.", p: 3,
          r: "Du känner igen modellen och hittar köpet i kundklubben. 'Ser du, jag sa ju att jag köpte den här,' säger Karin, nu lite lugnare.",
          fb: "Mycket bra. Du tar ansvar för att undersöka själv och ber bara kunden bevisa mer om det behövs. Då känner hon sig trodd, och du har ändå kontroll." },
        { t: "Förklara att butikens regel är att man ska ha kvitto, och be henne leta hemma och komma tillbaka när hon har hittat det.", p: 0,
          r: "'Hittat det? Det finns inte! Jag vill prata med någon som bestämmer!'",
          fb: "Det stämmer inte att lagen kräver kvitto. Kvitto är bara ett sätt att visa köpet. Svaret ger en onödigt arg kund och kan leda till en anmälan." },
        { t: "Tro på Karin och gå vidare direkt utan att kontrollera något, eftersom hon verkar ärlig och du vill visa att du litar på henne.", p: 1,
          r: "'Tack för att du litar på mig!' Karin ler. Senare frågar chefen hur du kunde veta att jackan kom från just er butik.",
          fb: "Att visa förtroende är fint, men du behöver ändå en rimlig kontroll av att köpet gjordes hos er. Annars blir beslutet svårt att försvara." }
      ]
    },

    /* ---------------- SCEN 4 ---------------- */
    {
      title: "Är det ett fel?",
      who: "Sam (kollega)",
      facts: [
        "Dragkedjans tänder har spruckit på mitten.",
        "Jackan har inga hål, fläckar eller andra skador."
      ],
      story: "Du tittar noga på jackan. Dragkedjans tänder har spruckit på mitten. Jackan är använd, men har inga hål, fläckar eller andra skador. Din kollega Sam kommer förbi och tittar med.",
      say: "Den har ju använts varje dag. Det är väl bara normalt slitage?",
      ask: "Hur bedömer du ärendet?",
      reflect: "Vad är skillnaden mellan ett fel och normalt slitage? Hur kan man avgöra vad en kund rimligen får förvänta sig av en vara?",
      know: "Reklamationsrätten gäller i 3 år. Visar sig felet inom 2 år antas det ha funnits från början, om inte butiken kan visa något annat.",
      think: "Man kan inte säga 'använd betyder slitage'. Fråga dig: Hur länge brukar en sådan vara hålla? Vad kostade den? Har kunden använt den på ett rimligt sätt?",
      options: [
        { t: "Det är troligen ett fel. En dragkedja på en jacka för 1 499 kronor bör hålla längre än åtta månader, och felet antas ha funnits från början.", p: 3,
          r: "Sam nickar långsamt. 'Okej, det låter rimligt. Jag hade glömt tvåårsregeln.'",
          fb: "Rätt tänkt. Hur länge man kan förvänta sig att en vara håller beror på vara och pris. Inom 2 år antas felet ha funnits från början, och det är butiken som måste visa något annat." },
        { t: "Det är normalt slitage: jackan har använts nästan varje dag i en hel vinter, så butiken behöver inte göra något.", p: 0,
          r: "Karin hör er prata. 'Då går jag till Konsumentverket!'",
          fb: "Att en vara har använts betyder inte att felet är slitage. Man får förvänta sig att varor används. Frågan är om varan håller så länge som man rimligen kan förvänta sig." },
        { t: "Det går inte att avgöra nu: jackan måste först skickas till tillverkaren för test, och tills svaret kommer säger butiken nej.", p: 1,
          r: "'Och hur länge ska jag vänta utan jacka och utan pengar?' frågar Karin.",
          fb: "Det kan vara klokt att undersöka mer. Men 'nej tills vidare' är fel, eftersom butiken inte kan avslå ärendet utan att visa att felet inte fanns från början." },
        { t: "Det beror på om Karin kan bevisa att felet fanns från början, och det är hon som måste visa det.", p: 0,
          r: "'Hur ska jag kunna bevisa det? Jag är ingen jackexpert!' säger Karin.",
          fb: "Så var reglerna förr, när tiden var kortare. Numera antas felet ha funnits från början om det visar sig inom två år. Då är det butiken som måste visa något annat." }
      ]
    },

    /* ---------------- SCEN 5 ---------------- */
    {
      title: "Vad erbjuder du?",
      who: "Karin (kund)",
      facts: [
        "Butiken har 30 dagars öppet köp. Det är frivilligt och gäller inte här, eftersom det har gått åtta månader."
      ],
      story: "Du är nu ganska säker på att det är ett fel. Karin vill fortfarande ha pengarna tillbaka. Butikens öppna köp gäller bara i 30 dagar, så det hjälper inte i det här läget. Reklamation är något annat.",
      say: "Jag vill bara ha mina pengar tillbaka. Jag orkar inte vänta på en reparation.",
      ask: "Vad erbjuder du?",
      reflect: "Vilka alternativ har Karin enligt lagen? Vad blir konsekvensen för Karin och för butiken av det du erbjuder?",
      know: "Vid fel har kunden i första hand rätt till reparation eller ny vara, och kunden väljer. Om det inte görs inom skälig tid, inte går eller misslyckas kan kunden få prisavdrag eller häva köpet. Butiken får ge mer än lagen kräver, men aldrig mindre.",
      think: "Rätt lösning är inte alltid det kunden först ber om. Kunden behöver känna till sina valmöjligheter för att kunna välja.",
      options: [
        { t: "Berätta att hon i första hand kan välja mellan reparation och ny jacka, och att pengarna tillbaka kan bli aktuellt om det inte fungerar. Fråga vad hon vill.", p: 3,
          r: "Karin tänker efter. 'Okej. Då vill jag helst ha en ny jacka. Går det?'",
          fb: "Mycket bra. Du förklarar hennes rättigheter i rätt ordning och låter henne välja. Pengarna tillbaka kan bli aktuellt om rättelsen inte görs eller misslyckas." },
        { t: "Ge henne pengarna tillbaka direkt, eftersom det är det hon ber om och det är det enklaste för alla.", p: 1,
          r: "'Tack, äntligen någon som lyssnar!' Men senare frågar Henrik: 'Varför betalade vi tillbaka hela summan?'",
          fb: "Butiken får ge mer än lagen kräver, men då ska det vara ett medvetet beslut och inget du lovar på eget bevåg. Karin bör också få veta att hon i första hand har rätt till reparation eller ny vara." },
        { t: "Erbjuda ett presentkort på 1 000 kronor, så att hon själv kan välja något som hon verkligen vill ha.", p: 0,
          r: "'Presentkort? Det är mindre än jag betalade, och jag får inte välja vad jag vill!'",
          fb: "Ett presentkort på lägre belopp är sämre än vad lagen ger. Konsumentköplagen är tvingande, så butiken får aldrig ge sämre villkor än lagen." },
        { t: "Skicka jackan på reparation direkt, eftersom det är den vanligaste lösningen, och be henne vänta på besked.", p: 1,
          r: "'Reparation? Hur länge då? Och får jag ingen jacka under tiden?' undrar Karin.",
          fb: "Reparation är en laglig lösning, men kunden har rätt att välja mellan reparation och ny vara. Du måste fråga vad hon vill och berätta hur lång tid det tar." }
      ]
    },

    /* ---------------- SCEN 6 ---------------- */
    {
      title: "Chefen säger nej",
      who: "Henrik (chef)",
      story: "Henrik, din chef, har hört samtalet. Han tar dig åt sidan där Karin inte hör. Han är stressad, och butikens resultat har varit dåligt den här månaden.",
      say: "Hon har inget kvitto. Vi har sagt nej till sådant här förut. Säg nej, annars blir det dyrt för oss.",
      ask: "Vad gör du?",
      reflect: "Vad gör du när chefens önskemål krockar med lagen? Vem har ansvaret om butiken bryter mot lagen, och hur kan man säga emot sin chef på ett respektfullt sätt?",
      know: "Konsumentköplagen är tvingande, så butiken kan inte avtala bort kundens rättigheter. Om butik och kund inte kommer överens kan kunden vända sig till ARN, Allmänna reklamationsnämnden.",
      think: "Yrkesetik betyder att vara lojal mot både kunden och företaget. Ibland är det mest lojala att hjälpa chefen att undvika ett misstag.",
      options: [
        { t: "Förklara lugnt för Henrik att kvitto inte krävs och att felet kom inom två år, och föreslå att ni följer lagen för att undvika en anmälan till ARN.", p: 3,
          r: "Henrik suckar. 'Okej. Jag visste inte att kvitto inte krävs. Gör det på rätt sätt.'",
          fb: "Du står upp för både kunden och butiken, och du gör det respektfullt med fakta. Ett nej som strider mot lagen kan bli dyrare för butiken i längden." },
        { t: "Göra som Henrik säger och säga nej till Karin, eftersom han är chef och du inte vill skapa problem.", p: 0,
          r: "Du går tillbaka med ett nej. Karin ser besviken ut och säger att hon tänker anmäla butiken till ARN.",
          fb: "Det är svårt att säga emot en chef, men kunden har rätt till sina rättigheter. Butiken kan inte avtala bort dem. Du behöver lyfta vad lagen säger." },
        { t: "Be Henrik prata med Karin själv, eftersom beslutet är hans och du inte vill ta ansvar för pengarna.", p: 1,
          r: "Henrik tvekar. 'Jag har ingen tid. Fixa det.'",
          fb: "Att lyfta ärendet till chefen kan vara rimligt, men du lämnar över ansvaret utan att ge något underlag. Du kan själv bidra med fakta." },
        { t: "Berätta för Karin att din chef sagt nej men att du själv tycker att hon har rätt, så att hon vet hur det ligger till.", p: 1,
          r: "'Så din chef bryter mot lagen?' säger Karin. Henrik ser er och blir arg.",
          fb: "Du är ärlig, men du talar om en intern oenighet inför kunden och skapar konflikt med din chef. Lös oenigheten med chefen först." }
      ]
    },

    /* ---------------- SCEN 7 ---------------- */
    {
      title: "Avslutet",
      who: "Karin (kund)",
      facts: [
        "Ni har kommit överens: Karin får en ny jacka av samma modell, som kommer om ungefär en vecka."
      ],
      story: "Henrik går med på att följa lagen. Karin får en ny jacka av samma modell, och den kommer om ungefär en vecka. Nu är det dags att avsluta mötet.",
      say: "Okej. Tack för hjälpen. Jag är fortfarande lite sur att jag fick tjata.",
      ask: "Hur avslutar du?",
      reflect: "Vad gör ett bra avslut för kundens förtroende på lång sikt? Vad kan butiken lära sig av det här ärendet?",
      know: "Ett bra avslut sammanfattar överenskommelsen, tydliggör nästa steg och visar uppskattning. Hur ett klagomål hanteras påverkar ofta om kunden kommer tillbaka.",
      think: "Det är ett bra tecken när en kund säger till. Då får butiken en chans att rätta till felet innan kunden försvinner för alltid.",
      options: [
        { t: "Sammanfatta vad ni har kommit överens om, berätta när den nya jackan kommer och hur ni når varandra, och be om ursäkt för besväret.", p: 3,
          r: "Karin ler lite. 'Tack, nu vet jag vad som händer. Jag kommer gärna tillbaka.'",
          fb: "Ett tydligt avslut gör att kunden vet vad som händer och känner sig respekterad. Det kan göra en missnöjd kund till en lojal kund." },
        { t: "Tacka henne för att hon kom och önska henne en bra dag, eftersom ärendet nu är löst.", p: 1,
          r: "Karin går, men vet inte hur hon får besked. Två dagar senare ringer hon och frågar var jackan är.",
          fb: "Du löste ärendet men missade tydlig information om nästa steg. Det leder ofta till fler samtal och minskat förtroende." },
        { t: "Be henne skriva en positiv recension om servicen hon har fått, nu när allt har ordnat sig.", p: 0,
          r: "'Recension? Efter allt det här?' Karin ser irriterad ut.",
          fb: "Att be om en recension direkt efter ett problem kan kännas pushigt. Vänta tills kunden verkligen är nöjd med lösningen." },
        { t: "Be henne skriva under att ärendet är löst och att hon inte kräver något mer, så att butiken är skyddad.", p: 0,
          r: "'Skriva under? Varför då? Är ni rädda att jag ska klaga?' frågar Karin.",
          fb: "Det kan kännas som misstro. Dessutom kan en kund inte i förväg avstå från sina rättigheter, eftersom lagen är tvingande. Ett bra avslut bygger på tydlighet och förtroende." }
      ]
    }
  ]
};