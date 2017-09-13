const fs = require("fs");
const path = require("path");

var exports = (module.exports = {});

exports.allowCrossDomain = function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.header("Access-Control-Allow-Headers", "Content-Type,X-XSRF-TOKEN");
	next();
};

exports.lesSpraakfil = function() {
	var directories = [
		"C:",
		"Temp",
		"sendsoknad",
		"utave",
		"soknadsosialhjelp",
		"tekster",
		"soknadsosialhjelp_nb_NO.properties"
	];
	var fileName = directories.join(path.sep);
	if (!fs.existsSync(fileName)) {
		console.log("Advarsel! Finner ikke språkfil i " + fileName);
		console.log("Bruker backup språkfil fra ./scripts/mock_data/ i stedet");
		directories = [
			".",
			"scripts",
			"mock_data",
			"soknadsosialhjelp_nb_NO.properties"
		];
		fileName = directories.join(path.sep);
		fileContent = fs.readFileSync(fileName, "utf8");
	} else {
		try {
			var fileContent = fs.readFileSync(fileName, "utf8");
		} catch (err) {}
	}

	var array = fileContent.split("\n");
	var output = {};
	for (i in array) {
		var line = array[i];
		var splitChar = line.indexOf("=");
		var key = line.substring(0, splitChar);
		var val = line.substring(splitChar + 1, line.length);
		if (val) {
			output[key] = val.replace("\r", "");
		}
	}
	return output;
};

exports.lesMockDataFil = function(filnavn) {
	var directories = [".", "scripts", "mock_data", filnavn];
	var fileName = directories.join(path.sep);
	if (!fs.existsSync(fileName)) {
		console.log("Advarsel! Finner mockdata fil " + fileName);
	} else {
		try {
			return JSON.parse(fs.readFileSync(fileName, "utf8"));
		} catch (err) {}
	}
};

exports.lesMockHtmlFil = function(filnavn) {
	var directories = [".", "scripts", "mock_data", filnavn];
	var fileName = directories.join(path.sep);
	console.log("Leser html mockdatafil");
	if (!fs.existsSync(fileName)) {
		console.log("Advarsel! Finner ikke mockdata htmlfil " + fileName);
	} else {
		try {
			return fs.readFileSync(fileName, "utf8");
		} catch (err) {}
	}
};

exports.delayAllResponses = function(millis) {
	return function(req, res, next) {
		setTimeout(next, millis);
	};
};

const finnFaktaIndex = function(faktaId, fakta) {
    for (var i = 0; i < fakta.length; i++) {
        if (faktaId.toString() === (fakta[i].faktumId && fakta[i].faktumId.toString())) {
            return i;
        }
    }
};

exports.finnFaktaIndex = finnFaktaIndex;

exports.hentFaktum = function(faktaId, fakta) {
	return fakta[finnFaktaIndex(faktaId, fakta)];
};
