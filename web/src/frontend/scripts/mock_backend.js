var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const utils = require("./utils.js");
const fs = require("fs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(utils.delayAllResponses(2000));
app.use(utils.allowCrossDomain);

var port = process.env.PORT || 3001;
var router = express.Router();

function settOpprineligeFaktaTilFakta() {
	const opprinneligeFakta = utils.lesMockDataFil("opprinneligFakta.json");
	var fakta = utils.lesMockDataFil("fakta.json");

	fakta = JSON.parse(JSON.stringify(opprinneligeFakta));

	const fileName = utils.getFilePath("fakta.json");
	fs.writeFile(fileName, JSON.stringify(fakta), function(err) {
		if (err) return console.log(err);
		console.log("Setter opprinneligeFakta til fakta");
	});
}
settOpprineligeFaktaTilFakta();

// Språkdata tjeneste /api/tekster
router.get("/informasjon/tekster", function(req, res) {
	res.json(utils.lesSpraakfil());
});

const brukerBehandlingId = "1000B7FGM";

// Søknadsressurser
router.post("/soknader", function(req, res) {
	res.json({
		brukerBehandlingId: brukerBehandlingId
	});
});

router.get("/soknader/:brukerBehandlingId", function(req, res) {
	if (req.accepts("application/json")) {
		const soknad = utils.lesMockDataFil("soknad.json");
		soknad.fakta = utils.lesMockDataFil("fakta.json");

		console.log("get soknader");
		res.json(soknad);
	} else {
		res.status(406);
		res.json({ feil: "Forventer Accept: application/json i header" });
	}
});

router.get("/soknader/:brukerBehandlingId/oppsummering", function(req, res) {
	res.send(utils.lesMockHtmlFil("oppsummering.html"));
});

router.get("/soknader/:brukerBehandlingId/fakta", function(req, res) {
	console.log("get fakta");
	var fakta = utils.lesMockDataFil("fakta.json");
	res.json(fakta);
});

router.get("/fakta/:faktumId", function(req, res) {
	console.log("get faktum");
	const fakta = utils.lesMockDataFil("fakta.json");
	res.json(utils.hentFaktum(req.params.faktumId, fakta));
});

router.put("/fakta/:faktumId", function(req, res) {
	const fakta = utils.lesMockDataFil("fakta.json");
	const faktum = req.body;
	fakta[utils.finnFaktaIndex(faktum.faktumId, fakta)] = faktum;
	return oppdaterFaktum(faktum, res, fakta, "put");
});

router.post("/fakta/:faktumId", function(req, res) {
	const fakta = utils.lesMockDataFil("fakta.json");
	const faktum = req.body;
	fakta.push(faktum);
	return oppdaterFaktum(faktum, res, fakta, "post");
});

function oppdaterFaktum(faktum, res, fakta, metode) {
	const fileName = utils.getFilePath("fakta.json");
	fs.writeFile(fileName, JSON.stringify(fakta), function(err) {
		if (err) return console.log(err);

		console.log(metode + " faktum ", faktum.key, faktum.value);
	});
	return res.json(utils.hentFaktum(faktum.faktumId, fakta));
}

app.use("/", router);

app.listen(port);
console.log("Mock API server running on port " + port);
