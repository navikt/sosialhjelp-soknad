import * as React from "react";
import {EllaForfra} from "../../lib/components/svg/EllaForfra";
import styled from "styled-components";
import {Heading} from "@navikt/ds-react";
import {BlokkCenter} from "./BlokkCenter";
import {Laptop} from "./Laptop";

const StyledBannerEttersendelse = styled.div`
    background-color: #9bd0b0;
    border-bottom: 5px solid #38a161;
    color: #3e3832;
    width: 100%;
    margin: 0;
    margin-bottom: 1rem;
    padding-right: 1rem;
    padding-bottom: 0;

    padding-top: 2rem;

    @media screen and (min-width: 680px) {
        padding-left: 0.75rem;
    }
`;

const Content = styled.div`
    display: flex;
`;

const StyledEllaForfra = styled.div`
    width: 64px;
    display: block;
    align-self: flex-end;
    svg {
        margin-bottom: -40px;
    }

    .laptop {
        display: block;
        z-index: 2;
        margin-bottom: 0px;
        transform: rotateX(80deg);
        transform-origin: bottom left;
        animation-name: openLaptop;
        animation-duration: 1.5s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-timing-function: ease;
        transition: all 0.5s ease-in-out;
    }

    @keyframes openLaptop {
        0% {
            transform: rotateX(60deg);
        }
        100% {
            transform: rotateX(0deg);
        }
    }
`;

export const BannerEttersendelse = ({children}: {children: React.ReactNode}) => {
    return (
        <StyledBannerEttersendelse>
            <BlokkCenter>
                <Content>
                    <Heading level="1" size="xlarge" spacing>
                        {children}
                    </Heading>

                    <StyledEllaForfra>
                        <EllaForfra />
                        <Laptop />
                    </StyledEllaForfra>
                </Content>
            </BlokkCenter>
        </StyledBannerEttersendelse>
    );
};
