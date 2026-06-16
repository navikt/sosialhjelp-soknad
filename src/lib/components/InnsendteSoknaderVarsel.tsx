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

export function formatInnsendingTillattFra(innsendingTillattFra: string) {
    const parsedDate = parseISO(innsendingTillattFra);

    if (!isValid(parsedDate)) {
        return innsendingTillattFra;
    }

    return format(parsedDate, "dd.MM.yyyy 'kl.' HH:mm");
}

export const InnsendteSoknaderVarsel = ({antall, innsendingTillatt}: Props) => {
    const t = useTranslations("InnsendteSoknaderVarsel");

    if (antall !== 9 && !isInnsendingBlocked(antall)) {
        return null;
    }

    if (antall === 2) {
        return (
            <Alert variant="warning" className="mb-4 text-left">
                {t("oneLeft")}
            </Alert>
        );
    }

    if (!innsendingTillatt) {
        return null;
    }

    return (
        <Alert variant="warning" className="mb-4 text-left whitespace-pre-line">
            {t("blockedWithDate", {
                innsendingTillattFra: `\n${formatInnsendingTillattFra(innsendingTillatt)}`,
            })}
        </Alert>
    );
};
