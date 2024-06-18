import * as React from "react";
import {DokumentUploader} from "./DokumentUploader";
import {OpplastetVedlegg} from "../OpplastetVedlegg";
import {Opplysning} from "../../../lib/opplysninger";
import {Alert, BodyShort} from "@navikt/ds-react";
import {UploadError} from "./UploadError";
import {FaroErrorBoundary} from "@grafana/faro-react";
import {AlreadyUploadedCheckbox} from "./AlreadyUploadedCheckbox";
import {useTranslation} from "react-i18next";
import {humanizeFilesize} from "../lib/humanizeFilesize";
import {useOpplysningTekster} from "../../../lib/hooks/dokumentasjon/useOpplysningTekster";
import {useVedlegg} from "../../../lib/hooks/dokumentasjon/useVedlegg";

export const Dokumenter = ({opplysning}: {opplysning: Opplysning}) => {
    const {t} = useTranslation();
    const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
    const {leggTilDokumentasjon} = useOpplysningTekster(opplysning.type);
    const {deleteDocument, documents, uploadDocument, error, isPending, maxUploadSize, currentUpload} = useVedlegg(
        opplysning.type
    );

    return (
        <div className={"space-y-2"}>
            <BodyShort size={"small"} className={"!mt-6"}>
                {leggTilDokumentasjon} (maks {humanizeFilesize(maxUploadSize)})
            </BodyShort>

            <FaroErrorBoundary fallback={(error, resetError) => <UploadError error={error} resetError={resetError} />}>
                <DokumentUploader
                    opplysning={opplysning}
                    isLoading={isPending}
                    visSpinner={!!opplysning.pendingLasterOppFil}
                    doUpload={async (file) => {
                        await uploadDocument(file);
                        setShowSuccessAlert(true);
                    }}
                    resetAlerts={() => setShowSuccessAlert(false)}
                />
            </FaroErrorBoundary>

            <ul className="vedleggsliste pb-2">
                {currentUpload && <BodyShort>Laster opp ({currentUpload.percent}%)</BodyShort>}
                {documents.map((fil) => (
                    <OpplastetVedlegg key={fil.dokumentId} dokument={fil} onDelete={deleteDocument} />
                ))}
            </ul>
            {showSuccessAlert && documents.length > 0 && (
                <Alert variant="success">{t("vedlegg.opplasting.suksess")}</Alert>
            )}
            {error && <Alert variant="error">{error}</Alert>}
            <AlreadyUploadedCheckbox opplysning={opplysning} disabled={!!documents.length || isPending} />
        </div>
    );
};
