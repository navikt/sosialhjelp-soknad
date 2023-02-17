import * as React from "react";
import William from "../../../nav-soknad/components/svg/illustrasjoner/William";
import {TelefonData} from "./telefon/Telefon";
import {AdresseData} from "./adresse/Adresse";
import {SkjemaStegLegacy} from "../../../nav-soknad/components/SkjemaSteg/SkjemaStegLegacy";
import {digisosSkjemaConfig} from "../../../nav-soknad/components/SkjemaSteg/digisosSkjema";
import Sporsmal from "../../../nav-soknad/components/sporsmal/Sporsmal";
import {BasisPersonaliaData} from "./BasisPersonalia";
import {useTranslation} from "react-i18next";
import Kontonr from "./Kontonr";

const Personopplysninger = () => {
    const {t} = useTranslation("skjema");

    return (
        <SkjemaStegLegacy skjemaConfig={digisosSkjemaConfig} steg={"kontakt"} ikon={<William />}>
            <Sporsmal
                id={"soknadsmottaker"}
                sporsmal={t("kontakt.system.personalia.sporsmal")}
                infotekst={t("kontakt.system.personalia.infotekst.tekst")}
            >
                <BasisPersonaliaData />
            </Sporsmal>
            <Sporsmal sporsmal={t(`soknadsmottaker.sporsmal`)} hjelpetekst={t("soknadsmottaker.hjelpetekst.tekst")}>
                <AdresseData />
            </Sporsmal>
            <Sporsmal sporsmal={t("kontakt.telefon.sporsmal")} infotekst={t("kontakt.telefon.infotekst.tekst")}>
                <TelefonData />
            </Sporsmal>
            <Kontonr />
        </SkjemaStegLegacy>
    );
};

export default Personopplysninger;
