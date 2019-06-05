import InjectedIntl = ReactIntl.InjectedIntl;
import {Feil} from "nav-frontend-skjema";
import {Valideringsfeil} from "../redux/valideringActionTypes";

export function getFeil(feil: Valideringsfeil[], intl: InjectedIntl, faktumKey: string, faktumIndex: number): Feil {
    if (feil && feil.length > 0) {
        if (faktumIndex != null) {
            const feilkode = feil.find((f: Valideringsfeil) => f.faktumKey === faktumKey + "." + faktumIndex.toString());
            return !feilkode ? null : {feilmelding: intl.formatHTMLMessage({id: feilkode.valideringsfeilType})};
        } else {
            const feilkode = feil.find((f: Valideringsfeil) => f.faktumKey === faktumKey);
            return !feilkode ? null : {feilmelding: intl.formatHTMLMessage({id: feilkode.valideringsfeilType})};
        }
    }
    return null;
}
