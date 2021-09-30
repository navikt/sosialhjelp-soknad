import {BodyShort} from "@navikt/ds-react";
import {useIntl} from "react-intl";
import styled from "styled-components";

const StyledList = styled.ul`
    padding-left: 1rem;
    margin-bottom: 1rem;
`;

export const ListOfValues = (props: {felter?: {label: string; svar: string}[]}) => {
    const intl = useIntl();

    if (!props.felter || props.felter.length === 0) return null;

    return (
        <StyledList>
            {props.felter.map((felt) => (
                <li key={felt.svar}>
                    <BodyShort>{intl.formatMessage({id: felt.svar})}</BodyShort>
                </li>
            ))}
        </StyledList>
    );
};
