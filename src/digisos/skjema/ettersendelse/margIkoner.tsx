import * as React from "react";
import {Dialog, Email, FileContent, Print, SuccessFilled, WarningFilled} from "@navikt/ds-icons";
import styled from "styled-components";
import {ReactElement} from "react";

export type MargIkoner = "ok" | "advarsel" | "dokumenter" | "printer" | "snakkebobler" | "konvolutt";

const GreenSuccess = styled(SuccessFilled)`
    color: var(--a-icon-success);
`;

const OrangeWarning = styled(WarningFilled)`
    color: var(--a-icon-warning);
`;

const ikoner: Record<MargIkoner, ReactElement> = {
    advarsel: <OrangeWarning aria-label="Advarsel" />,
    ok: <GreenSuccess aria-label="Ok" />,
    printer: <Print aria-label="Skriv ut" />,
    snakkebobler: <Dialog aria-hidden="true" />,
    konvolutt: <Email aria-hidden="true" />,
    dokumenter: <FileContent aria-hidden="true" />,
};

const MargIkon = ({ikon}: {ikon: MargIkoner}) => ikoner[ikon];
export {MargIkon};
