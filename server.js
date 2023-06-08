const express = require("express");
const session = require('express-session');
const {injectDecoratorServerSide} = require("@navikt/nav-dekoratoren-moduler/ssr");
const path = require("path");

// This value is duplicated in src/config because imports are weird
const basePath = "/sosialhjelp/soknad";

const buildPath = path.resolve(__dirname, "build");

console.log(`Dekoratormiljø: ${process.env.DEKORATOR_MILJO}`);

const app = express(); // create express app
app.disable("x-powered-by");

app.use(basePath, express.static(buildPath, {index: false}));

app.use(session({
    secret: 'digisos-soknad-language', 
    resave: false,
    saveUninitialized: true,
}));


app.get(`${basePath}/internal/isAlive|isReady`, (_, res) => res.sendStatus(200));

app.post(`${basePath}/language`, (req, res) => {
    const language = req.body.language;
    if (['nb', 'en'].includes(language)) {
        req.session.language = language;
        res.sendStatus(200);
    } else {
        res.status(400).send("Invalid language");
    }
});

app.use(basePath, (req, res, __) => {
    let language = req.session.language || 'nb';
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
