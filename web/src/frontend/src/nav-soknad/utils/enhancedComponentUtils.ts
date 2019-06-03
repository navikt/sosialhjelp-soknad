import InjectedIntl = ReactIntl.InjectedIntl;
// @ts-ignore
import { Valideringsfeil } from "../validering/types";
// @ts-ignore
import { Feil } from "nav-frontend-skjema";

export function getFeil(feil: Valideringsfeil[], intl: InjectedIntl, faktumKey: string, faktumIndex:number): Feil {
    if (faktumIndex != null){
        const feilkode = feil.find((f: Valideringsfeil) => f.faktumKey === faktumKey + "." + faktumIndex.toString());
        return !feilkode ? null : { feilmelding: intl.formatHTMLMessage({ id: feilkode.feilkode }) };
    } else {
        const feilkode = feil.find((f: Valideringsfeil) => f.faktumKey === faktumKey);
        return !feilkode ? null : { feilmelding: intl.formatHTMLMessage({ id: feilkode.feilkode }) };
    }
}
