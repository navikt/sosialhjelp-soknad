import * as React from "react";
import {Button, Loader} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {Opplysning} from "../../lib/opplysninger";
import {useFeatureFlags} from "../../lib/featureFlags";
import {ForhandsvisningVedleggModal} from "./ForhandsvisningVedleggModal";
import {PlusIcon} from "@navikt/aksel-icons";

export const isPdf = (file: File) => file.type === "application/pdf";

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
    doUpload: (file: File) => void;
    resetAlerts: () => void;
}) => {
    const {t} = useTranslation();
    const {tilgjengeliggjorFlereFilformater} = useFeatureFlags();
    const vedleggElement = React.useRef<HTMLInputElement>(null);
    const [filePreviews, setFilePreviews] = React.useState<File[]>([]);

    const handleFileSelect = ({target: {files}}: React.ChangeEvent<HTMLInputElement>) => {
        if (!files?.length) return;
        const fileList = Array.from(files || []);
        setFilePreviews((prevFiles) => [...prevFiles, ...fileList]);
        if (vedleggElement?.current) vedleggElement.current.value = "";
    };

    const uploadFiles = async () => Promise.all(filePreviews.map((file) => doUpload(file)));
    const deleteFile = (index: number) => setFilePreviews((prevFiles) => prevFiles.filter((_, i) => i !== index));

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
                    <PlusIcon /> {t("opplysninger.vedlegg.knapp.tekst")}
                    {visSpinner && <Loader className={"ml-1"} />}
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
            <ForhandsvisningVedleggModal
                filePreviews={filePreviews}
                showModal={!!filePreviews?.length}
                onAccept={() => uploadFiles().then(() => setFilePreviews([]))}
                onClose={() => setFilePreviews([])}
                onDelete={deleteFile}
            />
        </div>
    );
};
