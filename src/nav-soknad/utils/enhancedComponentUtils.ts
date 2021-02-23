import {Valideringsfeil} from "../../digisos/redux/validering/valideringActionTypes";

export function getFeil(
    feil: Valideringsfeil[] | undefined,
    intl: any,
    faktumKey: string,
    faktumIndex: number | undefined
): string | undefined {
    if (feil && feil.length > 0) {
        if (faktumIndex != null) {
            const feilkode = feil.find(
                (f: Valideringsfeil) => f.faktumKey === faktumKey + "." + faktumIndex.toString()
            );
            return !feilkode ? undefined : intl.formatMessage({id: feilkode.feilkode});
        } else {
            const feilkode = feil.find((f: Valideringsfeil) => f.faktumKey === faktumKey);
            return !feilkode ? undefined : intl.formatMessage({id: feilkode.feilkode});
        }
    }
    return undefined;
}
