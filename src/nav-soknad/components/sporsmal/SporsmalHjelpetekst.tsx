import * as React from "react";
import Hjelpetekst from "../hjelpetekst/Hjelpetekst";

const SporsmalHjelpetekst: React.StatelessComponent<{tekster: any; legendId: string}> = ({tekster, legendId}) => {
    return (
        <span>
            {tekster.hjelpetekst && (
                <span>
                    <span className="kunSkjermleser" id={`tooltip-hjelpetekst_${legendId}`}>
                        {tekster.hjelpetekst.tekst}
                    </span>
                    <Hjelpetekst tittel={tekster.hjelpetekst.tittel} id={`hjelpetekst_${legendId}`}>
                        {tekster.hjelpetekst.tekst}
                    </Hjelpetekst>
                </span>
            )}
            {tekster.infotekst && (
                <div className="skjema-sporsmal__infotekst">
                    {tekster.infotekst.tittel && (
                        <h4 className="skjema-sporsmal__infotekst__tittel">{tekster.infotekst.tittel}</h4>
                    )}
                    {tekster.infotekst.tekst}
                </div>
            )}
        </span>
    );
};

export default SporsmalHjelpetekst;
