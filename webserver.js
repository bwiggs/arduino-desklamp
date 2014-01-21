var express = require('express');
var app = express();

// CONFIG

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.static(__dirname + '/public'));

// ROUTES

app.get('/', function(req, res) {
	res.render('index.ejs');	
});

app.get('/api/off', function(req, res) {
	LAMP.emit('off');
	res.send();
});

app.get('/api/on', function(req, res) {
	LAMP.emit('on');
	res.send();
});

app.get('/api/mode/:mode', function(req, res) {
	LAMP.emit('mode', req.params.mode);
	res.send();
});

app.get('/api/rgb/:color', function(req, res) {
	LAMP.emit('stop');
	var rgb = req.params.color.split(',');
	if(rgb.length == 3) {
		LAMP.emit('color', rgb[0], rgb[1], rgb[2]);
	} else {
		res.send('Could not parse rgb value. Use: /rgb/[INT,INT,INT]');
	}
	res.send(rgb);
});

app.get('/api/events', function(req, res) {
	req.socket.setTimeout(Infinity);

	//res.write("data: " + message + '\n\n'); // Note the extra newline
	LAMP.on('color', function(r, g, b) {
		res.write("data: "+r+","+g+","+b+"\n\n");
	});


		//res.write("data: " + message + '\n\n'); // Note the extra newline
	LAMP.on('on', function() {
		res.write("data: 255,255,255\n\n");
	});

	LAMP.on('off', function() {
		res.write("data: 0,0,0\n\n");
	});

	res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
	res.write('\n');
});

app.get('/lamp', function(req, res) {
	res.render('lamp.ejs');	
});

// EXPORTS

exports.start = function() {
	app.listen(3000);
	console.log('Express listening'.green + ' on ' + 'http://localhost:3000'.yellow);
};

