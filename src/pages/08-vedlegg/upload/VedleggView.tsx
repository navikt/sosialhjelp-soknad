import * as React from "react";
import {useEffect, useRef} from "react";
import {LastOppFil} from "./LastOppFil";
import {OpplastetVedlegg} from "../OpplastetVedlegg";
import {VedleggFrontendVedleggStatus} from "../../../generated/model";
import {useVedlegg} from "./useVedlegg";
import {Opplysning} from "../../../lib/opplysninger";
import {Alert, BodyShort} from "@navikt/ds-react";
import {UploadError} from "./UploadError";
import {FaroErrorBoundary} from "@grafana/faro-react";
import {AlreadyUploadedCheckbox} from "./AlreadyUploadedCheckbox";
import {useTranslation} from "react-i18next";
import {useOpplysningTekster} from "../useOpplysningTekster";

export const VedleggView = ({opplysning}: {opplysning: Opplysning}) => {
    const {t} = useTranslation();
    const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
    const [showErrorAlert, setShowErrorAlert] = React.useState(false);
    const previousErrorRef = useRef<string | null | undefined>();
    const {leggTilDokumentasjon} = useOpplysningTekster(opplysning.type);
    const {deleteFile, files, upload, error, loading} = useVedlegg(opplysning);

    useEffect(() => {
        if (error && error !== previousErrorRef.current) {
            setShowErrorAlert(true);
        } else if (!error) {
            setShowErrorAlert(false);
        }
        previousErrorRef.current = error;
    }, [error]);

    return (
        <div className={"space-y-2"}>
            <BodyShort size={"small"}>{leggTilDokumentasjon}</BodyShort>

            <FaroErrorBoundary fallback={(error, resetError) => <UploadError error={error} resetError={resetError} />}>
                <LastOppFil
                    opplysning={opplysning}
                    isDisabled={
                        loading || opplysning.vedleggStatus === VedleggFrontendVedleggStatus.VedleggAlleredeSendt
                    }
                    visSpinner={!!opplysning.pendingLasterOppFil}
                    doUpload={async (file) => {
                        await upload(file);
                        setShowSuccessAlert(true);
                    }}
                    resetAlerts={() => {
                        setShowSuccessAlert(false);
                        setShowErrorAlert(false);
                    }}
                />
            </FaroErrorBoundary>

            <ul className="vedleggsliste pb-2">
                {files.map((fil) => (
                    <OpplastetVedlegg
                        key={fil.uuid}
                        fil={fil}
                        onDelete={() => {
                            deleteFile(fil.uuid);
                            setShowSuccessAlert(false);
                        }}
                    />
                ))}
            </ul>
            {showSuccessAlert && <Alert variant="success">{t("vedlegg.opplasting.suksess")}</Alert>}
            {showErrorAlert && <Alert variant="error">{error}</Alert>}
            <AlreadyUploadedCheckbox opplysning={opplysning} disabled={!!files.length || loading} />
        </div>
    );
};
