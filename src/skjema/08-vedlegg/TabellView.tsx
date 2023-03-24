import * as React from "react";
import {
    AntallRader,
    InputType,
    Opplysning,
    OpplysningRad,
    OpplysningSpc,
} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerTypes";
import {Valideringsfeil, ValideringsFeilKode} from "../../digisos/redux/validering/valideringActionTypes";
import {useDispatch, useSelector} from "react-redux";
import {getSpcForOpplysning, getTomVedleggRad} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerUtils";
import InputEnhanced from "../../nav-soknad/faktum/InputEnhanced";
import {
    lagreOpplysningHvisGyldigAction,
    updateOpplysning,
} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerActions";
import {LinkButton} from "../../nav-soknad/components/linkButton/LinkButton";
import {clearValideringsfeil, setValideringsfeil} from "../../digisos/redux/validering/valideringActions";
import {erTall} from "../../nav-soknad/validering/valideringer";
import {getFeilForOpplysning} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerSaga";
import {State} from "../../digisos/redux/reducers";
import {useBehandlingsId} from "../../lib/hooks/useBehandlingsId";

export const erGyldigTall = (input: string): boolean => {
    return erTall(input, true) && parseInt(input, 10) < 2147483648;
};

const TabellView = (props: {opplysning: Opplysning; gruppeIndex: number}) => {
    const behandlingsId = useBehandlingsId();
    const feil = useSelector((state: State) => state.validering.feil);

    const dispatch = useDispatch();

    const handleChange = (input: string, radIndex: number, inputFelt: InputType, key: string) => {
        const opplysningUpdated: Opplysning = {...props.opplysning};
        const raderUpdated: OpplysningRad[] = props.opplysning.rader.map((e) => ({
            ...e,
        }));
        raderUpdated[radIndex][inputFelt] = input;
        opplysningUpdated.rader = raderUpdated;

        if (inputFelt !== InputType.BESKRIVELSE) {
            if (erGyldigTall(input) || input === "") {
                dispatch(clearValideringsfeil(key));
            }
        }
        dispatch(updateOpplysning(opplysningUpdated));
    };

    const handleBlur = (radIndex: number, inputFelt: InputType, key: string) => {
        const input = props.opplysning.rader[radIndex][inputFelt];

        if (inputFelt !== "beskrivelse" && input && input !== "" && !erGyldigTall(input)) {
            dispatch(setValideringsfeil(ValideringsFeilKode.ER_TALL, key));
            dispatch(updateOpplysning(props.opplysning));
        } else {
            dispatch(lagreOpplysningHvisGyldigAction(behandlingsId, props.opplysning, feil));
        }
    };

    const handleLeggTilRad = () => {
        const opplysningUpdated: Opplysning = {...props.opplysning};
        const raderUpdated: OpplysningRad[] = props.opplysning.rader.map((e) => ({
            ...e,
        }));
        raderUpdated.push(getTomVedleggRad());
        opplysningUpdated.rader = raderUpdated;
        dispatch(updateOpplysning(opplysningUpdated));
    };

    const handleFjernRad = (radIndex: number, valideringsKey: string) => {
        const opplysningUpdated: Opplysning = {...props.opplysning};
        const raderUpdated: OpplysningRad[] = props.opplysning.rader.map((e) => ({
            ...e,
        }));
        raderUpdated.splice(radIndex, 1);
        opplysningUpdated.rader = raderUpdated;
        fjernAlleFeilForOpplysning(feil, valideringsKey);
        validerAlleInputfelterPaOpplysning(opplysningUpdated, props.opplysning);
        const feilUpdated = getOppdatertListeAvFeil(feil, valideringsKey, radIndex);
        dispatch(lagreOpplysningHvisGyldigAction(behandlingsId, opplysningUpdated, feilUpdated));
    };

    const getOppdatertListeAvFeil = (feil: Valideringsfeil[], valideringsKey: string, radIndex: number) =>
        feil.filter(
            (f) =>
                f.faktumKey !== valideringsKey + ".beskrivelse." + radIndex &&
                f.faktumKey !== valideringsKey + ".belop." + radIndex &&
                f.faktumKey !== valideringsKey + ".brutto." + radIndex &&
                f.faktumKey !== valideringsKey + ".netto." + radIndex &&
                f.faktumKey !== valideringsKey + ".avdrag." + radIndex &&
                f.faktumKey !== valideringsKey + ".renter." + radIndex
        );

    const validerAlleInputfelterPaOpplysning = (opplysningUpdated: Opplysning, opplysning: Opplysning) => {
        opplysningUpdated.rader.forEach((rad: OpplysningRad, index: number) => {
            Object.keys(rad).forEach((key: string) => {
                switch (key) {
                    case InputType.BELOP: {
                        setValideringsfeilHvisUgyldigTall(InputType.BELOP, rad[InputType.BELOP], opplysning, index);
                        break;
                    }
                    case InputType.BRUTTO: {
                        setValideringsfeilHvisUgyldigTall(InputType.BRUTTO, rad[InputType.BRUTTO], opplysning, index);
                        break;
                    }
                    case InputType.NETTO: {
                        setValideringsfeilHvisUgyldigTall(InputType.NETTO, rad[InputType.NETTO], opplysning, index);
                        break;
                    }
                    case InputType.AVDRAG: {
                        setValideringsfeilHvisUgyldigTall(InputType.AVDRAG, rad[InputType.AVDRAG], opplysning, index);
                        break;
                    }
                    case InputType.RENTER: {
                        setValideringsfeilHvisUgyldigTall(InputType.RENTER, rad[InputType.RENTER], opplysning, index);
                        break;
                    }
                    default: {
                    }
                }
            });
        });
    };

    const setValideringsfeilHvisUgyldigTall = (
        key: InputType,
        value: string,
        opplysning: Opplysning,
        index: number
    ) => {
        const spc: OpplysningSpc | undefined = getSpcForOpplysning(opplysning.type);
        if (spc) {
            if (value !== null && value !== "" && !erGyldigTall(value)) {
                const validationKey: string = `${spc.textKey}.${key}.${index}`;
                dispatch(setValideringsfeil(ValideringsFeilKode.ER_TALL, validationKey));
            }
        }
    };

    const fjernAlleFeilForOpplysning = (feil: Valideringsfeil[], valideringsKey: string) => {
        const feilForOpplysning = getFeilForOpplysning(feil, valideringsKey);
        feilForOpplysning.forEach((f: Valideringsfeil) => {
            dispatch(clearValideringsfeil(f.faktumKey));
        });
    };

    const opplysningSpc: OpplysningSpc | undefined = getSpcForOpplysning(props.opplysning.type);
    const textKey = opplysningSpc ? opplysningSpc.textKey : "";

    const innhold: JSX.Element[] = props.opplysning.rader.map((vedleggRad: OpplysningRad, radIndex: number) => {
        const skalViseFjerneRadKnapp = radIndex > 0;
        const inputs = opplysningSpc
            ? opplysningSpc.radInnhold.map((inputType: InputType) => {
                  const key: string = `${textKey}.${inputType}.${radIndex}`;
                  const text: string = `${textKey}.${inputType}`;
                  const id: string = key.replace(/\./gi, "_");

                  return (
                      <InputEnhanced
                          id={id}
                          onChange={(input: string) => handleChange(input, radIndex, inputType, key)}
                          onBlur={() => handleBlur(radIndex, inputType, key)}
                          verdi={vedleggRad[inputType] ? vedleggRad[inputType] : ""}
                          required={false}
                          bredde={inputType === InputType.BESKRIVELSE ? "L" : "S"}
                          faktumKey={text}
                          faktumIndex={radIndex}
                          maxLength={inputType === InputType.BESKRIVELSE ? 100 : 8}
                      />
                  );
              })
            : null;

        return (
            <div key={radIndex}>
                {inputs}

                {skalViseFjerneRadKnapp && (
                    <LinkButton
                        onClick={() => {
                            handleFjernRad(radIndex, textKey);
                        }}
                        id={radIndex + "_fjern_lenke"}
                    >
                        Fjern
                    </LinkButton>
                )}
            </div>
        );
    });

    if (innhold) {
        return (
            <>
                {innhold}
                {opplysningSpc && opplysningSpc.antallRader === AntallRader.FLERE && (
                    <LinkButton onClick={() => handleLeggTilRad()} id={props.gruppeIndex + "_link"}>
                        <span aria-hidden={true}>+ </span>Legg til
                    </LinkButton>
                )}
            </>
        );
    }
    return null;
};

export default TabellView;
