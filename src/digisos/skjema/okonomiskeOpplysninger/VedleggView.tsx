import * as React from 'react';
import {DispatchProps, Valideringsfeil} from "../../redux/reduxTypes";
import {
    Fil,
    Opplysning, OpplysningSpc,
    VedleggStatus
} from "../../redux/okonomiskeOpplysninger/opplysningerTypes";
import {connect} from "react-redux";
import LastOppFil from "./LastOppFil";
import {Checkbox} from "nav-frontend-skjema";
import {FormattedHTMLMessage, FormattedMessage} from "react-intl";
import {startSlettFil} from "../../redux/fil/filActions";
import {
    lagreOpplysningHvisGyldigAction,
} from "../../redux/okonomiskeOpplysninger/opplysningerActions";
import OpplastetVedlegg from "./OpplastetVedlegg";
import {getSpcForOpplysning} from "../../redux/okonomiskeOpplysninger/opplysningerUtils";
import {State} from "../../redux/reducers";

interface OwnProps {
    okonomiskOpplysning: Opplysning;
}

interface StoreToProps {
    behandlingsId: string | undefined;
    feil: Valideringsfeil[];
    enFilLastesOpp: boolean;
}

type Props = OwnProps & StoreToProps & DispatchProps;

class VedleggView extends React.Component<Props> {

    handleAlleredeLastetOpp(event: any) {
        const {okonomiskOpplysning, behandlingsId, feil, dispatch} = this.props;
        if (behandlingsId){
            const opplysningUpdated = {...okonomiskOpplysning};

            if (opplysningUpdated.vedleggStatus !== VedleggStatus.VEDLEGGALLEREDESEND) {
                opplysningUpdated.vedleggStatus = VedleggStatus.VEDLEGGALLEREDESEND;
            } else {
                opplysningUpdated.vedleggStatus = VedleggStatus.VEDLEGG_KREVES;
            }

            dispatch(lagreOpplysningHvisGyldigAction(behandlingsId, opplysningUpdated, feil));
        }
    }

    slettVedlegg(fil: Fil) {
        const {behandlingsId, okonomiskOpplysning, dispatch} = this.props;
        if (behandlingsId){
            dispatch(startSlettFil(behandlingsId, fil, okonomiskOpplysning, okonomiskOpplysning.type))
        }
    }

    renderOpplastingAvVedleggSeksjon(opplysning: Opplysning) {
        const opplysningSpc: OpplysningSpc | undefined = getSpcForOpplysning(opplysning.type);
        const tittelKey = opplysningSpc && opplysningSpc.textKey ? opplysningSpc.textKey + ".vedlegg.sporsmal.tittel" : "";

        const vedleggListe = opplysning.filer
            .map(fil => {
                return <OpplastetVedlegg key={fil.uuid} fil={fil} onSlett={() => this.slettVedlegg(fil)}/>
            });

        const textDisabledClassName = opplysning.filer.length > 0 ? " checkboks--disabled" : "";

        return (
            <div>
                <p>
                    <FormattedMessage id={tittelKey}/>
                </p>
                <div className="vedleggsliste">
                    {vedleggListe}
                </div>
                <LastOppFil
                    opplysning={opplysning}
                    isDisabled={this.props.enFilLastesOpp || opplysning.vedleggStatus === VedleggStatus.VEDLEGGALLEREDESEND}
                    visSpinner={opplysning.pendingLasterOppFil}
                />
                <Checkbox
                    label={<FormattedHTMLMessage id={"opplysninger.vedlegg.alleredelastetopp"}/>}
                    id={opplysning.type + "_allerede_lastet_opp_checkbox"}
                    className={"vedleggLastetOppCheckbox " + textDisabledClassName}
                    onChange={(event: any) => this.handleAlleredeLastetOpp(event)}
                    checked={opplysning.vedleggStatus === VedleggStatus.VEDLEGGALLEREDESEND}
                    disabled={opplysning.filer.length > 0 || opplysning.pendingLasterOppFil}
                />
            </div>
        )
    }

    render() {
        const {okonomiskOpplysning} = this.props;

        return (
            <div>
                {this.renderOpplastingAvVedleggSeksjon(okonomiskOpplysning)}
            </div>
        )
    }
}

export default connect(
    (state: State) => {
        return {
            behandlingsId: state.soknad.behandlingsId,
            feil: state.validering.feil,
            enFilLastesOpp: state.okonomiskeOpplysninger.enFilLastesOpp
        }
    }
)(VedleggView);
