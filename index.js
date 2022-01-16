/*****************************************/
/*********** Eladasi arszamolo ***********/
/*****************************************/

const eladasiArBruttobolDOM = document.querySelector(".js-display-b");
const hkDOM = document.querySelector(".js-display-b-hk");
const bruttoArDOM = document.querySelector(".js-display-br");
const eladasiArNettobolDOM = document.querySelector(".js-display-n");
const sulyBrDOM = document.querySelector(".js-display-br-egysegar");
const sulyNDOM = document.querySelector(".js-display-n-egysegar");

// Input mezobe beirhato +, -, e, E korlatozasara szolgalo fuggveny.

const invalidChars = ["-", "+", "e", "E"];
const input = document.querySelectorAll(".js-validate");

for (var i = 0; i < input.length; i++) {
  input[i].addEventListener("keydown", function (e) {
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  });
}

// Input mezobe beirhato szamjegyek db szamanak korlatozasara szolgalo fuggveny.

const elements = document.querySelectorAll(".js-validate");

elements.forEach(function (element) {
  element.addEventListener("input", (e) => {
    var value = element.value;
    if (value.length > element.getAttribute("maxlength")) {
      return (e.target.value = e.target.value.slice(
        0,
        element.getAttribute("maxlength")
      ));
    }
  });
});

// Input mezoben levo ertek torlese, ha ujra fokuszt kap.

const inputs = document.querySelectorAll('input[type="number"]');

inputs.forEach(function (input) {
  input.addEventListener("focus", (e) => {
    e.target.value = "";
  });
});

// Input mezo fokusza esetén minden kiirt ertek torlese .

const bruttoInputFocus = document.querySelector(".brutto-input");

bruttoInputFocus.addEventListener("focus", () => {
  eladasiArBruttobolDOM.innerHTML = "";
});

const nettoInputFocus = document.querySelector(".netto-input");

nettoInputFocus.addEventListener("focus", () => {
  bruttoArDOM.innerHTML = "";
  eladasiArNettobolDOM.innerHTML = "";
});

// Ez a függveny 200ft felett hozzaad az eladasi arhoz 5ft-ot.

/*.toLocaleString("hu", {
  style: "currency",
  currency: "HUF",
  maximumFractionDigits: 1,
});

.toLocaleString("hu", {
      style: "currency",
      currency: "HUF",
      maximumFractionDigits: 1,
    });*/

function result(eladasiAr) {
  if (eladasiAr < 200) {
    return eladasiAr.toFixed(0);
  } else if (eladasiAr >= 200) {
    return (eladasiAr + 5).toFixed(0);
  } else return "";
}

// Egysegar kiszamoló fuggveny

function egysegArBr(sulyBr, vegsoAr) {
  if ((sulyBr !== "") & (sulyBr !== "0")) {
    const egysegar = (1000 / sulyBr) * vegsoAr;
    return egysegar.toFixed(0);
  } else {
    return "";
  }
}

function egysegArN(sulyN, vegsoAr) {
  if ((sulyN !== "") & (sulyN !== "0")) {
    const egysegar = (1000 / sulyN) * vegsoAr;
    return egysegar.toFixed(0);
  } else {
    return "";
  }
}

const sulyBr = () => document.querySelector(".js-br-suly-input").value;
const sulyN = () => document.querySelector(".js-n-suly-input").value;

/**************************************************/
/* Eladasi ar kiszamitasa brutto beszerzesi arbol */
/**************************************************/

const bruttoBeszerzesiAr = () =>
  document.querySelector(".js-brutto-input").value;

function bruttobolElArSzamolo(haszonKulcs) {
  const eladasiAr = bruttoBeszerzesiAr() * (haszonKulcs / 100 + 1);
  const vegsoAr = result(eladasiAr);

  const markup = `
     
      <p style="margin: 0;
                display:flex; 
                flex-direction: column; 
                flex-wrap: wrap; 
                justify-content: center;">
        <span style="font-size: 16px;">
          Hk: ${haszonKulcs}%
        </span>
        ${result(eladasiAr)} Ft*
      </p>
    
    `;

  eladasiArBruttobolDOM.innerHTML = markup;

  const sulyMarkup = `
  
      <p style="margin: 0;
                display:flex; 
                flex-direction: column; 
                flex-wrap: wrap; 
                justify-content: center;">
        <span style="font-size: 16px;">
          Súly: ${sulyBr()} g/ml
        </span>
        ${egysegArBr(sulyBr(), vegsoAr)} Ft
      </p>
   
 `;
  sulyBrDOM.innerHTML = sulyMarkup;
}

document.querySelector(".js-onclick-35").addEventListener("click", () => {
  bruttobolElArSzamolo(35);
});
document.querySelector(".js-onclick-50").addEventListener("click", () => {
  bruttobolElArSzamolo(50);
});
document.querySelector(".js-onclick-55").addEventListener("click", () => {
  bruttobolElArSzamolo(55);
});

// Tetszoleges haszonkulcsbol szamol eladasi arat

const tetszolegesHaszonKulcs = () =>
  document.querySelector(".js-tetszBr-input").value;

