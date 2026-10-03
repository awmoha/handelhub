// /* =========================================================
//    BUTIKENS KATASTROF
//    Handelhub
//    Interaktiv butikssimulator
// ========================================================= */


// /* =========================================================
//    GAME STATE
// ========================================================= */

// const game = {

//   storeName: "Min butik",

//   running: false,

//   problemsSolved: 0,

//   totalProblems: 3,

//   money: 8500,

//   sales: 70,

//   customerSatisfaction: 75,

//   sustainability: 65,

//   hour: 9,

//   minutes: 0,

//   /* -----------------------------------------
//      CUSTOMER SYSTEM
//   ----------------------------------------- */

//   customers: [],

//   customerId: 0,

//   totalCustomersCreated: 0,

//   maxCustomersCreated: 15,

//   minCustomersCreated: 10,

//   maxActiveCustomers: 8,

//   activeCustomerTimer: null,

//   activeProblems: [],


//   /* -----------------------------------------
//      STAFF
//   ----------------------------------------- */

//   staff: {

//     sara: {
//       name: "Sara",
//       role: "Kundservice",
//       energy: 85
//     },

//     ahmed: {
//       name: "Ahmed",
//       role: "Lager",
//       energy: 85
//     },

//     lina: {
//       name: "Lina",
//       role: "Exponering",
//       energy: 85
//     }

//   },


//   /* -----------------------------------------
//      STOCK
//   ----------------------------------------- */

//   stock: {

//     popular: 80,

//     milk: 25,

//     bread: 10,

//     juice: 65,

//     coffee: 30

//   },


//   /* -----------------------------------------
//      TIMERS
//   ----------------------------------------- */

//   timers: {

//     nextEvent: null,

//     customers: null,

//     clock: null,

//     customerSpawn: null

//   }

// };


// /* =========================================================
//    DOM HELPERS
// ========================================================= */

// function getElement(id) {

//   return document.getElementById(id);

// }


// function setText(id, value) {

//   const element = getElement(id);

//   if (element) {

//     element.textContent = value;

//   }

// }


// /* =========================================================
//    DOM ELEMENTS
// ========================================================= */

// const startScreen =
//   getElement("startScreen");

// const setupScreen =
//   getElement("setupScreen");

// const gameScreen =
//   getElement("gameScreen");

// const resultScreen =
//   getElement("resultScreen");

// const modal =
//   getElement("modal");

// const modalContent =
//   getElement("modalContent");

// const closeModalButton =
//   getElement("closeModal");

// const customerArea =
//   getElement("customerArea");

// const problemList =
//   getElement("problemList");

// const alertIndicator =
//   getElement("alertIndicator");

// const eventBanner =
//   getElement("eventBanner");

// const eventTitle =
//   getElement("eventTitle");

// const eventMessage =
//   getElement("eventMessage");

// const toast =
//   getElement("toast");


// /* =========================================================
//    SCREEN NAVIGATION
// ========================================================= */

// function showScreen(screen) {

//   if (!screen) return;

//   document
//     .querySelectorAll(".screen")
//     .forEach(element => {

//       element.classList.remove("active");

//     });

//   screen.classList.add("active");

//   window.scrollTo({

//     top: 0,

//     behavior: "smooth"

//   });

// }


// /* =========================================================
//    START GAME
// ========================================================= */

// const startGameBtn =
//   getElement("startGameBtn");


// if (startGameBtn) {

//   startGameBtn.addEventListener(
//     "click",
//     () => {

//       if (setupScreen) {

//         showScreen(
//           setupScreen
//         );

//       }

//     }
//   );

// }


// /* =========================================================
//    STORE SELECTION
// ========================================================= */

// document
//   .querySelectorAll(".store-choice")
//   .forEach(button => {

//     button.addEventListener(
//       "click",
//       () => {

//         game.storeName =
//           button.dataset.store ||
//           "Min butik";

//         beginGame();

//       }
//     );

//   });


// /* =========================================================
//    CUSTOM STORE
// ========================================================= */

// const customStoreBtn =
//   getElement("customStoreBtn");


// if (customStoreBtn) {

//   customStoreBtn.addEventListener(
//     "click",
//     () => {

//       const input =
//         getElement(
//           "customStoreInput"
//         );

//       if (!input) return;

//       const name =
//         input.value.trim();

//       if (!name) {

//         showToast(
//           "⚠️",
//           "Skriv namnet på din butik först."
//         );

//         return;

//       }

//       game.storeName = name;

//       beginGame();

//     }
//   );

// }


// /* =========================================================
//    BEGIN GAME
// ========================================================= */

// function beginGame() {

//   resetGame();

//   game.running = true;

//   setText(
//     "storeName",
//     game.storeName
//   );

//   if (gameScreen) {

//     showScreen(
//       gameScreen
//     );

//   }

//   updateUI();


//   /*
//      Starta med flera kunder direkt.
//      Sedan kommer nya kunder slumpmässigt.
//   */

//   createInitialCustomers();

//   startCustomerMovement();

//   startCustomerSystem();

//   startGameClock();


//   /*
//      Första riktiga butikshändelsen
//      kommer efter 20 sekunder.
//   */

//   setTimeout(() => {

//     if (!game.running) return;

//     triggerEvent(
//       events[0]
//     );

//   }, 20000);

// }


// /* =========================================================
//    RESET GAME
// ========================================================= */

// function resetGame() {

//   clearTimeout(
//     game.timers.nextEvent
//   );

//   clearInterval(
//     game.timers.customers
//   );

//   clearInterval(
//     game.timers.clock
//   );

//   clearTimeout(
//     game.timers.customerSpawn
//   );


//   game.running = false;

//   game.problemsSolved = 0;

//   game.money = 8500;

//   game.sales = 70;

//   game.customerSatisfaction = 75;

//   game.sustainability = 65;

//   game.hour = 9;

//   game.minutes = 0;

//   game.customers = [];

//   game.customerId = 0;

//   game.totalCustomersCreated = 0;

//   game.activeProblems = [];


//   game.stock = {

//     popular: 80,

//     milk: 25,

//     bread: 10,

//     juice: 65,

//     coffee: 30

//   };


//   Object.values(
//     game.staff
//   ).forEach(staff => {

//     staff.energy = 85;

//   });


//   if (customerArea) {

//     customerArea.innerHTML = "";

//   }


//   updateProblemList();

// }


// /* =========================================================
//    CUSTOMER DATA
// ========================================================= */

// const customerNames = [

//   "Maja",
//   "Ali",
//   "Sara",
//   "Emma",
//   "Noah",
//   "Liam",
//   "Sofia",
//   "Adam",
//   "Nora",
//   "Hugo",
//   "Ella",
//   "Omar",
//   "Leo",
//   "Amina",
//   "Lucas",
//   "Mira",
//   "Elias",
//   "Alva",
//   "Samir",
//   "Lina"

// ];


// const customerTypes = [

//   "Stressad",

//   "Nyfiken",

//   "Prisfokuserad",

//   "Van kund",

//   "Ny kund",

//   "Familj",

//   "Snabb kund",

//   "Pratsam kund"

// ];


// const customerEmojis = [

//   "👩",
//   "👨",
//   "👩‍🦱",
//   "👨‍🦱",
//   "👩‍🦰",
//   "👨‍🦰",
//   "🧑"

// ];


// /* =========================================================
//    RANDOM HELPERS
// ========================================================= */

// function randomNumber(
//   min,
//   max
// ) {

