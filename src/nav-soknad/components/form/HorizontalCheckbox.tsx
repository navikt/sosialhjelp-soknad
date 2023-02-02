import styled from "styled-components";
import {Checkbox} from "@navikt/ds-react";

// Checkbox from react-ds but styled as a horizontal full-width panel.
export const HorizontalCheckbox = styled(Checkbox)`
    .navds-radio {
        width: 100%;
        border: 1px solid black;
        padding: 0 1rem;
        margin: 1rem 0 0 0;
        border-radius: 5px;
    }

    margin-bottom: 1rem !important;
`;
