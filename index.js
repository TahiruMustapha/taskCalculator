let morguageAmountEl = document.getElementById("morguageAmount");
let mortgageTermEl = document.getElementById("mortgageTerm");
let mortgageInterestAmount = document.getElementById("mortgageInterestAmount");
const repaymentsElRadio = document.getElementById("repayments");
const interestOnlyElRadio = document.getElementById("interestOnly");
const formEl = document.getElementById("form");
const interestErrorEl = document.getElementById("interestError");
const mortgageTermErrorEl = document.getElementById("mortgageTermError");
const mortgateAmountErrorEl = document.getElementById("mortgateAmountError");
const clearEl = document.getElementById("clear");
const mortgageInterestError = document.getElementById("mortgageInterest");
const mortgageTermError = document.getElementById("mortgageTermError");
const inputError = document.getElementById("inputError");
const repaymentsError = document.getElementById("repaymentsError");
const interestOnlyError = document.getElementById("interestOnlyError");
//SUBMIT FORM FUNCTION
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;
  if (morguageAmountEl.value === "") {
    inputError.style["border"] = "1px solid red";
    isValid = false;
  }
  if (mortgageTermEl.value === "") {
    mortgageTermError.style["border"] = "1px solid red";
    isValid = false;
  }
  if (mortgageInterestAmount.value === "") {
    mortgageInterestError.style["border"] = "1px solid red";
    isValid = false;
  }
  if (repaymentsElRadio.checked == false) {
    repaymentsError.style["border"] = "1px solid red";
    isValid = false;
  }
  if (interestOnlyElRadio.checked == false) {
    interestOnlyError.style["border"] = "1px solid red";
    isValid = false;
  }
});
clearEl.addEventListener("click", function () {
  if (morguageAmountEl) {
    morguageAmountEl.value = "";
  }
  if (mortgageTermEl) {
    mortgageTermEl.value = "";
  }
  if (mortgageInterestAmount) {
    mortgageInterestAmount.value = "";
  }
});
