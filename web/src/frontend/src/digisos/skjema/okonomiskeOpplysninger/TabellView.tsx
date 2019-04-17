import * as React from 'react';
import {
    InputType, OkonomiskeOpplysningerModel,
    Opplysning,
    OpplysningRad,
    RadType
} from "../../../nav-soknad/redux/okonomiskeOpplysninger/okonomiskeOpplysningerTypes";
import {DispatchProps, SoknadAppState} from "../../../nav-soknad/redux/reduxTypes";
import {connect} from "react-redux";
import {
    getKeyForOpplysningType,
    getTomVedleggRad
} from "../../../nav-soknad/redux/okonomiskeOpplysninger/okonomiskeOpplysningerUtils";
import {Column, Row} from "nav-frontend-grid";
import InputEnhanced from "../../../nav-soknad/faktum/InputEnhanced";
import {
    lagreOpplysningHvisGyldigAction,
    updateOpplysning,
} from "../../../nav-soknad/redux/okonomiskeOpplysninger/OkonomiskeOpplysningerActions";
import Lenkeknapp from "../../../nav-soknad/components/lenkeknapp/Lenkeknapp";
import {setValideringsfeil} from "../../../nav-soknad/redux/valideringActions";
import {ValideringActionKey, Valideringsfeil} from "../../../nav-soknad/validering/types";
import {erTall} from "../../../nav-soknad/validering/valideringer";
import InjectedIntlProps = ReactIntl.InjectedIntlProps;


interface OwnProps {
    opplysning: Opplysning;
    gruppeIndex: number;
    feil?: Valideringsfeil[];
}

interface StoreToProps {
    okonomiskeOpplysninger: OkonomiskeOpplysningerModel;
    behandlingsId: string;
    feil: Valideringsfeil[];
}


type Props = OwnProps & StoreToProps & DispatchProps & InjectedIntlProps;


class TabellView extends React.Component<Props, {}>{


    handleChange(input: string, radIndex: number, inputFelt: InputType, key: string){

        const { opplysning } = this.props;
        const opplysningUpdated: Opplysning = { ...opplysning };
        const raderUpdated: OpplysningRad[] = opplysning.rader.map((e) => ({...e}));
        raderUpdated[radIndex][inputFelt] = input;
        opplysningUpdated.rader = raderUpdated;

        switch (inputFelt) {
            case InputType.BESKRIVELSE: {
                break;
            }
            default: {
                if (!erTall(input)){
                    this.props.dispatch(setValideringsfeil(null, key));
                }
                break;
            }
        }

        this.props.dispatch(updateOpplysning(opplysningUpdated));

    }

    handleBlur(radIndex: number, inputFelt: InputType, key: string){
        const { behandlingsId, opplysning, feil } = this.props;

        const input = opplysning.rader[radIndex][inputFelt];

        console.warn(input);

        if (inputFelt !== "beskrivelse" && input && input !== "" && erTall(input)){
            this.props.dispatch(setValideringsfeil(ValideringActionKey.ER_TALL, key));
            this.props.dispatch(updateOpplysning(opplysning))
        } else {
            this.props.dispatch(lagreOpplysningHvisGyldigAction(behandlingsId, opplysning, feil));
        }
    }

    handleLeggTilRad(){
        const { opplysning } = this.props;
        const opplysningUpdated: Opplysning = { ...opplysning };
        const raderUpdated: OpplysningRad[] = opplysning.rader.map(e => ({ ...e }));
        raderUpdated.push(getTomVedleggRad());
        opplysningUpdated.rader = raderUpdated;
        this.props.dispatch(updateOpplysning(opplysningUpdated));
    }

