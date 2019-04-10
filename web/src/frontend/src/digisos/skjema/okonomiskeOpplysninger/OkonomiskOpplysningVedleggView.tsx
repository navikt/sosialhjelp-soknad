import * as React from 'react';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import {DispatchProps, SoknadAppState} from "../../../nav-soknad/redux/reduxTypes";
import {StoreToProps} from "./index";
import {Fil, Opplysning} from "../../../nav-soknad/redux/okonomiskeOpplysninger/okonomiskeOpplysningerTypes";
import {connect} from "react-redux";
import OpplastetVedlegg from "./VedleggsFilNy";
import LastOppFil from "./LastOppFil";
import {Checkbox} from "nav-frontend-skjema";
import {FormattedHTMLMessage, FormattedMessage} from "react-intl";
import {
    getTextKeyForVedleggType
} from "../../../nav-soknad/redux/okonomiskeOpplysninger/okonomiskeOpplysningerUtils";
import {startSlettFil} from "../../../nav-soknad/redux/fil/filActions";

interface OwnProps {
    okonomiskOpplysning: Opplysning;
    gruppeIndex: number;
}

type Props = OwnProps & StoreToProps & DispatchProps & InjectedIntlProps

class OkonomiskOpplysningVedleggView extends React.Component<Props>{


    handleAlleredeLastetOpp(event: any){
        console.warn("Handle allerede lastet opp vedlegg");
    }

    slettVedlegg(fil: Fil){
        const { behandlingsId } = this.props;
        this.props.dispatch(startSlettFil(behandlingsId, fil.uuid))
    }


    renderOpplastingAvVedleggSeksjon(opplysning: Opplysning) {

        const tittelKey = getTextKeyForVedleggType(this.props.okonomiskOpplysning.type) + ".tittel";

        const vedleggListe = opplysning.filer
            .map(fil => {
                return <OpplastetVedlegg key={fil.uuid} fil={fil} onSlett={() => this.slettVedlegg(fil)}/>
            });

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
                    gruppeIndex={this.props.gruppeIndex}
                    isDisabled={false}
                    visSpinner={true}
                />
                <Checkbox
                    label={<FormattedHTMLMessage id={"opplysninger.vedlegg.alleredelastetopp"}/>}
                    id={opplysning.type + "_allerede_lastet_opp_checkbox"}
                    className={"vedleggLastetOppCheckbox " + " checkboks--disabled"}
                    onChange={(event: any) => this.handleAlleredeLastetOpp(event)}
                    checked={true}
                    disabled={false}
                />
            </div>
        )
    }

    render(){

        const { okonomiskOpplysning } = this.props;

        return(
            <div>
                { this.renderOpplastingAvVedleggSeksjon(okonomiskOpplysning)}
            </div>
        )
    }
}

export default connect<StoreToProps, {}, OwnProps>(
    (state: SoknadAppState) => {
        return {
            okonomiskeOpplysninger: state.okonomiskeOpplysninger,
            behandlingsId: state.soknad.data.brukerBehandlingId
        }
    }
)(OkonomiskOpplysningVedleggView);