//   return Math.floor(
//     Math.random() *
//     (max - min + 1)
//     + min
//   );

// }


// function randomItem(
//   array
// ) {

//   return array[
//     Math.floor(
//       Math.random() *
//       array.length
//     )
//   ];

// }


// /* =========================================================
//    CREATE INITIAL CUSTOMERS
// ========================================================= */

// function createInitialCustomers() {

//   /*
//      Starta med 4 kunder.
//      Därefter kommer nya kunder in
//      automatiskt.
//   */

//   for (
//     let i = 0;
//     i < 4;
//     i++
//   ) {

//     spawnCustomer();

//   }

// }


// /* =========================================================
//    CUSTOMER SYSTEM
// ========================================================= */

// function startCustomerSystem() {

//   scheduleNextCustomer();

// }


// function scheduleNextCustomer() {

//   if (!game.running) return;


//   if (
//     game.totalCustomersCreated >=
//     game.maxCustomersCreated
//   ) {

//     return;

//   }


//   /*
//      Ny kund kommer ungefär var
//      7–14 sekund.

//      Det gör att butiken successivt
//      fylls med kunder.
//   */

//   const delay =
//     randomNumber(
//       7000,
//       14000
//     );


//   game.timers.customerSpawn =
//     setTimeout(() => {

//       if (!game.running) return;

//       /*
//          Om det finns plats i butiken
//          skapas en ny kund.
//       */

//       if (
//         game.customers.length <
//         game.maxActiveCustomers
//       ) {

//         spawnCustomer();

//       }


//       /*
//          Om det redan är många kunder
//          väntar systemet lite och försöker igen.
//       */

//       scheduleNextCustomer();

//     }, delay);

// }


// /* =========================================================
//    SPAWN CUSTOMER
// ========================================================= */

// function spawnCustomer() {

//   if (!game.running) return;


//   if (
//     game.totalCustomersCreated >=
//     game.maxCustomersCreated
//   ) {

//     return;

//   }


//   if (
//     game.customers.length >=
//     game.maxActiveCustomers
//   ) {

//     return;

//   }


//   game.customerId++;

//   game.totalCustomersCreated++;


//   const customer = {

//     id: game.customerId,

//     name: randomItem(
//       customerNames
//     ),

//     emoji: randomItem(
//       customerEmojis
//     ),

//     type: randomItem(
//       customerTypes
//     ),

//     satisfaction:
//       randomNumber(
//         65,
//         95
//       ),

//     x:
//       randomNumber(
//         10,
//         85
//       ),

//     y:
//       randomNumber(
//         25,
//         70
//       ),

//     /*
//        Varje kund får en egen tid
//        i butiken.

//        Vissa stannar kort,
//        vissa stannar länge.
//     */

//     stayTime:
//       randomNumber(
//         35000,
//         90000
//       ),

//     enteredAt:
//       Date.now(),

//     leaving:
//       false

//   };


//   game.customers.push(
//     customer
//   );


//   renderCustomer(
//     customer
//   );


//   showToast(
//     "🚪",
//     `${customer.name} kom in i butiken.`
//   );


//   /*
//      Kunden lämnar normalt efter
//      sin individuella vistelsetid.
//   */

//   setTimeout(() => {

//     if (!game.running) return;

//     leaveCustomer(
//       customer.id,
//       "normal"
//     );

//   }, customer.stayTime);


//   updateUI();

// }


// /* =========================================================
//    CUSTOMER MOOD
// ========================================================= */

// function getCustomerMood(
//   satisfaction
// ) {

//   if (
//     satisfaction >= 70
//   ) {

//     return {

//       emoji: "😊",

//       text: "Nöjd"

//     };

//   }


//   if (
//     satisfaction >= 50
//   ) {

//     return {

//       emoji: "😐",

//       text: "Osäker"

//     };

//   }


//   if (
//     satisfaction >= 25
//   ) {

//     return {

//       emoji: "😠",

//       text: "Missnöjd"

//     };

//   }


//   return {

//     emoji: "😡",

//     text: "Mycket missnöjd"

//   };

// }


// /* =========================================================
//    RENDER CUSTOMER
// ========================================================= */

// function renderCustomer(
//   customer
// ) {

//   if (!customerArea) return;


//   const element =
//     document.createElement(
//       "div"
//     );


//   element.className =
//     "customer";


//   element.dataset.id =
//     customer.id;


//   element.style.left =
//     `${customer.x}%`;


//   element.style.top =
//     `${customer.y}%`;


//   const mood =
//     getCustomerMood(
//       customer.satisfaction
//     );


//   element.innerHTML = `

//     <div class="customer-icon">
//       ${mood.emoji}
//     </div>

//     <div class="customer-name">
//       ${customer.name}
//     </div>

//   `;


//   element.addEventListener(
//     "click",
//     () => {

//       openCustomer(
//         customer
//       );

//     }
//   );


//   customerArea.appendChild(
//     element
//   );

// }


// /* =========================================================
//    UPDATE CUSTOMER MOODS
// ========================================================= */

// function updateCustomerMoods() {

//   game.customers.forEach(
//     customer => {

//       const element =
//         document.querySelector(
//           `.customer[data-id="${customer.id}"]`
//         );


//       if (!element) return;


//       const icon =
//         element.querySelector(
//           ".customer-icon"
//         );


//       if (!icon) return;


//       const mood =
//         getCustomerMood(
//           customer.satisfaction
//         );


//       icon.textContent =
//         mood.emoji;


//       /*
//          Om kunden blir mycket arg
//          lämnar kunden automatiskt.
//       */

//       if (
//         customer.satisfaction < 25 &&
//         !customer.leaving
//       ) {

//         leaveCustomer(
//           customer.id,
//           "angry"
//         );

//       }

//     }
//   );

// }


// /* =========================================================
//    CUSTOMER MOVEMENT
// ========================================================= */

// function startCustomerMovement() {

//   game.timers.customers =
//     setInterval(() => {

//       if (!game.running) return;

//       moveCustomers();

//     }, 7000);

// }


// function moveCustomers() {

//   const locations = [

//     {
//       name: "produkter",
//       x: 25,
//       y: 38
//     },

//     {
//       name: "avdelning",
//       x: 62,
//       y: 32
//     },

//     {
//       name: "gång",
//       x: 45,
//       y: 52
//     },

//     {
//       name: "kassa",
//       x: 72,
//       y: 65
//     },

//     {
//       name: "entré",
//       x: 15,
//       y: 70
//     },

//     {
//       name: "lager",
//       x: 18,
//       y: 25
//     }

//   ];


//   game.customers.forEach(
//     customer => {

//       if (
//         customer.leaving
//       ) {

//         return;

//       }


//       const element =
//         document.querySelector(
//           `.customer[data-id="${customer.id}"]`
//         );


//       if (!element) return;


//       /*
//          Vissa kunder rör sig,
//          andra stannar på samma plats.
//       */

//       const stays =
//         Math.random() < 0.35;


//       if (stays) {

//         return;

//       }


//       const location =
//         randomItem(
//           locations
//         );


//       customer.x =
//         location.x;

//       customer.y =
//         location.y;


//       element.style.left =
//         `${customer.x}%`;


//       element.style.top =
//         `${customer.y}%`;

//     }
//   );

// }


// /* =========================================================
//    CUSTOMER LEAVES
// ========================================================= */

// function leaveCustomer(
//   customerId,
//   reason
// ) {

