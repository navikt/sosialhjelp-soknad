import {Alert} from "@navikt/ds-react";

interface Props {
    antall?: number;
    innsendingTillattFra?: string | null;
    className?: string;
}

export function isInnsendingBlocked(antall?: number) {
    return antall !== undefined && antall >= 10;
}

export function getInnsendteSoknaderVarselText(antall?: number, innsendingTillattFra?: string | null) {
    if (antall === 9) {
        return "Du har sendt mange soknader de siste 24 timene. Du kan bare sende 1 soknad til na.";
    }

    if (isInnsendingBlocked(antall)) {
        return innsendingTillattFra
            ? `Du har sendt mange soknader de siste 24 timene. Du kan ikke sende ny soknad for ${innsendingTillattFra}.`
            : "Du har sendt mange soknader de siste 24 timene. Du kan ikke sende ny soknad akkurat na.";
    }

    return null;
}

export const InnsendteSoknaderVarselContainer = ({antall, innsendingTillattFra, className}: Props) => {
    const varslingstekst = getInnsendteSoknaderVarselText(antall, innsendingTillattFra);

    if (!varslingstekst) {
        return null;
    }

    return (
        <Alert variant="warning" className={className}>
            {varslingstekst}
        </Alert>
    );
};
