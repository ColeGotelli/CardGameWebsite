 class Deck {
	constructor() {
		this.deck = []
		this.dealtCards = []
	}

	generateDeck() {
		let card = (suit, value) => {
			this.name = value + ' of ' + suit
			this.suit = suit
			this.value = value

			return {name:this.name, suit:this.suit, value:this.value}
		}

		let values = ['2','3','4','5','6','7','8','9','10','Jack','Queen','King','Ace']
		let suits = ['Clubs','Diamonds','Spades','Hearts']

		for(let s = 0; s < suits.length; ++s) {
			for(let v = 0; v < values.length; ++v) {
				this.deck.push(card(suits[s],values[v]))
			}
		}
	}

	printDeck() {
		if (this.deck.length == 0) {
			console.log('The deck has been generated')
		}
		else {
			for(let c = 0; c < this.deck.length; ++c) {
				console.log(this.deck[c]);
			}
		}
	}

	shuffle() {
		let currentIndex = this.deck.length, tempVal, randIndex

		while (0 != currentIndex) {
			randIndex = Math.floor(Math.random() * currentIndex--)
			tempVal = this.deck[currentIndex]
			this.deck[currentIndex] = this.deck[randIndex]
			this.deck[randIndex] = tempVal
		}
	}

	dealCard() {
		let dealtCard = this.deck.shift()
		this.dealtCards.push(dealtCard)
		return dealtCard

	}

	dealHand(numCards) {
		var hand = [];
		for(var i = 0; i < numCards; ++i) {
			hand[i] = this.dealCard();
		}

		return hand;
	}

	replace() {
		this.deck.unshift(this.dealtCards.shift())
	}
}

/*deck = new Deck()
deck.generateDeck()
deck.shuffle()
deck.shuffle()
deck.printDeck()
console.log(deck.deal())*/ 

module.exports = Deck




/*var cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var suits = ["diamonds", "hearts", "spades", "clubs"];
var deck = new Array();

function getDeck()
{
	var deck = new Array();

	for(var i = 0; i < suits.length; i++)
	{
		for(var x = 0; x < cards.length; x++)
		{
			var card = {Value: cards[x], Suit: suits[i]};
			deck.push(card);
		}
	}

	return deck;
}

function shuffle()
{
	// for 1000 turns
	// switch the values of two random cards
	for (var i = 0; i < 1000; i++)
	{
		var location1 = Math.floor((Math.random() * deck.length));
		var location2 = Math.floor((Math.random() * deck.length));
		var tmp = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}

	renderDeck();
}

function renderDeck()
{
	document.getElementById('deck').innerHTML = '';
	for(var i = 0; i < deck.length; i++)
	{
		var card = document.createElement("div");
		var value = document.createElement("div");
		var suit = document.createElement("div");
		card.className = "card";
		value.className = "value";
		suit.className = "suit " + deck[i].Suit;

		value.innerHTML = deck[i].Value;
		card.appendChild(value);
		card.appendChild(suit);

		document.getElementById("deck").appendChild(card);
	}
}

function load()
{
	deck = getDeck();
	shuffle();
	renderDeck();
}

window.onload = load;*/
