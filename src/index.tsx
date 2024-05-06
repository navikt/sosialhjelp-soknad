import "./index.css";
import "@navikt/ds-css";
import {createContext, Dispatch, Suspense, useEffect, useReducer} from "react";
import {createRoot} from "react-dom/client";
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

import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import i18n, {SUPPORTED_LANGUAGES} from "./lib/i18n";
import {logAmplitudeEvent} from "./lib/utils/amplitude";
import {withFaroProfiler} from "@grafana/faro-react";
import {basePath} from "./lib/config";
import {ApplicationSpinner} from "./lib/components/animasjoner/ApplicationSpinner";
import {initialValideringState, ValideringActionTypes, valideringsReducer, ValideringState} from "./lib/validering";

window.onerror = logWindowError;
const queryClient = new QueryClient();

/**
 * Kopiert inn fra Redux for kompatibilitet, iom. at resten av Redux er fjernet.
 * Bør på sikt erstattes med validering per side.
 */
export const ValideringsContext = createContext<{state: ValideringState; dispatch: Dispatch<ValideringActionTypes>}>({
    state: initialValideringState,
    dispatch: () => {},
});
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

    const [state, dispatch] = useReducer(valideringsReducer, initialValideringState);

    return (
        <Suspense fallback={<ApplicationSpinner />}>
            <ValideringsContext.Provider value={{state, dispatch}}>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </ValideringsContext.Provider>
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
export {basePath} from "./lib/config";
