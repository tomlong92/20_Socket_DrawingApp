/*
	Server - the lazy foreman

	The server doesn't do any drawing itself.  It just relays drawing messages
	between all the connected clients.
*/

var express = require("express");
var app = express();

var path = require("path");
var publicPath = path.join(__dirname, "public");
var staticServer = express.static(publicPath);
app.use(staticServer);

var port = process.env.PORT || 8080;
var server = app.listen(8080);
var io = require("socket.io")(server);

io.on("connection", function(socket) {
	console.log("A new user connected!");

	socket.on("player draw line", function(p1, p2, stroke, strokeWeight) {
		console.log("Player draw line message received from a client!");
		socket.broadcast.emit("other player draw line", p1, p2, stroke, strokeWeight);
	});

	socket.on("disconnect", function() {
		console.log("user disconnected");
	});
});