import * as React from "react";
import {Button, Loader} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {Opplysning} from "../../lib/opplysninger";
import {useFeatureFlags} from "../../lib/featureFlags";
import {ForhandsvisningVedleggModal} from "./ForhandsvisningVedleggModal";

const LastOppFil = ({
    doUpload,
    visSpinner,
    isDisabled,
    opplysning,
}: {
    opplysning: Opplysning;
    isDisabled: boolean;
    visSpinner: boolean;
    doUpload: (file: File) => void;
}) => {
    const {t} = useTranslation();
    const {tilgjengeliggjorFlereFilformater} = useFeatureFlags();

    const vedleggElement = React.useRef<HTMLInputElement>(null);
    const [filePreviews, setFilePreviews] = React.useState<Array<{file: File; isPDF: boolean}>>([]);
    const [showModal, setShowModal] = React.useState(false);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {files} = event.target;

        if (!files || files.length === 0) return;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileType = file.type;
            const isPDF = fileType === "application/pdf";

            setFilePreviews((prevFiles) => [...prevFiles, {file, isPDF}]);
        }

        setShowModal(true);

        if (vedleggElement?.current) vedleggElement.current.value = "";
    };

    const handleAccept = async () => {
        await Promise.all(filePreviews.map((filePreview) => doUpload(filePreview.file)));

        setFilePreviews([]);
        setShowModal(false);
    };

    const handleClose = () => {
        setShowModal(false);
        setFilePreviews([]);
    };

    const alwaysAllowedFormats = "image/jpeg,image/png,application/pdf";
    const devOnlyFormats =
        ",text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    return (
        <div>
            <Button
                variant="secondary"
                id={opplysning.type.replace(/\./g, "_") + "_lastopp_knapp"}
                disabled={isDisabled}
                onClick={() => vedleggElement?.current?.click()}
                className="last-opp-vedlegg-knapp"
            >
                + {t("opplysninger.vedlegg.knapp.tekst")}
                {visSpinner && <Loader />}
            </Button>
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
                handleAccept={handleAccept}
                handleClose={handleClose}
            />
        </div>
    );
};

export default LastOppFil;