//   const index =
//     game.customers.findIndex(
//       customer =>
//         customer.id ===
//         customerId
//     );


//   if (index === -1) return;


//   const customer =
//     game.customers[index];


//   if (
//     customer.leaving
//   ) {

//     return;

//   }


//   customer.leaving = true;


//   const element =
//     document.querySelector(
//       `.customer[data-id="${customer.id}"]`
//     );


//   /*
//      ARG CUSTOMER
//   */

//   if (
//     reason === "angry"
//   ) {

//     showToast(
//       "😡",
//       `${customer.name} blev för missnöjd och lämnade butiken.`
//     );


//     /*
//        Lite negativ påverkan
//        på den totala kundnöjdheten.
//     */

//     game.customerSatisfaction =
//       Math.max(
//         0,
//         game.customerSatisfaction - 5
//       );


//     /*
//        Visuell animation innan
//        kunden tas bort.
//     */

//     if (element) {

//       element.style.opacity =
//         "0";

//       element.style.transform =
//         "scale(0.6)";

//     }


//     setTimeout(() => {

//       removeCustomer(
//         customerId
//       );

//     }, 500);


//     updateUI();

//     return;

//   }


//   /*
//      NORMAL CUSTOMER EXIT
//   */

//   if (element) {

//     element.style.opacity =
//       "0";

//     element.style.transform =
//       "translateY(20px)";

//   }


//   setTimeout(() => {

//     removeCustomer(
//       customerId
//     );

//   }, 500);


//   showToast(
//     "🚪",
//     `${customer.name} lämnade butiken.`
//   );

// }


// /* =========================================================
//    REMOVE CUSTOMER
// ========================================================= */

// function removeCustomer(
//   customerId
// ) {

//   const element =
//     document.querySelector(
//       `.customer[data-id="${customerId}"]`
//     );


//   if (element) {

//     element.remove();

//   }


//   game.customers =
//     game.customers.filter(
//       customer =>
//         customer.id !==
//         customerId
//     );


//   updateUI();

// }


// /* =========================================================
//    CUSTOMER INTERACTION
// ========================================================= */

// function openCustomer(
//   customer
// ) {

//   if (
//     customer.leaving
//   ) {

//     return;

//   }


//   const mood =
//     getCustomerMood(
//       customer.satisfaction
//     );


//   let customerMessage;


//   if (
//     customer.satisfaction < 25
//   ) {

//     customerMessage =
//       "Jag är verkligen missnöjd. Det här fungerar inte alls.";

//   }

//   else if (
//     customer.satisfaction < 50
//   ) {

//     customerMessage =
//       "Jag börjar bli frustrerad. Kan någon hjälpa mig?";

//   }

//   else if (
//     customer.type === "Stressad"
//   ) {

//     customerMessage =
//       "Jag har bråttom. Kan du hjälpa mig snabbt?";

//   }

//   else if (
//     customer.type === "Nyfiken"
//   ) {

//     customerMessage =
//       "Jag letar efter något men vet inte riktigt vad.";

//   }

//   else {

//     customerMessage =
//       "Finns den här produkten billigare någonstans?";

//   }


//   openModal(`

//     <div class="modal-icon">
//       ${mood.emoji}
//     </div>

//     <span class="small-label">
//       KUND
//     </span>

//     <h2>
//       ${customer.name}
//     </h2>

//     <p>
//       ${customerMessage}
//     </p>

//     <p
//       style="
//         margin-top:10px;
//         font-size:13px;
//       "
//     >

//       Kundnöjdhet:

//       <strong>
//         ${Math.round(
//           customer.satisfaction
//         )}%
//       </strong>

//     </p>


//     <div class="modal-options">

//       <button
//         class="modal-option"
//         data-customer-action="listen"
//       >

//         <strong>
//           👂 Lyssna och fråga
//         </strong>

//         <small>
//           Ta reda på vad kunden faktiskt behöver.
//         </small>

//       </button>


//       <button
//         class="modal-option"
//         data-customer-action="recommend"
//       >

//         <strong>
//           💡 Ge en rekommendation
//         </strong>

//         <small>
//           Försök hitta en produkt eller lösning.
//         </small>

//       </button>


//       <button
//         class="modal-option"
//         data-customer-action="wait"
//       >

//         <strong>
//           ⏳ Be kunden vänta
//         </strong>

//         <small>
//           Du prioriterar ett annat problem just nu.
//         </small>

//       </button>


//       <button
//         class="modal-option"
//         data-customer-action="ignore"
//       >

//         <strong>
//           🚶 Gå vidare
//         </strong>

//         <small>
//           Du väljer att inte hjälpa kunden just nu.
//         </small>

//       </button>

//     </div>

//   `);


//   document
//     .querySelectorAll(
//       "[data-customer-action]"
//     )
//     .forEach(button => {

//       button.addEventListener(
//         "click",
//         () => {

//           handleCustomerAction(

//             customer,

//             button.dataset.customerAction

//           );

//         }
//       );

//     });

// }


// /* =========================================================
//    CUSTOMER ACTION
// ========================================================= */

// function handleCustomerAction(
//   customer,
//   action
// ) {

//   if (
//     customer.leaving
//   ) {

//     return;

//   }


//   if (
//     action === "listen"
//   ) {

//     customer.satisfaction =
//       Math.min(
//         100,
//         customer.satisfaction + 10
//       );


//     game.customerSatisfaction =
//       Math.min(
//         100,
//         game.customerSatisfaction + 6
//       );


//     game.sales += 2;


//     showToast(
//       "😊",
//       `${customer.name} känner sig lyssnad på.`
//     );

//   }


//   else if (
//     action === "recommend"
//   ) {

//     customer.satisfaction =
//       Math.min(
//         100,
//         customer.satisfaction + 7
//       );


//     game.customerSatisfaction =
//       Math.min(
//         100,
//         game.customerSatisfaction + 4
//       );


//     game.sales += 5;

//     game.money += 120;


//     showToast(
//       "💡",
//       `${customer.name} fick hjälp med sitt köp.`
//     );

//   }


//   else if (
//     action === "wait"
//   ) {

//     customer.satisfaction =
//       Math.max(
//         0,
//         customer.satisfaction - 12
//       );


//     game.customerSatisfaction =
//       Math.max(
//         0,
//         game.customerSatisfaction - 6
//       );


//     showToast(
//       "😐",
//       `${customer.name} får vänta.`
//     );

//   }


//   else if (
//     action === "ignore"
//   ) {

//     customer.satisfaction =
//       Math.max(
//         0,
//         customer.satisfaction - 20
//       );


//     game.customerSatisfaction =
//       Math.max(
//         0,
//         game.customerSatisfaction - 10
//       );


//     showToast(
//       "😠",
//       `${customer.name} känner sig ignorerad.`
//     );

//   }


//   closeModal();


//   /*
//      Uppdatera emoji direkt.
//      Om kunden blir under 25 %
//      kommer leaveCustomer() att köras.
//   */

//   updateCustomerMoods();

//   updateUI();


//   if (
//     customer.satisfaction < 50
//   ) {

//     setTimeout(() => {

//       if (
//         !customer.leaving
//       ) {

//         showToast(

//           customer.satisfaction < 25
//             ? "😡"
//             : "😠",

//           `${customer.name} är ${
//             getCustomerMood(
//               customer.satisfaction
//             ).text.toLowerCase()
//           }.`

//         );

//       }

//     }, 600);

//   }

// }


