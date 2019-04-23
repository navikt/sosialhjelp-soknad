import * as React from 'react';
import {
    AntallRader,
    InputType,
    OkonomiskeOpplysningerModel,
    Opplysning,
    OpplysningRad,
} from "../../../nav-soknad/redux/okonomiskeOpplysninger/opplysningerTypes";
import {DispatchProps, SoknadAppState} from "../../../nav-soknad/redux/reduxTypes";
import {connect} from "react-redux";
import {
    getSpcForOpplysning,
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
import {getFeilForOpplysning} from "../../../nav-soknad/redux/okonomiskeOpplysninger/opplysningerSaga";


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


class TabellView extends React.Component<Props, {}> {


    handleChange(input: string, radIndex: number, inputFelt: InputType, key: string) {

        const {opplysning} = this.props;
        const opplysningUpdated: Opplysning = {...opplysning};
        const raderUpdated: OpplysningRad[] = opplysning.rader.map((e) => ({...e}));
        raderUpdated[radIndex][inputFelt] = input;
        opplysningUpdated.rader = raderUpdated;

        if (inputFelt !== InputType.BESKRIVELSE) {
            if (!erTall(input) || input === "") {
                this.props.dispatch(setValideringsfeil(null, key));
            }
        }
        this.props.dispatch(updateOpplysning(opplysningUpdated));
    }

    handleBlur(radIndex: number, inputFelt: InputType, key: string) {
        const {behandlingsId, opplysning, feil} = this.props;

        const input = opplysning.rader[radIndex][inputFelt];

        if (inputFelt !== "beskrivelse" && input && input !== "" && erTall(input)) {
            this.props.dispatch(setValideringsfeil(ValideringActionKey.ER_TALL, key));
            this.props.dispatch(updateOpplysning(opplysning))
        } else {
            this.props.dispatch(lagreOpplysningHvisGyldigAction(behandlingsId, opplysning, feil));
        }
    }

    handleLeggTilRad() {
        const {opplysning} = this.props;
        const opplysningUpdated: Opplysning = {...opplysning};
        const raderUpdated: OpplysningRad[] = opplysning.rader.map(e => ({...e}));
        raderUpdated.push(getTomVedleggRad());
        opplysningUpdated.rader = raderUpdated;
        this.props.dispatch(updateOpplysning(opplysningUpdated));
    }

    handleFjernRad(radIndex: number, valideringsKey: string) {

        const {behandlingsId, opplysning, feil} = this.props;

        const opplysningUpdated: Opplysning = {...opplysning};
        const raderUpdated: OpplysningRad[] = opplysning.rader.map(e => ({...e}));
        raderUpdated.splice(radIndex, 1);
        opplysningUpdated.rader = raderUpdated;

        // Fjern alle feil for opplysning
        const feilForOpplysning = getFeilForOpplysning(feil, valideringsKey);
        feilForOpplysning.map((f: Valideringsfeil) => {
           this.props.dispatch(setValideringsfeil(null, f.faktumKey));
        });

        // Sjekk alle inputfelter for feil
        opplysningUpdated.rader.map((rad: OpplysningRad, index: number) => {
            Object.keys(rad).map((key: InputType) => {
                if(key !== "beskrivelse" && rad[key] && rad[key] !== "" && erTall(rad[key])){
                    const validationKey: string = `${getSpcForOpplysning(opplysning.type).textKey}.${key}.${index}`;
                    this.props.dispatch(setValideringsfeil(ValideringActionKey.ER_TALL, validationKey));
                }
            });
        });

        const feilUpdated = feil.filter(f => (
            f.faktumKey !== valideringsKey + ".beskrivelse." + radIndex &&
            f.faktumKey !== valideringsKey + ".belop." + radIndex &&
            f.faktumKey !== valideringsKey + ".brutto." + radIndex &&
            f.faktumKey !== valideringsKey + ".netto." + radIndex &&
            f.faktumKey !== valideringsKey + ".avdrag." + radIndex &&
            f.faktumKey !== valideringsKey + ".renter." + radIndex)
        );

        this.props.dispatch(lagreOpplysningHvisGyldigAction(behandlingsId, opplysningUpdated, feilUpdated));

    }

    render() {
        const {opplysning, gruppeIndex} = this.props;

        const opplysningSpc = getSpcForOpplysning(opplysning.type);
        const textKey = opplysningSpc.textKey;

        const innhold: JSX.Element[] = opplysning.rader.map((vedleggRad: OpplysningRad, radIndex: number) => {

            const skalViseFjerneRadKnapp = radIndex > 0;
            const inputs = opplysningSpc.radInnhold.map((inputType: InputType, index: number) => {

                const key: string = `${textKey}.${inputType}.${radIndex}`;
                const text: string = `${textKey}.${inputType}`;

                return (
                    <Column xs={"12"} md={"6"} key={key}>
                        <InputEnhanced
                            id={inputType}
                            onChange={(input) => this.handleChange(input, radIndex, inputType, key)}
                            onBlur={() => this.handleBlur(radIndex, inputType, key)}
                            verdi={vedleggRad[inputType] ? vedleggRad[inputType] : ""}
                            required={false}
                            bredde={"S"}
                            faktumKey={text}
                            faktumIndex={radIndex}
                        />
                    </Column>
                )
            });

            return (
                <Row key={radIndex} className="opplysning__row">
                    {inputs}

                    {skalViseFjerneRadKnapp &&
                    <Lenkeknapp
                        onClick={() => {
                            this.handleFjernRad(radIndex, textKey)
                        }}
                        id={radIndex + "_fjern_lenke"}
                    >
                        Fjern
                    </Lenkeknapp>
                    }
                </Row>
            )
        });

        return (
            <div className="container--noPadding container-fluid">
                {innhold}
                {
                    opplysningSpc.antallRader === AntallRader.FLERE &&
                    <Lenkeknapp onClick={() => this.handleLeggTilRad()} style="add" id={gruppeIndex + "_link"}>
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
