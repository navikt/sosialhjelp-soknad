import * as React from "react";
import {Button, Loader} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {ForhandsvisningVedleggModal} from "./ForhandsvisningVedleggModal";
import {PlusIcon} from "@navikt/aksel-icons";
import {PdfConversionError} from "./UploadError";
import {usePDFConverter} from "../../../lib/hooks/dokumentasjon/usePDFConverter";
import {useDokumentasjonTekster} from "../../../lib/hooks/dokumentasjon/useDokumentasjonTekster";
import {DokumentasjonDtoType} from "../../../generated/new/model";

export const SUPPORTED_WITHOUT_CONVERSION = ["image/jpeg", "image/png", "application/pdf"];
export const SUPPORTED_WITH_CONVERSION = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel.sheet.binary.macroenabled.12",
    "text/csv",
    "text/plain",
];

export const DokumentUploader = ({
    doUpload,
    visSpinner,
    disabled,
    opplysningstype,
    resetAlerts,
}: {
    opplysningstype: DokumentasjonDtoType;
    disabled?: boolean;
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
    const {dokumentBeskrivelse} = useDokumentasjonTekster(opplysningstype);

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
                disabled={disabled}
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
                    header={dokumentBeskrivelse}
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
