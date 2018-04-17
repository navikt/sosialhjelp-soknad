var express = require("express");
const path = require("path");
var router = express.Router();
const utils = require("./utils.js");
const fs = require("fs");
var mime = require("mime");
var rimraf = require('rimraf');

/*
 * Mock backend: REST ressurser for ettersendelse av vedlegg
 *
 */

const { nyBehandlingsId, brukerBehandlingId } = require("./testdata");

// Opprett ny søknad for å ettersende vedlegg
router.post("/soknader", function(req, res) {
	if (req.query.ettersendTil) {
		console.log(`Mock backend: POST /soknader?ettersendTil=${req.query.ettersendTil}`);
		res.json({"status": "ok", "brukerBehandlingId": nyBehandlingsId});
	} else {
		res.json({brukerBehandlingId: brukerBehandlingId});
	}
});

// Initielle tilfeldige data for å ha noe å vise på siden unswe utvikling:
var ettersendteVedlegg = [
	{
		vedleggId: 498,
		innsendingsvalg: "LastetOpp/VedleggKreves",
		skjemaNummer: "lonnslipp",
		skjemanummerTillegg: "arbeid",
		filer: []
		// filer: [ {
		// 	filId: 1,
		// 	filnavn: "en fil.png"
		// } ]
	},
	{
		vedleggId: 700,
		innsendingsvalg: "LastetOpp/VedleggKreves",
		skjemaNummer: "faktura",
		skjemanummerTillegg: "husleie",
		filer: []
	},
	{
		vedleggId: 990,
		innsendingsvalg: "LastetOpp",
		skjemaNummer: "annet",
		skjemanummerTillegg: "annet",
		filer: []
	}
];

// Liste over vedlegg, status og evt allerede opplastede filer
router.get("/ettersendelsevedlegg/:behandlingsId", function(req, res) {
	res.json(ettersendteVedlegg);
});

var DATA_DIR = "./scripts/mock_data";
var filId = 1;

// Create dir if not exists:
function createDir(dir) {
	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}
}

rimraf(DATA_DIR + "/vedlegg_*", function () { console.log("*Sletter tidligere vedleggfiler*"); });

router.post("/ettersendelsevedlegg/vedlegg/:vedleggId", function(req, res) {
	console.log("Mock backend: POST ettersendt vedlegg (enkelt fil)");
	var vedleggId = req.params.vedleggId;
	var files = [];

	// Hent ut filnavn og generer løpenummer for fil id
	Object.keys(req.files).forEach(function(file) {
		filId = filId + 1;
		var filename = req.files[file].name;
		files.push({navn: filename});
		createDir(DATA_DIR + "/vedlegg_" + vedleggId);
		createDir(DATA_DIR + "/vedlegg_" + vedleggId + "/" + filId);

		var outputFilename = DATA_DIR + "/vedlegg_" + vedleggId + "/" + filId + "/" + filename;
		req.files[file].mv(outputFilename, function (err) {
			if (err) {
				console.log("Warning: " + err);
			} else {
				console.log("  Lagret: 'mock_data/vedlegg_" + vedleggId + "/" + filId + "/" + filename);
			}
		});

		for (let vedlegg of ettersendteVedlegg) {
			if (vedlegg.vedleggId == vedleggId) {
				vedlegg.filer.push({filId: filId, filnavn: filename});
			}
		}
	});

	const responseDelayInSeconds = 2;
	setTimeout((function() {
		res.json(ettersendteVedlegg);
	}), responseDelayInSeconds * 1000);
});

router.delete("/ettersendelsevedlegg/vedlegg/:vedleggId", function(req, res) {
	var vedleggId = req.params.vedleggId;
	var filId = req.query.filId;
	for (let vedlegg of ettersendteVedlegg) {
		if (vedlegg.vedleggId == vedleggId) {
			vedlegg.filer = vedlegg.filer.filter((fil) => {
				return fil.filId != filId;
			});
		}
	}
	var dirName = DATA_DIR + "/vedlegg_" + vedleggId + "/" + filId;
	rimraf(dirName, function () { console.log("DELETE Slettet " + dirName); });
	res.json(ettersendteVedlegg);
});

router.get("/ettersendelsevedlegg/vedlegg/:vedleggId", function(req, res) {
	var vedleggId = req.params.vedleggId;
	var filId = req.query.filId;
	console.log("GET ettersendelse-vedlegg - Last ned filen");

	var dirname = DATA_DIR + "/vedlegg_" + vedleggId + "/" + filId;
	var files = [];
	fs.readdirSync(dirname).forEach( function(file) {
		files.push({navn: file});
	});
	var filnavn = files[0].navn;
	var filsti = utils.getFilePath("/vedlegg_" + vedleggId + "/" + filId + "/" + filnavn);
	var mimeType = mime.getType(filsti);
	var file = fs.createReadStream(filsti);
	var stat = fs.statSync(filsti);
	res.setHeader('Content-Length', stat.size);
	res.setHeader('Content-Type', mimeType);
	res.setHeader('Content-Disposition', 'attachment; filename=' + filnavn);
	file.pipe(res);
});

module.exports = router;
