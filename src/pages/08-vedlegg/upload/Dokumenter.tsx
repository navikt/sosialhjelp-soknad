import * as React from "react";
import {DokumentUploader} from "./DokumentUploader";
import {OpplastetVedlegg} from "../OpplastetVedlegg";
import {useVedlegg} from "../lib/hooks/useVedlegg";
import {Opplysning} from "../../../lib/opplysninger";
import {Alert, BodyShort} from "@navikt/ds-react";
import {UploadError} from "./UploadError";
import {FaroErrorBoundary} from "@grafana/faro-react";
import {AlreadyUploadedCheckbox} from "./AlreadyUploadedCheckbox";
import {useTranslation} from "react-i18next";
import {useOpplysningTekster} from "../lib/hooks/useOpplysningTekster";
import {humanizeFilesize} from "../lib/humanizeFilesize";

export const Dokumenter = ({opplysning}: {opplysning: Opplysning}) => {
    const {t} = useTranslation();
    const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
    const {leggTilDokumentasjon} = useOpplysningTekster(opplysning.type);
    const {deleteDocument, documents, uploadDocument, error, isPending, maxUploadSize, currentUpload} = useVedlegg(
        opplysning.type
    );

    return (
        <div className={"space-y-2"}>
            <BodyShort size={"small"}>
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
            {showSuccessAlert && <Alert variant="success">{t("vedlegg.opplasting.suksess")}</Alert>}
            {error && <Alert variant="error">{error}</Alert>}
            <AlreadyUploadedCheckbox opplysning={opplysning} disabled={!!documents.length || isPending} />
        </div>
    );
};
