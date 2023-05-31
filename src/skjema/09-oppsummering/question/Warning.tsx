import React from "react";
import {Warning as WarningIcon} from "@navikt/ds-icons";
import {BodyShort} from "@navikt/ds-react";
import styled from "styled-components";
import {useTranslation} from "react-i18next";

const StyledWarning = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;

    svg {
        height: 1.5rem;
        width: 1.5rem;
    }
`;

export const Warning = () => {
    const {t} = useTranslation();

    return (
        <StyledWarning>
            <WarningIcon focusable={false} aria-label="Advarsel" role="img" />
            <BodyShort>{t("oppsummering.ikkeutfylt")}</BodyShort>
        </StyledWarning>
    );
};