// /* =========================================================
//    EVENTS
// ========================================================= */

// const events = [

//   {
//     id: 1,

//     title:
//       "Kunden hittar inte sin vara",

//     message:
//       "En kund går runt i butiken och letar efter något. Kunden verkar osäker.",

//     icon:
//       "🔎",

//     type:
//       "customer",

//     rubric: {

//       categories: {

//         customer: [

//           "kund",

//           "kunden"

//         ],

//         listen: [

//           "fråga",

//           "frågar",

//           "lyssna",

//           "lyssnar",

//           "prata",

//           "frågar vad"

//         ],

//         help: [

//           "hjälpa",

//           "hjälp",

//           "visa",

//           "följa",

//           "följer"

//         ],

//         improvement: [

//           "skylt",

//           "skyltning",

//           "exponering",

//           "placering",

//           "information"

//         ]

//       }

//     }

//   },


//   {
//     id: 2,

//     title:
//       "Kön växer",

//     message:
//       "Det börjar bli kö vid kassan. Flera kunder väntar.",

//     icon:
//       "🧾",

//     type:
//       "checkout",

//     rubric: {

//       categories: {

//         queue: [

//           "kö",

//           "kön",

//           "väntar",

//           "väntetid"

//         ],

//         staff: [

//           "personal",

//           "medarbetare",

//           "anställd",

//           "kollega"

//         ],

//         solution: [

//           "öppna",

//           "kassa",

//           "självscanning",

//           "självscanna",

//           "hjälpa"

//         ]

//       }

//     }

//   },


//   {
//     id: 3,

//     title:
//       "Fel pris på hyllan",

//     message:
//       "En kund säger att priset på hyllan inte stämmer med priset i kassan.",

//     icon:
//       "💰",

//     type:
//       "price",

//     rubric: {

//       categories: {

//         check: [

//           "kontrollera",

//           "undersöka",

//           "kolla",

//           "kontroll"

//         ],

//         customer: [

//           "kund",

//           "kunden",

//           "förklara",

//           "prata"

//         ],

//         price: [

//           "pris",

//           "priset",

//           "skylt",

//           "kassa"

//         ]

//       }

//     }

//   },


//   {
//     id: 4,

//     title:
//       "En populär produkt håller på att ta slut",

//     message:
//       "Flera kunder frågar efter samma produkt. Lagret börjar bli lågt.",

//     icon:
//       "📦",

//     type:
//       "stock",

//     rubric: {

//       categories: {

//         stock: [

//           "lager",

//           "lagret",

//           "vara",

//           "produkt"

//         ],

//         order: [

//           "beställa",

//           "beställer",

//           "leverans",

//           "leverantör"

//         ],

//         alternative: [

//           "alternativ",

//           "annan",

//           "ersätta",

//           "ersättare"

//         ]

//       }

//     }

//   },


//   {
//     id: 5,

//     title:
//       "En missnöjd kund",

//     message:
//       "En kund är missnöjd och vill prata med någon som ansvarar för butiken.",

//     icon:
//       "😠",

//     type:
//       "service",

//     rubric: {

//       categories: {

//         listen: [

//           "lyssna",

//           "lyssnar",

//           "höra",

//           "förstå"

//         ],

//         apology: [

//           "ursäkt",

//           "förlåt",

//           "beklagar"

//         ],

//         solution: [

//           "lösning",

//           "lösa",

//           "hjälpa",

//           "ersätta",

//           "kompensera"

//         ]

//       }

//     }

//   },


//   {
//     id: 6,

//     title:
//       "En oväntad möjlighet",

//     message:
//       "En lokal förening frågar om butiken vill samarbeta med ett event.",

//     icon:
//       "🤝",

//     type:
//       "opportunity",

//     rubric: {

//       categories: {

//         cooperation: [

//           "samarbete",

//           "samarbeta",

//           "förening",

//           "event"

//         ],

//         marketing: [

//           "marknadsföring",

//           "reklam",

//           "sociala medier",

//           "synas"

//         ],

//         economy: [

//           "pengar",

//           "kostnad",

//           "ekonomi",

//           "budget"

//         ]

//       }

//     }

//   }

// ];


// /* =========================================================
//    TRIGGER EVENT
// ========================================================= */

// function triggerEvent(
//   event
// ) {

//   if (!game.running) return;


//   /*
//      Bara ett aktivt problem åt gången.
//   */

//   if (
//     game.activeProblems.length > 0
//   ) {

//     return;

//   }


//   game.activeProblems.push(
//     event
//   );


//   updateProblemList();


//   if (alertIndicator) {

//     alertIndicator.classList.remove(
//       "hidden"
//     );

//   }


//   if (eventBanner) {

//     eventBanner.classList.remove(
//       "hidden"
//     );

//   }


//   setText(
//     "eventTitle",
//     event.title
//   );


//   setText(
//     "eventMessage",
//     event.message
//   );


//   setTimeout(() => {

//     if (!game.running) return;

//     openEvent(
//       event
//     );

//   }, 800);

// }


// /* =========================================================
//    OPEN EVENT
// ========================================================= */

// function openEvent(
//   event
// ) {

//   openModal(`

//     <div class="modal-icon">
//       ${event.icon}
//     </div>

//     <span class="small-label">
//       🚨 HÄNDELSE
//     </span>

//     <h2>
//       ${event.title}
//     </h2>

//     <p>
//       ${event.message}
//     </p>


//     <div class="modal-options">

//       <button
//         class="modal-option"
//         data-event-action="own"
//       >

//         <strong>
//           💡 Min egen lösning
//         </strong>

//         <small>
//           Tänk själv och bestäm vad du vill göra.
//         </small>

//       </button>


//       <button
//         class="modal-option"
//         data-event-action="investigate"
//       >

//         <strong>
//           🔎 Undersök först
//         </strong>

//         <small>
//           Ta reda på mer innan du bestämmer dig.
//         </small>

//       </button>


//       <button
//         class="modal-option"
//         data-event-action="quick"
//       >

//         <strong>
//           ⚡ Lösa snabbt
//         </strong>

//         <small>
//           Fatta ett beslut direkt.
//         </small>

//       </button>

//     </div>

//   `);


//   document
//     .querySelectorAll(
//       "[data-event-action]"
//     )
//     .forEach(button => {

//       button.addEventListener(
//         "click",
//         () => {

//           const action =
//             button.dataset.eventAction;


//           if (
//             action === "own"
//           ) {

//             openCreativeDecision(
//               event
//             );

//           }


//           else if (
//             action === "investigate"
//           ) {

//             investigateEvent(
//               event
//             );

//           }


//           else if (
//             action === "quick"
//           ) {

//             quickDecision(
//               event
//             );

//           }

//         }
//       );

//     });

// }


// /* =========================================================
//    OWN SOLUTION
// ========================================================= */

// function openCreativeDecision(
//   event
// ) {

//   openModal(`

//     <div class="modal-icon">
//       💡
//     </div>

//     <span class="small-label">
//       TÄNK SJÄLV
//     </span>

//     <h2>
//       ${event.title}
//     </h2>

//     <p>
//       Det finns inget exakt facit.
//       Beskriv en lösning som faktiskt
//       kan fungera i situationen.
//     </p>


//     <label
//       style="
//         display:block;
//         color:#1E3F2F;
//         font-weight:700;
//         margin-bottom:6px;
//       "
//     >
//       Vad gör du?
//     </label>


