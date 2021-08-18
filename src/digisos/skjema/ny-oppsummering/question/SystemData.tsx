import {BodyShort, Label} from "@navikt/ds-react";
import styled from "styled-components";

const StyledSystemList = styled.ul`
    list-style: none;
    padding: 0.5rem 0 0.5rem 1rem;
    margin: 0;
    border-left: 1px solid var(--navds-color-gray-40);
`;

export const SystemData = (props: {title: string; values?: {key: string; value: string}[]}) => {
    return (
        <div>
            <Label spacing>{props.title}</Label>

            <StyledSystemList>
                {props.values?.map((val) => (
                    <li key={val.key}>
                        <BodyShort>
                            {val.key}: {val.value}
                        </BodyShort>
                    </li>
                ))}
            </StyledSystemList>
        </div>
    );
};
