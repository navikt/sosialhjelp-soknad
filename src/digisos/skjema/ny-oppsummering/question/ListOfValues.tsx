import styled from "styled-components";
import {Felt} from "../../../redux/oppsummering/oppsummeringTypes";
import {FormattedText} from "./FormattedText";

const StyledList = styled.ul`
    padding-left: 1rem;
    margin-bottom: 1rem;
`;

export const ListOfValues = (props: {felter?: Felt[]}) => {
    if (!props.felter || props.felter.length === 0) return null;

    return (
        <StyledList>
            {props.felter.map((felt) => (
                <li key={felt.svar.value}>
                    <FormattedText value={felt.svar.value} type={felt.svar.type} />
                </li>
            ))}
        </StyledList>
    );
};
