const express = require("express");
const {injectDecoratorServerSide} = require("@navikt/nav-dekoratoren-moduler/ssr");
const path = require("path");

// This value is duplicated in src/config because imports are weird
const basePath = "/sosialhjelp/soknad";

const buildPath = path.resolve(__dirname, "build");

console.log(`Dekoratormiljø: ${process.env.DEKORATOR_MILJO}`);

const app = express(); // create express app
app.disable("x-powered-by");

app.use(basePath, express.static(buildPath, {index: false}));

app.get(`${basePath}/internal/isAlive|isReady`, (_, res) => res.sendStatus(200));

app.use(basePath, (req, res, __) => {
    let language = req.headers['language'] || 'nb';
    injectDecoratorServerSide({
        env: process.env.DEKORATOR_MILJO ?? "dev",
        filePath: `${buildPath}/index.html`,
        simple: true,
        feedback: false,
        chatbot: false,
        shareScreen: false,
        language: language,
        availableLanguages: [
            {locale: "nb", url: basePath, handleInApp: true},
            {locale: "en", url: basePath, handleInApp: true},
        ],
    })
        .then((text) => res.send(text))
        .catch((e) => {
            console.error(`Failed to get decorator: ${e}`);
            res.status(500).send("Det har oppstått en feil. Venligst prøv igjen senere.");
        });
});

// start express server on port 8080
app.listen(8080, () => {
    console.log("server started on port 8080");
});
