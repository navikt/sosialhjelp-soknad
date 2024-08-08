import styled from "styled-components";
import {FormattedText} from "./FormattedText";
import {Felt} from "../../../generated/client/model";

const StyledList = styled.ul`
    padding-left: 1rem;
    margin-bottom: 1rem;
`;

export const ListOfValues = (props: {felter?: Felt[]}) => {
    if (!props.felter || props.felter.length === 0) return null;

    // FIXME: Hacker rundt uklar datastruktur. Dette funket før vi brukte typene fra Orval
    //        så jeg regner med det er harmløst å bare substitute med "" og sånt
    return (
        <StyledList>
            {props.felter.map(
                (felt) =>
                    felt.svar && (
                        <li key={felt.svar.value}>
                            <FormattedText value={felt.svar.value ?? ""} type={felt.svar.type} />
                        </li>
                    )
            )}
        </StyledList>
    );
};
