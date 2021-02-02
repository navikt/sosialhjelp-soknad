import * as React from "react";
import Hjelpetekst from "nav-frontend-hjelpetekst";

export const SporsmalHjelpetekst: React.FC<{tekster: any}> = ({tekster}) => {
    return <Hjelpetekst tittel={tekster.hjelpetekst.tittel}>{tekster.hjelpetekst.tekst}</Hjelpetekst>;
};

export const SporsmalInfotekst: React.FC<{tekster: any}> = ({tekster}) => {
    return (
        <div className="skjema-sporsmal__infotekst">
            {tekster.infotekst.tittel && (
                <h4 className="skjema-sporsmal__infotekst__tittel">{tekster.infotekst.tittel}</h4>
            )}
            {tekster.infotekst.tekst}
        </div>
    );
};
