let currenceLeft = "RUB";
let currenceRight = "USD";
let sl = document.querySelector("#select-left");
let sr = document.querySelector("#select-right");
sl.addEventListener("change", () => {
  currenceLeft = sl.value;
  calculate();
});

sr.addEventListener("change", () => {
  currenceRight = sr.value;
  calculate();
});

const showLoading = () => {
  let showLoader = true;
  let loadingDiv;
  setTimeout(() => {
    if (!showLoader) {
      return;
    }
    loadingDiv = document.createElement("div");
    loadingDiv.classList.add("loading-div");
    let loadingP = document.createElement("p");
    loadingP.classList.add("loading-p");
    loadingP.innerText = `Loading...`;
    document.querySelector("body").append(loadingDiv);
    loadingDiv.append(loadingP);
  }, 500);
  const hideLoading = () => {
    showLoader = false;
    if (loadingDiv) {
      loadingDiv.remove();
    }
  };

  return hideLoading;
};

const inputLeft = document.querySelector("#input-text-left");
const inputRight = document.querySelector("#input-text-right");
const getAvailableCurrencies = async () => {
  const response = await fetch("https://api.exchangerate.host/symbols");
  const data = await response.json();
  return Object.keys(data.symbols);
};

function startDownloadPage() {
  getAvailableCurrencies().then((listOfcurrencues) => {
    const selectLeft = document.querySelector("#select-left");
    const selectRight = document.querySelector("#select-right");
    listOfcurrencues.forEach((currencies) => {
      const option = document.createElement("option");
      option.value = currencies;
      option.innerText = currencies;
      selectLeft.append(option);
      selectRight.append(option.cloneNode(true));
    });
  });
}
startDownloadPage();

const currencuArray = async (carencyOne, carencyTwo) => {
  const responseApi = await fetch(
    `https://api.exchangerate.host/latest?base=${carencyOne}&symbols=${carencyTwo}`
  );
  const dataApi = await responseApi.json();
  const rateOne = dataApi.rates[carencyTwo];
  const responseApiReverse = await fetch(
    `https://api.exchangerate.host/latest?base=${carencyTwo}&symbols=${carencyOne}`
  );
  const dataApiReverse = await responseApiReverse.json();
  const rateTwo = dataApiReverse.rates[carencyOne];
  return [rateOne, rateTwo];
};
let rater;
let rateReverse;
function calculate() {
  const showBlock = showLoading();
  const leftActiveButton = document.querySelector(
    `button-left-${currenceLeft}`
  );
  const rightActiveButton = document.querySelector(
    `button-right-${currenceRight}`
  );
  currencuArray(currenceLeft, currenceRight).then((rate) => {
    rater = rate[0];
    rateReverse = rate[1];
    inputRight.value = rate[0] * inputLeft.value;
    let pLeft = document.querySelector(".paragraf-left");
    let pRight = document.querySelector(".paragraf-right");
    pRight.innerText = `1 ${currenceLeft} = ${rate[0]}${currenceRight}`;
    pLeft.innerText = `1 ${currenceRight} = ${rate[0]}${currenceLeft}`;
    inputLeft.append(pLeft.value);
    inputRight.append(pRight.value);
    showBlock();
  });
}

calculate();

const btnLeft = document.querySelectorAll(".button-left-value");
array = [];
btnLeft.forEach((btnLeft) => {
  btnLeft.addEventListener("click", (e) => {
    document
      .querySelector(".button-left-value.active")
      .classList.remove("active");
    btnLeft.classList.add("active");
    currenceLeft = btnLeft.innerText;
    calculate();
  });
});

const btnRight = document.querySelectorAll(".button-right-value");
array = [];
btnRight.forEach((btnRight) => {
  btnRight.addEventListener("click", (e) => {
    document
      .querySelector(".button-right-value.active")
      .classList.remove("active");
    btnRight.classList.add("active");

    currenceRight = btnRight.innerText;
    document.querySelector("button").classList.add("active");
    calculate();
  });
});

const selectLeft = document.querySelector(".select-left");
selectLeft.addEventListener("click", (e) => {
  e.target.style.backgroundColor = "#833AE0";
  e.target.style.color = "#fff";
});

const selectRight = document.querySelector(".select-right");
selectRight.addEventListener("click", (e) => {
  e.target.style.backgroundColor = "#833AE0";
  e.target.style.color = "#fff";
});

function inputChanges() {
  inputRight.value = inputLeft.value * rater;
}
inputLeft.addEventListener("input", () => {
  inputChanges();
});

const arrow = document.querySelector(".arrow");
arrow.addEventListener("click", () => {
  let swap = currenceLeft;
  currenceLeft = currenceRight;
  currenceRight = swap;
  calculate();
});
var elements = [
    "script.js",
    "script1.js"
];

var downloadJSAtOnload = function(elements) {

    if (toString.call(elements) !== "[object Array]") {
        return false
    }

    var i, element;
    for (i = 0; i < elements.length; i++) {
        element = document.createElement("script");
        element.src = elements[i];
        document.body.appendChild(element)
    }

    return true
};

if (window.addEventListener) {
    window.addEventListener("load", function() {
            downloadJSAtOnload(elements)
        }

        , false)
} else {
    if (window.attachEvent) {
        window.attachEvent("onload", function() {
            downloadJSAtOnload(elements)
        })
    } else {
        window.onload = function() {
            downloadJSAtOnload(elements)
        }
    }
    calculate()
};