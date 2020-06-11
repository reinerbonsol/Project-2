// Requiring necessary npm packages
var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//SERVER SIDE GAMING LOGIC
function Card(suit, value, weight) {
  this.suit = suit;
  this.value = value;
  this.weight = weight;
  this.img = `../assets/PNG/cards/${value}-of-${suit}`;
};

var Player = function(id, name) {
  this.id = id;
  this.name = name;
  this.hand = [];
  this.total = 0;
  this.displayTotal = "";
};

//// 1. When the server is created it will run the createDeck() which will create all the cards with its value, suit and weight and push it into the empty deck array.

//// 2. Then it will take the deck array and shuffle the objects inside.

function createDeck() {
  var suits = ["hearts", "spades", "diamonds","clubs"];
  var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  var weight = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];

//what this does is for every suit it will run a function (so 4 times)with the parameter of suit/
  suits.forEach(function(suit) {
//what this does is runs a function for each values (so 13 times), with a parameters of value and index, that will create a card for each card in the deck. Example. for each of the values lets say we wanted to create the 8 of hearts. you would first need to go to the suits and choose the 'hearts' in the suits var. then you would need to go to the values var and get '8'. but you need a second parameter for index. which is the index in the array of values. so the index is 7 to get the values of '8'. 
//when you input all that info in the Card constructor you get this: var card = new Card('hearts', '8', weight[7])
//the weight array at the 7thh index = 8.
//this function of create deck does it simplified and create all 52 cards.
      values.forEach(function(value, index) {
          var card = new Card(suit, value ,weight[index]);
          deck.push(card);
      });
      shuffle(deck);
      console.log(deck)
  });
};

//this will take the deck and shuffle it
function shuffle(array){
  createDeck();
  array.sort(()=>Math.random()-0.5);
};

//// 3. On a start game button (that I haven't created yet) it will run a function called startGame() that will give you a console.log, so you know the function is active, and then it will run a function called dealCards().

function startGame() {
  console.log("Game has started. Get Ready!")
  dealCards();
}

//// 4. dealCards() will give the player and the dealer their cards which will be pushed into the empty hand array and then the  player.hand and dealer.hand will be calculated by adding the values of the two cards and posting the total weight.

//// 5. if the hand has an "A" the hasAce() will recognize it and give the player 2 player.total and 2 player.displayTotal. the first value will be the hand with "A" with a value of 1. The other value will give you a player total of the two cards + 10.

//deck.shift() will go to the deck array which at this point has already been shuffled and grab the [0] in the array
//this function will get the first two card of the shuffled deck and push it into the players hand. Then it will grab the next two cards in the shuffle deck and push it into the dealers hand.
function dealCards() {
  var firstCard = deck.shift();
  var secondCard = deck.shift();

  player.hand.push(firstCard);
  player.hand.push(secondCard);

  player.total = calculateHand(player.hand).total;
  player.displayTotal = calculateHand(player.hand).displayTotal;

  dealer.hand.push(firstCard);
  dealer.hand.push(secondCard);

  dealer.total = calculateHand(dealer.hand).total;
  dealer.displayTotal = calculateHand(dealer.hand).displayTotal;
}

// this function will take whatever the hand is add the two values and returns total and replaces the previous card.weight. 
function calculateHand(hand) {
  var total = hand.reduce(function (total, card) {
      return total += card.weight;
  });

  var displayTotal = `${total}`;

// if the hand has an Ace and the total of the hand is less than or equal to 21 then the displayed total will show both total possibilities. EXAMPLE if you have an A and a 2. the display will show you 3 and 13
  if (hasAce(hand) && total + 10 <= 21) {
      displayTotal = `${total} (${total + 10})`;
      total += 10;
  };
  return {
  total: total,
  displayTotal: displayTotal
};
}

//Each hand has an automatic boolean of false. for each of the hands (dealer and player) if there is an Ace the boolean is turned to true and the above function will calculate the hand with the Ace.
function hasAce(hand) {
  var hasAce = false;

  hand.forEach((card) => {
      if (card.value === "A") {
      hasAce = true;
      }
  });
  return hasAce;
};

function dealerTurn() {
  while (dealer.total < 17) {
      var newCard = deck.shift();
      dealer.hand.push(newCard);

      dealer.total = calculateHand(dealer.hand).total;
      dealer.displayTotal = calculateHand(dealer.hand).displayTotal;
  };
};

function endGame() {
  if (player.total > 21) {
    console.log(`${player.name} busted.`);
  } 
  else if (dealer > 21) {
      if (player.total === 21 && player.hand.length === 2) {
        console.log(`Dealer busted and ${player.name} has BLACKJACK`);
      } 
      else if (player.total < 21 || (player.total === 21 && player.hand.length > 2)) {
        console.log(`${player.name} won. Dealer has busted`);
        alert("You won this round!")
      }
  }
  else if (player.total === dealer.total) {
    console.log(`${player.name} and the dealer tied!`)
  }
  else if (player.total > dealer.total) {
    console.log(`${player.name} won!`)
  }
  else if (dealer.total > player.total && dealer.total <= 21) {
    console.log(`${player.name} lost!`)
  }
}

// Syncing our database and logging a message to the user upon success
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

