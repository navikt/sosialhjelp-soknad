import {Feil} from "nav-frontend-skjema";
import {Valideringsfeil} from "../redux/valideringActionTypes";

export function getFeil(feil: Valideringsfeil[] | undefined, intl: any, faktumKey: string, faktumIndex: number | undefined): Feil | undefined {
    if (feil && feil.length > 0) {
        if (faktumIndex != null) {
            const feilkode = feil.find((f: Valideringsfeil) => f.faktumKey === faktumKey + "." + faktumIndex.toString());
            return !feilkode ? undefined: {feilmelding: intl.formatHTMLMessage({id: feilkode.feilkode})};
        } else {
            const feilkode = feil.find((f: Valideringsfeil) => f.faktumKey === faktumKey);
            return !feilkode ? undefined : {feilmelding: intl.formatHTMLMessage({id: feilkode.feilkode})};
        }
    }
    return undefined;
}
