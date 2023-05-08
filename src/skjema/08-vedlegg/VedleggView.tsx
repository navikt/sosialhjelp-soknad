import {useState} from "react";
import {Opplysning, OpplysningSpc} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerTypes";
import {useDispatch, useSelector} from "react-redux";
import LastOppFil from "./LastOppFil";
import {Checkbox} from "nav-frontend-skjema";
import {
    lagreOpplysningHvisGyldigAction,
    settFilOpplastingFerdig,
    settFilOpplastingPending,
    updateOpplysning,
} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerActions";
import OpplastetVedlegg from "./OpplastetVedlegg";
import {State} from "../../digisos/redux/reducers";
import {fetchDelete, HttpStatus} from "../../nav-soknad/utils/rest-utils";
import {logWarning} from "../../nav-soknad/utils/loggerUtils";
import {useTranslation} from "react-i18next";
import {getSpcForOpplysning} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerUtils";
import {useBehandlingsId} from "../../lib/hooks/useBehandlingsId";
import {REST_FEIL} from "../../digisos/redux/soknadsdata/soknadsdataTypes";
import cx from "classnames";
import {FilFrontend, VedleggFrontendVedleggStatus} from "../../generated/model";

const VedleggView = (props: {okonomiskOpplysning: Opplysning}) => {
    const behandlingsId = useBehandlingsId();
    const feil = useSelector((state: State) => state.validering.feil);
    const enFilLastesOpp = useSelector((state: State) => state.okonomiskeOpplysninger.enFilLastesOpp);
    const {t} = useTranslation();

    const [feilkode, setFeilkode] = useState<string | null>(null);

    const dispatch = useDispatch();

    const handleAlleredeLastetOpp = (_: any) => {
        const opplysningUpdated = {...props.okonomiskOpplysning};

        if (opplysningUpdated.vedleggStatus !== VedleggFrontendVedleggStatus.VedleggAlleredeSendt) {
            opplysningUpdated.vedleggStatus = VedleggFrontendVedleggStatus.VedleggAlleredeSendt;
        } else {
            opplysningUpdated.vedleggStatus = VedleggFrontendVedleggStatus.VedleggKreves;
        }

        dispatch(lagreOpplysningHvisGyldigAction(behandlingsId, opplysningUpdated, feil));
    };

    const slettVedlegg = (fil: FilFrontend) => {
        dispatch(settFilOpplastingPending(props.okonomiskOpplysning.type));

        setFeilkode(feilkode === REST_FEIL.SAMLET_VEDLEGG_STORRELSE_FOR_STOR ? null : feilkode);

        fetchDelete(`opplastetVedlegg/${behandlingsId}/${fil.uuid}`)
            .then(() => {
                const filerUpdated = props.okonomiskOpplysning.filer?.filter(({uuid}) => uuid !== fil.uuid) ?? [];

                const opplysningUpdated: Opplysning = {...props.okonomiskOpplysning};
                opplysningUpdated.filer = filerUpdated;

                if (!opplysningUpdated.filer.length)
                    opplysningUpdated.vedleggStatus = VedleggFrontendVedleggStatus.VedleggKreves;

                dispatch(updateOpplysning(opplysningUpdated));
                dispatch(settFilOpplastingFerdig(props.okonomiskOpplysning.type));
            })
            .catch((reason) => {
                if (reason.message === HttpStatus.UNAUTHORIZED) return;
                logWarning("Slett vedlegg feilet: " + reason);
                window.location.href = "/sosialhjelp/soknad/feil?reason=slettVedlegg";
            });
    };

    const renderOpplastingAvVedleggSeksjon = (opplysning: Opplysning) => {
        const opplysningSpc: OpplysningSpc | undefined = getSpcForOpplysning(opplysning.type);
        const tittelKey = opplysningSpc?.textKey ? `${opplysningSpc.textKey}.vedlegg.sporsmal.tittel` : "";

        const vedleggListe = opplysning.filer?.map((fil) => (
            <OpplastetVedlegg
                key={fil.uuid}
                behandlingsId={behandlingsId}
                fil={fil}
                onSlett={() => slettVedlegg(fil)}
            />
        ));

        return (
            <div>
                <p>{t(tittelKey)}</p>
                <div className="vedleggsliste">{vedleggListe}</div>
                <LastOppFil
                    opplysning={opplysning}
                    isDisabled={
                        enFilLastesOpp || opplysning.vedleggStatus === VedleggFrontendVedleggStatus.VedleggAlleredeSendt
                    }
                    visSpinner={opplysning.pendingLasterOppFil}
                    feilkode={feilkode}
                    setFeilkode={setFeilkode}
                />
                <Checkbox
                    label={t("opplysninger.vedlegg.alleredelastetopp")}
                    id={opplysning.type + "_allerede_lastet_opp_checkbox"}
                    className={cx("vedleggLastetOppCheckbox", {"checkboks--disabled": opplysning.filer?.length})}
                    onChange={(event: any) => handleAlleredeLastetOpp(event)}
                    checked={opplysning.vedleggStatus === VedleggFrontendVedleggStatus.VedleggAlleredeSendt}
                    disabled={!!opplysning.filer?.length || opplysning.pendingLasterOppFil}
                />
            </div>
        );
    };

    return <div>{renderOpplastingAvVedleggSeksjon(props.okonomiskOpplysning)}</div>;
};

export default VedleggView;
