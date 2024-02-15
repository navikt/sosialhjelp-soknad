import * as React from "react";
import {LastOppFil} from "./LastOppFil";
import {OpplastetVedlegg} from "./OpplastetVedlegg";
import {useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import cx from "classnames";
import {VedleggFrontendVedleggStatus} from "../../generated/model";
import {useVedlegg} from "./useVedlegg";
import {Opplysning} from "../../lib/opplysninger";
import {ChangeEvent, useEffect, useRef} from "react";
import {
    updateOkonomiskOpplysning,
    useHentOkonomiskeOpplysninger,
} from "../../generated/okonomiske-opplysninger-ressurs/okonomiske-opplysninger-ressurs";
import {useQueryClient} from "@tanstack/react-query";
import {Alert, Checkbox} from "@navikt/ds-react";
import styled from "styled-components";

const StyledAlert = styled(Alert)`
    margin-top: 1rem;
`;

export const VedleggView = ({opplysning}: {opplysning: Opplysning}) => {
    const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
    const [showErrorAlert, setShowErrorAlert] = React.useState(false);
    const previousSuccessRef = useRef<string | null | undefined>();
    const previousErrorRef = useRef<string | null | undefined>();

    const behandlingsId = useBehandlingsId();
    const {t} = useTranslation();
    const queryClient = useQueryClient();

    const {queryKey} = useHentOkonomiskeOpplysninger(behandlingsId);

    const {deleteFile, files, upload, error, success, loading} = useVedlegg(opplysning);

    const handleAlleredeLastetOpp = async (event: ChangeEvent<HTMLInputElement>) => {
        await queryClient.refetchQueries({queryKey});

        await updateOkonomiskOpplysning(behandlingsId, {
            ...{...opplysning, vedleggStatus: undefined, slettet: undefined, pendingLasterOppFil: undefined},
            alleredeLevert: event.target.checked,
        });

        await queryClient.invalidateQueries({queryKey});
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
            <LastOppFil
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
                checked={opplysning.alleredeLevert}
                disabled={!!files.length || loading}
            >
                {t("opplysninger.vedlegg.alleredelastetopp")}
            </Checkbox>
        </div>
    );
};
