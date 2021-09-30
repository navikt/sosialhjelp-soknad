import {BodyShort} from "@navikt/ds-react";
import {useIntl} from "react-intl";
import styled from "styled-components";

const StyledSystemList = styled.ul`
    list-style: none;
    padding: 0.5rem 0 0.5rem 1rem;
    margin: 0;
    border-left: 1px solid var(--navds-color-gray-40);
    margin-bottom: 1rem;
`;

export const SystemDataMap = (props: {felter?: {labelSvarMap?: Record<string, string>}[]}) => {
    const intl = useIntl();

    if (!props.felter || props.felter.length === 0) return null;

    return (
        <StyledSystemList>
            {props.felter.map((felt) => {
                return Object.entries(felt.labelSvarMap ?? {}).map((entry) => {
                    return (
                        <li key={entry[0]}>
                            <BodyShort>
                                {intl.formatMessage({id: entry[0]})}: {entry[1]}
                            </BodyShort>
                        </li>
                    );
                });
            })}
        </StyledSystemList>
    );
};
