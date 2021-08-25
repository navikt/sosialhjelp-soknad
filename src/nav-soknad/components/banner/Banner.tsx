import {Title} from "@navikt/ds-react";
import * as React from "react";
import styled from "styled-components";

const StyledBanner = styled.div`
    background-color: #9bd0b0;
    width: 100%;
    height: 3.75rem;
    display: flex;
    align-items: center;
`;

const Banner = (props: {children: React.ReactNode}) => {
    return (
        <StyledBanner>
            <div className="blokk-center">
                <Title level={1} size="s">
                    {props.children}
                </Title>
            </div>
        </StyledBanner>
    );
};

export default Banner;
