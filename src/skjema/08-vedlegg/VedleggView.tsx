import * as React from "react";
import VedleggFileSelector from "./LastOppFil";
import {Checkbox} from "nav-frontend-skjema";
import OpplastetVedlegg from "./OpplastetVedlegg";
import {useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../lib/hooks/useBehandlingsId";
import cx from "classnames";
import {VedleggFrontendVedleggStatus} from "../../generated/model";
import {useVedlegg} from "./useVedlegg";
import {Opplysning, opplysningSpec} from "../../lib/opplysninger";
import {ChangeEvent, useEffect, useRef} from "react";
import {useUpdateOkonomiskOpplysning} from "../../generated/okonomiske-opplysninger-ressurs/okonomiske-opplysninger-ressurs";
import {useQueryClient} from "@tanstack/react-query";
import {Alert} from "@navikt/ds-react";
import styled from "styled-components";

const StyledAlert = styled(Alert)`
    padding-bottom: 1rem;
`;

const VedleggView = ({opplysning}: {opplysning: Opplysning}) => {
    const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
    const [showErrorAlert, setShowErrorAlert] = React.useState(false);
    const previousSuccessRef = useRef<string | null | undefined>();
    const previousErrorRef = useRef<string | null | undefined>();

    const behandlingsId = useBehandlingsId();
    const {t} = useTranslation();
    const {textKey} = opplysningSpec[opplysning.type];
    const queryClient = useQueryClient();

    const {mutate} = useUpdateOkonomiskOpplysning({});

    const {deleteFile, files, upload, error, success, loading} = useVedlegg(opplysning);

    const handleAlleredeLastetOpp = async (event: ChangeEvent<HTMLInputElement>) => {
        await mutate({
            behandlingsId,
            data: {
                ...opplysning,
                vedleggStatus: event.target.checked
                    ? VedleggFrontendVedleggStatus.VedleggAlleredeSendt
                    : VedleggFrontendVedleggStatus.VedleggKreves,
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

    const handleUpload = async (file: File) => {
        await upload(file);
    };

    return (
        <div>
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
            {showSuccessAlert && (
                <StyledAlert variant="success" className={"py-2"} inline>
                    {success}
                </StyledAlert>
            )}
            {showErrorAlert && (
                <StyledAlert variant="error" className={"py-2"} inline>
                    {error}
                </StyledAlert>
            )}
            <VedleggFileSelector
                opplysning={opplysning}
                isDisabled={loading || opplysning.vedleggStatus === VedleggFrontendVedleggStatus.VedleggAlleredeSendt}
                visSpinner={!!opplysning.pendingLasterOppFil}
                doUpload={handleUpload}
                resetAlerts={() => {
                    setShowSuccessAlert(false);
                    setShowErrorAlert(false);
                }}
            />
            <p className="pt-4">{t(`${textKey}.vedlegg.sporsmal.tittel`)}</p>
            <Checkbox
                label={t("opplysninger.vedlegg.alleredelastetopp")}
                id={opplysning.type + "_allerede_lastet_opp_checkbox"}
                className={cx("vedleggLastetOppCheckbox", {
                    "checkboks--disabled": opplysning.filer?.length,
                })}
                onChange={handleAlleredeLastetOpp}
                checked={opplysning.vedleggStatus === VedleggFrontendVedleggStatus.VedleggAlleredeSendt}
                disabled={!!files.length || loading}
            />
        </div>
    );
};

export default VedleggView;
