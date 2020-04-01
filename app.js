var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var Deck = require('./client/decklib.js');

app.get('/', function(req, res){
	res.sendFile(__dirname + '/client/index.html');
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
var deck = new Deck()

deck.generateDeck();
deck.shuffle();


//Player Class
var Player = function(id) {
	console.log(deck.dealCard());
	var card = deck.dealHand(5);
	var hand = '';
	for(var i = 0; i < card.length; ++i) {
		hand = hand + ', ' + card[i].name;
	}
	var self = {
		x:30,
		y:50,
		id:id,
		number:id,
		card:hand
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
		console.log('User ' + socket.id + ' disconnected');
	})

	console.log('User ' + socket.id + ' connected');
});


setInterval(function() {
	var pack = [];
	for (var i in PLAYER_LIST) {
		var player = PLAYER_LIST[i]
		pack.push({
			x:player.x,
			y:player.y * player.number,
			number:player.number,
			card:player.card
		});
	};

	for (var i in SOCKET_LIST) {
		var socket = SOCKET_LIST[i]
		io.emit('newPosition', pack);
	};
	
},1000/25);






