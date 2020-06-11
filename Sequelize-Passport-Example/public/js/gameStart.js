// function init() {

//     function drawCard(hand){
//         var drawnCard = deck.pop()
//         hand.push(drawnCard);
//         return hand;
//     }
    
//     function handWeight(hand) {
//         var total = 0;
//             for (i =0; i < hand.length; i++) {
//                 total += hand[i].weight
//             }
//             return total;
//     }

//     function User() {
//         this.hand = [];
//         // this.draw = drawCard(hand);
//         // this.weight = handWeight(hand);
//     }

//     // class Player extends User {
//     //     this.name = name;
//     // }

//     function gameStart(){
//     makeDeck();
//     var dealerhand = [];
//     var playerhand = [];
//     drawCard(playerOne);
//     drawCard(Dealer);
//     drawCard(playerOne);
//     drawCard(Dealer);

//     // var playerOne = new Player(Meg)
//     // drawCard(Dealer.dealerHand);
//     // Dealer.dealerDraw();
//     // console.log(Dealer.dealerHand);

//     // Player.playerDraw();
//     // console.log(Player.playerHand);

//     // Dealer.dealerDraw();
//     // console.log(Dealer.dealerHand);

//     // Player.playerDraw();
//     // console.log(Player.playerHand);

//     // Player.playerWeight();
//     // console.log(Player.playerWeight);

//     // console.log(Dealer.dealerWeight);

//     //Player weight and player JPEG files will display on screen. Dealer Cards will show back of card JPEG.
//     }

//     function makeDeck(){
//     var deck = [];
//     function Card(rank, suit, weight, id){
//         this.rank = rank;
//         this.suit = suit;
//         this.weight = weight;
//         this.id = id;
//     }
//     ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
//     suits = ['hearts', 'spades', 'diamonds','clubs'];
//     for(var s = 3; s>=0;s--){
//         for(var r = 12;r>=0;r--){
//             var weight = parseInt(ranks[r]);
//             if(ranks[r] == 'J'|| ranks[r] == 'Q'|| ranks[r] == 'K'){
//                 weight = 10;
//             }else if(ranks[r]=='A'){
//                 weight = 11;
//             }
//         if(suits[s]=='hearts'){
//             id = ranks[r]+'H';
//         }else if(suits[s]=='spades'){
//             id = ranks[r]+'S';
//         }else if(suits[s]=='diamonds'){
//             id = ranks[r]+'D';
//         }else if(suits[s]=='clubs'){
//             id = ranks[r]+'C';
//         }
//             deck.push(new Card(ranks[r],suits[s], weight,id));
//         }
//     }

//     function shuffle(array){
//         array.sort(()=>Math.random()-0.5);
//     }
//     shuffle(deck);

//     //console.log(deck);
//     }
//     gameStart();
// }

// init();

//Alternative to matty Favs make deck function and Card constructor. create the card constructor separate from the actual create deck function.
//deck and Card will become global variables instead of inside a function.
var deck = [];
// var playerName = localStorage.getItem('playerName') || 'player';
var player = {name: playerName, hand: playerHand}
var dealer = {name: 'dealer', hand: []};
// var dealerhand = [];
var playerHand = [];
// var playerOneTotal = 0;
// var dealerTotal = 0;

function Card(suit, value, weight) {
    this.suit = suit;
    this.value = value;
    this.weight = weight;
    this.img = `../assets/PNG/cards/${value}-of-${suit}`;
};

var Player = function(id, name, money) {
    this.id = id;
    this.name = name;
    this.hand = [];
    this.total = 0;
    this.displayTotal = '';
}

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
    deckImg();
};

//this function will get all the cards and link them to the png images in the folder and put those links into the head tag of the index.html
function deckImg() {
    deck.forEach(function(card) {
        var imageLink = $("<link>", {"rel": "deck image", "href": `${card.img}`});
        $("head").append(imageLink);
    });
};

function shuffle(array){
    array.sort(()=>Math.random()-0.5);
}

createDeck();

