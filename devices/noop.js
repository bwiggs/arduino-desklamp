var EventEmitter = require('events').EventEmitter;

var Noop = function() {};

Noop.prototype.__proto__ = EventEmitter.prototype;

Noop.prototype.connect = function() {
	this.emit('ready');
};

Noop.prototype.setColor = function(){};

module.exports = Noop;

