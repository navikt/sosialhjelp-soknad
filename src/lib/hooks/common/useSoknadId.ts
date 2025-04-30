import {useParams} from "react-router";
import {logError} from "../../log/loggerUtils";

type SoknadUrlParams = Record<"soknadId", string | undefined>;

/**
 * Hent soknadId fra React Router URL-parametre.
 * @returns soknadId - primærnøkkel for søknad under behandling
 */
export const useSoknadId = (): string => {
    const {soknadId} = useParams<SoknadUrlParams>();

    if (!(typeof soknadId === "string")) {
        logError(`Sannsynligvis fatal feil: useSoknadId returnerer ${typeof soknadId} ${soknadId}.`);
        // Om vi er her, kan det være et kort blaff med 'undefined' som så blir endret før
        // det noengang rekker bli brukers problem eller engang en GET, så ikke nødvendigvis
        // en fatal feil for brukeren. Jeg tror det kan være like godt å dekke inn med en
        // hjelpsom verdi :) Etter overgangen til next er det nok trygt å slette denne.
        return "NoeGikkGaltIFrontendSeUseSoknadIdTs";
    } else return soknadId;
};
