import {Alert} from "@navikt/ds-react";
import {useTranslations} from "next-intl";

interface Props {
    antall?: number;
    innsendingTillatt?: string | null;
}

export function isInnsendingBlocked(antall?: number) {
    return antall !== undefined && antall >= 10;
}

export function getInnsendteSoknaderVarselText(
    innsendingTillatt: string | null | undefined,
    blockedWithoutDateText: string,
    getBlockedWithDateText: (innsendingTillattFra: string) => string
) {
    return innsendingTillatt ? getBlockedWithDateText(innsendingTillatt) : blockedWithoutDateText;
}

export const InnsendteSoknaderVarsel = ({antall, innsendingTillatt}: Props) => {
    const t = useTranslations("InnsendteSoknaderVarsel");

    if (antall !== 9 && !isInnsendingBlocked(antall)) {
        return null;
    }

    return (
        <Alert variant="warning" className="mb-4">
            {antall === 9
                ? t("soknad.innsendteSoknaderVarsel.oneLeft")
                : getInnsendteSoknaderVarselText(
                      innsendingTillatt,
                      t("soknad.innsendteSoknaderVarsel.blockedWithoutDate"),
                      (innsendingTillattFra) =>
                          t("soknad.innsendteSoknaderVarsel.blockedWithDate", {
                              innsendingTillattFra,
                          })
                  )}
        </Alert>
    );
};
