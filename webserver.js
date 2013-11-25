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

app.get('/color/:color', function(req, res) {
	console.dir(req.params);
	res.send(req.params)
	serialPort.write(req.params.color + '\n');
});

// EXPORTS

exports.start = function() {
	app.listen(3000);
	console.log('Express listening'.green + ' on ' + 'http://localhost:3000'.yellow);
}