//     <textarea
//       id="creativeAction"
//       class="modal-textarea"
//       placeholder="Jag skulle..."
//     ></textarea>


//     <br>


//     <label
//       style="
//         display:block;
//         color:#1E3F2F;
//         font-weight:700;
//         margin-bottom:6px;
//       "
//     >
//       Varför väljer du detta?
//     </label>


//     <textarea
//       id="creativeReason"
//       class="modal-textarea"
//       placeholder="Jag väljer detta eftersom..."
//     ></textarea>


//     <br>


//     <button
//       id="submitCreative"
//       class="primary-button"
//     >
//       Genomför min lösning
//     </button>

//   `);


//   const submit =
//     getElement(
//       "submitCreative"
//     );


//   if (submit) {

//     submit.addEventListener(
//       "click",
//       () => {

//         evaluateCreativeSolution(
//           event
//         );

//       }
//     );

//   }

// }


// /* =========================================================
//    TEXT VALIDATION
// ========================================================= */

// function containsAny(
//   text,
//   words
// ) {

//   return words.some(
//     word =>
//       text.includes(word)
//   );

// }


// /* =========================================================
//    EVALUATE CREATIVE SOLUTION
// ========================================================= */

// function evaluateCreativeSolution(
//   event
// ) {

//   const actionInput =
//     getElement(
//       "creativeAction"
//     );


//   const reasonInput =
//     getElement(
//       "creativeReason"
//     );


//   if (
//     !actionInput ||
//     !reasonInput
//   ) {

//     return;

//   }


//   const action =
//     actionInput.value
//       .trim()
//       .toLowerCase();


//   const reason =
//     reasonInput.value
//       .trim()
//       .toLowerCase();


//   if (
//     action.length < 15 ||
//     reason.length < 15
//   ) {

//     showCreativeFeedback(
//       "tooShort",
//       []
//     );

//     return;

//   }


//   const combined =
//     `${action} ${reason}`;


//   const irrelevantPhrases = [

//     "jag går hem",

//     "gå hem",

//     "går hem",

//     "jag sover",

//     "jag spelar",

//     "jag äter",

//     "jag går till skolan",

//     "jag lämnar butiken",

//     "jag lämnar",

//     "vet inte",

//     "ingen aning",

//     "haha",

//     "lol",

//     "asdf",

//     "qwerty"

//   ];


//   if (
//     containsAny(
//       combined,
//       irrelevantPhrases
//     )
//   ) {

//     showCreativeFeedback(
//       "irrelevant",
//       []
//     );

//     return;

//   }


//   let points = 0;

//   const matched = [];


//   if (event.rubric) {

//     Object.entries(
//       event.rubric.categories
//     ).forEach(
//       ([category, keywords]) => {

//         if (
//           containsAny(
//             combined,
//             keywords
//           )
//         ) {

//           points++;

//           matched.push(
//             category
//           );

//         }

//       }
//     );

//   }


//   if (
//     action.length >= 60
//   ) {

//     points++;

//   }


//   if (
//     reason.length >= 50
//   ) {

//     points++;

//   }


//   if (
//     matched.length === 0
//   ) {

//     showCreativeFeedback(
//       "notRelevant",
//       []
//     );

//     return;

//   }


//   let level;


//   if (
//     points >= 4
//   ) {

//     level = "strong";

//   }

//   else if (
//     points >= 2
//   ) {

//     level = "medium";

//   }

//   else {

//     level = "develop";

//   }


//   applyCreativeConsequences(
//     event,
//     level
//   );


//   showCreativeFeedback(
//     level,
//     matched
//   );

// }


// /* =========================================================
//    CREATIVE CONSEQUENCES
// ========================================================= */

// function applyCreativeConsequences(
//   event,
//   level
// ) {

//   if (
//     level === "strong"
//   ) {

//     game.customerSatisfaction =
//       Math.min(
//         100,
//         game.customerSatisfaction + 8
//       );


//     game.sales += 5;


//     game.sustainability =
//       Math.min(
//         100,
//         game.sustainability + 4
//       );

//   }


//   else if (
//     level === "medium"
//   ) {

//     game.customerSatisfaction =
//       Math.min(
//         100,
//         game.customerSatisfaction + 4
//       );


//     game.sales += 3;

//   }


//   else {

//     game.customerSatisfaction =
//       Math.min(
//         100,
//         game.customerSatisfaction + 1
//       );

//   }


//   if (
//     event.type === "price"
//   ) {

//     game.money -= 50;

//   }


//   if (
//     event.type === "opportunity"
//   ) {

//     game.money -= 100;

//   }


//   updateUI();

// }


// /* =========================================================
//    CREATIVE FEEDBACK
// ========================================================= */

// function showCreativeFeedback(
//   level,
//   matched
// ) {

//   let icon = "💡";

//   let title = "";

//   let message = "";


//   if (
//     level === "strong"
//   ) {

//     icon = "🌟";

//     title =
//       "Genomtänkt lösning";

//     message =
//       "Din lösning tar hänsyn till situationen och flera delar som påverkar kunden eller butiken.";

//   }


//   else if (
//     level === "medium"
//   ) {

//     icon = "👍";

//     title =
//       "Möjlig lösning";

//     message =
//       "Din idé kan fungera. Fundera på vilka konsekvenser lösningen får för kunden och butiken.";

//   }


//   else if (
//     level === "develop"
//   ) {

//     icon = "🧠";

//     title =
//       "Du är på rätt väg";

//     message =
//       "Din lösning har en koppling till problemet, men fundera på hur du kan utveckla den.";

//   }


//   else if (
//     level === "tooShort"
//   ) {

//     icon = "✏️";

//     title =
//       "Utveckla din idé";

//     message =
//       "Skriv lite mer. Beskriv både vad du skulle göra och varför du tror att det skulle fungera.";

//   }


//   else if (
//     level === "irrelevant"
//   ) {

//     icon = "🤔";

//     title =
//       "Det löser inte problemet";

//     message =
//       "Din lösning verkar inte hjälpa till att lösa situationen i butiken.";

//   }


//   else if (
//     level === "notRelevant"
//   ) {

//     icon = "🔎";

//     title =
//       "Försök igen";

//     message =
//       "Jag hittar ingen tydlig koppling mellan din lösning och problemet.";

//   }


//   let areas = "";


//   if (
//     matched.length > 0
//   ) {

//     areas = `

//       <p
//         style="
//           margin-top:12px;
//           font-size:13px;
//         "
//       >

//         <strong>
//           Din lösning berörde:
//         </strong>

//         ${matched.join(", ")}

//       </p>

//     `;

//   }


//   openModal(`

//     <div class="modal-icon">
//       ${icon}
//     </div>

//     <span class="small-label">
//       DIN LÖSNING
//     </span>

//     <h2>
//       ${title}
//     </h2>

//     <p>
//       ${message}
//     </p>

//     ${areas}


//     <button
//       id="continueAfterCreative"
//       class="primary-button"
//     >
//       Fortsätt
//     </button>

//   `);


//   const continueButton =
//     getElement(
//       "continueAfterCreative"
//     );


//   if (continueButton) {

//     continueButton.addEventListener(
//       "click",
//       () => {

//         closeModal();


//         if (
//           level === "irrelevant" ||
//           level === "notRelevant" ||
//           level === "tooShort"
//         ) {

//           showToast(
//             "🔎",
//             "Problemet finns fortfarande kvar. Försök igen."
//           );


//           setTimeout(() => {

//             if (
//               game.activeProblems.length > 0
//             ) {

