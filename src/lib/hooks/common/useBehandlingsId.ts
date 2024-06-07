import {useParams} from "react-router";
import {logError} from "../../log/loggerUtils";

type SoknadUrlParams = Record<"behandlingsId", string | undefined>;

/**
 * Hent behandlingsId fra React Router URL-parametre.
 *
 * Jeg anser det som eksperimentelt bekreftet at behandlingsId
 * ikke kommer inn som undefined her - men jeg beholder sjekken
 * og feilmeldingen i tilfelle f. eks. den ventede overgangen
 * til Next.js påvirker dette.
 *
 * @returns behandlingsId - primærnøkkel for søknad under behandling
 */
export const useBehandlingsId = (): string => {
    const {behandlingsId} = useParams<SoknadUrlParams>();

    if (!(typeof behandlingsId === "string")) {
        logError(`Sannsynligvis fatal feil: useBehandlingsId returnerer ${typeof behandlingsId} ${behandlingsId}.`);
        // Om vi er her, kan det være et kort blaff med 'undefined' som så blir endret før
        // det noengang rekker bli brukers problem eller engang en GET, så ikke nødvendigvis
        // en fatal feil for brukeren. Jeg tror det kan være like godt å dekke inn med en
        // hjelpsom verdi :) Etter overgangen til next er det nok trygt å slette denne.
        return "NoeGikkGaltIFrontendSeUseBehandlingsIdTs";
    } else return behandlingsId;
};
