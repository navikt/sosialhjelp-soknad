import {BodyShort} from "@navikt/ds-react";
import {useIntl} from "react-intl";
import styled from "styled-components";

const StyledSystemList = styled.ul`
    list-style: none;
    padding: 0.5rem 0 0.5rem 1rem;
    margin: 0;
    border-left: 1px solid var(--navds-color-gray-40);
`;

export const SystemData = (props: {felter?: {label: string; svar: string}[]}) => {
    const intl = useIntl();

    if (!props.felter || props.felter.length === 0) return null;

    return (
        <StyledSystemList>
            {props.felter.map((felt) => {
                return (
                    <li key={felt.label}>
                        <BodyShort>
                            {intl.formatMessage({id: felt.label})}: {felt.svar}
                        </BodyShort>
                    </li>
                );
            })}
        </StyledSystemList>
    );
};
