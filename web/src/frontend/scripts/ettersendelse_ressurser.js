var express = require("express");
const path = require("path");
var router = express.Router();
const utils = require("./utils.js");
const fs = require("fs");
var mime = require("mime");

/*
 * Mock backend: REST ressurser for ettersendelse av vedlegg
 *
 */

// var DATA_DIR = "./scripts/mock_data";
// var VEDLEGG_ID = "9146";

const mockManglendeVedlegg = {

};

const nyBehandlingsId = "1000ABC";

// Hvilke vedlegg forventes
router.post("/soknader?ettersendTil=:brukerBehandlingId", function(
	req,
	res
) {
	// Returner fullt søknadsobjekt
	res.json({"status": "ok", "behandlingsId": nyBehandlingsId});
});
