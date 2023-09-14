import * as React from "react";
import {Button, Loader} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {Opplysning} from "../../lib/opplysninger";
import {useFeatureFlags} from "../../lib/featureFlags";
import {ForhandsvisningVedleggModal} from "./ForhandsvisningVedleggModal";

export const isPdf = (file: File) => file.type === "application/pdf";

const LastOppFil = ({
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
    const [showModal, setShowModal] = React.useState(false);

    const handleFileUpload = ({target: {files}}: React.ChangeEvent<HTMLInputElement>) => {
        if (!files?.length) return;

        setFilePreviews((prevFiles) => [...prevFiles, ...files]);
        setShowModal(true);

        if (vedleggElement?.current) vedleggElement.current.value = "";
    };

    const handleAccept = async () => {
        await Promise.all(filePreviews.map((file) => doUpload(file)));

        setFilePreviews([]);
        setShowModal(false);
    };

    const handleClose = () => {
        setShowModal(false);
        setFilePreviews([]);
    };

    const handleDelete = (index: number) => {
        const updatedFilePreviews = filePreviews.filter((_, i) => i !== index);
        setFilePreviews((prevFiles) => prevFiles.filter((_, i) => i !== index));

        if (updatedFilePreviews.length === 0) {
            handleClose();
        }
    };

    const alwaysAllowedFormats = "image/jpeg,image/png,application/pdf";
    const devOnlyFormats =
        ",text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    return (
        <div>
            <div className="pt-1">
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
                    + {t("opplysninger.vedlegg.knapp.tekst")}
                    {visSpinner && <Loader />}
                </Button>
            </div>
            <input
                aria-hidden
                id={opplysning.type.replace(/\./g, "_") + "_skjult_upload_input"}
                ref={vedleggElement}
                onChange={handleFileUpload}
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
                multiple
            />
            <ForhandsvisningVedleggModal
                filePreviews={filePreviews}
                showModal={showModal}
                onAccept={handleAccept}
                onClose={handleClose}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default LastOppFil;
