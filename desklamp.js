var serialport = require("serialport");
var colors = require('colors');
var SerialPort = serialport.SerialPort;

var device = "/dev/tty.usbmodem1421";
var baudrate = 9600;

var Lamp; 

var r = 255, g = 255, b = 255;
var pulseInhale = false;

function connected() {
	console.log('Desklamp '.green + device.yellow + ' @ ' + baudrate.toString().blue + ' bps'.blue);

	Lamp.on('data', function(data) {
		console.info('∞ '.magenta + data);
	});
	setInterval(pulse, 50);
}

function setColor(red, green, blue) {
	Lamp.write(red + ',' + green + ',' + blue + '\n');
}

function pulse() {
	if(pulseInhale) {
		r+=5;
		g+=5;
		b+=5;
		if(r >= 255) pulseInhale = false;
	} else {
		r-=5;
		g-=5;
		b-=5;
		if(r <= 50) pulseInhale = true;
	}

	setColor(r, g, b);
}

exports.setColor = setColor;
exports.connect = function(callback) {
	Lamp = new SerialPort(device, {
		baudrate: baudrate,
		parser: serialport.parsers.readline("\n")
	})

	Lamp.on("open", function() {
		setTimeout(function() {
			connected();
			callback();
		}, 1000);
	});
};
