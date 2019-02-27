var deck;
var player_hand;
var dealer_hand;

class Card {
	constructor(rank, suit) {
		this.rank = rank;
		this.suit = suit;
	}

	get print() {
		let card = `${this.rank}${this.suit}`;
		return `<div>${card}</div>`;
	}
}

class Hand {
	constructor(first_card, second_card) {
		this.cards = [];
		this.first_card = first_card;
		this.second_card = second_card;
		this.cards.push(first_card);
		this.cards.push(second_card);
	}

	get print_hand() {
		let html = '';
		for (var card of this.cards) {
			html += `
				<div>
					<span>${card.rank}</span>
					<span class="suit ${card.suit}"></span>
				</div>
			`
		}

		html += `
			<div class='count'>Card Count Total: ${this.total}</div>
		`

		html += this.bust_check;

		return html;
/*
		return `
			<div>
				<span>${this.cards[0].rank}</span>
				<span class="suit ${this.cards[0].suit}"></span>
			</div>
			<div>
				<span>${this.cards[1].rank}</span>
				<span class="suit ${this.cards[1].suit}"></span>
			</div>
		`*/
	}

	get total() {
		let total = 0;
		for (var card of this.cards) {
			if (card.rank == 'J' ||
				card.rank == 'Q' ||
				card.rank == 'K') {
				total += 10;
			} else if (card.rank == 'A') {
				total += 1;
			} else {
				total += parseInt(card.rank);
			}
		}

		return total;
	}


	get hit_me() {
		this.cards.push(deck.pop());
	}

	get bust_check() {
		const total = this.total;
		if (total > 21) {
			return `<div class='bust'>BUSTED!</div>`;
		}
		return '';
	}


}

let buildDeck = () => {
	// s = spade
	// c = club
	// d = diamond
	// h = heart

	let deck = [];
	let suits = ['spade', 'club', 'diamond', 'heart'];
	let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

	for (var rank of ranks) {
		for (var suit of suits) {
			deck.push(new Card(rank, suit));
		}
	}
/*
	deck.push(new Card(1, 'h'));
	deck.push(new Card(10, 'c'));
	deck.push(new Card(8, 's'));
*/
	return deck;
}



document.addEventListener("DOMContentLoaded",function(){
	deck = buildDeck();
    /*for (var card of deck) {
    	console.log(card);
    	document.getElementById('play').insertAdjacentHTML('beforeend', card.print);
    }*/
});

document.getElementById('shuffle').addEventListener("click",function(){
	shuffle(deck);
	document.getElementById('play').innerHTML = '';
    for (var card of deck) {
    	console.log(card);
    	document.getElementById('play').insertAdjacentHTML('beforeend', card.print);
    }
});

document.getElementById('start').addEventListener("click",function(){
	shuffle(deck);
	player_hand = new Hand(deck.pop(), deck.pop());
	document.getElementById('play_area').classList.remove('hidden');
	document.getElementById('player_hand').innerHTML = player_hand.print_hand;
	dealer_hand = new Hand(deck.pop(), deck.pop());
	document.getElementById('dealer_hand').innerHTML = dealer_hand.print_hand;
});

document.getElementById('hitme').addEventListener("click",function(){
	player_hand.hit_me;
	document.getElementById('player_hand').innerHTML = player_hand.print_hand;
});

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}