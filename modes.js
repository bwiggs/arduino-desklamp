var fs = require('fs');
var path_module = require('path');

var DIR = path_module.join(__dirname, 'modes');

var module_holder = {};

LoadModules(DIR);

function LoadModules(path) {
	fs.lstat(path, function(err, stat) {
		if (stat.isDirectory()) {
			// we have a directory: do a tree walk
			fs.readdir(path, function(err, files) {
				var f, l = files.length;
				for (var i = 0; i < l; i++) {
					f = path_module.join(path, files[i]);
					LoadModules(f);
				}
			});
		} else {
			// we have a file: load it
			var a = require(path);
			console.dir(a);
			var b = a(module_holder);
			console.dir(b);
		}
	});
}

exports.module = module_holder;
