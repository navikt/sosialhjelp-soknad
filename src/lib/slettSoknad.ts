import {fetchDelete, HttpStatus} from "../nav-soknad/utils/rest-utils";
import {logWarning} from "../nav-soknad/utils/loggerUtils";

/** Sletter en søknad på backend. Logger til backend ved feil (utenom 403)
 * @param {string} behandlingsId - Søknadens behandlingsId
 * @returns {boolean} True dersom vellykket, false ved feil.
 */
export const slettSoknad = async (behandlingsId: string) => {
    try {
        await fetchDelete(`soknader/${behandlingsId}`);
    } catch (reason) {
        if (reason.message !== HttpStatus.UNAUTHORIZED) logWarning("slett soknad feilet: " + reason);
        return false;
    }
    return true;
};
