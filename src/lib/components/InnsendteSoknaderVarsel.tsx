import {Alert} from "@navikt/ds-react";
import {format, isValid, parseISO} from "date-fns";
import {useTranslations} from "next-intl";
import type {AntallInnsendteSoknaderDto} from "../../generated/model";

interface Props {
    innsendteSoknader?: AntallInnsendteSoknaderDto;
}

export function resolveInnsendingBlocked(antall?: number, maxAntall?: number): boolean {
    if (antall === undefined || maxAntall === undefined) {
        return false;
    }
    return antall >= maxAntall;
}

export function formatInnsendingTillattFra(innsendingTillattFra: string) {
    const parsedDate = parseISO(innsendingTillattFra);

    if (!isValid(parsedDate)) {
        return innsendingTillattFra;
    }

    return format(parsedDate, "dd.MM.yyyy 'kl.' HH:mm");
}

export const InnsendteSoknaderVarsel = ({innsendteSoknader}: Props) => {
    const t = useTranslations("InnsendteSoknaderVarsel");
    const antall = innsendteSoknader?.antall;
    const innsendingTillatt = innsendteSoknader?.innsendingTillattFra;
    const maxAntall = innsendteSoknader?.maxAntall;

    if (antall === undefined || maxAntall === undefined) {
        return null;
    }

    if (antall < maxAntall - 1) {
        return null;
    }

    if (maxAntall !== undefined && antall === maxAntall - 1) {
        return (
            <Alert variant="warning" className="mb-4 text-left">
                {t("oneLeft", {
                    antall: `${antall}`,
                    maxAntall: `${maxAntall}`,
                })}
            </Alert>
        );
    }

    if (!innsendingTillatt) {
        return (
            <Alert variant="warning" className="mb-4 text-left whitespace-pre-line">
                {t("blockedWithDate", {
                    antall: `${antall}`,
                    maxAntall: `${maxAntall}`,
                    innsendingTillattFra: `\n-ukjent-`,
                })}
            </Alert>
        );
    }

    return (
        <Alert variant="warning" className="mb-4 text-left whitespace-pre-line">
            {t("blockedWithDate", {
                antall: `${antall}`,
                maxAntall: `${maxAntall}`,
                innsendingTillattFra: `\n${formatInnsendingTillattFra(innsendingTillatt)}`,
            })}
        </Alert>
    );
};
