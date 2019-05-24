const express = require("express");
const utils = require("./backend_utils");
const bodyParser = require("body-parser");

var app = express();

app.use(utils.allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const contextPath = "/soknadsosialhjelp-server";
const port = process.env.PORT || 3001;
const router = express.Router();

router.get("/informasjon/tekster", (req, res) => {
	res.json({"informasjon.tittel": "Informasjon"});
});

app.use(contextPath + "/", router);
app.listen(port);
console.log(`Mock API server running on port ${port}`);
