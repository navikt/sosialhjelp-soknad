import "./index.css";
import "@navikt/ds-css";
import {createRoot} from "react-dom/client";
import {injectDecoratorClientSide} from "@navikt/nav-dekoratoren-moduler";
import {withFaroProfiler} from "@grafana/faro-react";
import {logWindowError} from "./lib/log/logWindowError";
import digisosConfig from "./lib/config";
import App from "./app";

window.onerror = logWindowError;

/* Polyfill for react-pdf, se https://github.com/wojtekmaj/react-pdf/issues/1831 */
// @ts-expect-error This does not exist outside of polyfill which this is doing
if (typeof Promise.withResolvers === "undefined") {
    if (typeof window !== "undefined") {
        // @ts-expect-error This does not exist outside of polyfill which this is doing
        window.Promise.withResolvers = function () {
            let resolve, reject;
            const promise = new Promise((res, rej) => {
                resolve = res;
                reject = rej;
            });
            return {promise, resolve, reject};
        };
    } else {
        // @ts-expect-error This does not exist outside of polyfill which this is doing
        global.Promise.withResolvers = function () {
            let resolve, reject;
            const promise = new Promise((res, rej) => {
                resolve = res;
                reject = rej;
            });
            return {promise, resolve, reject};
        };
    }
}

// Dersom appen bygges og deployes med docker-image vil dekoratøren bli lagt på serverside med express i Docker (eks ved deploy til miljø)
if (digisosConfig.clientSideDecorator)
    injectDecoratorClientSide({
        env: "dev",
        params: {
            simple: true,
            feedback: false,
            chatbot: false,
            shareScreen: false,
            logoutWarning: true,
        },
    });

const container = document.getElementById("root");
const root = createRoot(container!);
const ProfiledApp = withFaroProfiler(App);
root.render(<ProfiledApp />);
