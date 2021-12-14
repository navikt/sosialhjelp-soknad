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
    color: var(--navds-semantic-color-feedback-success-icon);
`;

const OrangeWarning = styled(WarningFilled)`
    color: var(--navds-semantic-color-feedback-warning-icon);
`;

const MargIkon: React.FC<{ikon: MargIkoner}> = ({ikon}) => {
    switch (ikon) {
        case MargIkoner.ADVARSEL:
            return <OrangeWarning aria-label="advarsel ikon" />;
        case MargIkoner.OK:
            return <GreenSuccess aria-label="suksess ikon" />;
        case MargIkoner.PRINTER:
            return <Print />;
        case MargIkoner.SNAKKEBOBLER:
            return <Dialog />;
        case MargIkoner.KONVOLUTT:
            return <Email />;
        case MargIkoner.DOKUMENTER:
            return <FileContent />;
        default:
            return null;
    }
};

export {MargIkon, MargIkoner};
