/* eslint-disable */

const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const utils = require("./utils.js");
const path = require("path");
const fileUpload = require("express-fileupload");

app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(utils.delayAllResponses(500));
app.use(utils.allowCrossDomain);

const port = process.env.PORT || 3001;
const router = express.Router();

// Temp-lagring underveis
function settOpprineligSoknadTilSoknad() {
	const opprinneligSoknad = utils.lesMockDataFil("opprinneligSoknad.json");
	let soknad = utils.lesMockDataFil("soknad.json");
	soknad = JSON.parse(JSON.stringify(opprinneligSoknad));
	const fileName = utils.getFilePath("soknad.json");
	const soknadString = JSON.stringify(soknad);
	fs.writeFileSync(fileName, soknadString);
}
settOpprineligSoknadTilSoknad();

// Språkdata tjeneste /api/tekster
router.get("/informasjon/tekster", (req, res) => {
	res.json(utils.lesSpraakfil());
});

// Tilgang til søknadsskjema
router.get("/informasjon/utslagskriterier/sosialhjelp", (req, res) => {
	res.json({ harTilgang: true, sperrekode: "bruker" });
});

// Miljøvariabler
const miljovariabler = utils.lesMockDataFil("miljovariabler.json");
router.get("/informasjon/miljovariabler", (req, res) => {
	res.json(miljovariabler);
});

// Ekstrainformasjon - økonomiske opplysninger
const synligsoknadstruktur = utils.lesMockDataFil("synligsoknadstruktur.json");
router.get("/soknader/1000B7FGM/synligsoknadstruktur", (req, res) => {
	res.json(synligsoknadstruktur);
});

const brukerBehandlingId = "1000CPZ2U";
const soknad = utils.lesMockDataFil("soknad.json");

let fakta = soknad.fakta;

// Søknadsressurser
router.post("/soknader", (req, res) => {
	res.json({
		brukerBehandlingId
	});
});

// Hent ut søknad
// router.get("/soknader/:brukerBehandlingId?lang=nb_NO", (req, res) => {
// 	console.log("sss");
// });

const mockFeatures = {
	"feature.frontend.sosialhjelp.live": "true",
	"feature.frontend.sosialhjelp.personalia": "true",
	"feature.frontend.visvelgbosted": "true",
	"feature.frontend.arbeidsforhold": "true",
	"feature.frontend.ettersendvedlegg": "true"
};

router.get("/api/feature", (req, res) => {
	console.log("bruker mockFeatures");
	res.json(mockFeatures);
});

router.get("/soknader/:brukerBehandlingId", (req, res) => {
	console.log("Mock backend: GET soknader");
	console.log(req.headers.accept);
	if (req.headers.accept === "application/vnd.oppsummering+html") {
		console.log("Mock backend: oppsummering");
		res.send(utils.lesMockHtmlFil("oppsummering.html"));
	} else if (
		req.headers.accept === "application/vnd.kvitteringforinnsendtsoknad+json"
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

router.get("/soknader/:brukerBehandlingId/synligsoknadstruktur", (req, res) => {
	console.log("Mock backend: GET synligsoknadstruktur");
	res.json(utils.lesMockDataFil("synligsoknadstruktur.json"));
});

router.get("/soknader/:brukerBehandlingId/fakta", (req, res) => {
	console.log("Mock backend: GET fakta");
	res.json(fakta);
});

router.delete("/soknader/:brukerBehandlingId", (req, res) => {
	console.log("Mock backend: slett søknad");
	res.status(204); // 204 = "No content"
	res.json();
});

router.post("/soknader/:brukerBehandlingId/actions/send", (req, res) => {
	console.log("Mock backend: POST søknad");
	res.status(204); // 204 = "No content"
	res.send();
});

router.get("/fakta/:faktumId", (req, res) => {
	res.json(utils.hentFaktum(req.params.faktumId));
});

router.put("/fakta/:faktumId", (req, res) => {
	const faktum = req.body;
	fakta[utils.finnFaktaIndex(faktum.faktumId, fakta)] = faktum;
	utils.updateSoknadFakta(fakta);
	return res.json(utils.hentFaktum(faktum.faktumId, fakta));
});

router.post("/fakta/:faktumId", (req, res) => {
	const faktum = req.body;
	fakta.push(faktum);
	utils.updateSoknadFakta(fakta);
	return res.json(utils.hentFaktum(faktum.faktumId, fakta));
});

router.delete("/fakta/:faktumId", (req, res) => {
	fakta = fakta.filter(f => f.faktumId !== Number(req.params.faktumId));
	utils.updateSoknadFakta(fakta);
});

let faktumid = 1000;
function genererFaktumId() {
	return faktumid++;
}

router.post("/fakta", (req, res) => {
	if (req.query.behandlingsId) {
		console.log(
			`Mock backend: POST /fakta/?behandlingsId=${req.query.behandlingsId}`
		);
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

router.post("/informasjon/actions/logg", (req, res) => {
	console.log("Klient logget feil:");
	if (typeof req.body === "string") {
		console.log(req);
	} else {
		if (req.body && req.body.userAgent) {
			req.body.userAgent = `${req.body.userAgent.substr(0, 10)}...`;
		}
		console.log(JSON.stringify(req.body, null, 4));
	}
	res.status(204); // 204 = "No content"
	res.json();
});

app.use("/", router);

const vedleggRouter = require("./vedlegg_ressurser");

app.use("/", vedleggRouter);

app.listen(port);
console.log(`Mock API server running on port ${port}`);
