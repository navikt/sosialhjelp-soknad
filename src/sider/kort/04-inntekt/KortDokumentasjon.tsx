import {useTranslation} from "react-i18next";
import useOkonomiskOpplysningMutation from "../../../lib/hooks/dokumentasjon/useOkonomiskOpplysningMutation.ts";
import {BodyShort, Heading, Loader} from "@navikt/ds-react";
import BelopBeskrivelse from "../../08-vedlegg/form/BelopBeskrivelse.tsx";
import {FileUploadBoxNoStyle} from "../../../lib/components/fileupload/FileUploadBox.tsx";
import React from "react";
import {BelopDto} from "../../../generated/new/model/belopDto.ts";

export const KortDokumentasjon = ({opplysningstype}: {opplysningstype: "FORMUE_BRUKSKONTO"}) => {
    const {t} = useTranslation("skjema");
    const {updateOkonomiskOpplysning, opplysning, isLoading} =
        useOkonomiskOpplysningMutation<BelopDto>(opplysningstype);

    if (isLoading) {
        return <Loader />;
    }
    return (
        <div className={"rounded-md bg-surface-action-subtle p-8"}>
            <Heading level={"4"} size={"small"} spacing>
                {t("utbetalinger.inntekt.skattbar.kort_saldo_tittel")}
            </Heading>
            <BodyShort spacing>{t("utbetalinger.inntekt.skattbar.kort_saldo_undertekst")}</BodyShort>
            <BelopBeskrivelse
                opplysningstype={opplysningstype}
                excludeBeskrivelse
                opplysning={opplysning}
                mutate={updateOkonomiskOpplysning}
                belopLabel={
                    <span style={{fontSize: 16, fontWeight: "normal"}}>
                        {t("utbetalinger.inntekt.skattbar.kort_saldo_saldo")}
                    </span>
                }
                leggTilTekst={t("utbetalinger.inntekt.skattbar.kort_saldo_leggTil")}
            />
            <FileUploadBoxNoStyle
                bunntekst={t("utbetalinger.inntekt.skattbar.kort_saldo_lastOpp")}
                dokumentasjonType={opplysningstype}
            />
        </div>
    );
};
