import {TFunction} from "i18next";

import {Valideringsfeil} from "../validering";

export function getFeil(
    feil: Valideringsfeil[] | undefined,
    t: TFunction<"skjema", "skjema">,
    faktumKey: string,
    faktumIndex: number | undefined
): string | undefined {
    if (!feil?.length) return undefined;

    if (faktumIndex != null) {
        const feilkode = feil.find((f: Valideringsfeil) => f.faktumKey === faktumKey + "." + faktumIndex.toString());
        return !feilkode ? undefined : t(feilkode.feilkode);
    } else {
        const feilkode = feil.find((f: Valideringsfeil) => f.faktumKey === faktumKey);
        return !feilkode ? undefined : t(feilkode.feilkode);
    }
}
