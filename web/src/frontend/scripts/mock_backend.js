var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const utils = require('./utils.js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var port = process.env.PORT || 3001;
var router = express.Router();

// Språkerdata tjeneste /api/tekster
router.get('/tekster', function (req, res) {
	res.json(utils.lesSpraakfil())
});

app.use(utils.allowCrossDomain);
app.use('/informasjon', router);

app.listen(port);
console.log('Test API server running on port ' + port);
