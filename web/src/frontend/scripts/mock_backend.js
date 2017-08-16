var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

var allowCrossDomain = function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
};

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var port = process.env.PORT || 3001;
var router = express.Router();

function lesSpraakfil() {
	var directories = ['C:', 'Temp', 'sendsoknad', 'utave',
		'soknadsosialhjelp', 'tekster',
		'soknadsosialhjelp_nb_NO.properties'];
	var fileName = directories.join(path.sep);
	try {
		var fileContent = fs.readFileSync(fileName, "utf8")
	} catch (err) {
		fileContent = "{}";
	}

	if (!fileContent) {
		console.log("Feil! Savner språkfil: " + fileName);
		process.exit(1);
	}
	var array = fileContent.split("\n");
	var output = {'nb': {}};
	for (i in array) {
		var line = array[i];
		var splitChar = line.indexOf("=");
		var key = line.substring(0, splitChar);
		var val = line.substring(splitChar + 1, line.length);
		if (val) {
			output.nb[key] = val.replace('\r', '')
		}
	}
	return output
}


router.get('/tekster', function (req, res) {
	res.json(lesSpraakfil())
});

app.use(allowCrossDomain);
app.use('/api', router);

app.listen(port);
console.log('Test API server running on port ' + port);
