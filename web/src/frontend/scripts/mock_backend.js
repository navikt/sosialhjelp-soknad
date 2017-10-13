var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const fs = require("fs");
const utils = require("./utils.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(utils.delayAllResponses(500));
app.use(utils.allowCrossDomain);

var port = process.env.PORT || 3001;
var router = express.Router();

// Temp-lagring underveis
function settOpprineligSoknadTilSoknad() {
	const opprinneligSoknad = utils.lesMockDataFil("opprinneligSoknad.json");
	var soknad = utils.lesMockDataFil("soknad.json");

	soknad = JSON.parse(JSON.stringify(opprinneligSoknad));

	const fileName = utils.getFilePath("soknad.json");
	const soknadString = JSON.stringify(soknad);
	fs.writeFileSync(fileName, soknadString);
}
settOpprineligSoknadTilSoknad();

// Språkdata tjeneste /api/tekster
router.get("/informasjon/tekster", function(req, res) {
	res.json(utils.lesSpraakfil());
});

const brukerBehandlingId = "1000B7FGM";
const soknad = utils.lesMockDataFil("soknad.json");
var fakta = soknad.fakta;

// Søknadsressurser
router.post("/soknader", function(req, res) {
	res.json({
		brukerBehandlingId: brukerBehandlingId
	});
});

router.get("/soknader/:brukerBehandlingId", function(req, res) {
	console.log("get soknader");
	if (req.headers["accept"] === "application/vnd.oppsummering+html") {
		res.send(utils.lesMockHtmlFil("oppsummering.html"));
	} else {
		if (req.accepts("application/json")) {
			res.json(utils.lesMockDataFil("soknad.json"));
		} else {
			res.status(406);
			res.json({ feil: "Forventer Accept: application/json i header" });
		}
	}
});

router.get("/soknader/:brukerBehandlingId/oppsummering", function(req, res) {
	res.send(utils.lesMockHtmlFil("oppsummering.html"));
});

router.get("/soknader/:brukerBehandlingId/fakta", function(req, res) {
	console.log("get fakta");
	res.json(fakta);
});

router.delete("/soknader/:brukerBehandlingId", function(req, res) {
	console.log("slett søknad");
});

router.get("/fakta/:faktumId", function(req, res) {
	res.json(utils.hentFaktum(req.params.faktumId));
});

router.put("/fakta/:faktumId", function(req, res) {
	const faktum = req.body;
	fakta[utils.finnFaktaIndex(faktum.faktumId, fakta)] = faktum;
	utils.updateSoknadFakta(fakta);
	return res.json(utils.hentFaktum(faktum.faktumId, fakta));
});

router.post("/fakta/:faktumId", function(req, res) {
	const faktum = req.body;
	fakta.push(faktum);
	utils.updateSoknadFakta(fakta);
	return res.json(utils.hentFaktum(faktum.faktumId, fakta));
});

router.delete("/fakta/:faktumId", function (req, res) {
	 fakta = fakta.filter(function(f) {
		return f.faktumId !== Number(req.params.faktumId);
	});
	utils.updateSoknadFakta(fakta);
	return;
});

var faktumid = 1000;
function genererFaktumId() {
	return faktumid++;
}

router.post("/fakta", function(req, res) {
	if (req.param("behandlingsId")) {
		const faktum = req.body;
		faktum.faktumId = genererFaktumId();
		faktum.properties = {};
		fakta.push(faktum);
		utils.updateSoknadFakta(fakta);
		return res.json(faktum);
	}

	const faktum = req.body;
	fakta.push(faktum);
	return res.json(utils.hentFaktum(faktum.faktumId, fakta));
});

app.use("/", router);

app.listen(port);
console.log("Mock API server running on port " + port);
