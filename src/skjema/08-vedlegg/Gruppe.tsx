import * as React from "react";
import {Opplysning, VedleggGruppe} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerTypes";
import OpplysningView from "./OpplysningView";
import {useTranslation} from "react-i18next";
import {Heading, Panel} from "@navikt/ds-react";
import {Gruppetittel} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerUtils";

const GruppeView = ({gruppeKey, gruppe}: {gruppeKey: VedleggGruppe; gruppe: Opplysning[]}) => {
    const {t} = useTranslation();
    if (!gruppe?.length) return null;

    return (
        <Panel className={"!px-0"}>
            <Heading level={"3"} size={"xlarge"} spacing>
                {t(`${Gruppetittel[gruppeKey]}.sporsmal`)}
            </Heading>

            {gruppe.map((okonomiskOpplysning: Opplysning, gruppeIndex: number) => (
                <OpplysningView key={gruppeIndex} opplysning={okonomiskOpplysning} gruppeIndex={gruppeIndex} />
            ))}
        </Panel>
    );
};

export default GruppeView;
