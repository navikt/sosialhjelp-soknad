import "./index.css";
import "@navikt/ds-css";
import {Suspense} from "react";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import Modal from "react-modal";
import {logWindowError} from "./nav-soknad/utils/loggerUtils";
import {injectDecoratorClientSide, Locale, onLanguageSelect, setParams} from "@navikt/nav-dekoratoren-moduler";
import {RouterProvider} from "react-router-dom";
import {router} from "./digisos";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import "./i18n";
import {Loader} from "@navikt/ds-react";
import {configureStore} from "./configureStore";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {basePath} from "./configuration";
import i18n from "./i18n";

Modal.setAppElement("#root");

const store = configureStore();

window.onerror = logWindowError;
const queryClient = new QueryClient();

let language = localStorage.getItem("language") || i18n.language;

// Dersom appen bygges og deployes med docker-image vil dekoratøren bli lagt på serverside med express i Docker (eks ved deploy til miljø)
if (process.env.NODE_ENV !== "production") {
    injectDecoratorClientSide({
        env: "dev",
        simple: true,
        feedback: false,
        chatbot: false,
        shareScreen: false,
        language: language as Locale,
        availableLanguages: [
            {locale: "nb", url: basePath, handleInApp: true},
            {locale: "en", url: basePath, handleInApp: true},
        ],
    });

    onLanguageSelect((language: {locale: Locale}) => {
        i18n.changeLanguage(language.locale);
        setParams({language: language.locale});
        localStorage.setItem("language", language.locale);
    });

    setParams({language: i18n.language as Locale});
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
    <Provider store={store}>
        <Suspense fallback={<Loader />}>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </Suspense>
    </Provider>
);
