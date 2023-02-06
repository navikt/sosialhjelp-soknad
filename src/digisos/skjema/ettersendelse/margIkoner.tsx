import * as React from "react";
import {Dialog, Email, FileContent, Print, SuccessFilled, WarningFilled} from "@navikt/ds-icons";
import styled from "styled-components";

enum MargIkoner {
    OK = "OK",
    ADVARSEL = "ADVARSLE",
    DOKUMENTER = "DOKUMENTER",
    PRINTER = "PRINTER",
    SNAKKEBOBLER = "SNAKKEBOBLER",
    KONVOLUTT = "KONVOLUTT",
}

const GreenSuccess = styled(SuccessFilled)`
    color: var(--a-icon-success);
`;

const OrangeWarning = styled(WarningFilled)`
    color: var(--a-icon-warning);
`;

const MargIkon: React.FC<{ikon: MargIkoner}> = ({ikon}) => {
    switch (ikon) {
        case MargIkoner.ADVARSEL:
            return <OrangeWarning aria-label="Advarsel" />;
        case MargIkoner.OK:
            return <GreenSuccess aria-label="Ok" />;
        case MargIkoner.PRINTER:
            return <Print aria-label="Skriv ut" />;
        case MargIkoner.SNAKKEBOBLER:
            return <Dialog aria-hidden="true" />;
        case MargIkoner.KONVOLUTT:
            return <Email aria-hidden="true" />;
        case MargIkoner.DOKUMENTER:
            return <FileContent aria-hidden="true" />;
        default:
            return null;
    }
};

export {MargIkon, MargIkoner};
