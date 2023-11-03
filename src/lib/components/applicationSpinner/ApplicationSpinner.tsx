import {Loader} from "@navikt/ds-react";
import styled from "styled-components";

const StyledApplicationSpinner = styled.div`
    width: 100%;
    text-align: center;
    padding-top: 100px;
`;

export const ApplicationSpinner = () => (
    <StyledApplicationSpinner>
        <Loader size="2xlarge" />
    </StyledApplicationSpinner>
);
