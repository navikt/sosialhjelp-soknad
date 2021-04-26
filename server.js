const express = require("express");
const path = require("path");

const app = express(); // create express app

const buildPath = path.resolve(__dirname, "build");

const basePath = "/sosialhjelp/soknad";

app.use(basePath, express.static(buildPath));

app.get(`${basePath}/internal/isAlive|isReady`, (req, res) => res.sendStatus(200));

app.use(basePath, (req, res, next) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

// start express server on port 8080
app.listen(8080, () => {
    console.log("server started on port 8080");
});
