const express = require("express");
const {injectDecoratorServerSide} = require("@navikt/nav-dekoratoren-moduler/ssr");
const path = require("path");

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

const basePath = "/sosialhjelp/soknad";

app.use(basePath, express.static(buildPath, {index: false}));

app.get(`${basePath}/internal/isAlive|isReady`, (req, res) => res.sendStatus(200));

app.use(basePath, (req, res, next) => {
    injectDecoratorServerSide({
        filePath: `${buildPath}/index.html`,
        ...decoratorParams,
    })
        .then((html) => {
            res.send(html);
        })
        .catch((e) => {
            const error = `Failed to get decorator: ${e}`;
            console.error(error);
            res.status(500).send(error);
        });
});

// start express server on port 8080
app.listen(8080, () => {
    console.log("server started on port 8080");
});
