import * as React from "react";
import {useEffect, useRef} from "react";
import {LastOppFil} from "./LastOppFil";
import {OpplastetVedlegg} from "../OpplastetVedlegg";
import {VedleggFrontendVedleggStatus} from "../../../generated/model";
import {useVedlegg} from "./useVedlegg";
import {Opplysning} from "../../../lib/opplysninger";
import {Alert} from "@navikt/ds-react";
import {UploadError} from "./UploadError";
import {FaroErrorBoundary} from "@grafana/faro-react";
import {AlreadyUploadedCheckbox} from "./AlreadyUploadedCheckbox";

export const VedleggView = ({opplysning}: {opplysning: Opplysning}) => {
    const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
    const [showErrorAlert, setShowErrorAlert] = React.useState(false);
    const previousSuccessRef = useRef<string | null | undefined>();
    const previousErrorRef = useRef<string | null | undefined>();

    const {deleteFile, files, upload, error, success, loading} = useVedlegg(opplysning);

    useEffect(() => {
        if (success && success !== previousSuccessRef.current) {
            setShowSuccessAlert(true);
        } else if (!success) {
            setShowSuccessAlert(false);
        }
        previousSuccessRef.current = success;
    }, [success]);

    useEffect(() => {
        if (error && error !== previousErrorRef.current) {
            setShowErrorAlert(true);
        } else if (!error) {
            setShowErrorAlert(false);
        }
        previousErrorRef.current = error;
    }, [error]);

    return (
        <div>
            <FaroErrorBoundary fallback={(error, resetError) => <UploadError error={error} resetError={resetError} />}>
                <LastOppFil
                    opplysning={opplysning}
                    isDisabled={
                        loading || opplysning.vedleggStatus === VedleggFrontendVedleggStatus.VedleggAlleredeSendt
                    }
                    visSpinner={!!opplysning.pendingLasterOppFil}
                    doUpload={upload}
                    resetAlerts={() => {
                        setShowSuccessAlert(false);
                        setShowErrorAlert(false);
                    }}
                />
            </FaroErrorBoundary>

            {files.length > 0 && (
                <div className="vedleggsliste">
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
                </div>
            )}
            {showSuccessAlert && (
                <Alert variant="success" className={"py-2 mt-4"}>
                    {success}
                </Alert>
            )}
            {showErrorAlert && (
                <Alert variant="error" className={"py-2 mt-4"}>
                    {error}
                </Alert>
            )}
            <AlreadyUploadedCheckbox opplysning={opplysning} disabled={!!files.length || loading} />
        </div>
    );
};
