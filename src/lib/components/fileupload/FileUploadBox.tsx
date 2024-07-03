import React, {ChangeEvent} from "react";
import {Alert, BodyShort, Button, Heading, Loader} from "@navikt/ds-react";
import {FaroErrorBoundary} from "@grafana/faro-react";
import {PdfConversionError, UploadError} from "../../../pages/08-vedlegg/upload/UploadError";
import {OpplastetVedlegg} from "../../../pages/08-vedlegg/OpplastetVedlegg";
import {useTranslation} from "react-i18next";
import {usePDFConverter} from "../../hooks/dokumentasjon/usePDFConverter";
import {PlusIcon} from "@navikt/aksel-icons";
import {ForhandsvisningVedleggModal} from "../../../pages/08-vedlegg/upload/ForhandsvisningVedleggModal";
import {
    SUPPORTED_WITH_CONVERSION,
    SUPPORTED_WITHOUT_CONVERSION,
} from "../../../pages/08-vedlegg/upload/DokumentUploader";
import {useVedlegg} from "../../hooks/dokumentasjon/useVedlegg";

interface Props {
    sporsmal: string;
    undertekst: string;
}

const FileUploadBox = ({sporsmal, undertekst}: Props): React.JSX.Element => {
    return (
        <div className={"rounded-md bg-surface-action-subtle p-8"}>
            <Heading level={"4"} size={"small"} spacing>
                {sporsmal}
            </Heading>
            <BodyShort spacing>{undertekst}</BodyShort>
            <Dokumenter />
        </div>
    );
};

const Dokumenter = () => {
    const {t} = useTranslation();
    const {
        deleteDocument,
        documents,
        uploadDocument,
        error,
        isPending: uploadPending,
        currentUpload,
    } = useVedlegg("annet|annet");
    const {conversionPending} = usePDFConverter();
    const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
    const isPending = conversionPending || conversionPending;
    return (
        <div className={"space-y-2"}>
            <FaroErrorBoundary fallback={(error, resetError) => <UploadError error={error} resetError={resetError} />}>
                <DokumentUploader
                    isLoading={isPending}
                    visSpinner={uploadPending}
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
        </div>
    );
};

const DokumentUploader = ({
    doUpload,
    visSpinner,
    isLoading,
    resetAlerts,
}: {
    isLoading: boolean;
    visSpinner: boolean;
    doUpload: (document: File) => Promise<void>;
    resetAlerts: () => void;
}) => {
    const {t} = useTranslation();
    const vedleggElement = React.useRef<HTMLInputElement>(null);
    const [previewFile, setPreviewFile] = React.useState<File | null>(null);
    const {conversionPending, conversionError, convertToPDF} = usePDFConverter();
    const isPending = visSpinner || conversionPending;

    if (conversionError) throw new PdfConversionError("conversion error", {cause: conversionError});

    const handleFileSelect = async ({target: {files}}: ChangeEvent<HTMLInputElement>) => {
        if (!files?.length) return;

        const file = files[0];

        if (SUPPORTED_WITHOUT_CONVERSION.includes(file.type)) {
            setPreviewFile(file);
        } else {
            setPreviewFile(await convertToPDF(file));
        }

        if (vedleggElement?.current) vedleggElement.current.value = "";
    };

    return (
        <div className="pt-2">
            <Button
                variant="secondary"
                disabled={isLoading}
                onClick={() => {
                    resetAlerts();
                    vedleggElement?.current?.click();
                }}
                className="last-opp-vedlegg-knapp !bg-[var(--a-surface-default)]"
            >
                <div className={"flex gap-1 items-center"}>
                    <PlusIcon aria-label={""} /> {t("opplysninger.vedlegg.knapp.tekst")}
                    {isPending && <Loader className={"ml-1"} />}
                </div>
            </Button>
            <input
                aria-hidden
                ref={vedleggElement}
                onChange={handleFileSelect}
                type="file"
                className="hidden"
                tabIndex={-1}
                accept={[...SUPPORTED_WITHOUT_CONVERSION, ...SUPPORTED_WITH_CONVERSION].join(",")}
            />
            {previewFile && (
                <ForhandsvisningVedleggModal
                    header={"abc"}
                    file={previewFile}
                    onAccept={async () => {
                        if (!previewFile) return;
                        const upload = previewFile;
                        setPreviewFile(null);
                        await doUpload(upload);
                    }}
                    onClose={() => setPreviewFile(null)}
                    onDelete={() => {
                        setPreviewFile(null);
                    }}
                />
            )}
        </div>
    );
};

export default FileUploadBox;
