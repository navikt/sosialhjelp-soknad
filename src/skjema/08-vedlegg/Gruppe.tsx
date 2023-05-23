import * as React from "react";
import {Opplysning, VedleggGruppe} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerTypes";
import OpplysningView from "./OpplysningView";
import {useTranslation} from "react-i18next";
import {Heading, Panel} from "@navikt/ds-react";

const Gruppetittel: Record<VedleggGruppe, string> = {
    statsborgerskap: "opplysninger.statsborgerskap",
    arbeid: "opplysninger.arbeid",
    familie: "opplysninger.familiesituasjon",
    bosituasjon: "opplysninger.bosituasjon",
    inntekt: "opplysninger.inntekt",
    utgifter: "opplysninger.utgifter",
    "generelle vedlegg": "opplysninger.generell",
    "andre utgifter": "opplysninger.ekstrainfo",
    ukjent: "opplysninger.ukjent",
};
const GruppeView = ({gruppeKey, opplysninger}: {gruppeKey: VedleggGruppe; opplysninger: Opplysning[]}) => {
    const {t} = useTranslation();
    if (!opplysninger.length) return null;

    return (
        <Panel className={"!px-0"}>
            <Heading level={"3"} size={"xlarge"} className={"pb-6"}>
                {t(`${Gruppetittel[gruppeKey]}.sporsmal`)}
            </Heading>

            {opplysninger.map((opplysning) => (
                <OpplysningView key={opplysning.type} opplysning={opplysning} />
            ))}
        </Panel>
    );
};

export default GruppeView;
