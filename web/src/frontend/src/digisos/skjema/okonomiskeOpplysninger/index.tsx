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
    OpplysningGruppe,
    OkonomiskeOpplysningerModel
} from "../../../nav-soknad/redux/okonomiskeOpplysninger/okonomiskeOpplysningerTypes";
import {DispatchProps, SoknadAppState} from "../../../nav-soknad/redux/reduxTypes";
import {hentOkonomiskeOpplysninger} from "../../../nav-soknad/redux/okonomiskeOpplysninger/OkonomiskeOpplysningerActions";
import {RestStatus} from "../../../nav-soknad/types";
import {Valideringsfeil} from "../../../nav-soknad/validering/types";


export interface StoreToProps {
    okonomiskeOpplysninger: OkonomiskeOpplysningerModel;
    behandlingsId: string;
    feil: Valideringsfeil[];
}

// const okonomiskeFaktumKeys = [
//     "dinsituasjon.jobb",
//     "dinsituasjon.studerer",
//     "familie.barn.true.barnebidrag",
//     "bosituasjon",
//     "inntekt.bostotte",
//     "inntekt.eierandeler.true.type.bolig",
//     "inntekt.eierandeler.true.type.kjoretoy",
//     "inntekt.eierandeler.true.type.campingvogn",
//     "inntekt.eierandeler.true.type.fritidseiendom",
//     "inntekt.eierandeler.true.type.annet",
//     "inntekt.bankinnskudd.true.type.brukskonto",
//     "inntekt.bankinnskudd.true.type.bsu",
//     "inntekt.bankinnskudd.true.type.sparekonto",
//     "inntekt.bankinnskudd.true.type.livsforsikring",
//     "inntekt.bankinnskudd.true.type.aksjer",
//     "inntekt.bankinnskudd.true.type.annet",
//     "inntekt.inntekter.true.type.utbytte",
//     "inntekt.inntekter.true.type.salg",
//     "inntekt.inntekter.true.type.forsikringsutbetalinger",
//     "inntekt.inntekter.true.type.annet",
//     "utgifter.boutgift.true.type.husleie",
//     "utgifter.boutgift.true.type.strom",
//     "utgifter.boutgift.true.type.kommunaleavgifter",
//     "utgifter.boutgift.true.type.oppvarming",
//     "utgifter.boutgift.true.type.avdraglaan",
//     "utgifter.boutgift.true.type.andreutgifter",
//     "utgifter.barn.true.utgifter.fritidsaktivitet",
//     "utgifter.barn.true.utgifter.barnehage",
//     "utgifter.barn.true.utgifter.sfo",
//     "utgifter.barn.true.utgifter.tannbehandling",
//     "utgifter.barn.true.utgifter.annet"
// ]; 31


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
                <Gruppe opplysningGruppeKey={OpplysningGruppe.ARBEID} gruppe={gruppeArbeid}/>
                <Gruppe opplysningGruppeKey={OpplysningGruppe.FAMILIE} gruppe={gruppeFamilie}/>
                <Gruppe opplysningGruppeKey={OpplysningGruppe.BOSITUASJON} gruppe={gruppeBosituasjon}/>
                <Gruppe opplysningGruppeKey={OpplysningGruppe.INNTEKT} gruppe={gruppeInntekt}/>
                <Gruppe opplysningGruppeKey={OpplysningGruppe.UTGIFTER} gruppe={gruppeUtgifter}/>
                <Gruppe opplysningGruppeKey={OpplysningGruppe.GENERELLE_VEDLEGG} gruppe={gruppeGenerelleVedlegg}/>
                <Gruppe opplysningGruppeKey={OpplysningGruppe.ANDRE_UTGIFTER} gruppe={gruppeAndreUtgifter}/>
                <Gruppe opplysningGruppeKey={OpplysningGruppe.UKJENT} gruppe={gruppeUkjent}/>
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
            behandlingsId: state.soknad.data.brukerBehandlingId,
            feil: state.validering.feil
        };
    }
)(injectIntl(OkonomiskeOpplysningerView));

