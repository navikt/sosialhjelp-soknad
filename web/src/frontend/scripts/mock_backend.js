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
	return {hei: 'hi', verden: 'world'};
}

router.get('/tekster', function (req, res) {
	res.json(lesSpraakfil())
});

app.use(allowCrossDomain);
app.use('/api', router);

app.listen(port);
console.log('Test API server running on port ' + port);
