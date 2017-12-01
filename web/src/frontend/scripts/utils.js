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

exports.getFilePath = function(filnavn) {
	var directories = [".", "scripts", "mock_data", filnavn];
	return directories.join(path.sep);
};

exports.lesMockDataFil = function(filnavn) {
	const fileName = this.getFilePath(filnavn);
	if (!fs.existsSync(fileName)) {
		console.log("Advarsel! Finner mockdata fil " + fileName);
	} else {
		try {
			return JSON.parse(fs.readFileSync(fileName, "utf8"));
		} catch (err) {}
	}
};

exports.lesMockHtmlFil = function(filnavn) {
	const fileName = this.getFilePath(filnavn);
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

exports.finnFaktaIndex = function(faktaId, fakta) {
	for (var i = 0; i < fakta.length; i++) {
		if (
			faktaId.toString() === (fakta[i].faktumId && fakta[i].faktumId.toString())
		) {
			return i;
		}
	}
};

exports.hentFaktum = function(faktaId, fakta) {
	return fakta[this.finnFaktaIndex(faktaId, fakta)];
};

exports.updateSoknadFakta = function(fakta) {
	const lagretSoknad = this.lesMockDataFil("soknad.json");
	const soknad = JSON.parse(JSON.stringify(lagretSoknad));
	soknad.fakta = fakta;
	const fileName = this.getFilePath("soknad.json");
	fs.writeFileSync(fileName, JSON.stringify(soknad, null, 4));
};

exports.checkMandatoryQueryParam = function(req, res, paramName) {
	var parameterVerdi = req.query[paramName];
	if (typeof parameterVerdi === "undefined") {
		var feilmelding = "Mangler query parameter: " + paramName;
		var responskode = 406;
		console.log("Returnerer feilmelding: " + responskode + ": " + feilmelding);
		res.status(responskode);
		res.json({ feil: feilmelding });
	}
};

exports.emptyDirectory = function(directory) {
	if (fs.existsSync(directory)) {
		fs.readdir(directory, function(err, files) {
			if (err) throw err;

			files.forEach(function(file) {
				fs.unlink(path.join(directory, file), function(err) {
					if (err) throw err;
				});
			});
		});
	}
};
