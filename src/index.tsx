import "./index.css";
import "@navikt/ds-css";
import {Suspense, useEffect} from "react";
import {createRoot} from "react-dom/client";
import {logWindowError} from "./lib/utils/loggerUtils";
import {injectDecoratorClientSide} from "@navikt/nav-dekoratoren-moduler";
import {RouterProvider} from "react-router-dom";
import {router} from "./routes";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {i18nSetLangFromLocalStorage} from "./lib/i18n";
import {withFaroProfiler} from "@grafana/faro-react";
import {ApplicationSpinner} from "./lib/components/animasjoner/ApplicationSpinner";
import {ValideringsContextProvider} from "./lib/valideringContextProvider";

window.onerror = logWindowError;

const queryClient = new QueryClient();

const App = () => {
    useEffect(i18nSetLangFromLocalStorage, []);


    

    return (
        <Suspense fallback={<ApplicationSpinner />}>
            <ValideringsContextProvider>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </ValideringsContextProvider>
        </Suspense>

    );
};

// Dersom appen bygges og deployes med docker-image vil dekoratøren bli lagt på serverside med express i Docker (eks ved deploy til miljø)
if (import.meta.env.REACT_APP_DIGISOS_ENV === "localhost") {
    injectDecoratorClientSide({
        env: "dev",
        params: {
            simple: true,
            feedback: false,
            chatbot: false,
            shareScreen: false,
        },
    });
}

const container = document.getElementById("root");
const root = createRoot(container!);
const ProfiledApp = withFaroProfiler(App);
root.render(<ProfiledApp />);