function tetszHaszKulcsElArSzamolo() {
  const elAr = bruttoBeszerzesiAr() * (tetszolegesHaszonKulcs() / 100 + 1);
  const vegsoAr = result(elAr);

  const markup = `
      <p style="margin: 0;
                display:flex; 
                flex-direction: column; 
                flex-wrap: wrap; 
                justify-content: center;">
        <span style="font-size: 16px;">
          Hk: ${tetszolegesHaszonKulcs()}%
        </span>
        ${result(elAr)} Ft*
      </p>
    `;

  eladasiArBruttobolDOM.innerHTML = markup;

  const sulyMarkup = `
   
      <p style="margin: 0;
                display:flex; 
                flex-direction: column; 
                flex-wrap: wrap; 
                justify-content: center;">
        <span style="font-size: 16px;">
          Súly: ${sulyBr()} g/ml
        </span>
        ${egysegArBr(sulyBr(), vegsoAr)} Ft
      </p>
    
 `;
  sulyBrDOM.innerHTML = sulyMarkup;
}

document.querySelector(".js-onclick-TetszB").addEventListener("click", () => {
  tetszHaszKulcsElArSzamolo();
});

/*************************************************/
/* Eladasi ar kiszamitasa netto beszerzesi arbol */
/*************************************************/

const nettoAr = () => document.querySelector(".js-netto-input").value;

// Elmenti a nettobol kiszamolt brutto erteket,
// hogy tovabbi szamolast vegezhessunk rajta

var nettobolBruttoEredmeny = 0;

// Netto beszerzesi arbol brutto beszerzesi arat szamol

function bruttoAr(afa) {
  nettobolBruttoEredmeny = (nettoAr() * (afa / 100 + 1)).toFixed(1);

  const markup = `
          <p style="margin: 0;
                    display:flex; 
                    flex-direction: column; 
                    flex-wrap: wrap; 
                    justify-content: center;"> 
            <span style="font-size: 12px">
              Áfa: ${afa}%
            </span>
            ${nettobolBruttoEredmeny} Ft
          </p>
      `;

  bruttoArDOM.innerHTML = markup;
}

document.querySelector(".js-onclick-5").addEventListener("click", () => {
  bruttoAr(5);
});
document.querySelector(".js-onclick-18").addEventListener("click", () => {
  bruttoAr(18);
});
document.querySelector(".js-onclick-27").addEventListener("click", () => {
  bruttoAr(27);
});

// A nettobol kiszamolt brutto beszerzesi arbol szamol eladasi arat

function nettobolElAr(haszonKulcs) {
  const eladasiAr = nettobolBruttoEredmeny * (haszonKulcs / 100 + 1);
  const vegsoAr = result(eladasiAr);

  const markup = `
          <p style="margin: 0;
                    display:flex; 
                    flex-direction: column; 
                    flex-wrap: wrap; 
                    justify-content: center;">
            <span style="font-size: 16px;">
              Hk: ${haszonKulcs}%
            </span>
            ${result(eladasiAr)} Ft*
          </p>
  `;
  eladasiArNettobolDOM.innerHTML = markup;

  const sulyMarkup = `
      <p style="margin: 0;
                display:flex; 
                flex-direction: column; 
                flex-wrap: wrap; 
                justify-content: center;">
        <span style="font-size: 16px;">
          Súly: ${sulyN()} g/ml
        </span>
        ${egysegArN(sulyN(), vegsoAr)} Ft
      </p>
  `;
  sulyNDOM.innerHTML = sulyMarkup;
}

document.querySelector(".js-onclickN-35").addEventListener("click", () => {
  nettobolElAr(35);
});
document.querySelector(".js-onclickN-50").addEventListener("click", () => {
  nettobolElAr(50);
});
document.querySelector(".js-onclickN-55").addEventListener("click", () => {
  nettobolElAr(55);
});

const tetszolegesHaszKulcs = () =>
  document.querySelector(".js-tetszN-input").value;

// Tetszolegesen megadott haszonkulcsbol szamol eladasi arat

function tetszoleges() {
  const eladasiAr = nettobolBruttoEredmeny * (tetszolegesHaszKulcs() / 100 + 1);
  const vegsoAr = result(eladasiAr);

  const markup = `
      <p style="margin: 0; 
                display:flex; 
                flex-direction: column; 
                flex-wrap: wrap; 
                justify-content: center;">
        <span style="font-size: 16px;">
          Hk: ${tetszolegesHaszKulcs()}%
        </span>
        ${result(eladasiAr)} Ft*
      </p>
  `;
  eladasiArNettobolDOM.innerHTML = markup;

  const sulyMarkup = `
      <p style="margin: 0;
                display:flex; 
                flex-direction: column; 
                flex-wrap: wrap; 
                justify-content: center;">
        <span style="font-size: 16px;">
          Súly: ${sulyN()} g/ml
        </span>
        ${egysegArN(sulyN(), vegsoAr)} Ft
        </p>
  `;
  sulyNDOM.innerHTML = sulyMarkup;
}

document.querySelector(".js-onclick-TetszN").addEventListener("click", () => {
  tetszoleges();
});
