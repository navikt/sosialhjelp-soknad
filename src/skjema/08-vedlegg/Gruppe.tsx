import * as React from "react";
import {Opplysning, VedleggGruppe} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerTypes";
import OpplysningView from "./OpplysningView";
import {useTranslation} from "react-i18next";
import {Heading, Panel} from "@navikt/ds-react";
import {Gruppetittel} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerUtils";

const GruppeView = ({gruppeKey, opplysninger}: {gruppeKey: VedleggGruppe; opplysninger: Opplysning[]}) => {
    const {t} = useTranslation();
    if (!opplysninger.length) return null;

    return (
        <Panel className={"!px-0"}>
            <Heading level={"3"} size={"xlarge"} className={"pb-6"}>
                {t(`${Gruppetittel[gruppeKey]}.sporsmal`)}
            </Heading>

            {opplysninger.map((opplysning, index: number) => (
                <OpplysningView key={index} opplysning={opplysning} gruppeIndex={index} />
            ))}
        </Panel>
    );
};

export default GruppeView;