//               openEvent(
//                 game.activeProblems[0]
//               );

//             }

//           }, 700);


//           return;

//         }


//         solveCurrentProblem();

//       }
//     );

//   }

// }


// /* =========================================================
//    INVESTIGATE
// ========================================================= */

// function investigateEvent(
//   event
// ) {

//   let content = "";


//   if (
//     event.type === "customer"
//   ) {

//     content = `

//       <div class="modal-icon">
//         🔎
//       </div>

//       <span class="small-label">
//         UNDERSÖK
//       </span>

//       <h2>
//         Titta närmare
//       </h2>

//       <p>
//         Du observerar kunden och ser att
//         skyltningen på en avdelning inte är
//         särskilt tydlig.
//       </p>

//     `;

//   }


//   else if (
//     event.type === "stock"
//   ) {

//     content = `

//       <div class="modal-icon">
//         📦
//       </div>

//       <span class="small-label">
//         LAGER
//       </span>

//       <h2>
//         Kontrollera lagret
//       </h2>

//       <p>
//         Du går till lagret för att se
//         hur mycket som finns kvar.
//       </p>


//       <div class="modal-options">

//         <div class="modal-option">

//           <strong>
//             Populär produkt
//           </strong>

//           <small>
//             ${game.stock.popular}% kvar
//           </small>

//         </div>


//         <div class="modal-option">

//           <strong>
//             Kaffe
//           </strong>

//           <small>
//             ${game.stock.coffee}% kvar
//           </small>

//         </div>


//         <div class="modal-option">

//           <strong>
//             Mjölk
//           </strong>

//           <small>
//             ${game.stock.milk}% kvar
//           </small>

//         </div>

//       </div>

//     `;

//   }


//   else {

//     content = `

//       <div class="modal-icon">
//         🔎
//       </div>

//       <span class="small-label">
//         UNDERSÖK
//       </span>

//       <h2>
//         Du tittar närmare
//       </h2>

//       <p>
//         Du tar dig tid att förstå situationen
//         innan du fattar ett beslut.
//       </p>

//     `;

//   }


//   content += `

//     <br>

//     <button
//       id="finishInvestigation"
//       class="primary-button"
//     >
//       Jag har undersökt
//     </button>

//   `;


//   openModal(
//     content
//   );


//   const button =
//     getElement(
//       "finishInvestigation"
//     );


//   if (button) {

//     button.addEventListener(
//       "click",
//       () => {

//         closeModal();


//         game.customerSatisfaction =
//           Math.min(
//             100,
//             game.customerSatisfaction + 2
//           );


//         updateUI();


//         setTimeout(() => {

//           openCreativeDecision(
//             event
//           );

//         }, 400);

//       }
//     );

//   }

// }


// /* =========================================================
//    QUICK DECISION
// ========================================================= */

// function quickDecision(
//   event
// ) {

//   if (
//     event.type === "customer"
//   ) {

//     game.customerSatisfaction =
//       Math.max(
//         0,
//         game.customerSatisfaction - 4
//       );

//   }


//   else if (
//     event.type === "checkout"
//   ) {

//     game.customerSatisfaction =
//       Math.max(
//         0,
//         game.customerSatisfaction - 5
//       );

//   }


//   else {

//     game.customerSatisfaction =
//       Math.max(
//         0,
//         game.customerSatisfaction - 3
//       );

//   }


//   game.sales += 1;


//   closeModal();


//   updateUI();


//   showToast(
//     "⚡",
//     "Du fattade ett snabbt beslut."
//   );


//   setTimeout(() => {

//     solveCurrentProblem();

//   }, 1200);

// }


// /* =========================================================
//    SOLVE CURRENT PROBLEM
// ========================================================= */

// function solveCurrentProblem() {

//   if (
//     game.activeProblems.length === 0
//   ) {

//     return;

//   }


//   game.activeProblems.shift();


//   game.problemsSolved++;


//   updateProblemList();


//   if (alertIndicator) {

//     alertIndicator.classList.add(
//       "hidden"
//     );

//   }


//   if (eventBanner) {

//     eventBanner.classList.add(
//       "hidden"
//     );

//   }


//   updateUI();


//   /*
//      Efter problem nummer 3
//      stänger butiken.
//   */

//   if (
//     game.problemsSolved >=
//     game.totalProblems
//   ) {

//     showToast(
//       "🏪",
//       "Arbetsdagen är slut."
//     );


//     setTimeout(() => {

//       finishGame();

//     }, 2000);


//     return;

//   }


//   /*
//      Nästa händelse:
//      ungefär 40 sekunder.
//   */

//   scheduleNextEvent();

// }


// /* =========================================================
//    NEXT EVENT
// ========================================================= */

// function scheduleNextEvent() {

//   /*
//      40–45 sekunder.
//   */

//   const delay =
//     randomNumber(
//       40000,
//       45000
//     );


//   showToast(
//     "🕘",
//     "Butiken fortsätter. Nästa händelse kommer snart."
//   );


//   game.timers.nextEvent =
//     setTimeout(() => {

//       if (!game.running) return;


//       const nextIndex =
//         game.problemsSolved %
//         events.length;


//       triggerEvent(
//         events[nextIndex]
//       );


//     }, delay);

// }


// /* =========================================================
//    GAME CLOCK
// ========================================================= */

// function startGameClock() {

//   /*
//      10 riktiga sekunder =
//      1 minut i spelet.
//   */

//   game.timers.clock =
//     setInterval(() => {

//       if (!game.running) return;


//       game.minutes++;


//       if (
//         game.minutes >= 60
//       ) {

//         game.minutes = 0;

//         game.hour++;

//       }


//       updateUI();

//     }, 10000);

// }


// /* =========================================================
//    PROBLEM LIST
// ========================================================= */

// function updateProblemList() {

//   if (!problemList) return;


//   if (
//     game.activeProblems.length === 0
//   ) {

//     problemList.innerHTML = `

//       <div class="empty-problems">
//         ✓ Inga akuta problem
//       </div>

//     `;


//     return;

//   }


//   problemList.innerHTML =

//     game.activeProblems

//       .map(problem => `

//         <div class="problem-item">

//           🚨 ${problem.title}

//         </div>

//       `)

//       .join("");

// }


// /* =========================================================
//    STORE ZONES
// ========================================================= */

// document
//   .querySelectorAll(".store-zone")
//   .forEach(zone => {

//     zone.addEventListener(
//       "click",
//       () => {

//         openZone(
//           zone.dataset.zone
//         );

//       }
//     );

//   });


// function openZone(
//   zone
// ) {

//   const data = {

//     entrance: {

//       icon: "🚪",

//       title: "Entrén",

//       text:
//         "Här kommer kunderna in. En tydlig entré hjälper kunden att förstå butiken."

//     },

//     products: {

//       icon: "🛒",

//       title: "Produkter",

//       text:
//         "Här kan du kontrollera sortiment och hur produkterna exponeras."

//     },

//     clothes: {

//       icon: "🎨",

//       title: "Avdelning",

//       text:
//         "Exponeringen påverkar vad kunden ser och vilka produkter som får uppmärksamhet."

//     },

//     stock: {

//       icon: "📦",

//       title: "Lager",

//       text:
//         "Här finns butikens varor innan de hamnar på hyllorna."

//     },

//     checkout: {

//       icon: "🧾",

//       title: "Kassa",

//       text:
//         "Här avslutas köpet. Kundens sista intryck påverkas bland annat av väntetid och service."

