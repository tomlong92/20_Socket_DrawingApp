
function Marker (stroke, strokeWeight) {
	this.stroke = stroke;
	this.strokeWeight = strokeWeight;
}

Marker.prototype.drawLine = function(p1, p2) {
	stroke(this.stroke.h, this.stroke.s, this.stroke.b);
	strokeWeight(this.strokeWeight);
	line(p1.x, p1.y, p2.x, p2.y);
};
