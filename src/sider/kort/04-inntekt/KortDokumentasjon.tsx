import {useTranslation} from "react-i18next";
import useOkonomiskOpplysningMutation from "../../../lib/hooks/dokumentasjon/useOkonomiskOpplysningMutation.ts";
import {BodyShort, Heading, Loader} from "@navikt/ds-react";
import BelopBeskrivelse from "../../08-vedlegg/form/BelopBeskrivelse.tsx";
import {FileUploadBoxNoStyle} from "../../../lib/components/fileupload/FileUploadBox.tsx";
import React from "react";
import {BelopDto} from "../../../generated/new/model";
import {UploadByKategori} from "../../../lib/upload/new/UploadByKategori.tsx";
import {useNewUploadEnabled} from "../../../lib/hooks/featureToggles/useNewUploadEnabled.ts";
import {useSoknadId} from "../../../lib/hooks/common/useSoknadId.ts";
import {DokumentasjonDtoType} from "../../../generated/new/model";
import {DocumentProvider} from "../../../lib/upload/new/DocumentContext.tsx";

export const KortDokumentasjon = ({opplysningstype}: {opplysningstype: "FORMUE_BRUKSKONTO"}) => {
    const {t} = useTranslation("skjema");
    const soknadId = useSoknadId();
    const newUploadEnabled = useNewUploadEnabled();
    const {updateOkonomiskOpplysning, opplysning, isLoading} =
        useOkonomiskOpplysningMutation<BelopDto>(opplysningstype);

    if (isLoading) {
        return <Loader />;
    }
    const contextId = `${soknadId}-${DokumentasjonDtoType.FORMUE_BRUKSKONTO}`;
    return (
        <div className={"rounded-md bg-ax-bg-accent-soft p-8"}>
            <Heading level={"4"} size={"small"} spacing id={"kort-dokumentasjon-formue-saldo"}>
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
            {newUploadEnabled ? (
                <DocumentProvider contextId={contextId}>
                    <UploadByKategori
                        contextId={contextId}
                        describedBy={"kort-dokumentasjon-formue-saldo"}
                        kategori={DokumentasjonDtoType.FORMUE_BRUKSKONTO}
                        soknadId={soknadId}
                        hideAlreadyUploaded
                    />
                </DocumentProvider>
            ) : (
                <FileUploadBoxNoStyle
                    bunntekst={t("utbetalinger.inntekt.skattbar.kort_saldo_lastOpp")}
                    dokumentasjonType={opplysningstype}
                />
            )}
        </div>
    );
};
