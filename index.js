/*goal: make an automated (no user input) WAR card game printed to the console; the entire game should play out 
  instantly.
  ~instructions: 
    --deals 26 cards to each player (only 2 players)
    --iterate through the turns where each player plays a card
    --the player who played the higher card is awarded a point
        --ties result in zero points for both players
    --after all cards have been played, display the score and declare the winner.
    --create classes w/ props and methods:
        --deck
        --player
        --card
*/

class Card {        //informs the Card object
    constructor(suit, name, value) {
        this.suit = suit;
        this.name = name;
        this.value = value;
    }
}

class Deck {        //informs the Deck object; Ace beats all so must have the highest value
    constructor() {
        this.cards = [];
        this.suits = ['spades', 'clubs', 'hearts', 'diamonds'];
        this.names = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
        this.values = [14, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    }

    formsDeck() {       //method that creates the Deck object
        console.log("Forming the deck...");
        for (let i = 0; i < this.suits.length; i++) { //loops through each of the suits
            for (let x = 0; x < this.names.length; x++) {  //loops through the names/values of the cards
                this.cards.push(new Card(this.suits[i], this.names[x], this.values[x])); 
                    //pushes all iterations to the cards array
            } 
        };
       //console.log(...this.cards);            //TRUST FALL
    }       

    shufflesDeck() {            //method that randomly places the elements within the cards array
        console.log("Shuffling the deck...");
        let shuffledDeck = [];
        for (let i = 0; i < 52; i++) {  //iterating through 52 cards
            let randomSpot = Math.floor((this.cards.length - i) * Math.random()); 
                //randomizes the placement of the cards; Math.floor rounds down to whole number
            let randomCard = this.cards.splice(randomSpot, 1);  //places one card in a randomized spot
            shuffledDeck.push(...randomCard);
        } 
   
        //console.log(...shuffledDeck);             //TRUST FALL
        return shuffledDeck;
    } 
    
    dealsCards(players, shuffledDeck) {   //method dealing the cards to the players' hand array
        console.log("Dealing the cards...");
         //index of player hand to be added to is at 0, and 26 cards need to be spliced into the player's decks
        let dealingCards1 = shuffledDeck.splice(0, 26); //removing the cards from the deck
        players[0].hand.push(...dealingCards1);          //giving those cards to player1's hand
        let dealingCards2 = shuffledDeck.splice(0, 26);
        players[1].hand.push(...dealingCards2);
        
        //console.log(players[0].name, ': ', ...players[0].hand, '\n', players[1].name, ': ', ...players[1].hand);
    }   // ^^ TRUST FALL ^^
}

class Player {          //informs the Player object
    constructor(name) {
        this.name = name;
        this.points = 0;
        this.hand = [];
    }
}

class WarGame {         //informs the WarGame object
    constructor() {
        this.players = [];
    }

    start() {           //initiates the game
        this.players.push(new Player("Terry"));
        this.players.push(new Player("Cloth"));
        console.log("Facing off are... " + this.players[0].name + ' and ' + this.players[1].name + '!');
        
        let newDeck = new Deck();      //instantiating a Deck object
        newDeck.formsDeck();          //Forming the deck...  
        let shuffledDeck = newDeck.shufflesDeck(); //Shuffling the deck... 

        newDeck.dealsCards(this.players, shuffledDeck); //Dealing the cards...

        this.playGame();  

        this.endGame();

    }

    playGame() {            //how the game works
        let player1 = this.players[0];
        let player2 = this.players[1];
        let turn = 0;

        while (player1.hand.length != 0 && player2.hand.length != 0) { //while there are cards in the players' hands
            let player1Card = player1.hand.pop();   //removes and returns the last element from their hand array
            let player2Card = player2.hand.pop();
            let results = ['Turn: ' + (turn += 1) + '\n' + player1.name + ' plays: ' + player1Card.name + ' of ' + player1Card.suit + '\n' + player2.name + ' plays: ' + player2Card.name + ' of ' + player2Card.suit + '\n'];
            //boolean checks for victory
            if (player1Card.value > player2Card.value) {
                player1.points += 1;
                console.log(results += 'Winner: ' + player1.name);
            }
            else if (player2Card.value > player1Card.value) {
                player2.points += 1;
                console.log(results += 'Winner: ' + player2.name);
            }   
            else {
                console.log(results += 'It is a tie!');
            }
        }
    }

    endGame() {                 //displaying end game results: final scores and winner declaration
        let player1 = this.players[0];
        let player2 = this.players[1];

        if (player1.points > player2.points) {
            console.log("BOO! Game over! " + player1.name + " won the game! \nFinal Scores:\n" + player1.name + ": " + player1.points + '\n' + player2.name + ': ' + player2.points);
        } else if (player2.points > player1.points) {
            console.log("Game over! Already?? " + player2.name + " won the game! \nFinal Scores:\n" + player1.name + ": " + player1.points + '\n' + player2.name + ': ' + player2.points);
        } else {
            console.log("Game over! It's a tie!! Everyone agrees to go home and sleep.\nFinal Scores:\n" + player1.name + ": " + player1.points + '\n' + player2.name + ': ' + player2.points);
        }
    }   
}

console.log("It's time for a quick game of WAR!\n")

let game = new WarGame();
game.start();