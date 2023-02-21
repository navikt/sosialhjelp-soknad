import styled from "styled-components";
import {FormattedText} from "./FormattedText";
import {Felt} from "../../../generated/model";

const StyledSystemList = styled.ul`
    list-style: none;
    padding: 0.5rem 0 0.5rem 1rem;
    margin: 0;
    border-left: 1px solid var(--a-border-default);
    margin-bottom: 1rem;
`;

export const SystemDataMap = (props: {felter?: Felt[]}) => {
    if (!props.felter || props.felter.length === 0) return null;

    return (
        <>
            {props.felter.map((felt, index) => (
                <StyledSystemList key={index}>
                    {Object.entries(felt.labelSvarMap ?? {}).map((entry) => {
                        return (
                            <li key={entry[0]}>
                                <FormattedText
                                    value={entry[1]?.value ?? ""}
                                    type={entry[1]?.type ?? "TEKST"}
                                    label={entry[0]}
                                />
                            </li>
                        );
                    })}
                </StyledSystemList>
            ))}
        </>
    );
};
