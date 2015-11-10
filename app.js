/*
	The server relays drawing messages between all the connected clients.
*/

// Setup
var path = require("path");
var express = require("express");
var app = express();

// Serve static files (public/) with express
var publicPath = path.join(__dirname, "public");
var staticServer = express.static(publicPath);
app.use(staticServer);

// Start express server and piggyback socket.io connection over the same server
var port = process.env.PORT || 8080;
var server = app.listen(port);
var io = require("socket.io")(server);

// Real time communication
var history = [];
io.on("connection", function (socket) {
	// Socket is a connection to a specific client
	console.log("a user connected");
	socket.emit("draw history", history);

	socket.on("request history", function () {
		socket.emit("draw history", history);
	});

	// When a client draws, notify all other clients
	socket.on("player draw line", function(drawData) {
		socket.broadcast.emit("other player draw line", drawData);	
		history.push(drawData);
	});

	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
});
