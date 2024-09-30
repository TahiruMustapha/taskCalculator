let morguageAmountEl = document.getElementById("mortgageAmount");
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
const resetInputFields = function () {
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
};
const resultsContainerEl = document.getElementById("resultsContainer");
const resultsInitialPageEl = document.getElementById("resultsInitialPage");

// repaymentsElRadio.addEventListener("click", () => {
//   if (repaymentsElRadio.checked) {
//     repaymentsError.style["backgroundColor"] = "hsla(61, 70%, 52%, 0.226)";
//   }
// });
// interestOnlyElRadio.addEventListener("click", () => {
//   if (interestOnlyElRadio.checked) {
//     interestErrorEl.style["backgroundColor"] = "hsla(61, 70%, 52%, 0.226)";
//   }
// });

// Function to calculate the monthly repayment (principal + interest)
function calculateRepayment(
  mortgageAmount,
  annualInterestRate,
  mortgageTermYears
) {
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  const numberOfPayments = mortgageTermYears * 12;
  // Mortgage repayment formula
  const monthlyRepayment =
    (mortgageAmount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
  return monthlyRepayment.toFixed(2);
}
// Function to calculate interest-only payment
function calculateInterestOnlyRepayment(mortgageAmount, annualInterestRate) {
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  // Interest-only payment (no principal repayment)
  const monthlyInterestOnly = mortgageAmount * monthlyInterestRate;
  return monthlyInterestOnly.toFixed(2);
}
// Function to calculate the total repayment over the mortgage term
function calculateTotalRepayment(monthlyRepayment, mortgageTermYears) {
  const numberOfPayments = mortgageTermYears * 12;
  const totalRepayment = monthlyRepayment * numberOfPayments;
  return totalRepayment.toFixed(2);
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
    // return false;
  }
  if (mortgageTermEl.value === "") {
    mortgageTermError.style["border"] = "1px solid red";
    mortgageTermError.children[1].style["backgroundColor"] = "red";
    mortgageTermError.children[1].style["color"] = "white";
    isValid = false;
    // return false;
  }
  if (mortgageInterestAmount.value === "") {
    mortgageInterestError.style["border"] = "1px solid red";
    mortgageInterestError.children[1].style["backgroundColor"] = "red";
    mortgageInterestError.children[1].style["color"] = "white";
    isValid = false;
    // return false;
  }
  if (
    repaymentsElRadio.checked == false &&
    interestOnlyElRadio.checked == false
  ) {
    repaymentsError.style["border"] = "1px solid red";
    isValid = false;
    // return false;
  }
  if (
    interestOnlyElRadio.checked == false &&
    repaymentsElRadio.checked == false
  ) {
    interestOnlyError.style["border"] = "1px solid red";
    isValid = false;
    // return false;
  }
  if (isValid) {
    const mortgageAmount = parseFloat(morguageAmountEl.value);
    const annualInterestRate = parseFloat(mortgageInterestAmount.value);
    const mortgageTermYears = parseInt(mortgageTermEl.value, 10);
    let monthlyRepayment, totalRepayment;
    // Check if the user selected "Repayment" or "Interest-Only"
    if (repaymentsElRadio.checked) {
      monthlyRepayment = calculateRepayment(
        mortgageAmount,
        annualInterestRate,
        mortgageTermYears
      );
      totalRepayment = calculateTotalRepayment(
        monthlyRepayment,
        mortgageTermYears
      );
      totalPaymentForTermEl.textContent = `GHS ${totalRepayment}`;
    } else if (interestOnlyElRadio.checked) {
      // User selected "Interest-Only"
      monthlyRepayment = calculateInterestOnlyRepayment(
        mortgageAmount,
        annualInterestRate
      );
      totalRepayment =
        calculateInterestOnlyRepayment(mortgageAmount, annualInterestRate) *
        mortgageTermYears *
        12;
      totalPaymentForTermEl.textContent = `GHS ${totalRepayment}`;
    }
    totalInterestPerMonthEl.textContent = `GHS ${monthlyRepayment}`;
    resetInputFields();
    resultsInitialPageEl.style.display = "none";
    resultsContainerEl.style.display = "block";
  }
});
