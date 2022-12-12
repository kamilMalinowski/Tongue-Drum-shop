import { lazyImages } from "/js/_lazyImages.js";
import { counter } from "./js/_counter.js";
import { header } from "/js/_header.js";
import { slider } from "./js/_slider.js";
import { info } from "./js/_info.js";

lazyImages(), counter(), header(), slider(), info();

const couponBtn = document.querySelector(".coupon__btn");
const couponBtnClose = document.querySelector(".coupon__btn-close");
const amount = document.querySelector(".section__amount");
const select = document.querySelector(".section__select");
const productPrice = document.querySelectorAll('[data-amount="product"]');
const productSize = document.querySelectorAll('[data-size="size"]');
const minPcs = document.querySelector(".card__btn--min");
const maxPcs = document.querySelector(".card__btn--max");
const pcs = document.querySelectorAll(".card__quantity");

const cod = document.querySelector("#cod");
const bank = document.querySelector("#bank");

const detailBox = document.querySelector(".detail-box");
// const detailBtn = document.querySelector(".detail-box__btn-link");
const cartBtnNumber = document.querySelector(".header__btn-number");
const primaryBtn = document.querySelectorAll("[data-btn]");
// const form = document.querySelector(".form");
const sectionForm = document.querySelector(".section__form");
const formStepZero = document.querySelector(".step--0");
// const steps = document.querySelector(".steps");
const formSteps = document.querySelectorAll(".step");
const stepsBtn = document.querySelector(".steps__btn");
const stepsTitle = document.querySelector(".steps__title");
const finalPayment = document.querySelector(".summary__name--payMethods");
const finalPaymentValue = document.querySelector(
  ".summary__amount--payMethods"
);
const summary = document.querySelector(".summary");
const sumSectionVisible = document.querySelector(".summary__section--visible");
const sumSectionHidden = document.querySelector(".summary__section--hidden");
const summaryBtn = document.querySelector(".summary__btn");

summaryBtn.addEventListener

const inputName = document.getElementById("name");
const inputSurname = document.getElementById("surname");
const inputStreet = document.getElementById("street");
const inputCity = document.getElementById("city");
const inputPostalCode = document.getElementById("postal-code");
const inputEmail = document.getElementById("e-mail");
const inputPhone = document.getElementById("phone");

const fieldName = document.getElementById("fieldName");
const fieldSurname = document.getElementById("fieldSurname");
const fieldStreet = document.getElementById("fieldStreet");
const fieldCity = document.getElementById("fieldCity");
const fieldPostalCode = document.getElementById("fieldPostalCode");
const fieldEmail = document.getElementById("fieldEmail");
const fieldPhone = document.getElementById("fieldPhone");

inputName.addEventListener(
  "input",
  (e) => (fieldName.innerHTML = e.target.value)
);
inputSurname.addEventListener(
  "input",
  (e) => (fieldSurname.innerHTML = e.target.value)
);
inputStreet.addEventListener(
  "input",
  (e) => (fieldStreet.innerHTML = e.target.value)
);
inputCity.addEventListener(
  "input",
  (e) => (fieldCity.innerHTML = e.target.value)
);
inputPostalCode.addEventListener(
  "input",
  (e) => (fieldPostalCode.innerHTML = e.target.value)
);
inputEmail.addEventListener(
  "input",
  (e) => (fieldEmail.innerHTML = e.target.value)
);
inputPhone.addEventListener(
  "input",
  (e) => (fieldPhone.innerHTML = e.target.value)
);

// ☢️☢️☢️☢️
let couponActive;
let priceUp = 96.98;
let couponUp = 0;
let sizeUp = 0;
let pcsUp = 1;
let deliveryUp = 0;
let codValue = 2.98;
let bankValue = 0;
let paymentUp = 0;

let currency = "€";
let numberOfProducts = 1;
let step = 0;

// updated DOM elements
const showCurrentPrice = function (updated) {
  productPrice.forEach(
    (pri) =>
      (pri.innerHTML = `${updated.toFixed(2)} <span class="section__currency">${currency}</span>`)
  );
};
const showTotal = (total) => (total.innerHTML = `${total} ${currency}`);

const showCurrentSize = function (size) {
  productSize.forEach((s) => (s.innerHTML = `${size}`));
};

pcs.innerHTML = numberOfProducts;
const showCurrentPcs = function () {
  pcs.forEach((el) => (el.innerHTML = numberOfProducts));
};
// updated DOM elements

function updateCoupon() {
  couponUp = 10;
  cancelCoupon();
  select.value = 1;
  couponActive = `<span class='add-coupon'>-${couponUp}€</span>`;
  amount.insertAdjacentHTML("afterend", couponActive);
  total(priceUp, couponUp, sizeUp, pcsUp, deliveryUp, paymentUp);
}

