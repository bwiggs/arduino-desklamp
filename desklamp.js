var serialport = require("serialport");
var colors = require('colors');
var SerialPort = serialport.SerialPort;
var EventEmitter = require('events').EventEmitter;

/**
 * constructor function
 */
var DeskLamp = function() {

	var self = this;

	this.device = "/dev/tty.usbmodem1421";
	this.baudrate = 9600;
	this.serialPort;

	this.r;
	this.g;
	this.b;

	this.modes = [];

	this.on('color', function(r, g, b) {
		this.setColor(r, g, b);
	});

	this.on('on', function() {
		this.setColor(255, 255, 255);
	});

	this.on('off', function() {
		this.stop();
		this.setColor(0,0,0);
	});

	this.on('mode', function(name) {
		this.stop();
		this[name]();
	});
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
 * Initilize the DeskLamp, connects to the serial port.
 */
DeskLamp.prototype.connect = function (callback) {
	var self = this;

	this.serialPort = new SerialPort(this.device, {
		baudrate: this.baudrate,
		parser: serialport.parsers.readline("\n")
	});

	this.serialPort.on("open", function() {
		// need to wait for a second, who knows why.
		setTimeout(function() {
			self.connected();
			callback();
		}, 1300);
	});
};

/**
 * connected handler for when the serial connection is open.
 */
DeskLamp.prototype.connected = function() {
	console.log('DeskLamp '.green + this.device.yellow + ' @ ' + this.baudrate.toString().blue + ' bps'.blue);

	this.serialPort.on('data', function(data) {
		console.info('∞ '.magenta + data);
	});
};

/**
 * Sets the color of the leds
 */
DeskLamp.prototype.setColor = function(r, g, b) {
	//console.log(r.toString().red + ',' + g.toString().green + ',' + b.toString().blue);
	this.serialPort.write(r + ',' + g + ',' + b + '\n');
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
			self.emit('color',0,0,255)

		cycle = !cycle;
	}

	// toggles the speed of the lights every 10 flashes
	function intervalRunner() {

		speed = (speed == slow) ? fast : slow;

		return setInterval(function() {
			lights();
			iteration += 1;	

			if(iteration % 10 == 0) {
				self.stop();
				self.modes.push(intervalRunner());
				if(iteration == 100) { iteration = 0; }
			}
		}, speed)
	}
}

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

module.exports = new DeskLamp();
