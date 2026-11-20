import "server-only";
import {evaluateFlags, IToggle} from "@unleash/nextjs";
import {cookies} from "next/headers";
import {connection} from "next/server";

import {getAndValidateDefinitions} from "./definitions";
import {EXPECTED_TOGGLES, ExpectedToggles, UNLEASH_COOKIE_NAME} from "./toggles";
import {allTogglesDisabled, isLocalOverrideAllowed, localDevelopmentToggles, unleashLogger} from "./utils";

const unleashEnvironment = process.env.NEXT_PUBLIC_DIGISOS_ENV === "prod" ? "production" : "development";

/*
 * Lokalt og i mock kan toggles overstyres med cookies. Navnet er togglenavnet, verdien "true" eller "false".
 * Eksempel: sosialhjelp.soknad.ny_introside=false
 */
const overrideTogglesWithCookies = async (toggles: IToggle[]): Promise<IToggle[]> => {
    const cookieStore = await cookies();
    return toggles.map((toggle) => {
        const cookieValue = cookieStore.get(toggle.name)?.value;
        if (cookieValue === "true") return {...toggle, enabled: true};
        if (cookieValue === "false") return {...toggle, enabled: false};
        return toggle;
    });
};

export async function getToggles(): Promise<IToggle[]> {
    await connection();

    if ((EXPECTED_TOGGLES as readonly string[]).length === 0) {
        return [];
    }

    if (isLocalOverrideAllowed()) {
        return overrideTogglesWithCookies(localDevelopmentToggles());
    }

    if (process.env.NEXT_PUBLIC_DIGISOS_ENV === "e2e") {
        return localDevelopmentToggles();
    }

    try {
        const sessionId = await getUnleashSessionId();
        const definitions = await getAndValidateDefinitions();
        return evaluateFlags(definitions, {
            sessionId,
            environment: unleashEnvironment,
            appName: `sosialhjelp-soknad-${process.env.NEXT_PUBLIC_DIGISOS_ENV}`,
        }).toggles;
    } catch (e) {
        unleashLogger.error(new Error("Failed to get flags from Unleash. Falling back to all disabled.", {cause: e}));
        return allTogglesDisabled();
    }
}

export function getFlag(flag: ExpectedToggles, toggles: IToggle[]): IToggle {
    return (
        toggles.find((it) => it.name === flag) ?? {
            name: flag,
            enabled: false,
            impressionData: false,
            variant: {name: "disabled", enabled: false},
        }
    );
}

async function getUnleashSessionId(): Promise<string> {
    return (await cookies()).get(UNLEASH_COOKIE_NAME)?.value ?? "0";
}
