import * as React from "react";
import * as classNames from "classnames";
import styled from "styled-components";

const StyledLinkButton = styled.button`
    border-style: none;
    cursor: pointer;
    padding: 0;
    background-color: inherit;
`;

export const LinkButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    // @ts-ignore
    const className = classNames("navds-link", props.className);
    return (
        <StyledLinkButton type="button" className={className} {...props}>
            {props.children}
        </StyledLinkButton>
    );
};

export const LinkButtonValidation = styled(LinkButton)`
    color: #ffffff;
`;
