import digisosConfig from "../config.ts";
import {Driftsmelding, DriftsmeldingAudienceParam, DriftsmeldingAudience} from "./types.ts";
import getLogger from "@log/logger";

export const getDriftsmeldinger = async () => {
    if (!digisosConfig.driftsmeldingUrl) return [];

    const driftsmeldingUrl = new URL(`${digisosConfig.driftsmeldingUrl}/status`);
    driftsmeldingUrl.searchParams.set(DriftsmeldingAudienceParam, DriftsmeldingAudience.soknad);

    try {
        const res = await fetch(driftsmeldingUrl.toString(), {
            signal: AbortSignal.timeout(500),
        });
        if (!res.ok) {
            getLogger().warn(`fetching driftsmeldinger: HTTP error response: ${res.status} ${res.statusText}`);
            return [];
        }
        return (await res.json()) as Driftsmelding[];
    } catch (e: any) {
        getLogger().warn({error: e?.message}, "fetching driftsmeldinger: error");
        return [];
    }
};
