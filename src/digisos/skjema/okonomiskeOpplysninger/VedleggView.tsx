import * as React from "react";
import {Fil, Opplysning, OpplysningSpc, VedleggStatus} from "../../redux/okonomiskeOpplysninger/opplysningerTypes";
import {useDispatch, useSelector} from "react-redux";
import LastOppFil from "./LastOppFil";
import {Checkbox} from "nav-frontend-skjema";
import {FormattedMessage} from "react-intl";
import {startSlettFil} from "../../redux/fil/filActions";
import {lagreOpplysningHvisGyldigAction} from "../../redux/okonomiskeOpplysninger/opplysningerActions";
import OpplastetVedlegg from "./OpplastetVedlegg";
import {getSpcForOpplysning} from "../../redux/okonomiskeOpplysninger/opplysningerUtils";
import {State} from "../../redux/reducers";

const VedleggView = (props: {okonomiskOpplysning: Opplysning}) => {
    const behandlingsId = useSelector((state: State) => state.soknad.behandlingsId);
    const feil = useSelector((state: State) => state.validering.feil);
    const enFilLastesOpp = useSelector((state: State) => state.okonomiskeOpplysninger.enFilLastesOpp);

    const dispatch = useDispatch();

    const handleAlleredeLastetOpp = (event: any) => {
        if (behandlingsId) {
            const opplysningUpdated = {...props.okonomiskOpplysning};

            if (opplysningUpdated.vedleggStatus !== VedleggStatus.VEDLEGGALLEREDESEND) {
                opplysningUpdated.vedleggStatus = VedleggStatus.VEDLEGGALLEREDESEND;
            } else {
                opplysningUpdated.vedleggStatus = VedleggStatus.VEDLEGG_KREVES;
            }

            dispatch(lagreOpplysningHvisGyldigAction(behandlingsId, opplysningUpdated, feil));
        }
    };

    const slettVedlegg = (fil: Fil) => {
        if (behandlingsId) {
            dispatch(startSlettFil(behandlingsId, fil, props.okonomiskOpplysning, props.okonomiskOpplysning.type));
        }
    };

    const renderOpplastingAvVedleggSeksjon = (opplysning: Opplysning) => {
        const opplysningSpc: OpplysningSpc | undefined = getSpcForOpplysning(opplysning.type);
        const tittelKey =
            opplysningSpc && opplysningSpc.textKey ? opplysningSpc.textKey + ".vedlegg.sporsmal.tittel" : "";

        const vedleggListe = opplysning.filer.map((fil) => {
            return <OpplastetVedlegg key={fil.uuid} fil={fil} onSlett={() => slettVedlegg(fil)} />;
        });

        const textDisabledClassName = opplysning.filer.length > 0 ? " checkboks--disabled" : "";

        return (
            <div>
                <p>
                    <FormattedMessage id={tittelKey} />
                </p>
                <div className="vedleggsliste">{vedleggListe}</div>
                <LastOppFil
                    opplysning={opplysning}
                    isDisabled={enFilLastesOpp || opplysning.vedleggStatus === VedleggStatus.VEDLEGGALLEREDESEND}
                    visSpinner={opplysning.pendingLasterOppFil}
                />
                <Checkbox
                    label={<FormattedMessage id={"opplysninger.vedlegg.alleredelastetopp"} />}
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
