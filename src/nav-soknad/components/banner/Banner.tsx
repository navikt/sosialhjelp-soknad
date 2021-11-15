import {Heading} from "@navikt/ds-react";
import * as React from "react";
import styled from "styled-components";

const StyledBanner = styled.div`
    background-color: #9bd0b0;
    width: 100%;
    height: 3.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Banner = (props: {children: React.ReactNode}) => {
    return (
        <StyledBanner>
            <Heading level="1" size="small">
                {props.children}
            </Heading>
        </StyledBanner>
    );
};

export default Banner;
