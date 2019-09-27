import * as React from 'react';
import {
    AntallRader,
    InputType,
    Opplysning,
    OpplysningerModel,
    OpplysningRad,
    OpplysningSpc,
} from "../../redux/okonomiskeOpplysninger/opplysningerTypes";
import {
    DispatchProps,
    Valideringsfeil,
    ValideringsFeilKode
} from "../../redux/reduxTypes";
import {connect} from "react-redux";
import {
    getSpcForOpplysning,
    getTomVedleggRad
} from "../../redux/okonomiskeOpplysninger/opplysningerUtils";
import {Column, Row} from "nav-frontend-grid";
import InputEnhanced from "../../../nav-soknad/faktum/InputEnhanced";
import {
    lagreOpplysningHvisGyldigAction,
    updateOpplysning,
} from "../../redux/okonomiskeOpplysninger/opplysningerActions";
import Lenkeknapp from "../../../nav-soknad/components/lenkeknapp/Lenkeknapp";
import {clearValideringsfeil, setValideringsfeil} from "../../redux/validering/valideringActions";
import {erTall} from "../../../nav-soknad/validering/valideringer";
import {getFeilForOpplysning} from "../../redux/okonomiskeOpplysninger/opplysningerSaga";
import {InjectedIntlProps} from "react-intl";
import {State} from "../../redux/reducers";
import { injectIntl} from "react-intl";

interface OwnProps {
    opplysning: Opplysning;
    gruppeIndex: number;
    feil?: Valideringsfeil[];
}

interface StoreToProps {
    okonomiskeOpplysninger: OpplysningerModel;
    behandlingsId: string | undefined;
    feil: Valideringsfeil[];
}

type Props = OwnProps & StoreToProps & DispatchProps & InjectedIntlProps;

export const erGyldigTall = (input: string) : boolean => {
    return !erTall(input, true) && parseInt(input, 10) < 2147483648;
};


class TabellView extends React.Component<Props, {}> {

    handleChange(input: string, radIndex: number, inputFelt: InputType, key: string) {
        const {opplysning} = this.props;
        const opplysningUpdated: Opplysning = {...opplysning};
        const raderUpdated: OpplysningRad[] = opplysning.rader.map((e) => ({...e}));
        raderUpdated[radIndex][inputFelt] = input;
        opplysningUpdated.rader = raderUpdated;

        if (inputFelt !== InputType.BESKRIVELSE) {
            if (erGyldigTall(input) || input === "") {
                this.props.dispatch(clearValideringsfeil(key));
            }
        }
        this.props.dispatch(updateOpplysning(opplysningUpdated));
    }

