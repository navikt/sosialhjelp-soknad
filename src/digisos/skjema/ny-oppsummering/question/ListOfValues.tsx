import {BodyShort, Label} from "@navikt/ds-react";
import styled from "styled-components";
import {Warning} from "./Warning";

const StyledList = styled.ul`
    padding-left: 1rem;
`;

export const ListOfValues = (props: {title: string; values?: string[]; freeText?: string}) => {
    return (
        <div>
            <Label spacing>{props.title}</Label>

            {props.values ? (
                <StyledList>
                    {props.values.map((value) => (
                        <li key={value}>
                            <BodyShort>{value}</BodyShort>
                        </li>
                    ))}
                    {props.freeText && (
                        <ul>
                            <li>
                                <BodyShort>{props.freeText}</BodyShort>
                            </li>
                        </ul>
                    )}
                </StyledList>
            ) : (
                <Warning />
            )}
        </div>
    );
};