    handleFjernRad(radIndex: number, valideringsKey: string){

        const { behandlingsId, opplysning, feil } = this.props;

        const opplysningUpdated: Opplysning = { ...opplysning };
        const raderUpdated: OpplysningRad[] = opplysning.rader.map(e => ({...e}));
        raderUpdated.splice(radIndex, 1);
        opplysningUpdated.rader = raderUpdated;

        // TODO: Burde gjøres annerledes? Dette er for å klone feil fra store og oppdatere den før opplysningSaga...
        const feilUpdated = feil.filter(f => (
                f.faktumKey !== valideringsKey + ".beskrivelse" + radIndex &&
                f.faktumKey !== valideringsKey + ".belop" + radIndex &&
                f.faktumKey !== valideringsKey + ".brutto" + radIndex &&
                f.faktumKey !== valideringsKey + ".netto" + radIndex &&
                f.faktumKey !== valideringsKey + ".avdrag" + radIndex &&
                f.faktumKey !== valideringsKey + ".renter" + radIndex)
        );


        this.props.dispatch(lagreOpplysningHvisGyldigAction(behandlingsId, opplysningUpdated, feilUpdated));

        // TODO: Bør gjøres annerledes?? Dette er for å oppdatere store
        this.props.dispatch(setValideringsfeil(null, valideringsKey + ".beskrivelse" + radIndex));
        this.props.dispatch(setValideringsfeil(null, valideringsKey + ".belop" + radIndex));
        this.props.dispatch(setValideringsfeil(null, valideringsKey + ".brutto" + radIndex));
        this.props.dispatch(setValideringsfeil(null, valideringsKey + ".netto" + radIndex));
        this.props.dispatch(setValideringsfeil(null, valideringsKey + ".avdrag" + radIndex));
        this.props.dispatch(setValideringsfeil(null, valideringsKey + ".renter" + radIndex));
    }

