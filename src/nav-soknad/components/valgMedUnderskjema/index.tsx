import * as React from "react";

interface Props {
    children: React.ReactNode;
    underskjema: React.ReactNode;
}

const ValgMedUnderskjema: React.StatelessComponent<Props> = ({children, underskjema}) => (
    <div className="valgMedUnderskjema">
        {React.Children.map(children, (child) => (
            <div className="valgMedUnderskjema__valg">{child}</div>
        ))}
        <div className="valgMedUnderskjema__skjema">{underskjema}</div>
    </div>
);

export default ValgMedUnderskjema;
