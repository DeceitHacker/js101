const readline = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
const WINNING_MOVES = {
    rock: ['scissors', 'lizard'],
    paper: ['spock', 'rock'],
    scissors: ['paper', 'lizard'],
    lizard: ['paper', 'spock'],
    spock: ['rock', 'scissors'],
};
const NUMBER_OF_GAMES = 5;

let playerScore = 0;
let computerScore = 0;

function prompt(message){
    console.log(`=> ${message}`);
}

prompt(
    `Let's play rock, paper, scissors, spock, lizard`    
);
