/* pseudocode
1. Initialize deck
2. Deal cards to player and dealer
3. Player turn: hit or stay
   - repeat until bust or stay
4. If player bust, dealer wins.
5. Dealer turn: hit or stay
   - repeat until total >= 17
6. If dealer busts, player wins.
7. Compare cards and declare winner.
*/

const VALID_PLAY_AGAIN_CHOICES = ['y', 'yes', 'n', 'no'];
const readline = require('readline-sync');
const MESSAGES = require('./21gamemsg.json');
const DECK_SUIT = ['♦', '♥', '♣', '♠'];
const CARD_VALUES =
['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const VALID_ACTIONS = ['s', 'h'];
const MAX_HIT = 21;
const DEALER_MAX_STAY = MAX_HIT - 4;
const BEST_OF = 3;

// Message functions
function messages(message){
   return MESSAGES[message];
}

function prompt(key){
   let message = messages(key);
   console.log(`${message}`);
}

function displayMessage(message){
   console.log(`${message}`);
}

// Validations
function fetchChoice(input){
   prompt(input);
   let answer = readline.question().toLowerCase();
   while(!VALID_PLAY_AGAIN_CHOICES.includes(answer)){
      prompt(`invalid_${input}`);
      answer = readline.question().toLowerCase();
   }
   return answer;
}

// Game Functions
function initializeDeck(){
   let deck = [];
   for(let suitIndex = 0; suitIndex < DECK_SUIT.length;suitIndex++){
      let suit = DECK_SUIT[suitIndex];
      
      for(let valueIndex = 0; valueIndex < CARD_VALUES.length;valueIndex++){
         let value = CARD_VALUES[valueIndex];
         deck.push({suit, value});
      }
   }
   return shuffle(deck);
}

function shuffle(cards){
   for(let index = cards.length - 1; index > 0; index--){
      [cards[index], cards[otherIndex]] = [cards[otherIndex], cards[index]];
   }
   return cards;
}

function total(cards){
   let values = cards.map((card) => card.value);

   let sum = 0;
   for(let value of values){
      if(value === "A"){
         sum += 11;
      } else if(['J', 'Q', 'K'].includes(value)) {
         sum += 10;
      } else{
         sum += +value; // Appends + operator
      }
   }
   return correctTotalForAces(sum);
}

function correctTotalForAces(sum, values){
   values.filter(value => value === "A").forEach(_ => {
      if(sum > MAX_HIT) sum -= 10;
   })
}