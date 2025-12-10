import {useTranslation} from "react-i18next";
import {BACKEND_FRONTEND_KEY_MAP} from "./BACKEND_FRONTEND_KEY_MAP";
import getLogger from "@log/logger";

interface UseBackendTranslationResult {
    /**
     * Adapter for t() som oversetter backends tekstnøkler til frontend-nøkler der disse har divergert.
     * Logger en error og returnerer tom streng dersom nøkkelen hverken eksisterer med eller uten denne mappingen.
     * @param languageKey - tekstnøkkel
     */
    tBackend: (languageKey: string) => string;
}

const isMappedKey = (key: string): key is keyof typeof BACKEND_FRONTEND_KEY_MAP =>
    Object.keys(BACKEND_FRONTEND_KEY_MAP).includes(key);

/**
 * Oppsummering-siden får data fra backend basert på backends språknøkler.
 * Disse to filene har etterhvert divergert, men ikke verre enn at vi kan mappe dem via en statisk liste.
 *
 * @returns tBackend - en funksjon som oversetter backend-nøkler til frontend-nøkler
 */
export const useBackendTranslation = (): UseBackendTranslationResult => {
    const {i18n} = useTranslation("skjema");

    const tBackend = (languageKey: string) => {
        if (languageKey.startsWith("Annen (brukerangitt):")) {
            return i18n.t("formue.type.annet");
        }

        if (isMappedKey(languageKey)) {
            return i18n.t(BACKEND_FRONTEND_KEY_MAP[languageKey]);
        }

        if (!i18n.exists(languageKey)) {
            getLogger().warn(
                `i18n key "${languageKey}" not found in frontend i18n, is BACKEND_FRONTEND_KEY_MAP up to date?`
            );
            return "";
        }

        return i18n.t(languageKey);
    };

    return {tBackend};
};
