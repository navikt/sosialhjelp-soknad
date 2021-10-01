import styled from "styled-components";
import {Felt} from "../../../redux/oppsummering/oppsummeringTypes";
import {FormattedText} from "./FormattedText";

const StyledSystemList = styled.ul`
    list-style: none;
    padding: 0.5rem 0 0.5rem 1rem;
    margin: 0;
    border-left: 1px solid var(--navds-color-gray-40);
    margin-bottom: 1rem;
`;

export const SystemDataMap = (props: {felter?: Felt[]}) => {
    if (!props.felter || props.felter.length === 0) return null;

    return (
        <StyledSystemList>
            {props.felter.map((felt) => {
                return Object.entries(felt.labelSvarMap ?? {}).map((entry) => {
                    return (
                        <li key={entry[0]}>
                            <FormattedText
                                value={entry[1]?.value ?? ""}
                                type={entry[1]?.type ?? "TEKST"}
                                label={entry[0]}
                            />
                        </li>
                    );
                });
            })}
        </StyledSystemList>
    );
};
