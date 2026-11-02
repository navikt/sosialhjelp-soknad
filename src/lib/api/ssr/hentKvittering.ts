import {logger} from "@navikt/next-logger";
import type {KvitteringDto} from "../../../generated/model";
import authenticatedFetch from "./authenticatedFetch.ts";

export const hentKvittering = async (digisosId: string): Promise<KvitteringDto | null> => {
    try {
        const {data} = await authenticatedFetch<{data: KvitteringDto}>(`/kvittering/${encodeURIComponent(digisosId)}`);
        return data;
    } catch (error) {
        logger.warn(`Kunne ikke hente kvittering for digisosId=${digisosId}: ${(error as Error).message}`);
        return null;
    }
};

/** «2026-01-15T11:00:00» -> {dato: «15.01.2026», klokkeslett: «11:00»}. Tidspunktet er allerede norsk tid. */
export const delTidspunkt = (tidspunkt: string): {dato: string; klokkeslett: string} | undefined => {
    const match = tidspunkt.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
    if (!match) return undefined;
    const [, aar, maaned, dag, time, minutt] = match;
    return {dato: `${dag}.${maaned}.${aar}`, klokkeslett: `${time}:${minutt}`};
};
