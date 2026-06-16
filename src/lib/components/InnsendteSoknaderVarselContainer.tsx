import {Alert} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";

interface Props {
    antall?: number;
    innsendingTillatt?: string | null;
}

export function isInnsendingBlocked(antall?: number) {
    return antall !== undefined && antall >= 10;
}

export function getInnsendteSoknaderVarselText(
    antall: number | undefined,
    innsendingTillattFra: string | null | undefined,
    oneLeftText: string,
    blockedWithoutDateText: string,
    getBlockedWithDateText: (innsendingTillattFra: string) => string
) {
    if (antall === 9) {
        return oneLeftText;
    }

    if (isInnsendingBlocked(antall)) {
        return innsendingTillattFra ? getBlockedWithDateText(innsendingTillattFra) : blockedWithoutDateText;
    }

    return null;
}

export const InnsendteSoknaderVarselContainer = ({antall, innsendingTillatt}: Props) => {
    const {t} = useTranslation("skjema");

    const varslingstekst = getInnsendteSoknaderVarselText(
        antall,
        innsendingTillatt,
        t("soknad.innsendteSoknaderVarsel.oneLeft"),
        t("soknad.innsendteSoknaderVarsel.blockedWithoutDate"),
        (innsendingTillattFra) =>
            t("soknad.innsendteSoknaderVarsel.blockedWithDate", {
                innsendingTillattFra,
            })
    );

    if (!varslingstekst) {
        return null;
    }

    return (
        <Alert variant="warning" className="mb-4">
            {varslingstekst}
        </Alert>
    );
};
