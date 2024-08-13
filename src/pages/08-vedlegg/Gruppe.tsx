import * as React from "react";
import {Dokumentasjon} from "./Dokumentasjon";
import {useTranslation} from "react-i18next";
import {Heading} from "@navikt/ds-react";
import {Opplysning} from "../../lib/opplysninger";
import {VedleggFrontendGruppe} from "../../generated/client/model";
import {DigisosLanguageKey} from "../../lib/i18n";

const Gruppetittel: Record<VedleggFrontendGruppe, DigisosLanguageKey> = {
    statsborgerskap: "opplysninger.statsborgerskap.sporsmal",
    arbeid: "opplysninger.arbeid.sporsmal",
    familie: "opplysninger.familiesituasjon.sporsmal",
    bosituasjon: "opplysninger.bosituasjon.sporsmal",
    inntekt: "opplysninger.inntekt.sporsmal",
    utgifter: "opplysninger.utgifter.sporsmal",
    "generelle vedlegg": "opplysninger.generell.sporsmal",
    "andre utgifter": "opplysninger.ekstrainfo.sporsmal",
} as const;

export const Gruppe = ({gruppeKey, opplysninger}: {gruppeKey: VedleggFrontendGruppe; opplysninger: Opplysning[]}) => {
    const {t} = useTranslation();

    return (
        <div className={"grid gap-4 py-4"}>
            <Heading level={"3"} size={"medium"} className={"pb-6"}>
                {t(`${Gruppetittel[gruppeKey]}`)}
            </Heading>

            {opplysninger.map((opplysning) => (
                <Dokumentasjon key={opplysning.type} opplysning={opplysning} />
            ))}
        </div>
    );
};
