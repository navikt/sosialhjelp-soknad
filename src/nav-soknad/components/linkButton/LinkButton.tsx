import * as React from "react";
import * as classNames from "classnames";
import styled from "styled-components";

const StyledLinkButton = styled.button`
    border-style: none;
    cursor: pointer;
    padding: 0;
    text-decoration: underline;
    background-color: inherit;

    &:hover {
        text-decoration: none;
    }
`;

export const LinkButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    // @ts-ignore
    const className = classNames("lenke", props.className);
    return (
        <StyledLinkButton className={className} {...props}>
            {props.children}
        </StyledLinkButton>
    );
};

export const LinkButtonValidation = styled(LinkButton)`
    color: #ffffff;
`;
