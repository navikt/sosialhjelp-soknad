import * as React from "react";
import EllaForfra from "../../nav-soknad/components/svg/EllaForfra";
import styled from "styled-components";
import {Heading} from "@navikt/ds-react";
import {BlokkCenter} from "./BlokkCenter";

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

const BannerEttersendelse = ({children}: {children: React.ReactNode}) => {
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

const Laptop = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="33" viewBox="0 0 50 33" className="laptop">
        <defs>
            <path id="a" d="M1.416 2.569V.041H.036v2.528h1.38z" />
        </defs>
        <g fill="none" fillRule="evenodd">
            <path fill="#78706A" d="M1.111 28.6h47.778v1.1H1.111z" />
            <path
                fill="#ACB3BB"
                d="M1 29.15h48a1 1 0 0 1 1 1v.925A1.925 1.925 0 0 1 48.075 33H1.925A1.925 1.925 0 0 1 0 31.075v-.925a1 1 0 0 1 1-1zM0 0h50v28.6H0z"
            />
            <path fill="#78706A" d="M1.124 30.871h1.124v1H1.124zM2.809 30.871h1.124v1H2.809z" />
            <path
                fill="#FFF"
                d="M16.854 16.762l1.091-2.529h1.048l-1.09 2.529zM30.318 16.762l1.077-2.529h.571l-1.077 2.529z"
            />
            <g transform="translate(32.4 14.193)">
                <mask id="b" fill="#fff">
                    <use href="#a" />
                </mask>
                <path fill="#FFF" d="M.036 2.569L1.113.041h.303L.34 2.569z" mask="url(#b)" />
            </g>
            <path
                fill="#FEFEFE"
                d="M24.773 19.577c-2.947 0-5.338-2.237-5.338-4.998 0-2.76 2.39-4.998 5.338-4.998 2.949 0 5.339 2.238 5.339 4.998 0 2.76-2.39 4.998-5.339 4.998zm4.554-5.344h-.95s-.065 0-.088.054l-.525 1.506-.525-1.506c-.023-.054-.089-.054-.089-.054h-1.824c-.04 0-.073.031-.073.068v.511c0-.405-.46-.579-.73-.579-.605 0-1.01.373-1.135.94-.007-.376-.04-.511-.149-.649a.68.68 0 0 0-.2-.171c-.16-.089-.305-.12-.616-.12h-.364s-.066 0-.09.054l-.331.77v-.756c0-.037-.033-.068-.073-.068h-.844s-.065 0-.088.054l-.345.801s-.035.08.044.08h.324v1.526c0 .038.032.068.073.068h.836c.04 0 .073-.03.073-.068v-1.526h.326c.187 0 .227.005.3.037a.204.204 0 0 1 .104.083c.044.077.055.17.055.446v.96c0 .038.033.068.073.068h.802s.09 0 .126-.084l.178-.411c.236.31.625.495 1.109.495h.105s.091 0 .127-.084l.31-.718v.734c0 .038.033.068.073.068h.818s.09 0 .127-.084c0 0 .327-.761.328-.767.013-.063-.072-.063-.072-.063h-.292v-1.306l.919 2.136c.036.084.126.084.126.084h.967s.091 0 .127-.084l1.02-2.363c.035-.082-.067-.082-.067-.082zm-4.074 1.615h-.55c-.219 0-.397-.166-.397-.371s.178-.372.397-.372h.154c.218 0 .396.167.396.372v.37z"
            />
        </g>
    </svg>
);

export default BannerEttersendelse;
