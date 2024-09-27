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
const totalInterestPerMonthEl = document.getElementById(
  "totalInterestPerMonth"
);
const totalPaymentForTermEl = document.getElementById("totalPaymentForTerm");
clearEl.addEventListener("click", function () {
  if (morguageAmountEl.value) {
    morguageAmountEl.value = "";
  }
  if (mortgageTermEl.value) {
    mortgageTermEl.value = "";
  }
  if (mortgageInterestAmount.value) {
    mortgageInterestAmount.value = "";
  }
  if (repaymentsElRadio.checked) {
    repaymentsElRadio.checked = false;
  }
  if (interestOnlyElRadio.checked) {
    interestOnlyElRadio.checked = false;
  }
});

function calculateRepayment(mortgageAmount, interestRate, mortgageTerm) {
  // Convert annual interest rate to monthly and mortgage term to months
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = mortgageTerm * 12;
  // Mortgage repayment formula
  const monthlyRepayment =
    (mortgageAmount *
      (monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  return monthlyRepayment.toFixed(2); // Return repayment rounded to two decimal places
}

function calculateInterestOnlyRepayment(mortgageAmount, interestRate) {
  // Convert annual interest rate to monthly
  const monthlyInterestRate = interestRate / 100 / 12;
  // Interest-only payment is simply the interest on the principal
  const monthlyInterestOnlyRepayment = mortgageAmount * monthlyInterestRate;
  return monthlyInterestOnlyRepayment.toFixed(2); // Return interest-only repayment rounded to two decimal places
}

//SUBMIT FORM FUNCTION
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;
  if (morguageAmountEl.value === "") {
    inputError.style["border"] = "1px solid red";
    inputError.firstElementChild.style["backgroundColor"] = "red";
    inputError.firstElementChild.style["color"] = "white";
    isValid = false;
  }

  if (mortgageTermEl.value === "") {
    mortgageTermError.style["border"] = "1px solid red";
    mortgageTermError.children[1].style["backgroundColor"] = "red";
    mortgageTermError.children[1].style["color"] = "white";
    isValid = false;
  }
  if (mortgageInterestAmount.value === "") {
    mortgageInterestError.style["border"] = "1px solid red";
    mortgageInterestError.children[1].style["backgroundColor"] = "red";
    mortgageInterestError.children[1].style["color"] = "white";
    isValid = false;
  }
  if (
    repaymentsElRadio.checked == false &&
    interestOnlyElRadio.checked == false
  ) {
    repaymentsError.style["border"] = "1px solid red";
    isValid = false;
  }
  if (
    interestOnlyElRadio.checked == false &&
    repaymentsElRadio.checked == false
  ) {
    interestOnlyError.style["border"] = "1px solid red";
    isValid = false;
  }
  const toTalRepayment = calculateRepayment(
    morguageAmountEl.value,
    mortgageInterestAmount.value,
    mortgageTermEl.value
  );

  const totalInterstOnly = calculateInterestOnlyRepayment(
    morguageAmountEl.value,
    mortgageInterestAmount.value
  );
  totalPaymentForTermEl.textContent = `GHS ${toTalRepayment}`;
  totalInterestPerMonthEl.textContent = `GHS ${totalInterstOnly}`;
  return isValid;
});
