var replace = require("replace");
var fsextra = require('fs-extra');

var outputDir = '../main/webapp/';

fsextra.copy(outputDir + 'ny-index.html', outputDir + 'ny-indexBuilt.html', function (err) {
	if (err) {
		return console.error(err);
	} else {
		console.log("kopiert ny-index.html til indexBuilt.html");

		replace({
			regex: "@version",
			replacement: new Date().getTime(),
			paths: [outputDir + 'ny-indexBuilt.html'],
			recursive: false,
			silent: true,
		});
	}
});
