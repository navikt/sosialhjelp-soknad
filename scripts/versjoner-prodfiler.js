var replace = require("replace");
var fsextra = require('fs-extra');

var outputDir = '../main/resources/webapp/';
var htmlFil = "soknadsosialhjelp.html";
var bygdHtmlfil = "soknadsosialhjelp-built.html";

fsextra.copy(outputDir + htmlFil, outputDir + bygdHtmlfil, function (err) {
	if (err) {
		return console.error(err);
	} else {
		console.log("kopiert " + htmlFil + " til " + bygdHtmlfil);

		replace({
			regex: "@version",
			replacement: new Date().getTime(),
			paths: [outputDir + bygdHtmlfil],
			recursive: false,
			silent: true
		});
	}
});
