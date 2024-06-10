import * as React from "react";
import {Button, Loader} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {Opplysning} from "../../../lib/opplysninger";
import {ForhandsvisningVedleggModal} from "./ForhandsvisningVedleggModal";
import {PlusIcon} from "@navikt/aksel-icons";
import {PdfConversionError} from "./UploadError";
import {usePDFConverter} from "../../../lib/hooks/dokumentasjon/usePDFConverter";

export const SUPPORTED_WITHOUT_CONVERSION = ["image/jpeg", "image/png", "application/pdf"];
export const SUPPORTED_WITH_CONVERSION = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.dokument",
    "application/vnd.ms-excel.sheet.binary.macroenabled.12",
    "text/csv",
    "text/plain",
];

export const DokumentUploader = ({
    doUpload,
    visSpinner,
    isLoading,
    opplysning,
    resetAlerts,
}: {
    opplysning: Opplysning;
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

    const handleFileSelect = async ({target: {files}}: React.ChangeEvent<HTMLInputElement>) => {
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
                    opplysningType={opplysning.type}
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
