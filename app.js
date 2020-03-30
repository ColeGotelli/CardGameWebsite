var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/client/index.html');
});

http.listen(3000, function(){
	console.log('Server started');
});

var SOCKET_LIST = {};

io.on('connection', function(socket){

	socket.id = Math.random();
	socket.x = 0;
	socket.y = 0;
	socket.number = "" + Math.floor(10 * Math.random());

	SOCKET_LIST[socket.id] = socket;

	socket.on('disconnect', function(){
		delete SOCKET_LIST[socket.id];
	})

	console.log('A user connected');
});

setInterval(function() {
	var pack = [];
	for (var i in SOCKET_LIST) {
		var socket = SOCKET_LIST[i]
		socket.x++;
		socket.y++;
		pack.push({
			x:socket.x,
			y:socket.y,
			number:socket.number
		});
	};

	for (var i in SOCKET_LIST) {
		var socket = SOCKET_LIST[i]
		io.emit('newPosition', pack);
	};
	
},1000/25);