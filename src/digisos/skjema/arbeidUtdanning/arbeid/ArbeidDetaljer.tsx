import * as React from "react";
import {Arbeidsforhold} from "./arbeidTypes";
import {
    SingleLineDateElement,
    SingleLineElement,
    Systeminfo,
} from "../../../../nav-soknad/components/systeminfo/Systeminfo";

const ArbeidDetaljer: React.FunctionComponent<{arbeidsforhold: Arbeidsforhold}> = ({arbeidsforhold}) => {
    const {arbeidsgivernavn, stillingsprosent, fom, tom} = arbeidsforhold;
    const stillingsprosentVisning = stillingsprosent + "%";

    const systeminfoMap = [
        {key: "arbeidsforhold.arbeidsgivernavn.label", value: <SingleLineElement value={arbeidsgivernavn} />},
        {key: "arbeidsforhold.fom.label", value: <SingleLineDateElement value={fom} />},
    ];

    if (tom !== "" && tom !== null) {
        systeminfoMap.push({key: "arbeidsforhold.tom.label", value: <SingleLineDateElement value={tom} />});
    }
    systeminfoMap.push({
        key: "arbeidsforhold.stillingsprosent.label",
        value: <SingleLineElement value={stillingsprosentVisning} />,
    });

    return <Systeminfo systeminfoMap={systeminfoMap} />;
};

export default ArbeidDetaljer;
