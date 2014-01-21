var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

var SerialDevice = function() {
	this.device = "/dev/tty.usbmodem1421";
	this.baudrate = 9600;
	this.serialPort = null;
};


/**
 * Initilize the SerialDevice
 */
SerialDevice.prototype.connect = function (callback) {
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
SerialDevice.prototype.connected = function() {
	console.log('DeskLamp '.green + this.device.yellow + ' @ ' + this.baudrate.toString().blue + ' bps'.blue);

	this.serialPort.on('data', function(data) {
		console.info('∞ '.magenta + data);
	});
};

/**
 * Sets the color of the leds
 */
SerialDevice.prototype.setColor = function(r, g, b) {
	//console.log(r.toString().red + ',' + g.toString().green + ',' + b.toString().blue);
	this.serialPort.write(r + ',' + g + ',' + b + '\n');
};

module.exports = SerialDevice;
