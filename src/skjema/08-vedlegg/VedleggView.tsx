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

const ToastAlert = styled(Alert)`
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
`;

const VedleggView = ({opplysning}: {opplysning: Opplysning}) => {
    const [showSuccessToast, setShowSuccessToast] = React.useState(false);
    const [showErrorToast, setShowErrorToast] = React.useState(false);
    const previousSuccessRef = useRef<string | null | undefined>();
    const previousErrorRef = useRef<string | null | undefined>();

    const behandlingsId = useBehandlingsId();
    const {t} = useTranslation();
    const {textKey} = opplysningSpec[opplysning.type];
    const queryClient = useQueryClient();

    const {mutate} = useUpdateOkonomiskOpplysning({});

    const {deleteFile, files, upload, error, success, resetError, resetSuccess, loading} = useVedlegg(opplysning);

    const handleAlleredeLastetOpp = async (e: ChangeEvent<HTMLInputElement>) => {
        await mutate({
            behandlingsId,
            data: {
                ...opplysning,
                vedleggStatus: e.target.checked
                    ? VedleggFrontendVedleggStatus.VedleggAlleredeSendt
                    : VedleggFrontendVedleggStatus.VedleggKreves,
            },
        });

        await new Promise<void>((resolve) => setTimeout(() => resolve(), 200));

        await queryClient.refetchQueries([`/soknader/${behandlingsId}/okonomiskeOpplysninger`]);
    };

    useEffect(() => {
        if (success && success !== previousSuccessRef.current) {
            setShowSuccessToast(true);
            setTimeout(() => setShowSuccessToast(false), 3000);
        } else if (!success) {
            setShowSuccessToast(false);
        }
        previousSuccessRef.current = success;
    }, [success]);

    useEffect(() => {
        if (error && error !== previousErrorRef.current) {
            setShowErrorToast(true);
            setTimeout(() => setShowErrorToast(false), 3000);
        } else if (!error) {
            setShowErrorToast(false);
        }
        previousErrorRef.current = error;
    }, [error]);

    const handleUpload = async (file: File) => {
        resetError();
        resetSuccess();
        await upload(file);
    };

    return (
        <div>
            <p>{t(`${textKey}.vedlegg.sporsmal.tittel`)}</p>
            <div className="vedleggsliste">
                {files.map((fil) => (
                    <OpplastetVedlegg key={fil.uuid} fil={fil} onDelete={deleteFile} />
                ))}
            </div>
            <VedleggFileSelector
                opplysning={opplysning}
                isDisabled={loading || opplysning.vedleggStatus === VedleggFrontendVedleggStatus.VedleggAlleredeSendt}
                visSpinner={!!opplysning.pendingLasterOppFil}
                doUpload={handleUpload}
            />
            {showSuccessToast && (
                <ToastAlert variant="success" className={"py-2"}>
                    {success}
                </ToastAlert>
            )}
            {showErrorToast && (
                <ToastAlert variant="error" className={"py-2"}>
                    {error}
                </ToastAlert>
            )}
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
