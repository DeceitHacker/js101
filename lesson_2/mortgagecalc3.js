const readline = require('readline-sync');
const MESSAGES = require('./mortgage_calculator_messages.json');

function prompt(message) {
  return `--> ${message}`;
}

function promptUser(message) {
  console.log(prompt(message));
}

function getInput(message, validator, validationMessage) {
  let input;
  let validatedInput = null;

  do {
    input = readline.question(prompt(message));
    input = input.trim();
    validatedInput = validator(input);
    if (validatedInput === null) {
      promptUser(validationMessage);
    }
  } while (validatedInput === null);

  return validatedInput;
}
