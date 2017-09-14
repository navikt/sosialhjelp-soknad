var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const utils = require("./utils.js");
const fs = require('fs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use(utils.delayAllResponses(2000));
app.use(utils.allowCrossDomain);

var port = process.env.PORT || 3001;
var router = express.Router();

// Språkdata tjeneste /api/tekster
router.get('/informasjon/tekster', function (req, res) {
    res.json(utils.lesSpraakfil())
});

const brukerBehandlingId = "1000B7FGM";
const soknad = utils.lesMockDataFil("soknad.json");
const fakta = soknad.fakta;

// Søknadsressurser
router.post("/soknader", function (req, res) {
    res.json({
        brukerBehandlingId: brukerBehandlingId
    });
});

router.get("/soknader/:brukerBehandlingId", function (req, res) {
    if(req.accepts('application/json') ) {
    	console.log("get soknader");
        res.json(soknad);
    } else {
        res.status(406);
        res.json({feil: "Forventer Accept: application/json i header"});
    }
});

router.get("/soknader/:brukerBehandlingId/oppsummering", function (req, res) {
    res.send(utils.lesMockHtmlFil("oppsummering.html"));
});

router.get("/soknader/:brukerBehandlingId/fakta", function (req, res) {
	console.log("get fakta");
	res.json(fakta);
});

router.get("/fakta/:faktumId", function (req, res) {
	console.log("get faktum");
	res.json(utils.hentFaktum(req.params.faktumId));
});

router.put("/fakta/:faktumId", function (req, res) {
	const faktum = req.body;
	fakta[utils.finnFaktaIndex(faktum.faktumId, fakta)] = faktum;
	return res.json(utils.hentFaktum(faktum.faktumId, fakta));
});

router.post("/fakta/:faktumId", function (req, res) {
	const faktum = req.body;
	fakta.push(faktum);
	return res.json(utils.hentFaktum(faktum.faktumId, fakta));
});

app.use('/', router);

app.listen(port);
console.log("Mock API server running on port " + port);
