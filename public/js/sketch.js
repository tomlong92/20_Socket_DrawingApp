/*

	Client-side Drawing Board

	p5 Hints
	========
	mouseIsPressed, mouseButton, LEFT, RIGHT
	http://p5js.org/reference/#/p5/mouseButton
*/

var socket = io();
console.log("A new client is trying to connect.");

var color;
var newMarker;
var newEraser;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	colorMode(HSB, 360, 100, 100);
	strokeCap(ROUND);

	newMarker = new Marker({h: random(0, 360), s: 100, b: 100}, 10);
	newEraser = new Marker({h: 0, s: 0, b: 0}, 50);
}

function draw() {
	if (mouseIsPressed) {
    	if (mouseButton === LEFT) {
    		var p1 = {x: pmouseX, y: pmouseY};
			var p2 = {x: mouseX, y: mouseY};
			newMarker.drawLine(p1, p2);
			socket.emit("player draw line", p1, p2, newMarker.stroke, newMarker.strokeWeight);
		}
		if (mouseButton === RIGHT) {
			var p1 = {x: pmouseX, y: pmouseY};
			var p2 = {x: mouseX, y: mouseY};
			newEraser.drawLine(p1, p2);
			socket.emit("player draw line", p1, p2, newEraser.stroke, newEraser.strokeWeight);
		}
	}
}

socket.on("other player draw line", function(p1, p2, stroke, strokeWeight) {
	var otherMarker = new Marker(stroke, strokeWeight);
	otherMarker.drawLine(p1, p2);
});