    render(){
        const { opplysning, gruppeIndex } = this.props;


        const innhold: JSX.Element[] = opplysning.rader.map((vedleggRad: OpplysningRad, radIndex: number) => {

            const skalViseFjerneRadKnapp = radIndex > 0;

            const skalViseBeskrivelse: boolean = opplysning.radType === RadType.RADER_MED_BESKRIVELSE_OG_BELOP;
            const skalViseBelop: boolean =
                opplysning.radType === RadType.RAD_MED_BELOP ||
                opplysning.radType ===RadType.RADER_MED_BELOP ||
                opplysning.radType ===RadType.RADER_MED_BESKRIVELSE_OG_BELOP;
            const skalViseBruttoOgNetto: boolean = opplysning.radType === RadType.RADER_MED_BRUTTO_OG_NETTO;
            const skalViseAvdragOgRenter: boolean = opplysning.radType === RadType.RADER_MED_AVDRAG_OG_RENTER;
            const textKeyForOpplysningType = getKeyForOpplysningType(opplysning.type);


            return (
                <Row key={radIndex} className="opplysning__row">
                    {
                        skalViseBeskrivelse &&
                        <Column xs={"12"} md={"6"}>
                            <InputEnhanced
                                id="beskrivelse"
                                onChange={(input) => this.handleChange(input, radIndex, InputType.BESKRIVELSE, textKeyForOpplysningType + ".beskrivelse" + radIndex)}
                                onBlur={() => this.handleBlur(radIndex, InputType.BESKRIVELSE, textKeyForOpplysningType + ".beskrivelse" + radIndex)}
                                verdi={vedleggRad.beskrivelse ? vedleggRad.beskrivelse : ""}
                                required={false}
                                bredde={"S"}
                                faktumKey={textKeyForOpplysningType + ".beskrivelse"}
                                faktumIndex={radIndex}
                            />
                        </Column>
                    }
                    {
                        skalViseBelop &&
                        <Column xs={"12"} md={"6"}>
                            <InputEnhanced
                                id="belop"
                                onChange={(input) => this.handleChange(input, radIndex, InputType.BELOP, textKeyForOpplysningType + ".belop" + radIndex)}
                                onBlur={() => this.handleBlur(radIndex, InputType.BELOP, textKeyForOpplysningType + ".belop" + radIndex)}
                                verdi={vedleggRad.belop ? vedleggRad.belop : ""}
                                required={false}
                                bredde={"S"}
                                faktumKey={textKeyForOpplysningType + ".belop" }
                                faktumIndex={radIndex}
                            />
                        </Column>
                    }
                    { skalViseBruttoOgNetto &&
                        <Column xs={"12"} md={"6"}>
                            <InputEnhanced
                                id="brutto"
                                onChange={(input) => this.handleChange(input, radIndex, InputType.BRUTTO, textKeyForOpplysningType + ".brutto" + radIndex)}
                                onBlur={() => this.handleBlur(radIndex, InputType.BRUTTO, textKeyForOpplysningType + ".brutto" + radIndex)}
                                verdi={vedleggRad.brutto? vedleggRad.brutto : ""}
                                required={false}
                                bredde={"S"}
                                faktumKey={textKeyForOpplysningType + ".brutto" }
                                faktumIndex={radIndex}
                            />
                        </Column>
                    }
                    { skalViseBruttoOgNetto &&
                        <Column xs={"12"} md={"6"}>
                            <InputEnhanced
                                id="netto"
                                onChange={(input) => this.handleChange(input, radIndex, InputType.NETTO, textKeyForOpplysningType + ".netto" + radIndex)}
                                onBlur={() => this.handleBlur(radIndex, InputType.NETTO, textKeyForOpplysningType + ".netto" + radIndex)}
                                verdi={vedleggRad.netto ? vedleggRad.netto : ""}
                                required={false}
                                bredde={"S"}
                                faktumKey={textKeyForOpplysningType + ".netto"}
                                faktumIndex={radIndex}
                            />
                        </Column>
                    }
                    { skalViseAvdragOgRenter &&
                        <Column xs={"12"} md={"6"}>
                            <InputEnhanced
                                id="avdrag"
                                onChange={(input) => this.handleChange(input, radIndex, InputType.AVDRAG, textKeyForOpplysningType + ".avdrag" + radIndex)}
                                onBlur={() => this.handleBlur(radIndex, InputType.AVDRAG, textKeyForOpplysningType + ".avdrag" + radIndex)}
                                verdi={vedleggRad.avdrag ? vedleggRad.avdrag : ""}
                                required={false}
                                bredde={"S"}
                                faktumKey={textKeyForOpplysningType + ".avdrag" }
                                faktumIndex={radIndex}
                            />
                        </Column>
                    }
                    { skalViseAvdragOgRenter &&
                        <Column xs={"12"} md={"6"}>
                            <InputEnhanced
                                id="renter"
                                onChange={(input) => this.handleChange(input, radIndex, InputType.RENTER, textKeyForOpplysningType + ".renter" + radIndex)}
                                onBlur={() => this.handleBlur(radIndex, InputType.RENTER, textKeyForOpplysningType + ".renter" + radIndex)}
                                verdi={vedleggRad.renter ? vedleggRad.renter : ""}
                                required={false}
                                bredde={"S"}
                                faktumKey={textKeyForOpplysningType + ".renter" }
                                faktumIndex={radIndex}
                            />
                        </Column>
                    }

                    { skalViseFjerneRadKnapp &&
                        <Lenkeknapp
                            onClick={() => {this.handleFjernRad(radIndex, textKeyForOpplysningType)}}
                            id={radIndex + "_fjern_lenke"}
                        >
                            Fjern
                        </Lenkeknapp>
                    }
                </Row>
                )
        });

        return(
            <div className="container--noPadding container-fluid">
                { innhold }
                {
                    opplysning.radType !== RadType.NOTHING &&
                    opplysning.radType !== RadType.RAD_MED_BELOP &&
                    <Lenkeknapp onClick={() => this.handleLeggTilRad()} style="add" id={ gruppeIndex + "_link"}>
                        Legg til
                    </Lenkeknapp>
                }
            </div>
        )
    }

}

export default connect<StoreToProps, {}, OwnProps>(
    (state: SoknadAppState) => {
        return {
            okonomiskeOpplysninger: state.okonomiskeOpplysninger,
            behandlingsId: state.soknad.data.brukerBehandlingId,
            feil: state.validering.feil,
        };
    }
)(TabellView);
