import * as React from "react";
import {Opplysning} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerTypes";
import {useDispatch, useSelector} from "react-redux";
import VedleggFileSelector from "./LastOppFil";
import {Checkbox} from "nav-frontend-skjema";
import {lagreOpplysningHvisGyldigAction} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerActions";
import OpplastetVedlegg from "./OpplastetVedlegg";
import {State} from "../../digisos/redux/reducers";
import {useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../lib/hooks/useBehandlingsId";
import cx from "classnames";
import {VedleggFrontendVedleggStatus} from "../../generated/model";
import {useVedlegg} from "./useVedlegg";
import {opplysningSpec} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerConfig";

/**
 * En versjon av T som returnerer en versjon av T med readonly-flagg fjernet.
 *
 * Dette bruker vi fordi selv om Orval-typene rettmessig flagger vedlegg-data
 * som readonly på backends side, trenger vi en mutable-versjon, slik at
 * Redux-koden kan gjøre endringer i datastrukturen på klientsiden.
 *
 * Vil ikke lenger være nødvendig når Redux-koden er fjernet.
 */
declare type Mutable<T extends object> = {
    -readonly [K in keyof T]: T[K];
};

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
    const {textKey} = opplysningSpec[opplysning.type];

    const {deleteFile, files, upload, error, loading} = useVedlegg(opplysning);

    const dispatch = useDispatch();

    const handleAlleredeLastetOpp = (_: any) => {
        const opplysningUpdated: Mutable<Opplysning> = {...opplysning};

        if (opplysningUpdated.vedleggStatus !== VedleggFrontendVedleggStatus.VedleggAlleredeSendt) {
            opplysningUpdated.vedleggStatus = VedleggFrontendVedleggStatus.VedleggAlleredeSendt;
        } else {
            opplysningUpdated.vedleggStatus = VedleggFrontendVedleggStatus.VedleggKreves;
        }

        dispatch(lagreOpplysningHvisGyldigAction(behandlingsId, opplysningUpdated, feil));
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
                onChange={(event: any) => handleAlleredeLastetOpp(event)}
                checked={opplysning.vedleggStatus === VedleggFrontendVedleggStatus.VedleggAlleredeSendt}
                disabled={!!files.length || loading}
            />
        </div>
    );
};

export default VedleggView;
