import * as React from "react";
import {Dokumentasjon} from "./Dokumentasjon";
import {useTranslation} from "react-i18next";
import {Heading, Panel} from "@navikt/ds-react";
import {Opplysning} from "../../lib/opplysninger";
import {VedleggFrontendGruppe} from "../../generated/model";

const Gruppetittel: Record<VedleggFrontendGruppe, string> = {
    statsborgerskap: "opplysninger.statsborgerskap",
    arbeid: "opplysninger.arbeid",
    familie: "opplysninger.familiesituasjon",
    bosituasjon: "opplysninger.bosituasjon",
    inntekt: "opplysninger.inntekt",
    utgifter: "opplysninger.utgifter",
    "generelle vedlegg": "opplysninger.generell",
    "andre utgifter": "opplysninger.ekstrainfo",
};

export const Gruppe = ({gruppeKey, opplysninger}: {gruppeKey: VedleggFrontendGruppe; opplysninger: Opplysning[]}) => {
    const {t} = useTranslation();

    return (
        <Panel className={"!px-0"} style={{display: "grid", gap: "1rem"}}>
            <Heading level={"3"} size={"medium"} className={"pb-6"}>
                {t(`${Gruppetittel[gruppeKey]}.sporsmal`)}
            </Heading>

            {opplysninger.map((opplysning) => (
                <Dokumentasjon key={opplysning.type} opplysning={opplysning} />
            ))}
        </Panel>
    );
};
