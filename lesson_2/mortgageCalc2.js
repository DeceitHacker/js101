const readline = require('readline-sync');
const MESSAGES = require('./mortgage_calculator_messages.json');


function prompt(message){
    console.log(`=> ${message}`);
}

function isInvalidLoanAmount(input){
    input = +input;
    return input <= 0 ||
           Number.isNaN(+input);
}

function isInvalidDuration(input){
    return input <= 0 ||
           Number.isNaN(+input) ||
           !Number.isInteger(+input);
}

function isInvalidInterest(input) {
    return input < 0    ||
            Number.isNaN(+input) ||
            input === '';
}

function isInvalidRepeat(input){
    const VALID_REPEAT_ANSWERS = ['yes', 'no', 'y', 'n'];
    input = input.toLowerCase();
    return !VALID_REPEAT_ANSWERS.includes(input);
}

function cleanInput(input){
    input = input.trim();
    input = input.replace('$', '');
    input = input.replace('%', '');
    input = input.replace(',', '');
    input = input.replace("'", '');
    return input;
}

function collectInput(message, validation, invalidMsg){
    prompt(MESSAGES[message]);
    let input = readline.question();
    input = cleanInput(input);

    while(validation(input)){
        prompt(MESSAGES[invalidMsg]);
        input = readline.question();
        input = cleanInput(input);
    }
    return input;
}