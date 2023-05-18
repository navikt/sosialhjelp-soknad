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

const VedleggView = ({opplysning}: {opplysning: Opplysning}) => {
    const behandlingsId = useBehandlingsId();
    const feil = useSelector((state: State) => state.validering.feil);
    const {t} = useTranslation();
    const opplysningSpec = getSpcForOpplysning(opplysning.type);

    const {deleteFile, files, upload, error, loading} = useVedlegg(opplysning);

    const dispatch = useDispatch();

    if (!opplysningSpec) {
        logError(`Ukjent opplysning ${opplysning.type}!`);
        return null;
    }

    const handleAlleredeLastetOpp = (_: any) => {
        const opplysningUpdated = {...opplysning};

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
                onChange={(event: any) => handleAlleredeLastetOpp(event)}
                checked={opplysning.vedleggStatus === VedleggFrontendVedleggStatus.VedleggAlleredeSendt}
                disabled={!!files.length || loading}
            />
        </div>
    );
};

export default VedleggView;
