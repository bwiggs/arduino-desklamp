var express = require('express');
var app = express();

// CONFIG

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.static(__dirname + '/public'));

// ROUTES

app.get('/', function(req, res) {
	res.send('<input type="color">');
});

app.get('/off', function(req, res) {
	LAMP.emit('off');
	res.send();
});

app.get('/on', function(req, res) {
	LAMP.emit('on');
	res.send();
});

app.get('/mode/:mode', function(req, res) {
	LAMP.emit('mode', req.params.mode);
	res.send();
});

app.get('/rgb/:color', function(req, res) {
	var rgb = req.params.color.split(',');
	if(rgb.length == 3) {
		LAMP.emit('color', rgb[0], rgb[1], rgb[2]);
	} else {
		res.send('Could not parse rgb value. Use: /rgb/[INT,INT,INT]');
	}
	res.send(rgb);
});

// EXPORTS

exports.start = function() {
	app.listen(3000);
	console.log('Express listening'.green + ' on ' + 'http://localhost:3000'.yellow);
}

