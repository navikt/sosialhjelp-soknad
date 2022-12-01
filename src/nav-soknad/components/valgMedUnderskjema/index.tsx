import * as React from "react";

interface ValgMedUnderskjemaProps {
    children: React.ReactNode;
    underskjema: React.ReactNode;
}

const ValgMedUnderskjema = ({children, underskjema}: ValgMedUnderskjemaProps) => (
    <div className="valgMedUnderskjema">
        {React.Children.map(children, (child) => (
            <div className="valgMedUnderskjema__valg">{child}</div>
        ))}
        <div className="valgMedUnderskjema__skjema">{underskjema}</div>
    </div>
);

export default ValgMedUnderskjema;
