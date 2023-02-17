import styled from "styled-components";
import {FormattedText} from "./FormattedText";
import {Felt} from "../../../../generated/model";

const StyledSystemList = styled.ul`
    list-style: none;
    padding: 0.5rem 0 0.5rem 1rem;
    margin: 0;
    border-left: 1px solid var(--a-border-default);
    margin-bottom: 1rem;
`;

export const SystemData = (props: {felter?: Felt[]}) => {
    if (!props.felter || props.felter.length === 0) return null;

    return (
        <StyledSystemList>
            {props.felter.map((felt) => {
                return (
                    felt.svar && (
                        <li key={felt.label}>
                            <FormattedText value={felt.svar.value ?? ""} type={felt.svar.type} label={felt.label} />
                        </li>
                    )
                );
            })}
        </StyledSystemList>
    );
};
