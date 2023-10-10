import * as React from "react";
import VedleggFileSelector from "./LastOppFil";
import OpplastetVedlegg from "./OpplastetVedlegg";
import {useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../lib/hooks/useBehandlingsId";
import cx from "classnames";
import {VedleggFrontendVedleggStatus} from "../../generated/model";
import {useVedlegg} from "./useVedlegg";
import {Opplysning} from "../../lib/opplysninger";
import {ChangeEvent, useEffect, useRef} from "react";
import {useUpdateOkonomiskOpplysning} from "../../generated/okonomiske-opplysninger-ressurs/okonomiske-opplysninger-ressurs";
import {useQueryClient} from "@tanstack/react-query";
import {Alert, Checkbox} from "@navikt/ds-react";
import styled from "styled-components";

const StyledAlert = styled(Alert)`
    margin-top: 1rem;
`;

const VedleggView = ({opplysning}: {opplysning: Opplysning}) => {
    const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
    const [showErrorAlert, setShowErrorAlert] = React.useState(false);
    const previousSuccessRef = useRef<string | null | undefined>();
    const previousErrorRef = useRef<string | null | undefined>();

    const behandlingsId = useBehandlingsId();
    const {t} = useTranslation();
    const queryClient = useQueryClient();

    const {mutate} = useUpdateOkonomiskOpplysning({});

    const {deleteFile, files, upload, error, success, loading} = useVedlegg(opplysning);

    const handleAlleredeLastetOpp = async (event: ChangeEvent<HTMLInputElement>) => {
        await mutate({
            behandlingsId,
            data: {
                gruppe: opplysning.gruppe,
                type: opplysning.type,
                alleredeLevert: event.target.checked,
            },
        });

        // FIXME: Don't know why this is needed, presumably race condition on back-end
        await new Promise<void>((resolve) => setTimeout(() => resolve(), 200));

        await queryClient.refetchQueries([`/soknader/${behandlingsId}/okonomiskeOpplysninger`]);
    };

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
            <VedleggFileSelector
                opplysning={opplysning}
                isDisabled={loading || opplysning.vedleggStatus === VedleggFrontendVedleggStatus.VedleggAlleredeSendt}
                visSpinner={!!opplysning.pendingLasterOppFil}
                doUpload={upload}
                resetAlerts={() => {
                    setShowSuccessAlert(false);
                    setShowErrorAlert(false);
                }}
            />
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
                <StyledAlert variant="success" className={"py-2"}>
                    {success}
                </StyledAlert>
            )}
            {showErrorAlert && (
                <StyledAlert variant="error" className={"py-2"}>
                    {error}
                </StyledAlert>
            )}
            <Checkbox
                id={opplysning.type + "_allerede_lastet_opp_checkbox"}
                className={cx("vedleggLastetOppCheckbox", {
                    "checkboks--disabled": opplysning.filer?.length,
                })}
                onChange={handleAlleredeLastetOpp}
                checked={opplysning.vedleggStatus === VedleggFrontendVedleggStatus.VedleggAlleredeSendt}
                disabled={!!files.length || loading}
            >
                {t("opplysninger.vedlegg.alleredelastetopp")}
            </Checkbox>
        </div>
    );
};

export default VedleggView;
