import * as React from "react";
import {Button, Loader} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {Opplysning} from "../../lib/opplysninger";

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

    const vedleggElement = React.useRef<HTMLInputElement>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {files} = event.target;

        if (!files) return;

        [...files].forEach(doUpload);

        // What does this do?
        if (vedleggElement?.current) vedleggElement.current.value = "";
    };

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
                        : "image/jpeg,image/png,application/pdf"
                }
                multiple
            />
        </div>
    );
};

export default LastOppFil;
