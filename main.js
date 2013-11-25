GLOBAL.DeskLamp = require('./desklamp');
var WebServer = require('./webserver');

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

DeskLamp.connect(function() {
	DeskLamp.emit('on');
	WebServer.start();
});