//     }

//   };


//   if (
//     zone === "stock"
//   ) {

//     openStockModal();

//     return;

//   }


//   const selected =
//     data[zone];


//   if (!selected) return;


//   openModal(`

//     <div class="modal-icon">
//       ${selected.icon}
//     </div>

//     <span class="small-label">
//       BUTIKEN
//     </span>

//     <h2>
//       ${selected.title}
//     </h2>

//     <p>
//       ${selected.text}
//     </p>

//     <button
//       id="closeZone"
//       class="primary-button"
//     >
//       Fortsätt
//     </button>

//   `);


//   const button =
//     getElement(
//       "closeZone"
//     );


//   if (button) {

//     button.addEventListener(
//       "click",
//       closeModal
//     );

//   }

// }


// /* =========================================================
//    STOCK
// ========================================================= */

// function openStockModal() {

//   openModal(`

//     <div class="modal-icon">
//       📦
//     </div>

//     <span class="small-label">
//       LAGER
//     </span>

//     <h2>
//       Lagerstatus
//     </h2>

//     <p>
//       Du undersöker butikens lager.
//     </p>


//     <div class="modal-options">

//       <div class="modal-option">

//         <strong>
//           🥫 Populär produkt
//         </strong>

//         <small>
//           ${game.stock.popular}% kvar
//         </small>

//       </div>


//       <div class="modal-option">

//         <strong>
//           ☕ Kaffe
//         </strong>

//         <small>
//           ${game.stock.coffee}% kvar
//         </small>

//       </div>


//       <div class="modal-option">

//         <strong>
//           🥛 Mjölk
//         </strong>

//         <small>
//           ${game.stock.milk}% kvar
//         </small>

//       </div>


//       <div class="modal-option">

//         <strong>
//           🍞 Bröd
//         </strong>

//         <small>
//           ${game.stock.bread}% kvar
//         </small>

//       </div>


//       <div class="modal-option">

//         <strong>
//           🧃 Juice
//         </strong>

//         <small>
//           ${game.stock.juice}% kvar
//         </small>

//       </div>

//     </div>


//     <br>


//     <button
//       id="closeStock"
//       class="primary-button"
//     >
//       Tillbaka till butiken
//     </button>

//   `);


//   const button =
//     getElement(
//       "closeStock"
//     );


//   if (button) {

//     button.addEventListener(
//       "click",
//       closeModal
//     );

//   }

// }


// /* =========================================================
//    STAFF
// ========================================================= */

// document
//   .querySelectorAll(".staff-member")
//   .forEach(member => {

//     member.addEventListener(
//       "click",
//       () => {

//         openStaffMember(
//           member.dataset.staff
//         );

//       }
//     );

//   });


// function openStaffMember(
//   staffId
// ) {

//   const staff =
//     game.staff[staffId];


//   if (!staff) return;


//   openModal(`

//     <div class="modal-icon">
//       👤
//     </div>

//     <span class="small-label">
//       PERSONAL
//     </span>

//     <h2>
//       ${staff.name}
//     </h2>

//     <p>
//       Roll: ${staff.role}
//     </p>


//     <div class="modal-option">

//       <strong>
//         Energi
//       </strong>

//       <small>
//         ${staff.energy}%
//       </small>

//     </div>


//     <br>


//     <button
//       id="assignStaff"
//       class="primary-button"
//     >
//       Be ${staff.name} hjälpa till
//     </button>

//   `);


//   const button =
//     getElement(
//       "assignStaff"
//     );


//   if (button) {

//     button.addEventListener(
//       "click",
//       () => {

//         staff.energy =
//           Math.max(
//             0,
//             staff.energy - 10
//           );


//         game.customerSatisfaction =
//           Math.min(
//             100,
//             game.customerSatisfaction + 3
//           );


//         closeModal();


//         updateUI();


//         showToast(
//           "👥",
//           `${staff.name} hjälper till.`
//         );

//       }
//     );

//   }

// }


// /* =========================================================
//    TOOL BUTTONS
// ========================================================= */

// document
//   .querySelectorAll(".tool-button")
//   .forEach(button => {

//     button.addEventListener(
//       "click",
//       () => {

//         handleTool(
//           button.dataset.action
//         );

//       }
//     );

//   });


// function handleTool(
//   action
// ) {

//   switch (action) {


//     case "helpCustomer": {

//       const customer =
//         game.customers.find(
//           item =>
//             item.satisfaction <
//             60
//         );


//       if (customer) {

//         openCustomer(
//           customer
//         );

//       }

//       else {

//         showToast(
//           "😊",
//           "Alla kunder verkar vara ganska nöjda just nu."
//         );

//       }

//       break;

//     }


//     case "openCheckout":

//       game.customerSatisfaction =
//         Math.min(
//           100,
//           game.customerSatisfaction + 5
//         );


//       game.sales += 2;


//       showToast(
//         "🧾",
//         "Du öppnade en extra kassa."
//       );


//       updateUI();

//       break;


//     case "checkStock":

//       openStockModal();

//       break;


//     case "changeDisplay":

//       game.customerSatisfaction =
//         Math.min(
//           100,
//           game.customerSatisfaction + 3
//         );


//       game.sales += 4;


//       showToast(
//         "🎨",
//         "Du förbättrade exponeringen."
//       );


//       updateUI();

//       break;


//     case "callStaff":

//       openStaffSelection();

//       break;


//     case "creative":

//       if (
//         game.activeProblems.length > 0
//       ) {

//         openCreativeDecision(
//           game.activeProblems[0]
//         );

//       }

//       else {

//         showToast(
//           "💡",
//           "Det finns inget akut problem just nu."
//         );

//       }

//       break;

//   }

// }


// /* =========================================================
//    STAFF SELECTION
// ========================================================= */

// function openStaffSelection() {

//   openModal(`

//     <div class="modal-icon">
//       👥
//     </div>

//     <span class="small-label">
//       PERSONAL
//     </span>

//     <h2>
//       Vem vill du använda?
//     </h2>

//     <p>
//       Varje medarbetare har olika styrkor.
//     </p>


//     <div class="modal-options">

//       ${Object.entries(
//         game.staff
//       )
//         .map(
//           ([id, staff]) => `

//             <button
//               class="modal-option"
//               data-staff="${id}"
//             >

//               <strong>
//                 👤 ${staff.name}
//               </strong>

//               <small>
//                 ${staff.role}
//                 • Energi ${staff.energy}%
//               </small>

//             </button>

//           `
//         )
//         .join("")}

//     </div>

//   `);


//   document
//     .querySelectorAll(
//       "[data-staff]"
//     )
//     .forEach(button => {

//       button.addEventListener(
//         "click",
//         () => {

//           const id =
//             button.dataset.staff;


//           const staff =
//             game.staff[id];


//           if (!staff) return;


//           staff.energy =
//             Math.max(
//               0,
//               staff.energy - 10
//             );


//           game.customerSatisfaction =
//             Math.min(
//               100,
//               game.customerSatisfaction + 3
//             );


//           closeModal();


//           updateUI();


//           showToast(
//             "👥",
//             `${staff.name} hjälper till.`
//           );

//         }
//       );

//     });

// }


// /* =========================================================
//    UI UPDATE
// ========================================================= */

// function updateUI() {

//   setText(
//     "moneyText",
//     `${game.money.toLocaleString("sv-SE")} kr`
//   );


