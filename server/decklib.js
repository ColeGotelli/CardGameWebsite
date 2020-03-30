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

		let values = ['2','3','4','5','6','7','8','9','10','J','Q','K','A']
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
			randIndex = Math.floor(Math.random * currentIndex)
			currentIndex -= 1
			tempVal = this.deck[currentIndex]
			this.deck[currentIndex] = this.deck[randIndex]
			this.deck[randIndex] = tempVal
		}
	}

	deal() {
		let dealtCard = this.deck.shift()
		this.dealtCards.push(dealtCard)
		return dealtCard

	}

	replace() {
		this.deck.unshift(this.dealtCards.shift())
	}
}

deck = new Deck()
deck.generateDeck()
deck.shuffle()
deck.shuffle()
deck.printDeck()
console.log(deck.deal())




