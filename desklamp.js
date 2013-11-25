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
};

/**
 * Event emmitter goodness!
 */
DeskLamp.prototype.__proto__ = EventEmitter.prototype;

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
		}, 1000);
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
	this.serialPort.write(r + ',' + g + ',' + b + '\n');
};

module.exports = new DeskLamp();

//function pulse() {
	//if(pulseInhale) {
		//r+=5;
		//g+=5;
		//b+=5;
		//if(r >= 255) pulseInhale = false;
	//} else {
		//r-=5;
		//g-=5;
		//b-=5;
		//if(r <= 50) pulseInhale = true;
	//}

	//setColor(r, g, b);
//}
