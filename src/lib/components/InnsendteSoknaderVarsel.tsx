import {Alert} from "@navikt/ds-react";
import {format, isValid, parseISO} from "date-fns";
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
    return innsendingTillatt
        ? getBlockedWithDateText(formatInnsendingTillattFra(innsendingTillatt))
        : blockedWithoutDateText;
}

export function formatInnsendingTillattFra(innsendingTillattFra: string) {
    const parsedDate = parseISO(innsendingTillattFra);

    if (!isValid(parsedDate)) {
        return innsendingTillattFra;
    }

    return format(parsedDate, "HH:mm:ss dd-MM-yyyy");
}

export const InnsendteSoknaderVarsel = ({antall, innsendingTillatt}: Props) => {
    const t = useTranslations("InnsendteSoknaderVarsel");

    if (antall !== 9 && !isInnsendingBlocked(antall)) {
        return null;
    }

    return (
        <Alert variant="warning" className="mb-4 text-left">
            {antall === 9
                ? t("oneLeft")
                : getInnsendteSoknaderVarselText(innsendingTillatt, t("blockedWithoutDate"), (innsendingTillattFra) =>
                      t("blockedWithDate", {
                          innsendingTillattFra,
                      })
                  )}
        </Alert>
    );
};
