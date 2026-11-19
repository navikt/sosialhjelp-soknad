import "server-only";
import {getDefinitions} from "@unleash/nextjs";
import QuickLRU from "quick-lru";
import * as R from "remeda";

import {unleashLogger} from "./utils";
import {EXPECTED_TOGGLES} from "./toggles";

type ToggleDefinitions = Awaited<ReturnType<typeof getDefinitions>>;

const TOGGLES_KEY = "toggles";

const unleashCache = new QuickLRU<typeof TOGGLES_KEY, ToggleDefinitions>({
    maxAge: 15 * 1000,
    maxSize: 10,
});

let previousValid: ToggleDefinitions | null = null;

/**
 * Henter definisjonene fra Unleash og cacher dem i minnet i 15 sekunder.
 * Feiler hentingen, brukes forrige gyldige svar.
 */
export async function getAndValidateDefinitions(): Promise<ToggleDefinitions> {
    const cached = unleashCache.get(TOGGLES_KEY);
    if (cached != null) {
        return cached;
    }

    try {
        const definitions = await fetchDefinitions();
        unleashCache.set(TOGGLES_KEY, definitions);
        previousValid = definitions;
        diffToggles(definitions);
        return definitions;
    } catch (e: unknown) {
        unleashLogger.error(e, "Failed to fetch toggle definitions from Unleash");
        if (previousValid != null) {
            return previousValid;
        }
        throw new Error("Failed to fetch toggles from Unleash, and no previous valid toggles available", {cause: e});
    }
}

async function fetchDefinitions(): Promise<ToggleDefinitions> {
    const url = process.env.UNLEASH_SERVER_API_URL;
    if (!url) {
        throw new Error("Missing UNLEASH_SERVER_API_URL");
    }
    const definitions = await getDefinitions({
        appName: "sosialhjelp-soknad",
        url: `${url}/api/client/features`,
    });

    if ("message" in definitions) {
        throw new Error(`Toggle was 200 OK, but server said: ${definitions.message}`);
    }

    return definitions;
}

/** Logger en feil hvis en toggle som er definert i koden mangler i Unleash. */
function diffToggles(definitions: ToggleDefinitions): void {
    const diff = R.difference(
        EXPECTED_TOGGLES as readonly string[],
        definitions.features.map((it) => it.name)
    );

    if (diff.length > 0) {
        unleashLogger.error(
            `Difference in expected flags and flags in unleash, expected but not in unleash: ${diff.join(", ")}`
        );
    }
}