//   setText(
//     "customerText",
//     Math.round(
//       clamp(
//         game.customerSatisfaction
//       )
//     )
//   );


//   setText(
//     "salesText",
//     Math.round(
//       clamp(
//         game.sales
//       )
//     )
//   );


//   setText(
//     "sustainabilityText",
//     Math.round(
//       clamp(
//         game.sustainability
//       )
//     )
//   );


//   setText(
//     "dayText",
//     "Arbetsdag"
//   );


//   setText(
//     "timeText",
//     `${String(game.hour).padStart(2, "0")}:${String(game.minutes).padStart(2, "0")}`
//   );


//   setText(
//     "problemsSolvedText",
//     `${game.problemsSolved}/${game.totalProblems}`
//   );


//   /*
//      Visar hur många kunder som
//      befinner sig i butiken just nu,
//      om HTML-elementet finns.
//   */

//   setText(
//     "activeCustomersText",
//     game.customers.length
//   );


//   /*
//      Visar hur många kunder som
//      totalt har kommit in.
//   */

//   setText(
//     "totalCustomersText",
//     game.totalCustomersCreated
//   );


//   updateCustomerMoods();

// }


// /* =========================================================
//    FINISH GAME
// ========================================================= */

// function finishGame() {

//   game.running = false;


//   clearTimeout(
//     game.timers.nextEvent
//   );


//   clearTimeout(
//     game.timers.customerSpawn
//   );


//   clearInterval(
//     game.timers.customers
//   );


//   clearInterval(
//     game.timers.clock
//   );


//   if (eventBanner) {

//     eventBanner.classList.add(
//       "hidden"
//     );

//   }


//   if (alertIndicator) {

//     alertIndicator.classList.add(
//       "hidden"
//     );

//   }


//   calculateResult();


//   if (resultScreen) {

//     showScreen(
//       resultScreen
//     );

//   }

// }


// /* =========================================================
//    RESULT
// ========================================================= */

// function calculateResult() {

//   const customer =
//     clamp(
//       game.customerSatisfaction
//     );


//   const sales =
//     clamp(
//       game.sales
//     );


//   const sustainability =
//     clamp(
//       game.sustainability
//     );


//   const average =
//     (
//       customer +
//       sales +
//       sustainability
//     ) / 3;


//   const title =
//     getElement(
//       "resultTitle"
//     );


//   const text =
//     getElement(
//       "resultText"
//     );


//   const emoji =
//     getElement(
//       "resultEmoji"
//     );


//   setText(
//     "finalMoney",
//     `${game.money.toLocaleString("sv-SE")} kr`
//   );


//   setText(
//     "finalCustomer",
//     `${Math.round(customer)}%`
//   );


//   setText(
//     "finalSales",
//     `${Math.round(sales)}`
//   );


//   setText(
//     "finalSustainability",
//     `${Math.round(sustainability)}%`
//   );


//   if (average >= 85) {

//     if (emoji) {

//       emoji.textContent =
//         "🌟";

//     }


//     if (title) {

//       title.textContent =
//         "Butiksdagen blev riktigt lyckad!";

//     }


//     if (text) {

//       text.textContent =
//         "Du hanterade problemen, tänkte på kunderna och tog beslut som påverkade butiken positivt.";

//     }

//   }


//   else if (average >= 70) {

//     if (emoji) {

//       emoji.textContent =
//         "👏";

//     }


//     if (title) {

//       title.textContent =
//         "Butiken klarade arbetsdagen!";

//     }


//     if (text) {

//       text.textContent =
//         "Du löste dagens problem och anpassade dig när nya situationer uppstod.";

//     }

//   }


//   else if (average >= 50) {

//     if (emoji) {

//       emoji.textContent =
//         "🧠";

//     }


//     if (title) {

//       title.textContent =
//         "Butiken klarade sig – men det finns saker att utveckla.";

//     }


//     if (text) {

//       text.textContent =
//         "Några beslut fungerade, medan andra skapade nya problem.";

//     }

//   }


//   else {

//     if (emoji) {

//       emoji.textContent =
//         "🔎";

//     }


//     if (title) {

//       title.textContent =
//         "Butiken hade en tuff arbetsdag.";

//     }


//     if (text) {

//       text.textContent =
//         "Kunderna blev missnöjda och flera delar av butiken behöver utvecklas.";

//     }

//   }

// }


// /* =========================================================
//    MODAL
// ========================================================= */

// function openModal(
//   content
// ) {

//   if (
//     !modal ||
//     !modalContent
//   ) {

//     return;

//   }


//   modalContent.innerHTML =
//     content;


//   modal.classList.remove(
//     "hidden"
//   );

// }


// function closeModal() {

//   if (!modal) return;


//   modal.classList.add(
//     "hidden"
//   );

// }


// if (closeModalButton) {

//   closeModalButton.addEventListener(
//     "click",
//     closeModal
//   );

// }


// if (modal) {

//   modal.addEventListener(
//     "click",
//     event => {

//       if (
//         event.target === modal
//       ) {

//         closeModal();

//       }

//     }
//   );

// }


// /* =========================================================
//    TOAST
// ========================================================= */

// let toastTimer = null;


// function showToast(
//   icon,
//   message
// ) {

//   if (!toast) return;


//   const toastIcon =
//     getElement(
//       "toastIcon"
//     );


//   const toastText =
//     getElement(
//       "toastText"
//     );


//   if (toastIcon) {

//     toastIcon.textContent =
//       icon;

//   }


//   if (toastText) {

//     toastText.textContent =
//       message;

//   }


//   toast.classList.remove(
//     "hidden"
//   );


//   clearTimeout(
//     toastTimer
//   );


//   toastTimer =
//     setTimeout(() => {

//       toast.classList.add(
//         "hidden"
//       );

//     }, 3500);

// }


// /* =========================================================
//    REFLECTION
// ========================================================= */

// const saveReflectionBtn =
//   getElement(
//     "saveReflectionBtn"
//   );


// if (saveReflectionBtn) {

//   saveReflectionBtn.addEventListener(
//     "click",
//     () => {

//       const input =
//         getElement(
//           "reflectionInput"
//         );


//       if (!input) return;


//       const text =
//         input.value.trim();


//       if (!text) {

//         showToast(
//           "💭",
//           "Skriv din reflektion först."
//         );

//         return;

//       }


//       const saved =
//         getElement(
//           "reflectionSaved"
//         );


//       if (saved) {

//         saved.classList.remove(
//           "hidden"
//         );

//       }


//       showToast(
//         "✓",
//         "Din reflektion är sparad."
//       );

//     }
//   );

// }


// /* =========================================================
//    RESTART
// ========================================================= */

// const restartBtn =
//   getElement(
//     "restartBtn"
//   );


// if (restartBtn) {

//   restartBtn.addEventListener(
//     "click",
//     () => {

//       clearTimeout(
//         game.timers.nextEvent
//       );


//       clearTimeout(
//         game.timers.customerSpawn
//       );


//       clearInterval(
//         game.timers.customers
//       );


//       clearInterval(
//         game.timers.clock
//       );


//       game.running = false;


//       if (startScreen) {

//         showScreen(
//           startScreen
//         );

//       }

//     }
//   );

// }


// /* =========================================================
//    HELPER
// ========================================================= */

// function clamp(
//   value
// ) {

//   return Math.max(

//     0,

//     Math.min(
//       100,
//       value
//     )

//   );

// }


// /* =========================================================
//    END
// ========================================================= */