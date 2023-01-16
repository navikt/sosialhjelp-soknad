import * as React from "react";
import {Arbeidsforhold} from "./arbeidTypes";
import {
    SingleLineDateElement,
    SingleLineElement,
    Systeminfo,
} from "../../../../nav-soknad/components/systeminfo/Systeminfo";
import {FormattedMessage} from "react-intl";

const ArbeidDetaljer: React.FunctionComponent<{arbeidsforhold: Arbeidsforhold}> = ({arbeidsforhold}) => {
    const {arbeidsgivernavn, stillingsprosent, fom, tom} = arbeidsforhold;
    const stillingsprosentVisning = stillingsprosent + "%";

    const systeminfoMap = [
        {
            key: <FormattedMessage id={"arbeidsforhold.arbeidsgivernavn.label"} />,
            value: <SingleLineElement value={arbeidsgivernavn} />,
        },
        {key: <FormattedMessage id={"arbeidsforhold.fom.label"} />, value: <SingleLineDateElement value={fom} />},
    ];

    if (tom !== "" && tom !== null) {
        systeminfoMap.push({
            key: <FormattedMessage id={"arbeidsforhold.tom.label"} />,
            value: <SingleLineDateElement value={tom} />,
        });
    }
    systeminfoMap.push({
        key: <FormattedMessage id={"arbeidsforhold.stillingsprosent.label"} />,
        value: <SingleLineElement value={stillingsprosentVisning} />,
    });

    return <Systeminfo systeminfoMap={systeminfoMap} />;
};

export default ArbeidDetaljer;
