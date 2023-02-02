import {Valideringsfeil} from "../../digisos/redux/validering/valideringActionTypes";
import {TFunction} from "i18next";

export function getFeil(
    feil: Valideringsfeil[] | undefined,
    t: TFunction<"skjema", undefined, "skjema">,
    faktumKey: string,
    faktumIndex: number | undefined
): string | undefined {
    if (feil && feil.length > 0) {
        if (faktumIndex != null) {
            const feilkode = feil.find(
                (f: Valideringsfeil) => f.faktumKey === faktumKey + "." + faktumIndex.toString()
            );
            return !feilkode ? undefined : t(feilkode.feilkode);
        } else {
            const feilkode = feil.find((f: Valideringsfeil) => f.faktumKey === faktumKey);
            return !feilkode ? undefined : t(feilkode.feilkode);
        }
    }
    return undefined;
}
