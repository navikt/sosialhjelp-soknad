var express = require("express");
const path = require("path");
var router = express.Router();
const utils = require("./utils.js");
const fs = require("fs");

/*
 * Mock backend: REST ressurser for vedlegg
 *
 */

var DATA_DIR = "./scripts/mock_data";
var VEDLEGG_ID = "9146";
utils.emptyDirectory(DATA_DIR + "/vedlegg_" + VEDLEGG_ID + "/");

router.get("/soknader/:brukerBehandlingId/vedlegg", function(
	req,
	res
) {
	console.log("Mock backend: GET vedlegg (vedleggsforventning)");

	var forventninger = utils.lesMockDataFil("vedleggsforventning.json");
	for (var i = 0; i < forventninger.length; i++) {
		var vedleggId = forventninger[i].vedleggId;
		var files = [];
		fs.readdirSync(DATA_DIR + "/vedlegg_" + vedleggId).forEach( function(file) {
			files.push({navn: file});
		});
		// console.log(i.toString(10) + ": " + vedleggId + " " + JSON.stringify(files, null, 4));
		forventninger[i].filer = files;
	}
	res.json(forventninger);
});

router.get("/vedlegg/:vedleggId", function(
	req,
	res
) {
	console.log("Mock backend: GET vedlegg (vedleggsinfo)");
	utils.checkMandatoryQueryParam(req, res, "behandlingsId");
	if(res.statusCode !== 200) {return;}
	var vedleggId = Number(req.params.vedleggId);
	var response = utils.lesMockDataFil("vedleggsinfo_" + vedleggId + ".json");
	if (typeof response === 'undefined') {
		res.status(406);
		res.json({ feil: "Ukjent vedleggs id: " + vedleggId });
	} else {
		res.json(response);
	}
});

router.get("/vedlegg/:vedleggId/fil", function(
	req,
	res
) {
	console.log("Mock backend: GET vedlegg (fil liste)");
	utils.checkMandatoryQueryParam(req, res, "behandlingsId");
	if(res.statusCode !== 200) {return;}
	var vedleggId = Number(req.params.vedleggId);
	var files = [];
	fs.readdirSync(DATA_DIR + "/vedlegg_" + vedleggId).forEach( function(file) {
		files.push({navn: file});
	});
	res.json(files);
});

router.post("/vedlegg/:vedleggId/fil", function(
	req,
	res
) {
	console.log("Mock backend: POST vedlegg (fil liste)");
	utils.checkMandatoryQueryParam(req, res, "behandlingsId");
	if(res.statusCode !== 200) {return;}
	var vedleggId = Number(req.params.vedleggId);
	var files = [];

	Object.keys(req.files).forEach(function(file) {
		var filename = req.files[file].name;
		files.push({navn: filename});
		var outputFilename = DATA_DIR + "/vedlegg_" + vedleggId + "/" + filename;
		req.files[file].mv(outputFilename, function (err) {
			if (err) {
				console.log("Warning: " + err);
			} else {
				console.log("  Lagret: 'mock_data/vedlegg_" + vedleggId + "/" + filename);
			}
		});
	});
	res.json(files);
});

router.get("/vedlegg/:vedleggId/:filnavn", function(
	req,
    res
) {
	console.log("Mock backend: GET vedlegg (enkelt fil)");
	var vedleggId = Number(req.params.vedleggId);
	var filnavn = Number(req.params.filnavn);
	res.send(utils.lesMockHtmlFil(DATA_DIR + "/vedlegg_" + vedleggId + "/" + filnavn));
});

router.delete("/vedlegg/:vedleggId/:filnavn", function(
	req,
	res
) {
	console.log("Mock backend: DELETE vedlegg (enkelt fil)");
	utils.checkMandatoryQueryParam(req, res, "behandlingsId");
	if(res.statusCode !== 200) {return;}

	var vedleggId = req.params.vedleggId;
	var filnavn = req.params.filnavn;

	var deleteFilename = DATA_DIR + "/vedlegg_" + vedleggId + "/" + filnavn;
	fs.unlink(deleteFilename, function(err) {
		if (err) throw err;
	});
	res.send({"status": "ok"});

});

module.exports = router;
