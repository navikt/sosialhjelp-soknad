const express = require("express");
const {injectDecoratorServerSide} = require("@navikt/nav-dekoratoren-moduler/ssr");
const path = require("path");

// This value is duplicated in src/config because imports are weird
const basePath = "/sosialhjelp/soknad";

const decoratorParams = {
    env: process.env.DEKORATOR_MILJO || "prod",
    simple: true,
    feedback: false,
    chatbot: false,
    shareScreen: false,
};

const app = express(); // create express app
app.disable("x-powered-by");

const buildPath = path.resolve(__dirname, "build");

app.use(basePath, express.static(buildPath, {index: false}));

app.get(`${basePath}/internal/isAlive|isReady`, (req, res) => res.sendStatus(200));

app.use(basePath, (req, res, _) => {
    injectDecoratorServerSide({
        filePath: `${buildPath}/index.html`,
        ...decoratorParams,
    })
        .then((html) => {
            res.send(html);
        })
        .catch((e) => {
            console.error(`Failed to get decorator: ${e}`);
            res.status(500).send("Det har oppstått en feil. Venligst prøv igjen senere.");
        });
});

// start express server on port 8080
app.listen(8080, () => {
    console.log("server started on port 8080");
});
