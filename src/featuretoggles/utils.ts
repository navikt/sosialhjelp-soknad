import {IToggle} from "@unleash/nextjs";
import {logger} from "@navikt/next-logger";

import {EXPECTED_TOGGLES} from "./toggles";

export const unleashLogger = logger.child({}, {msgPrefix: "[UNLEASH-TOGGLES] "});

const toToggle = (name: string, enabled: boolean): IToggle => ({
    name,
    enabled,
    impressionData: false,
    variant: {name: "disabled", enabled},
});

export const localDevelopmentToggles = (): IToggle[] =>
    (EXPECTED_TOGGLES as readonly string[]).map((it) => toToggle(it, true));

export const allTogglesDisabled = (): IToggle[] =>
    (EXPECTED_TOGGLES as readonly string[]).map((it) => toToggle(it, false));

/**
 * Lokal fallback og overstyring med cookies er bare lov lokalt og i mock.
 * NEXT_PUBLIC_DIGISOS_ENV settes ved bygging. NAIS_CLUSTER_NAME er en ekstra sperre
 * i tilfelle et prod-image bygges med feil miljø.
 */
export const isLocalOverrideAllowed = (): boolean => {
    const env = process.env.NEXT_PUBLIC_DIGISOS_ENV;
    const isLocalOrMock = env === "localhost" || env === "mock";
    return isLocalOrMock && process.env.NAIS_CLUSTER_NAME !== "prod-gcp";
};
