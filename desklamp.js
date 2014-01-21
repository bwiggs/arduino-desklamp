var colors = require('colors');
var EventEmitter = require('events').EventEmitter;

/**
 * constructor function
 */
var DeskLamp = function(device, onReady) {

	var self = this;

	this.modes = [];

	this.on('color', function(r, g, b) {
		device.setColor(r, g, b);
	});

	this.on('on', function() {
		device.setColor(255, 255, 255);
	});

	this.on('stop', function() {
		this.stop();
	});

	this.on('off', function() {
		this.stop();
		device.setColor(0,0,0);
	});

	this.on('mode', function(name) {
		this.stop();
		if(this[name] !== undefined) {
			this[name]();
		}
	});

	device.on('ready', function() {
		onReady();
	});
		
	device.connect();
};

/**
 * Event emmitter goodness!
 */
DeskLamp.prototype.__proto__ = EventEmitter.prototype;

/**
 * Kills any running modes
 */
DeskLamp.prototype.stop = function() {
	this.modes.forEach(function(mode) {
		clearInterval(mode);
	});
};

/**
 * Police lighting mode. Alternates red and blue at fast and slow speeds
 */
DeskLamp.prototype.police = function() {
	
	var self = this;

	var cycle = true;
	var iteration = 0;
	var fast = 250;
	var slow = 500;
	var speed;

	// kick off the animation
	this.modes.push(intervalRunner());

	// cycle the lights
	function lights() {
		cycle ?
			self.emit('color',255,0,0):
			self.emit('color',0,0,255);

		cycle = !cycle;
	}

	// toggles the speed of the lights every 10 flashes
	function intervalRunner() {

		speed = (speed == slow) ? fast : slow;

		return setInterval(function() {
			lights();
			iteration += 1;	

			if(iteration % 10 === 0) {
				self.stop();
				self.modes.push(intervalRunner());
				if(iteration == 100) { iteration = 0; }
			}
		}, speed);
	}
};

DeskLamp.prototype.macbook = function() {

	var self = this;
	var cycle = false;

	var r = 0, g = 0, b = 0;
	var delta = 2;
	var max = 255, min = 30;
	var speed = 30;

	this.modes.push(setInterval(function() {
		if(cycle) {
			r+=delta;
			g+=delta;
			b+=delta;
			if(r >= max) cycle = false;
		} else {
			r-=delta;
			g-=delta;
			b-=delta;
			if(r <= min) cycle = true;
		}

		self.emit('color', r, g, b);
	}, speed));
};

DeskLamp.prototype.romantic = function() {
	this.emit('color', 255, 0, 200);
};


module.exports = DeskLamp;
