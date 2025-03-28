import * as React from "react";
import {Dokumentasjon} from "./Dokumentasjon";
import {useTranslation} from "react-i18next";
import {Heading, Loader} from "@navikt/ds-react";
import {DigisosLanguageKey} from "../../lib/i18n/common.ts";
import useGruppe from "../../lib/hooks/dokumentasjon/useGruppe.ts";
import {GruppeKey} from "../../lib/hooks/dokumentasjon/useGrupper.ts";

const Gruppetittel: Record<GruppeKey, DigisosLanguageKey> = {
    [GruppeKey.Statsborgerskap]: "opplysninger.statsborgerskap.sporsmal",
    [GruppeKey.Arbeid]: "opplysninger.arbeid.sporsmal",
    [GruppeKey.Familie]: "opplysninger.familiesituasjon.sporsmal",
    [GruppeKey.Bosituasjon]: "opplysninger.bosituasjon.sporsmal",
    [GruppeKey.Inntekt]: "opplysninger.inntekt.sporsmal",
    [GruppeKey.Utgifter]: "opplysninger.utgifter.sporsmal",
    [GruppeKey.GenerelleVedlegg]: "opplysninger.generell.sporsmal",
    [GruppeKey.AndreUtgifter]: "opplysninger.ekstrainfo.sporsmal",
};

interface Props {
    gruppeKey: GruppeKey;
}

export const Gruppe = ({gruppeKey}: Props) => {
    const {t} = useTranslation();

    const {opplysninger, isLoading} = useGruppe(gruppeKey);

    if (isLoading) {
        return <Loader />;
    }
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
