import {Alert} from "@navikt/ds-react";

interface Props {
    antall?: number;
    innsendingTillattFra?: string | null;
    className?: string;
    oneLeftText: string;
    blockedWithoutDateText: string;
    getBlockedWithDateText: (innsendingTillattFra: string) => string;
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

export const InnsendteSoknaderVarselContainer = ({
    antall,
    innsendingTillattFra,
    className,
    oneLeftText,
    blockedWithoutDateText,
    getBlockedWithDateText,
}: Props) => {
    const varslingstekst = getInnsendteSoknaderVarselText(
        antall,
        innsendingTillattFra,
        oneLeftText,
        blockedWithoutDateText,
        getBlockedWithDateText
    );

    if (!varslingstekst) {
        return null;
    }

    return (
        <Alert variant="warning" className={className}>
            {varslingstekst}
        </Alert>
    );
};
