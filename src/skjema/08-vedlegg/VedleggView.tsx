import * as React from "react";
import {Opplysning} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerTypes";
import {useDispatch, useSelector} from "react-redux";
import VedleggFileSelector from "./LastOppFil";
import {Checkbox} from "nav-frontend-skjema";
import {lagreOpplysningHvisGyldigAction} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerActions";
import OpplastetVedlegg from "./OpplastetVedlegg";
import {State} from "../../digisos/redux/reducers";
import {logError} from "../../nav-soknad/utils/loggerUtils";
import {useTranslation} from "react-i18next";
import {getSpcForOpplysning} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerUtils";
import {useBehandlingsId} from "../../lib/hooks/useBehandlingsId";
import cx from "classnames";
import {VedleggFrontendVedleggStatus} from "../../generated/model";
import {useVedlegg} from "./useVedlegg";

const VedleggFeilmelding = ({error}: {error: string | null}) =>
    !error ? null : (
        <div role="alert" aria-live="assertive">
            <div className="skjemaelement__feilmelding">{error}</div>
        </div>
    );

const VedleggView = ({okonomiskOpplysning}: {okonomiskOpplysning: Opplysning}) => {
    const behandlingsId = useBehandlingsId();
    const feil = useSelector((state: State) => state.validering.feil);
    const {t} = useTranslation();
    const opplysningSpec = getSpcForOpplysning(okonomiskOpplysning.type);

    const {deleteFile, files, upload, error, loading} = useVedlegg(okonomiskOpplysning);

    const dispatch = useDispatch();

    if (!opplysningSpec) {
        logError(`Ukjent opplysning ${okonomiskOpplysning.type}!`);
        return null;
    }

    const handleAlleredeLastetOpp = (_: any) => {
        const opplysningUpdated = {...okonomiskOpplysning};

        if (opplysningUpdated.vedleggStatus !== VedleggFrontendVedleggStatus.VedleggAlleredeSendt) {
            opplysningUpdated.vedleggStatus = VedleggFrontendVedleggStatus.VedleggAlleredeSendt;
        } else {
            opplysningUpdated.vedleggStatus = VedleggFrontendVedleggStatus.VedleggKreves;
        }

        dispatch(lagreOpplysningHvisGyldigAction(behandlingsId, opplysningUpdated, feil));
    };

    return (
        <div>
            <p>{t(`${opplysningSpec.textKey}.vedlegg.sporsmal.tittel`)}</p>
            <div className="vedleggsliste">
                {files.map((fil) => (
                    <OpplastetVedlegg key={fil.uuid} fil={fil} onDelete={deleteFile} />
                ))}
            </div>
            <VedleggFileSelector
                opplysning={okonomiskOpplysning}
                isDisabled={
                    loading || okonomiskOpplysning.vedleggStatus === VedleggFrontendVedleggStatus.VedleggAlleredeSendt
                }
                visSpinner={okonomiskOpplysning.pendingLasterOppFil}
                doUpload={upload}
            />
            <VedleggFeilmelding error={error} />
            <Checkbox
                label={t("opplysninger.vedlegg.alleredelastetopp")}
                id={okonomiskOpplysning.type + "_allerede_lastet_opp_checkbox"}
                className={cx("vedleggLastetOppCheckbox", {
                    "checkboks--disabled": okonomiskOpplysning.filer?.length,
                })}
                onChange={(event: any) => handleAlleredeLastetOpp(event)}
                checked={okonomiskOpplysning.vedleggStatus === VedleggFrontendVedleggStatus.VedleggAlleredeSendt}
                disabled={!!files.length || loading}
            />
        </div>
    );
};

export default VedleggView;