function inputName() {
    var inputName = $("#input-name")
    // let inputName = $("<input>", {"type": "text", "id": "input-name", "method": "POST", "size": "20", "maxlength": "20", "placeholder": "Welcome! What should we call you?"});
    // $("body").append(inputName);

    inputName.keypress(function(event) {
    var name = inputName.val();
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
};

//this is the function that all the DOM elements will be created. it will only be called once the user inputs a name in the initial form input.
function createAllDom() {
    var cardTable = $('<div>', {'class': 'container', 'id': 'card-table'});
    var dealerHand = $('<div>', {'class': 'hand', 'id': 'dealer-hand'});
    var playersContainer = $('<div>', {'class': 'player-container', 'id': 'players-container'});
    let playerHand = $('<div>', {'class': 'hand', 'id': 'player-hand'});
    var buttons = $('<div>', {'id': 'button-bar'});
    var hitButton = $('<button>', {'id': 'hit-button'}).text('HIT');
    var standButton = $('<button>', {'id': 'stand-button'}).text('STAND');
    var banner = ($('<div>', {'class': 'banner'}));

    $('body').append(cardTable);

    $('#card-table').append(dealerHand);
    $('#card-table').append(playersContainer);
    $('#card-table').append(banner);

    $('#card-table').append(buttons);
    $('#button-bar').append(hitButton);
    $('#button-bar').append(standButton);


    for (var i = 1; i <= 3; i++) {
        var playerHandContainer = $('<div>', {'class': 'player-hand-container'});
        var playerHandInfo = $('<div>', {'class': 'player-hand-info'});
        var playerHandStats = $('<div>', {'class': 'player-hand-stats'});
        var playerHandTotal = $('<p>', {'class': 'player-hand-total'});
        var playerHandPrimary = $("<div>", {"class": "hand", "class": "primary"});

        playerHandStats.append(playerHandTotal);
    
        playerHandInfo.append($('<p>', {'class': 'hand-player-name'}));
        playerHandInfo.append(playerHandStats);
        playerHandContainer.append(playerHandInfo);
        playerHandContainer.append(playerHandPrimary);

        $('#players-container').append(playerHandContainer);
    };
};

//once the drawCards() is called it will empty the div with the class of hand and also empty the div with the class of player-hand-total so there are no cards or stats in the player container. then it will go to the player then hand and for each card that is suppose to be in a starting hand of BJ (2) it will create a div that will add the image of the card you drew and it will essentially do the same for the dealer.
function drawCards(player, dealer) {
    $('.hand').children().remove();
    $('player-hand-total').text('');
    $('#dealer-box').addClass('hidden');

    player.hand.forEach((card) => {
        let $newCard = ($('<div>', {'class': 'card removed'}));
        $newCard.css('background-image', `url('${card.img}')`);
        $('#player-hand').append($newCard);
    });

    dealer.forEach((dealerCard) => {
        let $newCard = ($('<div>', {'class': 'card removed'}));
        $newCard.css('background-image', `url('${dealerCard.img}')`);
        $('#dealer-hand').append($newCard);
    });

//this is a for loop to continue to draw cards until there is two cards in the player.hand
    for (var i = 1; i <= player.hand.length; i++) {
        drawCards();
    };
//this is a for loop to continue to draw cards until there is two cards in the dealer.hand
    for (var i = 1; i <= dealer.hand.length; i++){
        drawCards();
    }
}

// function stand(hand,total) {
//     total = handWeight(hand);
    
// }

// this function will take whatever the hand is add the two values and returns total and replaces the previous card.weight. 
function calculateHand(hand) {
    var total = hand.reduce(function (total, card) {
        return total += card.weight;
    });

    let displayTotal = `${total}`;

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
    let hasAce = false;

    hand.forEach((card) => {
        if (card.value === 'A') {
        hasAce = true;
        }
    });
    return hasAce;
};

function playerTurn() {
    var hitButton = $("#hit-button");
    var standButton = $("#stand-button");

    hitButton.on("click", function() {
        var newCard = deck.shift();
        player.hand.push(newCard);
        player.total = calculateHand(player.hand).total;
        player.displayTotal = calculateHand(player.hand).displayTotal;
    })
}

function dealerTurn() {
    while (dealer.total < 17) {
        var newCard = deck.shift();
        dealer.hand.push(newCard);
    };
};

function endGame() {
    if (player.total > 21) {
        console.log(`${player.name} busted.`);
    } else if (dealer > 21) {
        if (player.total === 21 && player.hand.length === 2) {
            console.log(`Dealer busted and ${player.name} has BLACKJACK`);
        }
    }
}

function stand() {
    console.log(`${player.name} is going to stand.`);
    endPlayerTurn(player.id);
};

function endPlayerTurn(id) {
    dealerTurn();
};

function hit() {
    var newCard = deck.shift();
}

// function hit(hand,total){
//     drawCard(hand);
//     var handTotal = handWeight(hand) ;
//     if(handTotal>21){
//         stay(hand,total);
//     } else{
//         total = handTotal;
//     }
//     cardToDiv(hand);
// }

function cardToDiv(hand){
    for(var i = 0; i<hand.length;i++){
        //insert code to append card image to div

        playerHandContainer.append(hand[i].img)
        
    }
}

function dealerCardToDiv(hand){
    for(var i = 0;i<hand.length;i++){
        //number of cards to show backs on screen in dealer div
    }
}







    $("#hit-button").on("click", hit())
    $()







createAllDom();

console.log(createAllDom);
