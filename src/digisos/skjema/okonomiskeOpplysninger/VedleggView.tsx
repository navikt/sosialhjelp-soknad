import {useState} from "react";
import {Fil, Opplysning, VedleggStatus} from "../../redux/okonomiskeOpplysninger/opplysningerTypes";
import {useDispatch, useSelector} from "react-redux";
import LastOppFil from "./LastOppFil";
import {Checkbox} from "nav-frontend-skjema";
import {
    lagreOpplysningHvisGyldigAction,
    settFilOpplastingFerdig,
    settFilOpplastingPending,
    updateOpplysning,
} from "../../redux/okonomiskeOpplysninger/opplysningerActions";
import OpplastetVedlegg from "./OpplastetVedlegg";
import {State} from "../../redux/reducers";
import {fetchDelete, HttpStatus} from "../../../nav-soknad/utils/rest-utils";
import {setShowServerError} from "../../redux/soknad/soknadActions";
import {logWarning} from "../../../nav-soknad/utils/loggerUtils";
import {REST_FEIL} from "../../redux/soknad/soknadTypes";
import {useTranslation} from "react-i18next";

const VedleggView = (props: {okonomiskOpplysning: Opplysning}) => {
    const behandlingsId = useSelector((state: State) => state.soknad.behandlingsId);
    const feil = useSelector((state: State) => state.validering.feil);
    const enFilLastesOpp = useSelector((state: State) => state.okonomiskeOpplysninger.enFilLastesOpp);
    const {t} = useTranslation();

    const [feilkode, setFeilkode] = useState<string | null>(null);

    const dispatch = useDispatch();

    const handleAlleredeLastetOpp = (_: any) => {
        if (!behandlingsId) return;

        const opplysningUpdated = {...props.okonomiskOpplysning};

        if (opplysningUpdated.vedleggStatus !== VedleggStatus.VEDLEGGALLEREDESEND) {
            opplysningUpdated.vedleggStatus = VedleggStatus.VEDLEGGALLEREDESEND;
        } else {
            opplysningUpdated.vedleggStatus = VedleggStatus.VEDLEGG_KREVES;
        }

        dispatch(lagreOpplysningHvisGyldigAction(behandlingsId, opplysningUpdated, feil));
    };

    const slettVedlegg = (fil: Fil) => {
        if (behandlingsId) {
            dispatch(settFilOpplastingPending(props.okonomiskOpplysning.type));

            setFeilkode(feilkode === REST_FEIL.SAMLET_VEDLEGG_STORRELSE_FOR_STOR ? null : feilkode);

            const url = `opplastetVedlegg/${behandlingsId}/${fil.uuid}`;
            fetchDelete(url)
                .then(() => {
                    const filerUpdated = props.okonomiskOpplysning.filer.filter((f: Fil) => {
                        return f.uuid !== fil.uuid;
                    });

                    const opplysningUpdated: Opplysning = {...props.okonomiskOpplysning};
                    opplysningUpdated.filer = filerUpdated;

                    if (opplysningUpdated.filer.length === 0) {
                        opplysningUpdated.vedleggStatus = VedleggStatus.VEDLEGG_KREVES;
                    }

                    dispatch(updateOpplysning(opplysningUpdated));
                    dispatch(settFilOpplastingFerdig(props.okonomiskOpplysning.type));
                })
                .catch((reason) => {
                    if (reason.message === HttpStatus.UNAUTHORIZED) {
                        return;
                    }
                    logWarning("Slett vedlegg feilet: " + reason);
                    dispatch(setShowServerError(true));
                });
        }
    };

    const renderOpplastingAvVedleggSeksjon = (opplysning: Opplysning) => {
        const vedleggListe = opplysning.filer.map((fil) => {
            return (
                <OpplastetVedlegg
                    key={fil.uuid}
                    behandlingsId={behandlingsId}
                    fil={fil}
                    onSlett={() => slettVedlegg(fil)}
                />
            );
        });

        const textDisabledClassName = opplysning.filer.length > 0 ? " checkboks--disabled" : "";

        return (
            <div>
                <p>t(tittelKey)</p>
                <div className="vedleggsliste">{vedleggListe}</div>
                <LastOppFil
                    opplysning={opplysning}
                    isDisabled={enFilLastesOpp || opplysning.vedleggStatus === VedleggStatus.VEDLEGGALLEREDESEND}
                    visSpinner={opplysning.pendingLasterOppFil}
                    feilkode={feilkode}
                    setFeilkode={setFeilkode}
                />
                <Checkbox
                    label={t("opplysninger.vedlegg.alleredelastetopp")}
                    id={opplysning.type + "_allerede_lastet_opp_checkbox"}
                    className={"vedleggLastetOppCheckbox " + textDisabledClassName}
                    onChange={(event: any) => handleAlleredeLastetOpp(event)}
                    checked={opplysning.vedleggStatus === VedleggStatus.VEDLEGGALLEREDESEND}
                    disabled={opplysning.filer.length > 0 || opplysning.pendingLasterOppFil}
                />
            </div>
        );
    };

    return <div>{renderOpplastingAvVedleggSeksjon(props.okonomiskOpplysning)}</div>;
};

export default VedleggView;
