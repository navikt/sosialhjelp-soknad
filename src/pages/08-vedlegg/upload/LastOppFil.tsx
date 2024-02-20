import * as React from "react";
import {Button, Loader} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {Opplysning} from "../../../lib/opplysninger";
import {useFeatureFlags} from "../../../lib/featureFlags";
import {ForhandsvisningVedleggModal} from "./ForhandsvisningVedleggModal";
import {PlusIcon} from "@navikt/aksel-icons";
import {usePDFConverter} from "./usePDFConverter";
import {PdfConversionError} from "./UploadError";

export const isPdf = (file: Blob) => file.type === "application/pdf";

export const LastOppFil = ({
    doUpload,
    visSpinner,
    isDisabled,
    opplysning,
    resetAlerts,
}: {
    opplysning: Opplysning;
    isDisabled: boolean;
    visSpinner: boolean;
    doUpload: (file: Blob) => void;
    resetAlerts: () => void;
}) => {
    const {t} = useTranslation();
    const {tilgjengeliggjorFlereFilformater} = useFeatureFlags();
    const vedleggElement = React.useRef<HTMLInputElement>(null);
    const [previewFile, setPreviewFile] = React.useState<Blob | null>(null);
    const {conversionPending, conversionError, convertToPDF} = usePDFConverter();
    const isPending = visSpinner || conversionPending;

    if (conversionError) throw new PdfConversionError("conversion error", {cause: conversionError});

    const handleFileSelect = async ({target: {files}}: React.ChangeEvent<HTMLInputElement>) => {
        if (!files?.length) return;

        const file = files[0];

        setPreviewFile(isPdf(file) ? file : await convertToPDF(file));

        if (vedleggElement?.current) vedleggElement.current.value = "";
    };

    const uploadFiles = async () => previewFile && doUpload(previewFile);
    const deleteFile = () => setPreviewFile(null);

    const alwaysAllowedFormats = "image/jpeg,image/png,application/pdf";
    const devOnlyFormats =
        ",text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    return (
        <div className="pt-2">
            <Button
                variant="secondary"
                id={opplysning.type.replace(/\./g, "_") + "_lastopp_knapp"}
                disabled={isDisabled}
                onClick={() => {
                    resetAlerts();
                    vedleggElement?.current?.click();
                }}
                className="last-opp-vedlegg-knapp"
            >
                <div className={"flex gap-1 items-center"}>
                    <PlusIcon aria-label={""} /> {t("opplysninger.vedlegg.knapp.tekst")}
                    {isPending && <Loader className={"ml-1"} />}
                </div>
            </Button>
            <input
                aria-hidden
                id={opplysning.type.replace(/\./g, "_") + "_skjult_upload_input"}
                ref={vedleggElement}
                onChange={handleFileSelect}
                type="file"
                className="hidden"
                tabIndex={-1}
                accept={
                    window.navigator.platform.match(/iPad|iPhone|iPod/) !== null
                        ? "*"
                        : tilgjengeliggjorFlereFilformater
                        ? alwaysAllowedFormats + devOnlyFormats
                        : alwaysAllowedFormats
                }
            />
            {previewFile && (
                <ForhandsvisningVedleggModal
                    opplysningType={opplysning.type}
                    file={previewFile}
                    onAccept={() => uploadFiles().then(() => setPreviewFile(null))}
                    onClose={() => setPreviewFile(null)}
                    onDelete={deleteFile}
                />
            )}
        </div>
    );
};
