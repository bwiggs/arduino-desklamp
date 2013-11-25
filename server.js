var colors = require('colors');
var express = require('express');
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
console.log("---------------------------------------------------");
console.log(" Author: Brian Wigginton - brianwiggintongmail.com ");
console.log("---------------------------------------------------");
console.log();

var app;

var device = "/dev/tty.usbmodem1421";
var baudrate = 9600;

var serialPort = new SerialPort(device, {
	baudrate: baudrate,
	parser: serialport.parsers.readline("\n")
})

serialPort.on("open", function() {
	setTimeout(connected, 1000);
});


var r = 255, g = 255, b = 255;

function connected() {
	console.log('Serial Device '.green + device.yellow + ' @ ' + baudrate.toString().blue + ' bps'.blue);
	startServer();
	console.log();

	serialPort.on('data', function(data) {
		console.info('∞ '.magenta + data);
	});
	setInterval(pulse, 50);
}

function startServer() {
	app = express();
	
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.logger('dev'));
	app.use(express.static(__dirname + '/public'));

	app.get('/', function(req, res) {
		res.send('<input type="color">');
	});
	
	app.listen(3000);
	console.log('Express listening'.green + ' on ' + 'http://localhost:3000'.yellow);
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


