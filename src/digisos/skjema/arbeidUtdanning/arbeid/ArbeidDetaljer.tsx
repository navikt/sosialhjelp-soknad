import * as React from "react";
import {Arbeidsforhold} from "./arbeidTypes";
import {
    SingleLineDateElement,
    OldSingleLineElement,
    OldSysteminfo,
} from "../../../../nav-soknad/components/systeminfo/Systeminfo";
import {useTranslation} from "react-i18next";

const ArbeidDetaljer: React.FunctionComponent<{arbeidsforhold: Arbeidsforhold}> = ({arbeidsforhold}) => {
    const {arbeidsgivernavn, stillingsprosent, fom, tom} = arbeidsforhold;
    const stillingsprosentVisning = stillingsprosent + "%";
    const {t} = useTranslation("skjema", {keyPrefix: "arbeidsforhold"});

    const systeminfoMap = [
        {
            key: t("arbeidsgivernavn.label"),
            value: <OldSingleLineElement value={arbeidsgivernavn} />,
        },
        {key: t("fom.label"), value: <SingleLineDateElement value={fom} />},
    ];

    if (tom !== "" && tom !== null) {
        systeminfoMap.push({
            key: t("tom.label"),
            value: <SingleLineDateElement value={tom} />,
        });
    }
    systeminfoMap.push({
        key: t("stillingsprosent.label"),
        value: <OldSingleLineElement value={stillingsprosentVisning} />,
    });

    return <OldSysteminfo systeminfoMap={systeminfoMap} />;
};

export default ArbeidDetaljer;