function cancelCoupon() {
  document.querySelector(".coupon").style.display = "none";
  localStorage.setItem("couponOpen", false);
}

function updateSizeSelection(e) {
  let sizeUpdated = Number(e.target.value);
  if (sizeUpdated === 6) sizeUp = 0;
  if (sizeUpdated === 7) sizeUp = 20;
  if (sizeUpdated === 8) sizeUp = 40;
  total(priceUp, couponUp, sizeUp, pcsUp, deliveryUp, paymentUp);
  showCurrentSize(sizeUpdated);
}

couponBtn.addEventListener("click", updateCoupon);
couponBtnClose.addEventListener("click", cancelCoupon);
select.addEventListener("input", updateSizeSelection);
cod.addEventListener("click", () => {
  updatePaymentSelection(codValue, "Pay in cash");
});
bank.addEventListener("click", () => {
  updatePaymentSelection(bankValue, "Bank transfer");
});
minPcs.addEventListener("click", decrease);
maxPcs.addEventListener("click", increase);

function decrease(e) {
  e.preventDefault();
  numberOfProducts--;
  cartBtnNumber.innerHTML = numberOfProducts
  pcsUp = numberOfProducts;
  showCurrentPcs();
  if (numberOfProducts === 1) minPcs.classList.add("min-max-btn-hidden");
  if (numberOfProducts === 9) {
    document.querySelector(".card__info").style.display = "none";
    maxPcs.classList.remove("min-max-btn-hidden");
  }
  total(priceUp, couponUp, sizeUp, pcsUp, deliveryUp, paymentUp);
}

function increase(e) {
  e.preventDefault();
  numberOfProducts++;
  cartBtnNumber.innerHTML = numberOfProducts
  pcsUp = numberOfProducts;
  minPcs.classList.remove("min-max-btn-hidden");
  showCurrentPcs();
  if (numberOfProducts === 10) {
    document.querySelector(".card__info").style.display = "block";
    maxPcs.classList.add("min-max-btn-hidden");
  }
  total(priceUp, couponUp, sizeUp, pcsUp, deliveryUp, paymentUp);
}

function updatePaymentSelection(payment, method) {
  paymentUp = payment;
  finalPaymentValue.innerHTML = `${payment} €`;
  finalPayment.innerHTML = method;
  total(priceUp, couponUp, sizeUp, pcsUp, deliveryUp, paymentUp);
}

const addToCard = function (e) {
  e.preventDefault();
  step++;

  if (step == 1) stepsTitle.textContent = "Shopping Cart";
  if (step == 2) {
    stepsTitle.textContent = "Delivery and Payment";
    deliveryUp = 4.98;

    updatePaymentSelection(bankValue, "Bank transfer");
    total(priceUp, couponUp, sizeUp, pcsUp, deliveryUp, paymentUp);
  }

  if (step == 3) stepsTitle.textContent = "Address";

  if (step >= 4) {
    summary.classList.add("active-summary");
    totalPriceOnly(priceUp, couponUp, sizeUp, pcsUp);
    total(priceUp, couponUp, sizeUp, pcsUp, deliveryUp, paymentUp);
  } else {
    document.querySelector(".header").classList.add("hide-header");
    detailBox.classList.add("hide-detail-box");
    sectionForm.classList.add("hide-section-form");
    cartBtnNumber.classList.add("added");
    formStepZero.classList.remove("active-step");
    cartBtnNumber.textContent = numberOfProducts;
    stepsBtn.textContent = "NEXT";
    formSteps.forEach((step) => {
      step.classList.remove("active-step");
    });
    document.querySelector(`.step--${step}`).classList.add("active-step");
    document
      .querySelector(`.progress-btn--${step}`)
      .classList.add("active-step-btn");
    scrollToElement(form);
  }
};

primaryBtn.forEach((btn) => btn.addEventListener("click", addToCard));

// scroll
function scrollToElement(el) {
  el.getBoundingClientRect();
  el.scrollIntoView({ behavior: "smooth" });
}

function totalPriceOnly(price, coupon, size, pcs) {
  let sum = (price - coupon + size) * pcs;
  return (document.querySelector(".summary__amount--priceOnly").innerHTML =
    sum);
}
function total(price, coupon, size, pcs, del, pay) {
  let sum = (price - coupon + size) * pcs + del + pay;
  return showCurrentPrice(sum);
}

total(priceUp, couponUp, sizeUp, pcsUp, deliveryUp, paymentUp);


//!!!!
const acceptSummary = function () {
  sumSectionVisible.classList.add("hidden-summary-section");
  sumSectionHidden.classList.remove("hidden-summary-section");
  // add som gif clapping
  setTimeout(() => {
    location.reload(); // temporary solution
  }, 5000);
};

summaryBtn.addEventListener("click", acceptSummary);
// ☢️☢️☢️☢️
