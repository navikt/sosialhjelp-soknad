import styled from "styled-components";
import {RadioGroup} from "@navikt/ds-react";

// RadioGroup from react-ds but styled as a horizontal full-width panel.
export const HorizontalRadioGroup = styled(RadioGroup)`
    .navds-radio {
        width: 75%;
        padding: 0 1rem;
        margin: 0 0 1rem 0;
        border-radius: 5px;
        background-color: white;
    }
`;
