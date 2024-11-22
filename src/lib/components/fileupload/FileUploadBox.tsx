import React, {ChangeEvent} from "react";
import {Alert, BodyShort, Button, Heading, Loader} from "@navikt/ds-react";
import {FaroErrorBoundary} from "@grafana/faro-react";
import {PdfConversionError, UploadError} from "../../../sider/08-vedlegg/upload/UploadError";
import {OpplastetVedlegg} from "../../../sider/08-vedlegg/OpplastetVedlegg";
import {useTranslation} from "react-i18next";
import {usePDFConverter} from "../../hooks/dokumentasjon/usePDFConverter";
import {PlusIcon} from "@navikt/aksel-icons";
import {ForhandsvisningVedleggModal} from "../../../sider/08-vedlegg/upload/ForhandsvisningVedleggModal";
import {
    SUPPORTED_WITH_CONVERSION,
    SUPPORTED_WITHOUT_CONVERSION,
} from "../../../sider/08-vedlegg/upload/DokumentUploader";
import {useVedlegg} from "../../hooks/dokumentasjon/useVedlegg";
import {VedleggFrontendType} from "../../../generated/model";
//import {useValgtKategoriContext} from "../../../KortKategorierContextProvider.tsx";

interface Props {
    sporsmal: string;
    undertekst: string;
    dokumentasjonType: VedleggFrontendType;
}

const FileUploadBox = ({sporsmal, undertekst, dokumentasjonType}: Props): React.JSX.Element => {
    return (
        <div className={"rounded-md bg-surface-action-subtle p-8"}>
            <Heading level={"4"} size={"small"} spacing>
                {sporsmal}
            </Heading>
            <BodyShort spacing>{undertekst}</BodyShort>
            <Dokumenter dokumentasjonType={dokumentasjonType} />
        </div>
    );
};

const Dokumenter = ({dokumentasjonType}: {dokumentasjonType: VedleggFrontendType}) => {
    const {t} = useTranslation();
    //const {valgtKategoriData} = useValgtKategoriContext();
    //const dokumentasjonType = valgtKategoriData.valgtKategorier as VedleggFrontendType;

    const {
        deleteDocument,
        documents,
        uploadDocument,
        error,
        isPending: uploadPending,
        currentUpload,
    } = useVedlegg(dokumentasjonType);
    const {conversionPending} = usePDFConverter();
    const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
    const isPending = conversionPending || conversionPending;

    //console.log("Dokumenter dokumentasjonType: ", dokumentasjonType);
    //console.log("Dokumenter documents: ", documents);

    return (
        <div className={"space-y-2"}>
            <FaroErrorBoundary fallback={(error, resetError) => <UploadError error={error} resetError={resetError} />}>
                <DokumentUploader
                    isLoading={isPending}
                    visSpinner={uploadPending}
                    doUpload={async (file) => {
                        console.log("before uploadDocument");
                        await uploadDocument(file);
                        console.log("after uploadDocument before setShowSuccessAlert");
                        setShowSuccessAlert(true);
                        console.log("after setShowSuccessAlert");
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
    //steg,
}: {
    isLoading: boolean;
    visSpinner: boolean;
    doUpload: (document: File) => Promise<void>;
    resetAlerts: () => void;
    //steg: string;
}) => {
    const {t} = useTranslation();
    const vedleggElement = React.useRef<HTMLInputElement>(null);
    const [previewFile, setPreviewFile] = React.useState<File | null>(null);
    const {conversionPending, conversionError, convertToPDF} = usePDFConverter();
    const isPending = visSpinner || conversionPending;
    //const { valgtKategoriData, setValgtKategoriData } = useValgtKategoriContext();

    //console.log("DokumentUploader valgtKategoriData: ",valgtKategoriData)

    if (conversionError) throw new PdfConversionError(`conversion error: ${conversionError}`);

    const handleFileSelect = async ({target: {files}}: ChangeEvent<HTMLInputElement>) => {
        console.log("inside handleFileSelect before !files?.length");
        if (!files?.length) return;
        console.log("inside handleFileSelect after !files?.length");

        console.log("inside handleFileSelect before file");
        const file = files[0];
        console.log("inside handleFileSelect after file");

        console.log("inside handleFileSelect before SUPPORTED_WITHOUT_CONVERSION.includes");
        if (SUPPORTED_WITHOUT_CONVERSION.includes(file.type)) {
            console.log("inside handleFileSelect inside SUPPORTED_WITHOUT_CONVERSION.includes");
            setPreviewFile(file);
        } else {
            console.log(
                "inside handleFileSelect inside SUPPORTED_WITHOUT_CONVERSION.includes else befor setPreviewFile"
            );
            setPreviewFile(await convertToPDF(file));
            console.log(
                "inside handleFileSelect inside SUPPORTED_WITHOUT_CONVERSION.includes else after setPreviewFile"
            );
        }
        console.log("inside handleFileSelect before vedleggElement?.current");
        if (vedleggElement?.current) vedleggElement.current.value = "";
        console.log("inside handleFileSelect after vedleggElement?.current");
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
                    <PlusIcon aria-hidden={true} /> {t("opplysninger.vedlegg.knapp.tekst")}
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
                    header={"Dokumentasjon"}
                    file={previewFile}
                    onAccept={async () => {
                        console.log("before previewFile");
                        if (!previewFile) return;
                        console.log("after previewFile, before upload");
                        const upload = previewFile;
                        console.log("after upload, before setPreviewFile");
                        setPreviewFile(null);
                        console.log("after setPreviewFile, before doUpload");
                        await doUpload(upload);
                        console.log("after doUpload, before setValgtKategoriData");
                        //setValgtKategoriData({ valgtKategorier: "annet|annet" });
                        //console.log("after setValgtKategoriData")
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
