var EventEmitter = require('events').EventEmitter;

var ConsoleLamp = function() {
};

ConsoleLamp.prototype.__proto__ = EventEmitter.prototype;

ConsoleLamp.prototype.connect = function() {
	this.emit('ready');
};

ConsoleLamp.prototype.setColor = function(r, g, b) {
	console.log(r.toString().red + ',' + g.toString().green + ',' + b.toString().blue);
};

module.exports = ConsoleLamp;