    handleBlur(radIndex: number, inputFelt: InputType, key: string) {
        const {behandlingsId, opplysning, feil} = this.props;
        if (behandlingsId){
            const input = opplysning.rader[radIndex][inputFelt];

            if (inputFelt !== "beskrivelse" && input && input !== "" && !erGyldigTall(input)) {
                this.props.dispatch(setValideringsfeil(ValideringsFeilKode.ER_TALL, key));
                this.props.dispatch(updateOpplysning(opplysning))
            } else {
                this.props.dispatch(lagreOpplysningHvisGyldigAction(behandlingsId, opplysning, feil));
            }
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
        if (behandlingsId){
            const opplysningUpdated: Opplysning = {...opplysning};
            const raderUpdated: OpplysningRad[] = opplysning.rader.map(e => ({...e}));
            raderUpdated.splice(radIndex, 1);
            opplysningUpdated.rader = raderUpdated;
            this.fjernAlleFeilForOpplysning(feil, valideringsKey);
            this.validerAlleInputfelterPaOpplysning(opplysningUpdated, opplysning);
            const feilUpdated = this.getOppdatertListeAvFeil(feil, valideringsKey, radIndex);
            this.props.dispatch(lagreOpplysningHvisGyldigAction(behandlingsId, opplysningUpdated, feilUpdated));
        }
    }

    getOppdatertListeAvFeil(feil: Valideringsfeil[], valideringsKey: string, radIndex: number) {
        const feilUpdated = feil.filter(f => (
            f.faktumKey !== valideringsKey + ".beskrivelse." + radIndex &&
            f.faktumKey !== valideringsKey + ".belop." + radIndex &&
            f.faktumKey !== valideringsKey + ".brutto." + radIndex &&
            f.faktumKey !== valideringsKey + ".netto." + radIndex &&
            f.faktumKey !== valideringsKey + ".avdrag." + radIndex &&
            f.faktumKey !== valideringsKey + ".renter." + radIndex)
        );
        return feilUpdated;
    }

    validerAlleInputfelterPaOpplysning(opplysningUpdated: Opplysning, opplysning: Opplysning) {
        opplysningUpdated.rader.forEach((rad: OpplysningRad, index: number) => {
            Object.keys(rad).forEach((key: string) => {
                switch(key){
                    case InputType.BELOP: {
                        this.setValideringsfeilHvisUgyldigTall(InputType.BELOP, rad[InputType.BELOP], opplysning, index);
                        break;
                    }
                    case InputType.BRUTTO: {
                        this.setValideringsfeilHvisUgyldigTall(InputType.BRUTTO, rad[InputType.BRUTTO], opplysning, index);
                        break;
                    }
                    case InputType.NETTO: {
                        this.setValideringsfeilHvisUgyldigTall(InputType.NETTO, rad[InputType.NETTO], opplysning, index);
                        break;
                    }
                    case InputType.AVDRAG: {
                        this.setValideringsfeilHvisUgyldigTall(InputType.AVDRAG, rad[InputType.AVDRAG], opplysning, index);
                        break;
                    }
                    case InputType.RENTER: {
                        this.setValideringsfeilHvisUgyldigTall(InputType.RENTER, rad[InputType.RENTER], opplysning, index);
                        break;
                    }
                    default: {

                    }
                }
            });
        });
    }

    setValideringsfeilHvisUgyldigTall(key: InputType, value: string, opplysning: Opplysning, index: number){
        const spc: OpplysningSpc | undefined = getSpcForOpplysning(opplysning.type);
        if (spc){
            if (value !== null && value !== "" && !erGyldigTall(value)) {
                const validationKey: string = `${spc.textKey}.${key}.${index}`;
                this.props.dispatch(setValideringsfeil(ValideringsFeilKode.ER_TALL, validationKey));
            }
        }
    }

    fjernAlleFeilForOpplysning(feil: Valideringsfeil[], valideringsKey: string) {
        const feilForOpplysning = getFeilForOpplysning(feil, valideringsKey);
        feilForOpplysning.forEach((f: Valideringsfeil) => {
            this.props.dispatch(clearValideringsfeil(f.faktumKey));
        });
    }

    render() {
        const {opplysning, gruppeIndex} = this.props;

        const opplysningSpc: OpplysningSpc | undefined = getSpcForOpplysning(opplysning.type);
        const textKey = opplysningSpc ? opplysningSpc.textKey : "";

        const innhold: JSX.Element[] = opplysning.rader.map((vedleggRad: OpplysningRad, radIndex: number) => {
            const skalViseFjerneRadKnapp = radIndex > 0;
            const inputs = opplysningSpc ? opplysningSpc.radInnhold.map((inputType: InputType) => {
                const key: string = `${textKey}.${inputType}.${radIndex}`;
                const text: string = `${textKey}.${inputType}`;
                const id: string = key.replace(/\./gi, '_');

                return (
                    <Column xs={"12"} md={"6"} key={key}>
                        <InputEnhanced
                            id={id}
                            onChange={(input: string) => this.handleChange(input, radIndex, inputType, key)}
                            onBlur={() => this.handleBlur(radIndex, inputType, key)}
                            verdi={vedleggRad[inputType] ? vedleggRad[inputType] : ""}
                            required={false}
                            bredde={inputType === InputType.BESKRIVELSE ? "L" : "S"}
                            faktumKey={text}
                            faktumIndex={radIndex}
                            maxLength={ inputType === InputType.BESKRIVELSE ? 100 : 8}
                        />
                    </Column>
                )
            }) : null;

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

        if (innhold){
            return (
                <div className="container--noPadding container-fluid">
                    {innhold}
                    {
                        opplysningSpc && opplysningSpc.antallRader === AntallRader.FLERE &&
                        <Lenkeknapp onClick={() => this.handleLeggTilRad()} stil="add" id={gruppeIndex + "_link"}>
                            Legg til
                        </Lenkeknapp>
                    }
                </div>
            )
        }
        return null;
    }
}

export default connect(
    (state: State) => {
        return {
            okonomiskeOpplysninger: state.okonomiskeOpplysninger,
            behandlingsId: state.soknad.behandlingsId,
            feil: state.validering.feil,
        };
    }
)(injectIntl(TabellView));
