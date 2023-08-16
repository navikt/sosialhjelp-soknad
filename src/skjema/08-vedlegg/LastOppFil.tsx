import * as React from "react";
import {Button, Loader} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {Opplysning} from "../../lib/opplysninger";
import {useFeatureFlags} from "../../lib/featureFlags";

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

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {files} = event.target;

        if (!files) return;

        [...files].forEach(doUpload);

        if (vedleggElement?.current) vedleggElement.current.value = "";
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
                onClick={() => {
                    resetAlerts();
                    vedleggElement?.current?.click();
                }}
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
        </div>
    );
};

export default LastOppFil;
