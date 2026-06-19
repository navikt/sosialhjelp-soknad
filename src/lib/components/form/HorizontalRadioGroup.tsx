import styled from "styled-components";
import {RadioGroup} from "@navikt/ds-react";

// RadioGroup from react-ds but styled as a horizontal full-width panel.
// Each radio row gets a card-like background. We keep .aksel-radio at its
// natural width:fit-content so the focus ring (drawn via ::after) correctly
// wraps the radio circle + label, not a stretched layout box.
export const HorizontalRadioGroup = styled(RadioGroup)`
    .aksel-radio {
        width: fit-content;
        min-width: 75%;
        padding: var(--ax-space-12) 1rem;
        margin: 0 0 1rem 0;
        border-radius: 5px;
        background-color: white;
    }
`;
