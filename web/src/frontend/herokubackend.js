var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const utils = require("./scripts/utils.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3003;
var router = express.Router();
app.use(express.static(__dirname + "/build"));


// Språkdata tjeneste /api/tekster
router.get('/sendsoknad/informasjon/tekster', function (req, res) {
    res.json(utils.lesSpraakfil())
});

const brukerBehandlingId = "1000B8FNi";

router.post("/sendsoknad/soknader", function(req, res) {
    res.json({
        brukerBehandlingId: brukerBehandlingId
    });
});

router.get("/sendsoknad/soknader/:brukerBehandlingId/fakta", function(req, res) {
    res.json(utils.lesMockDataFil("fakta.json"));
});

router.get("/sendsoknad/soknader/:brukerBehandlingId/oppsummering", function(req, res) {
    res.send(utils.lesMockHtmlFil("oppsummering.html"));
});

app.use(utils.allowCrossDomain);
app.use('/', router);
app.get("/*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(port);
console.log("Test API server running on port " + port);
