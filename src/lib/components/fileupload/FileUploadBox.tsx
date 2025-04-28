import React, {ChangeEvent} from "react";
import {Alert, BodyShort, Button, Heading, Loader} from "@navikt/ds-react";
import {FaroErrorBoundary} from "@grafana/faro-react";
import {PdfConversionError, UploadError} from "../../../sider/08-vedlegg/upload/UploadError";
import {OpplastetVedlegg} from "../../../sider/08-vedlegg/OpplastetVedlegg";
import {Trans, useTranslation} from "react-i18next";
import {usePDFConverter} from "../../hooks/dokumentasjon/usePDFConverter";
import {PlusIcon} from "@navikt/aksel-icons";
import {ForhandsvisningVedleggModal} from "../../../sider/08-vedlegg/upload/ForhandsvisningVedleggModal";
import {
    SUPPORTED_WITH_CONVERSION,
    SUPPORTED_WITHOUT_CONVERSION,
} from "../../../sider/08-vedlegg/upload/DokumentUploader";
import {useVedlegg} from "../../hooks/dokumentasjon/useVedlegg";
import {DokumentasjonDtoType} from "../../../generated/new/model";

type TranslationKeys = "begrunnelse.kort.behov.dokumentasjon.beskrivelse" | "situasjon.kort.dokumentasjon.description";

type ListeKeys = "situasjon.kort.dokumentasjon.liste" | "begrunnelse.kort.behov.dokumentasjon.liste";

interface Props {
    sporsmal?: string;
    undertekst?: TranslationKeys;
    liste?: ListeKeys;
    bunntekst?: string;
    dokumentasjonType: DokumentasjonDtoType;
}

export const FileUploadBoxNoStyle = ({
    sporsmal,
    undertekst,
    liste,
    bunntekst,
    dokumentasjonType,
}: Props): React.JSX.Element => {
    const {t} = useTranslation("skjema");
    const forslag = liste ? (t(liste, {returnObjects: true}) as string[]) : [];

    return (
        <>
            {sporsmal && (
                <Heading level={"4"} size={"small"} spacing>
                    {sporsmal}
                </Heading>
            )}
            {undertekst && <Trans i18nKey={undertekst} components={{br: <br />}} />}
            {forslag.length > 0 && (
                <ul className="list-disc pl-5">
                    {forslag.map((item, index) => (
                        <li key={index}>
                            <BodyShort>{item}</BodyShort>
                        </li>
                    ))}
                </ul>
            )}
            <BodyShort spacing>{bunntekst}</BodyShort>
            <Dokumenter dokumentasjonType={dokumentasjonType} />
        </>
    );
};

const FileUploadBox = ({sporsmal, undertekst, liste, dokumentasjonType}: Props): React.JSX.Element => {
    const {t} = useTranslation("skjema");
    const forslag = liste ? (t(liste, {returnObjects: true}) as string[]) : [];

    return (
        <div className={"rounded-md bg-surface-action-subtle p-8"}>
            {sporsmal && (
                <Heading level={"4"} size={"small"} spacing>
                    {sporsmal}
                </Heading>
            )}
            {undertekst && <Trans i18nKey={undertekst} components={{br: <br />}} />}
            {forslag.length > 0 && (
                <ul className="list-disc pl-5">
                    {forslag.map((item, index) => (
                        <li key={index}>
                            <BodyShort>{item}</BodyShort>
                        </li>
                    ))}
                </ul>
            )}
            <BodyShort spacing>{t("begrunnelse.kort.behov.dokumentasjon.bunntekst")}</BodyShort>
            <Dokumenter dokumentasjonType={dokumentasjonType} />
        </div>
    );
};

const Dokumenter = ({dokumentasjonType}: {dokumentasjonType: DokumentasjonDtoType}) => {
    const {t} = useTranslation();
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

    if (conversionError) throw new PdfConversionError(`conversion error: ${conversionError}`);

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
                className="last-opp-vedlegg-knapp bg-(--a-surface-default)!"
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
                    header={"Er det lesbart?"}
                    file={previewFile}
                    onAccept={async () => {
                        if (!previewFile) return;
                        const upload = previewFile;
                        setPreviewFile(null);
                        await doUpload(upload);
                    }}
                    onClose={() => setPreviewFile(null)}
                />
            )}
        </div>
    );
};

export default FileUploadBox;
