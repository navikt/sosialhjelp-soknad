import * as React from "react";
import {connect} from "react-redux";
import {FormattedHTMLMessage, InjectedIntlProps, injectIntl} from "react-intl";
import DigisosSkjemaSteg, {DigisosSteg} from "../DigisosSkjemaSteg";
import SkjemaIllustrasjon from "../../../nav-soknad/components/svg/illustrasjoner/SkjemaIllustrasjon";


import NavFrontendSpinner from "nav-frontend-spinner";
import Informasjonspanel, {InformasjonspanelIkon} from "../../../nav-soknad/components/informasjonspanel";
import {DigisosFarge} from "../../../nav-soknad/components/svg/DigisosFarger";
import Gruppe from "./Gruppe";
import {
    GruppeEnum,
    OkonomiskeOpplysningerModel
} from "../../../nav-soknad/redux/okonomiskeOpplysninger/okonomiskeOpplysningerTypes";
import {DispatchProps, SoknadAppState} from "../../../nav-soknad/redux/reduxTypes";
import {hentOkonomiskeOpplysninger} from "../../../nav-soknad/redux/okonomiskeOpplysninger/OkonomiskeOpplysningerActions";
import {RestStatus} from "../../../nav-soknad/types";


export interface StoreToProps {
    okonomiskeOpplysninger: OkonomiskeOpplysningerModel;
    behandlingsId: string;
}


type Props = StoreToProps & InjectedIntlProps & DispatchProps;

class OkonomiskeOpplysningerView extends React.Component<Props, {}> {


    componentDidMount(){
        const { behandlingsId } = this.props;
        this.props.dispatch(hentOkonomiskeOpplysninger(behandlingsId))
    }

    renderGrupper(){

        if(!this.props.okonomiskeOpplysninger.grupper){
            return null;
        }

        const {
            gruppeArbeid,
            gruppeFamilie,
            gruppeBosituasjon,
            gruppeInntekt,
            gruppeUtgifter,
            gruppeGenerelleVedlegg,
            gruppeAndreUtgifter,
            gruppeUkjent
        } = this.props.okonomiskeOpplysninger.grupper;

        return(
            <div>
                <Gruppe key={GruppeEnum.ARBEID} tittel={"ARBEID"} gruppe={gruppeArbeid}/>
                <Gruppe key={GruppeEnum.FAMILIE} tittel={"FAMILIE"} gruppe={gruppeFamilie}/>
                <Gruppe key={GruppeEnum.BOSITUASJON} tittel={"BOSITUASJON"} gruppe={gruppeBosituasjon}/>
                <Gruppe key={GruppeEnum.INNTEKT} tittel={"INNTEKT"} gruppe={gruppeInntekt}/>
                <Gruppe key={GruppeEnum.UTGIFTER} tittel={"UTGIFTER"} gruppe={gruppeUtgifter}/>
                <Gruppe key={GruppeEnum.GENERELLE_VEDLEGG} tittel={"GENERELLE VEDLEGG"} gruppe={gruppeGenerelleVedlegg}/>
                <Gruppe key={GruppeEnum.ANDRE_UTGIFTER} tittel={"ANDRE UTGIFTER"} gruppe={gruppeAndreUtgifter}/>
                <Gruppe key={GruppeEnum.UKJENT} tittel={"UKJENT"} gruppe={gruppeUkjent}/>
            </div>
        )
    }


    render() {
        const { restStatus, backendData } = this.props.okonomiskeOpplysninger;

        const ikkeBesvartMeldingSkalVises = backendData && backendData.okonomiskeOpplysninger.length < 3;

        const infoMelding: JSX.Element = (
                <div className="steg-ekstrainformasjon__blokk">
                    <Informasjonspanel
                        ikon={InformasjonspanelIkon.HENSYN}
                        farge={DigisosFarge.VIKTIG}
                    >
                        <FormattedHTMLMessage id="opplysninger.informasjon"/>
                    </Informasjonspanel>
                </div>
        );

        const ikkeBesvartMelding: JSX.Element = (
                <div className="steg-ekstrainformasjon__blokk">
                    <Informasjonspanel
                        ikon={InformasjonspanelIkon.HENSYN}
                        farge={DigisosFarge.VIKTIG}
                    >
                        <FormattedHTMLMessage id="opplysninger.ikkebesvart.melding"/>
                    </Informasjonspanel>
                </div>
        );

        if (restStatus === RestStatus.SUCCESS){
            return (
                <div className="steg-ekstrainformasjon">
                    <DigisosSkjemaSteg steg={DigisosSteg.opplysningerbolk} ikon={<SkjemaIllustrasjon/>}>
                        { !ikkeBesvartMeldingSkalVises && infoMelding }
                        { ikkeBesvartMeldingSkalVises && ikkeBesvartMelding }
                        { this.renderGrupper()}
                    </DigisosSkjemaSteg>
                </div>
            );
        }

        return(
            <div className="application-spinner">
                <NavFrontendSpinner type="XXL" />
            </div>
        )
    }
}


export default connect<StoreToProps, {}, {}>(
    (state: SoknadAppState) => {
        return {
            okonomiskeOpplysninger: state.okonomiskeOpplysninger,
            behandlingsId: state.soknad.data.brukerBehandlingId
        };
    }
)(injectIntl(OkonomiskeOpplysningerView));

