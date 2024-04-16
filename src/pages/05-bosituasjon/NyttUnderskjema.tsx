import {UnmountClosed} from "react-collapse";
import styled from "styled-components";
import * as React from "react";

// Liten pil opp for å sette skjemaet i kontekst med forrige
const UnderskjemaArrow = styled.div`
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0.75rem 0.75rem 0.75rem;
    border-color: transparent transparent var(--a-surface-action-subtle) transparent;
    margin: 0;
    margin-left: 1rem;
    padding: 0;
`;

interface NyttUnderskjemaProps {
    hidden?: boolean;
    children: React.ReactNode;
}

const UnderskjemaContainer = styled.div`
    background-color: var(--a-surface-action-subtle);
    border-radius: 8px;
    padding: 1rem;
`;

// Jeg får ikke refaktorert Underskjema enda; for mye kode som skal refaktoreres avhenger av den.
export const NyttUnderskjema = ({hidden, children}: NyttUnderskjemaProps) => (
    <UnmountClosed isOpened={!hidden}>
        <UnderskjemaArrow />
        <UnderskjemaContainer>{children}</UnderskjemaContainer>
    </UnmountClosed>
);
