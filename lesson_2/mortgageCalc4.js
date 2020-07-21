/*
Welcome user
- Get loan amount
  - Validate loan amount
- Get APR
  - Validate APR
- Get loan duration
  - In years
  - In months
  - Validate loan duration
- Run calculation
- Show calculation results
- Ask if user would like another calculation
- End program
Validation checks:
— 0
— Negative number
— Return
— Empty string
— Unexpected letter (i.e., u instead of y)
*/

// REQUIRED VARIABLES
const readline = require('readline-sync');
const MESSAGES = require('./mortgageMessages.json');
const LANGUAGE = 'en';

// Program functions
function messages(message, lang = 'en'){
    return MESSAGES[lang][message];
}

function prompt(key){
    let message = messages(key, LANGUAGE);
    console.log(`=>${message}`);
}

function isInvalidNumber(input){
    return input.trimStart() === '' ||
    Number.isNaN(Number(input)) || Number(input) <= 0;
}

function isInvalidInteger(input){
    return input.trimStart() === '' ||
    !Number.isInteger(Number(input)) || Number(input) < 0;    
}

function isInvalidAPR(input){
    return input.trimStart() === '' ||
    Number.isNaN(Number(input)) || Number(input) < 0;
}

function isValidAnswer(input){
    input = input.toLowerCase();
    return input !== "y" && input !== "no" &&
    input !== "n" && input !== "yes";
}

// Input from users
function fetchInput(inputType){
    prompt(inputType);
    let input = readline.question();
    while(isInvalidInput(input, inputType)){
        prompt(`invalid_${inputType}`);
        input = readline.question();
    }
    return input;
}

function isInvalidInput(input, inputType){
    switch(inputType){
        case "loan":
            return isInvalidNumber(input);
        case "interestRate":
            return isInvalidAPR(input);
        case "loanDurationYears":
            return isInvalidInteger(input);
        case "loanDurationMonths":
            return isInvalidInteger(input);
        case "anotherCalc":
            return isValidAnswer(input);
        default:
            return "Error";
    }
}

// converts years into months
function getTotalLoanDurationMonths(){
    let totalLoanDurationMonths;
    do{
        prompt("loanDuration");
        let loanDurationYears = fetchInput("loanDurationYears");
        let loanDurationMonths = fetchInput("loanDurationMonths");
        totalLoanDurationMonths =
        (12 * Number(loanDurationYears)) + Number(loanDurationMonths);
        if(totalLoanDurationMonths < 1){
            prompt("invalid_loanDuration");
        }        
    } while(totalLoanDurationMonths < 1);
    return totalLoanDurationMonths;
}

// Interest rate conversion and for display purposes
let displayedInterestRate;
function getMonthlyInterestRate(interestRate){
    if(interestRate >= 1){
        displayedInterestRate = interestRate;
        interestRate /= 100;
        return interestRate / 12;
    } else {
        displayedInterestRate = interestRate * 100;
        return interestRate / 12;
    }
}

// Monthly payment calculations
function calculateMonthlyPayment(loan, monthlyInterestRate, loanDurationMonths){
    if(monthlyInterestRate === 0){
        return loan / loanDurationMonths;
    } else {
        return loan * (monthlyInterestRate / 
            (1 - Math.pow((1 + monthlyInterestRate), (-loanDurationMonths))));
    }
}

// Formats years and months for display purposes
function getFormattedLoanDuration(loanDurationMonths){
    let years = Math.floor(loanDurationMonths/ 12);
    let months = loanDurationMonths % 12;
    if(years === 0){
        return `${months} month(s)`;
    } else if(months === 0){
        return `${years} year(s)`;
    } else {
        return `${years} year(s) and ${months} month(s)`;
    }
}

function displayPayment(loan, displayedInterestRate, totalInterestAmount, totalCost, monthlyPayments, formattedLoanDuration){
    console.clear();
    console.log(`Loan: $${Number(loan).toFixed(2)}` +
    `\nInterest: ${displayedInterestRate}%` + 
    `\nTotal interest paid on loan: $${totalInterestAmount.toFixed(2)}` + `\nTotal cost: $${totalCost.toFixed(2)}` +
    `\nMonthly payments: $${monthlyPayments.toFixed(2)} for ${formattedLoanDuration}\n\n`);
}

console.clear();

// Main calculator

while(true){
    console.clear();
    prompt('welcome_message');

    let loan = fetchInput("loan");
    let interestRate = fetchInput("interestRate");
    let monthlyInterestRate = getMonthlyInterestRate(interestRate);
    let totalLoanDurationMonths = getTotalLoanDurationMonths();
    let monthlyPayments = calculateMonthlyPayment(loan, monthlyInterestRate, totalLoanDurationMonths);
    let totalCost = monthlyPayments * totalLoanDurationMonths;
    let totalInterestAmount = totalCost - loan;
    let formattedLoanDuration = getFormattedLoanDuration(totalLoanDurationMonths);

    displayPayment(loan, displayedInterestRate, totalInterestAmount, totalCost, monthlyPayments, formattedLoanDuration);

    let answer = fetchInput("anotherCalc");
    answer = answer.toLowerCase();
    if(answer === 'n' || answer === 'no'){
        console.clear();
        prompt("exitMessage");
        break;
    }
}