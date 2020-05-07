import * as React from "react";

import Hjelpetekst from "../hjelpetekst/Hjelpetekst";
import Infotekst from "nav-frontend-typografi/lib/infotekst";

interface InfotekstEnhanced {
    tekst: any;
    tittel: any;
}

interface Props {
    id: string;
    label: React.ReactNode;
    labelId?: string;
    hjelpetekst?: Infotekst & InfotekstEnhanced;
}

const LabelMedHjelpetekst: React.StatelessComponent<Props> = (props: Props) => {
    if (!props.hjelpetekst) {
        return <span id={props.labelId}>{props.label}</span>;
    }
    return (
        <span className="labelMedHjelpetekst">
            <span className="labelMedHjelpetekst__label" id={props.labelId}>
                {props.label}
            </span>
            <span className="labelMedHjelpetekst__hjelpetekst">
                <Hjelpetekst tittel={props.hjelpetekst.tittel} id={props.id}>
                    {props.hjelpetekst.tekst}
                </Hjelpetekst>
            </span>
        </span>
    );
};

export default LabelMedHjelpetekst;
