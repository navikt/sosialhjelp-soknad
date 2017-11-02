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

// Tilgang til søknadsskjema
router.get("/informasjon/utslagskriterier/adresse", function(req, res) {
	res.json({ pilotSosialhjelp: true });
});

// Miljøvariabler
const miljovariabler = utils.lesMockDataFil("miljovariabler.json");
router.get("/informasjon/miljovariabler", function(req, res) {
	res.json(miljovariabler);
});

// Ekstrainformasjon - økonomiske opplysninger
const synligsoknadstruktur = utils.lesMockDataFil("synligsoknadstruktur.json");
router.get("/soknader/1000B7K33/synligsoknadstruktur", function(req, res) {
	res.json(synligsoknadstruktur);
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

// Hent ut søknad
router.get("/soknader/:brukerBehandlingId?lang=nb_NO", function(req, res) {
	console.log("sss");
});

router.get("/soknader/:brukerBehandlingId", function(req, res) {
	console.log("Mock backend: get soknader");
	console.log(req.headers["accept"]);
	if (req.headers["accept"] === "application/vnd.oppsummering+html") {
		console.log("Mock backend: oppsummering");
		res.send(utils.lesMockHtmlFil("oppsummering.html"));
	} else if (
		req.headers["accept"] === "application/vnd.kvitteringforinnsendtsoknad+json"
	) {
		console.log("Mock backend: kvittering");
		res.json(utils.lesMockDataFil("kvittering.json"));
	} else {
		console.log("Mock backend: søknad");
		if (req.accepts("application/json")) {
			res.json(utils.lesMockDataFil("soknad.json"));
		} else {
			res.status(406);
			res.json({ feil: "Forventer Accept: application/json i header" });
		}
	}
});

router.get("/soknader/:brukerBehandlingId/fakta", function(req, res) {
	console.log("Mock backend: get fakta");
	res.json(fakta);
});

router.delete("/soknader/:brukerBehandlingId", function(req, res) {
	console.log("Mock backend: slett søknad");
	res.status(204); // 204 = "No content"
	res.json();
});

router.post("/soknader/:brukerBehandlingId/actions/send", function(req, res) {
	console.log("Mock backend: send søknad");
	res.status(204); // 204 = "No content"
	res.send();
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

router.delete("/fakta/:faktumId", function(req, res) {
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

router.post("/actions/logg", function(req, res) {
	console.log("Klient logget feil:");
	if (typeof req.body === "string") {
		console.log(req);
	} else {
		req.body.userAgent = req.body.userAgent.substr(0, 10) + "...";
		console.log(JSON.stringify(req.body, null, 4));
	}

	res.status(204); // 204 = "No content"
	res.json();
});

app.use("/", router);

app.listen(port);
console.log("Mock API server running on port " + port);
