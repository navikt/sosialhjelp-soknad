import * as React from 'react';
import {DispatchProps, SoknadAppState, Valideringsfeil} from "../../../nav-soknad/redux/reduxTypes";
import {
    Fil,
    Opplysning, OpplysningSpc,
    VedleggStatus
} from "../../../nav-soknad/redux/okonomiskeOpplysninger/opplysningerTypes";
import {connect} from "react-redux";
import LastOppFil from "./LastOppFil";
import {Checkbox} from "nav-frontend-skjema";
import {FormattedHTMLMessage, FormattedMessage} from "react-intl";
import {startSlettFil} from "../../../nav-soknad/redux/fil/filActions";
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import {
    lagreOpplysningHvisGyldigAction,
} from "../../../nav-soknad/redux/okonomiskeOpplysninger/opplysningerActions";
import OpplastetVedlegg from "./OpplastetVedlegg";
import {getSpcForOpplysning} from "../../../nav-soknad/redux/okonomiskeOpplysninger/opplysningerUtils";

interface OwnProps {
    okonomiskOpplysning: Opplysning;
}

interface StoreToProps {
    behandlingsId: string;
    feil: Valideringsfeil[];
}

type Props = OwnProps & StoreToProps & DispatchProps & InjectedIntlProps

class VedleggView extends React.Component<Props> {

    handleAlleredeLastetOpp(event: any) {
        const {okonomiskOpplysning, behandlingsId, feil} = this.props;
        const opplysningUpdated = {...okonomiskOpplysning};

        if (opplysningUpdated.vedleggStatus !== VedleggStatus.VEDLEGGALLEREDESEND) {
            opplysningUpdated.vedleggStatus = VedleggStatus.VEDLEGGALLEREDESEND;
        } else {
            opplysningUpdated.vedleggStatus = VedleggStatus.VEDLEGG_KREVES;
        }

        this.props.dispatch(lagreOpplysningHvisGyldigAction(behandlingsId, opplysningUpdated, feil));
    }

    slettVedlegg(fil: Fil) {
        const {behandlingsId, okonomiskOpplysning} = this.props;
        this.props.dispatch(startSlettFil(behandlingsId, fil, okonomiskOpplysning, okonomiskOpplysning.type))
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
                    isDisabled={opplysning.pendingLasterOppFil || opplysning.vedleggStatus === VedleggStatus.VEDLEGGALLEREDESEND}
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

export default connect<StoreToProps, {}, OwnProps>(
    (state: SoknadAppState) => {
        return {
            behandlingsId: state.soknad.data.brukerBehandlingId,
            feil: state.validering.feil
        }
    }
)(VedleggView);