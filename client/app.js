var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
	console.log('Server started');
});
http.on('error', (err) => {
	console.error('Server error:', err);
});



var SOCKET_LIST = {};
var PLAYER_LIST = {};
var count = 1;




//Player Class
var Player = function(id) {
	var self = {
		x:250,
		y:250,
		id:id,
		number:id
	}
	return self;
}


//Connection function
io.on('connection', function(socket){

	socket.id = count;
	count++;
	SOCKET_LIST[socket.id] = socket;

	var player = Player(socket.id);
	PLAYER_LIST[socket.id] = player;

	socket.on('disconnect', function(){
		delete SOCKET_LIST[socket.id];
		delete PLAYER_LIST[socket.id];
	})

	console.log('A user connected');
});


setInterval(function() {
	var pack = [];
	for (var i in PLAYER_LIST) {
		var player = PLAYER_LIST[i]
		player.x++;
		player.y++;
		pack.push({
			x:player.x,
			y:player.y,
			number:player.number
		});
	};

	for (var i in SOCKET_LIST) {
		var socket = SOCKET_LIST[i]
		io.emit('newPosition', pack);
	};
	
},1000/25);





//Deck Class
var cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
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

//window.onload = load;







