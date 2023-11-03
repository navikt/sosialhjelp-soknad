import * as React from "react";
import styled from "styled-components";

const LoaderBar = styled.div`
    width: 100%;

    .bar {
        height: 18px;
        border-radius: 2px;
        margin-bottom: 8px;
        background-color: #e9e7e7;
        animation-name: bar;
        animation-duration: 1200ms;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;

        &__narrow {
            width: 55%;
        }

        &__short_delay {
            animation-delay: 300ms;
        }

        &__long_delay {
            animation-delay: 600ms;
        }
    }

    /* Safari 4.0 - 8.0 */
    @-webkit-keyframes bar {
        0%,
        100% {
            background-color: #e9e7e7;
        }
        50% {
            background-color: #dfdeda;
        }
    }

    /* Standard syntax */
    @keyframes bar {
        0%,
        100% {
            background-color: #e9e7e7;
        }
        50% {
            background-color: #dfdeda;
        }
    }
`;

interface Props {
    lines?: number;
    style?: object;
}

const bars = (lines: number): React.ReactNode[] => {
    let barNumber = 0;
    const divs: React.ReactNode[] = [];
    for (let index = 0; index < lines; index++) {
        if (barNumber === 0) {
            divs.push(<div className="bar" key={index} />);
        }
        if (barNumber === 1) {
            divs.push(<div className="bar bar__short_delay" key={index} />);
        }
        if (barNumber === 2) {
            divs.push(<div className="bar bar__long_delay bar__narrow" key={index} />);
        }
        barNumber++;
        if (barNumber === 3) {
            barNumber = 0;
        }
    }
    return divs;
};

export const TextPlaceholder: React.FunctionComponent<Props> = ({lines = 3, style}) => (
    <LoaderBar style={style}>{bars(lines)}</LoaderBar>
);
