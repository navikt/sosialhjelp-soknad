import * as React from "react";
import classNames from "classnames";
import styled from "styled-components";
import {BodyShort} from "@navikt/ds-react";

const StyledLinkButton = styled.button`
    border-style: none;
    cursor: pointer;
    padding: 0;
    background-color: inherit;
`;

export const LinkButton = ({
    children,
    className,
    ...rest
}: {className?: string; children: React.ReactNode} & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <StyledLinkButton type="button" className={classNames("navds-link", className)} {...rest}>
        <BodyShort>{children}</BodyShort>
    </StyledLinkButton>
);

export const LinkButtonValidation = styled(LinkButton)`
    color: #ffffff;
`;
