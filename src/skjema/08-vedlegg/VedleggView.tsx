import * as React from "react";
import {Opplysning} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerTypes";
import VedleggFileSelector from "./LastOppFil";
import {Checkbox} from "nav-frontend-skjema";
import OpplastetVedlegg from "./OpplastetVedlegg";
import {useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../lib/hooks/useBehandlingsId";
import cx from "classnames";
import {VedleggFrontendVedleggStatus} from "../../generated/model";
import {useVedlegg} from "./useVedlegg";
import {opplysningSpec} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerConfig";
import {ChangeEvent} from "react";
import {useUpdateOkonomiskOpplysning} from "../../generated/okonomiske-opplysninger-ressurs/okonomiske-opplysninger-ressurs";

const VedleggFeilmelding = ({error}: {error: string | null}) =>
    error ? (
        <div role="alert" aria-live="assertive">
            <div className="skjemaelement__feilmelding">{error}</div>
        </div>
    ) : null;

const VedleggView = ({opplysning}: {opplysning: Opplysning}) => {
    const behandlingsId = useBehandlingsId();
    const {t} = useTranslation();
    const {textKey} = opplysningSpec[opplysning.type];

    const {mutate} = useUpdateOkonomiskOpplysning();

    const {deleteFile, files, upload, error, loading} = useVedlegg(opplysning);

    const handleAlleredeLastetOpp = (e: ChangeEvent<HTMLInputElement>) => {
        mutate({
            behandlingsId,
            data: {
                ...opplysning,
                vedleggStatus: e.target.value
                    ? VedleggFrontendVedleggStatus.VedleggAlleredeSendt
                    : VedleggFrontendVedleggStatus.VedleggKreves,
            },
        });
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
                doUpload={upload}
            />
            <VedleggFeilmelding error={error} />
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
