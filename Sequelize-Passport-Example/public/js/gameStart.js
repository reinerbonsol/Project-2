function init() {

    function drawCard(hand){
        var drawnCard = deck.pop()
        hand.push(drawnCard);
        return hand;
    }
    
    function handWeight(hand) {
        var total = 0;
            for (i =0; i < hand.length; i++) {
                total += hand[i].weight
            }
            return total;
    }

    function User() {
        this.hand = [];
        this.draw = drawCard(hand);
        this.weight = handWeight(hand);
    }

    class Player extends User {
        this.name = name;
    }

    function gameStart(){
    makeDeck();
    var dealerhand = [];
    var playerhand = [];

    var playerOne = new Player(Meg)
    drawCard(Dealer.dealerHand);
    Dealer.dealerDraw();
    console.log(Dealer.dealerHand);

    Player.playerDraw();
    console.log(Player.playerHand);

    Dealer.dealerDraw();
    console.log(Dealer.dealerHand);

    Player.playerDraw();
    console.log(Player.playerHand);

    Player.playerWeight();
    console.log(Player.playerWeight);

    console.log(Dealer.dealerWeight);

    //Player weight and player JPEG files will display on screen. Dealer Cards will show back of card JPEG.
    }

    function makeDeck(){
    var deck = [];
    function Card(rank, suit, weight, id){
        this.rank = rank;
        this.suit = suit;
        this.weight = weight;
        this.id = id;
    }
    ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    suits = ['hearts', 'spades', 'diamonds','clubs'];
    for(var s = 3; s>=0;s--){
        for(var r = 12;r>=0;r--){
            var weight = parseInt(ranks[r]);
            if(ranks[r] == 'J'|| ranks[r] == 'Q'|| ranks[r] == 'K'){
                weight = 10;
            }else if(ranks[r]=='A'){
                weight = 11;
            }
        if(suits[s]=='hearts'){
            id = ranks[r]+'H';
        }else if(suits[s]=='spades'){
            id = ranks[r]+'S';
        }else if(suits[s]=='diamonds'){
            id = ranks[r]+'D';
        }else if(suits[s]=='clubs'){
            id = ranks[r]+'C';
        }
            deck.push(new Card(ranks[r],suits[s], weight,id));
        }
    }

    function shuffle(array){
        array.sort(()=>Math.random()-0.5);
    }
    shuffle(deck);

    console.log(deck);
    }
    gameStart();
}

init();

//Alternative to matty Favs make deck function and Card constructor. create the card constructor separate from the actual create deck function.
//deck and Card will become global variables instead of inside a function.
var deck = [];

function Card(suit, value, weight) {
    this.suit = suit;
    this.value = value;
    this.weight = weight;
    this.img = `../assets/PNG/cards/${value}-of-${suit}`;
};

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
    });
    deckImg();
};

//this funcnction will get all the cards and link them to the png images in the folder and put those links into the head tag of the index.html
function deckImg() {
    deck.forEach(function(card) {
        var imageLink = $("<link>", {"rel": "deck image", "href": `${card.img}`});
        $("head").append(imageLink);
    });
}

createDeck();

function inputName() {
    let inputName = $("<input>", {"type": "text", "id": "input-name", "method": "POST", "size": "20", "maxlength": "20", "placeholder": "Welcome! What should we call you?"});
    $("body").append($inputName);
  
    inputName.keypress(function(event) {
      let name = inputName.val();
      if (event.keyCode == 13) {
        if (name !== "") {
          player.name = name;
          inputName.remove();
// we need to run a function here that will essentially create all the DOM elements and the entirety of the board along with all the buttons
          createAllDom();
        } else {
          $("#input-name").attr("placeholder", "enter a name!");
          setTimeout(function() {
            $("#input-name").attr("placeholder", "who are you?");
          }, 1000);
        }
      };
    });
  
  }

//this is the function that all the DOM elements will be created. it will only be called once the user inputs a name in the initial form input.
function createAllDom() {
    let cardTable = $('<div>', {'class': 'container', 'id': 'card-table'});
    let dealerHand = $('<div>', {'class': 'hand', 'id': 'dealer-hand'});
    let buttons = $('<div>', {'id': 'button-bar'});
    let hitButton = $('<button>', {'id': 'hit-button'}).text('HIT');
    let standButton = $('<button>', {'id': 'stand-button'}).text('STAND');
    let splitButton = $('<button>', {'id': 'split-button'}).text('SPLIT');
    let doubleButton = $('<button>', {'id': 'double-button'}).text('DOUBLE');
    let playersContainer = $('<div>', {'class': 'player-container', 'id': 'players-container'});
    

    $('body').append(cardTable);

    $('#card-table').append(dealerHand);
    $('#card-table').append(playersContainer);
    $('#card-table').append(buttons);
    
    $('#button-bar').append(hitButton);
    $('#button-bar').append(standButton);
    $('#button-bar').append(splitButton);
    $('#button-bar').append(doubleButton);

    for (let i = 1; i <= 3; i++) {
        let playerHandContainer = $('<div>', {'class': 'player-hand-container'});
        let playerHandInfo = $('<div>', {'class': 'player-hand-info'});
        let playerHandStats = $('<div>', {'class': 'player-hand-stats'});
        let playerHandTotal = $('<p>', {'class': 'player-hand-player-total'});
    
        playerHandStats.append(playerHandTotal);
    
        playerHandInfo.append($('<p>', {'class': 'hand-player-name'}));
        playerHandInfo.append(playerHandStats);
        playerHandContainer.append(playerHandInfo);
        
        $('#players-container').append(playerHandContainer);
      }
}