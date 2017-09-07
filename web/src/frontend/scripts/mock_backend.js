var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const utils = require("./utils.js");

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

// Søknadsressurser
router.post("/soknader", function (req, res) {
    res.json({
        brukerBehandlingId: brukerBehandlingId
    });
});

router.get("/soknader/:brukerBehandlingId", function (req, res) {
    if(req.accepts('application/json') ) {
        res.json(utils.lesMockDataFil("soknad.json"));
    } else {
        res.status(406);
        res.json({feil: "Forventer Accept: application/json i header"});
    }
});

router.get("/soknader/:brukerBehandlingId/oppsummering", function (req, res) {
    res.send(utils.lesMockHtmlFil("oppsummering.html"));
});

// Fakta ressurser implementert
var fakta = utils.lesMockDataFil("fakta.json");

router.get("/soknader/:brukerBehandlingId/fakta", function (req, res) {
    res.json(fakta);
});

router.get("/soknader/:brukerBehandlingId/fakta/:faktumId", function (req, res) {
    res.json(utils.hentFaktum(req.params.faktumId, fakta));
});

router.put("/soknader/:brukerBehandlingId/fakta/:faktumId", function (req, res) {
    fakta[utils.finnFaktaIndex(req.params.faktumId, fakta)] = req.body;
    res.json(utils.hentFaktum(req.params.faktumId, fakta));
});

router.post("/soknader/:brukerBehandlingId/fakta/:faktumId", function (req, res) {
    fakta.push(req.body);
    res.json(utils.hentFaktum(req.params.faktumId, fakta));
});

app.use('/', router);

app.listen(port);
console.log("Test API server running on port " + port);
