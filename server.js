var colors = require('colors');
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var util = require('util');

console.log();
console.log("  ____            _    _                          ");
console.log(" |  _ \\  ___  ___| | _| |    __ _ _ __ ___  _ __  ");
console.log(" | | | |/ _ \\/ __| |/ / |   / _` | '_ ` _ \\| '_ \\ ");
console.log(" | |_| |  __/\\__ \\   <| |__| (_| | | | | | | |_) |");
console.log(" |____/ \\___||___/_|\\_\\_____\\__,_|_| |_| |_| .__/ ");
console.log("                                           |_|    ");
console.log("                                                  ");
console.log("--------------------------------------------------");
console.log(" Author: Brian Wigginton - brianwiggintongmail.com");
console.log("--------------------------------------------------");
console.log();

// TODO: make this dynamic, if there's only one option use it, otherwise
// prompt for the user to choose a device
var device = "/dev/tty.usbmodem1421";
var baudrate = 9600;

var serialPort = new SerialPort(device, {
	baudrate: baudrate,
	parser: serialport.parsers.readline("\n")
});

serialPort.on("open", function() {
	setTimeout(connected, 1000);
});


var r = 255, g = 255, b = 255;

function connected() {
	console.log('Opened '.green + device.yellow + ' @ ' + baudrate.toString().blue + ' bps'.blue);
	console.log();

	serialPort.on('data', function(data) {
		console.info('∞ '.magenta + data);
	});
	setInterval(pulse, 50);
}

function colorize() {
	serialPort.write(r + ',' + g + ',' + b + '\n');
}

pulseInhale = false;

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

	serialPort.write(r + ',' + g + ',' + b + '\n');
}


