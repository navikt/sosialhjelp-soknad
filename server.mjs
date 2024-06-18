import express from "express";
import {injectDecoratorServerSide} from "@navikt/nav-dekoratoren-moduler/ssr/index.js";
import path from "path";
import {fileURLToPath} from "node:url";
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

// This value is duplicated in src/config because imports are weird
const basePath = "/sosialhjelp/soknad";

const buildPath = path.resolve(__dirname, "build");

const dockerImage = process.env.IMAGE || process.env.NAIS_APP_IMAGE;
console.log("starter søknad fra docker image: ", dockerImage);

console.log(`Dekoratormiljø: ${process.env.DEKORATOR_MILJO}`);

const app = express(); // create express app
app.disable("x-powered-by");

app.use(basePath, express.static(buildPath, {index: false}));

app.get(`${basePath}/internal/isAlive|isReady`, (_, res) => res.sendStatus(200));

app.use(basePath, (req, res, __) => {
    injectDecoratorServerSide({
        env: process.env.DEKORATOR_MILJO ?? "dev",
        filePath: `${buildPath}/index.html`,
        params: {
            simple: true,
            feedback: false,
            chatbot: false,
            shareScreen: false,
            logoutWarning: true,
        },
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

process.on("SIGTERM", () => {
    console.log("SIGTERM signal received, shutting down");
    process.exit(0);
});

process.on("SIGINT", () => {
    console.log("SIGINT signal received, shutting down");
    process.exit(0);
});
