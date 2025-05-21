import {useState} from "react";
import {Alert, BodyShort} from "@navikt/ds-react";
import {FaroErrorBoundary} from "@grafana/faro-react";
import {useTranslation} from "react-i18next";

import {DokumentUploader} from "./DokumentUploader";
import {OpplastetVedlegg} from "../OpplastetVedlegg";
import {UploadError} from "./UploadError";
import {AlreadyUploadedCheckbox} from "./AlreadyUploadedCheckbox";
import {useDokumentasjonTekster} from "../../../lib/hooks/dokumentasjon/useDokumentasjonTekster";
import {useVedlegg} from "../../../lib/hooks/dokumentasjon/useVedlegg";
import {DokumentasjonDtoType} from "../../../generated/new/model";
import useAlleredeLevert from "../../../lib/hooks/dokumentasjon/useAlleredeLevert.ts";

export const Dokumenter = ({opplysningstype}: {opplysningstype: DokumentasjonDtoType}) => {
    const {t} = useTranslation();
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const {dokumentBeskrivelse} = useDokumentasjonTekster(opplysningstype);
    const {deleteDocument, documents, uploadDocument, error, isPending, currentUpload} = useVedlegg(opplysningstype);

    const {updateAlleredeLevert, alleredeLevert} = useAlleredeLevert(opplysningstype);
    return (
        <div className={"space-y-2"}>
            <BodyShort size={"small"} className={"mt-6!"}>
                {dokumentBeskrivelse}
            </BodyShort>

            <FaroErrorBoundary fallback={(error, resetError) => <UploadError error={error} resetError={resetError} />}>
                <DokumentUploader
                    opplysningstype={opplysningstype}
                    disabled={isPending || alleredeLevert}
                    visSpinner={isPending}
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
            <AlreadyUploadedCheckbox
                opplysningstype={opplysningstype}
                disabled={!!documents.length || isPending}
                alleredeLevert={alleredeLevert}
                updateAlleredeLevert={updateAlleredeLevert}
            />
        </div>
    );
};
