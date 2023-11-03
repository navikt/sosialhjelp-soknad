import "./index.css";
import "@navikt/ds-css";
import {Suspense, useEffect} from "react";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {logWindowError} from "./lib/utils/loggerUtils";
import {
    injectDecoratorClientSide,
    onLanguageSelect,
    setAvailableLanguages,
    setParams,
    DecoratorLocale,
} from "@navikt/nav-dekoratoren-moduler";
import {RouterProvider} from "react-router-dom";
import {router} from "./routes";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import "./lib/i18n";
import {configureStore} from "./lib/redux/configureStore";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import i18n, {SUPPORTED_LANGUAGES} from "./lib/i18n";
import {logAmplitudeEvent} from "./lib/utils/amplitude";
import {withFaroProfiler} from "@grafana/faro-react";
import {basePath} from "./lib/config";
import {ApplicationSpinner} from "./lib/components/applicationSpinner/ApplicationSpinner";
const store = configureStore();

window.onerror = logWindowError;
const queryClient = new QueryClient();

const App = () => {
    useEffect(() => {
        setAvailableLanguages(
            SUPPORTED_LANGUAGES.map((locale) => ({locale: locale, url: basePath, handleInApp: true}))
        );
        const handleLanguageSelect = (language: {locale: DecoratorLocale}) => {
            i18n.changeLanguage(language.locale);
            setParams({language: language.locale});
            localStorage.setItem("digisos-language", language.locale);

            logAmplitudeEvent("Valgt språk", {language: language.locale});
        };

        const storedLanguage = localStorage.getItem("digisos-language");
        if (storedLanguage) {
            i18n.changeLanguage(storedLanguage);
            setParams({language: storedLanguage as DecoratorLocale});
        }

        onLanguageSelect(handleLanguageSelect);
    }, []);

    return (
        <Provider store={store}>
            <Suspense fallback={<ApplicationSpinner />}>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </Suspense>
        </Provider>
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
export {basePath} from "./lib/config";
