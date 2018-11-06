'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var deck;
var player_hand;
var dealer_hand;

var Card = function () {
	function Card(rank, suit) {
		_classCallCheck(this, Card);

		this.rank = rank;
		this.suit = suit;
	}

	_createClass(Card, [{
		key: 'print',
		get: function get() {
			var card = '' + this.rank + this.suit;
			return '<div>' + card + '</div>';
		}
	}]);

	return Card;
}();

var Hand = function () {
	function Hand(first_card, second_card) {
		_classCallCheck(this, Hand);

		this.cards = [];
		this.first_card = first_card;
		this.second_card = second_card;
		this.cards.push(first_card);
		this.cards.push(second_card);
	}

	_createClass(Hand, [{
		key: 'print_hand',
		get: function get() {
			var html = '';
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.cards[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var card = _step.value;

					html += '\n\t\t\t\t<div>\n\t\t\t\t\t<span>' + card.rank + '</span>\n\t\t\t\t\t<span class="suit ' + card.suit + '"></span>\n\t\t\t\t</div>\n\t\t\t';
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			html += '\n\t\t\t<div class=\'count\'>Card Count Total: ' + this.total + '</div>\n\t\t';

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
	}, {
		key: 'total',
		get: function get() {
			var total = 0;
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = this.cards[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var card = _step2.value;

					if (card.rank == 'J' || card.rank == 'Q' || card.rank == 'K') {
						total += 10;
					} else if (card.rank == 'A') {
						total += 1;
					} else {
						total += parseInt(card.rank);
					}
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			return total;
		}
	}, {
		key: 'hit_me',
		get: function get() {
			this.cards.push(deck.pop());
		}
	}]);

	return Hand;
}();

var buildDeck = function buildDeck() {
	// s = spade
	// c = club
	// d = diamond
	// h = heart

	var deck = [];
	var suits = ['spade', 'club', 'diamond', 'heart'];
	var ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

	var _iteratorNormalCompletion3 = true;
	var _didIteratorError3 = false;
	var _iteratorError3 = undefined;

	try {
		for (var _iterator3 = ranks[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
			var rank = _step3.value;
			var _iteratorNormalCompletion4 = true;
			var _didIteratorError4 = false;
			var _iteratorError4 = undefined;

			try {
				for (var _iterator4 = suits[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
					var suit = _step4.value;

					deck.push(new Card(rank, suit));
				}
			} catch (err) {
				_didIteratorError4 = true;
				_iteratorError4 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion4 && _iterator4.return) {
						_iterator4.return();
					}
				} finally {
					if (_didIteratorError4) {
						throw _iteratorError4;
					}
				}
			}
		}
		/*
  	deck.push(new Card(1, 'h'));
  	deck.push(new Card(10, 'c'));
  	deck.push(new Card(8, 's'));
  */
	} catch (err) {
		_didIteratorError3 = true;
		_iteratorError3 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion3 && _iterator3.return) {
				_iterator3.return();
			}
		} finally {
			if (_didIteratorError3) {
				throw _iteratorError3;
			}
		}
	}

	return deck;
};

document.addEventListener("DOMContentLoaded", function () {
	deck = buildDeck();
	/*for (var card of deck) {
 	console.log(card);
 	document.getElementById('play').insertAdjacentHTML('beforeend', card.print);
 }*/
});

document.getElementById('shuffle').addEventListener("click", function () {
	shuffle(deck);
	document.getElementById('play').innerHTML = '';
	var _iteratorNormalCompletion5 = true;
	var _didIteratorError5 = false;
	var _iteratorError5 = undefined;

	try {
		for (var _iterator5 = deck[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
			var card = _step5.value;

			console.log(card);
			document.getElementById('play').insertAdjacentHTML('beforeend', card.print);
		}
	} catch (err) {
		_didIteratorError5 = true;
		_iteratorError5 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion5 && _iterator5.return) {
				_iterator5.return();
			}
		} finally {
			if (_didIteratorError5) {
				throw _iteratorError5;
			}
		}
	}
});

document.getElementById('start').addEventListener("click", function () {
	shuffle(deck);
	player_hand = new Hand(deck.pop(), deck.pop());
	document.getElementById('player_hand').innerHTML = player_hand.print_hand;
	dealer_hand = new Hand(deck.pop(), deck.pop());
	document.getElementById('dealer_hand').innerHTML = dealer_hand.print_hand;
});

document.getElementById('hitme').addEventListener("click", function () {
	player_hand.hit_me;
	document.getElementById('player_hand').innerHTML = player_hand.print_hand;
});

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
	for (var i = a.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var _ref = [a[j], a[i]];
		a[i] = _ref[0];
		a[j] = _ref[1];
	}
	return a;
}
