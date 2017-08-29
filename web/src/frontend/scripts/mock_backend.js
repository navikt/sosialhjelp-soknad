var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const utils = require('./utils.js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var port = process.env.PORT || 3001;
var router = express.Router();

// Språkdata tjeneste /api/tekster
router.get('/tekster', function (req, res) {
	res.json(utils.lesSpraakfil())
});

const brukerBehandlingId = "1000B8FNi";

router.post('/soknader', function (req, res) {
	res.json({
		"brukerBehandlingId": brukerBehandlingId
	})
});

router.get('/soknader/:brukerBehandlingId/fakta', function (req, res) {
	res.json(utils.lesMockDataFil('fakta.json'));
});

app.use(utils.allowCrossDomain);
app.use('/informasjon', router);

app.listen(port);
console.log('Test API server running on port ' + port);
