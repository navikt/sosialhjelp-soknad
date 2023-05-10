import * as React from "react";
import {InputType} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerTypes";
import {Valideringsfeil, ValideringsFeilKode} from "../../digisos/redux/validering/valideringActionTypes";
import {useDispatch, useSelector} from "react-redux";
import {getSpcForOpplysning, getTomVedleggRad} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerUtils";
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
import {VedleggFrontend, VedleggRadFrontend} from "../../generated/model";
import {logWarning} from "../../nav-soknad/utils/loggerUtils";
import {useTranslation} from "react-i18next";
import {TextField} from "@navikt/ds-react";
import {getFeil} from "../../nav-soknad/utils/enhancedComponentUtils";

export const erGyldigTall = (input: string) => erTall(input, true) && parseInt(input, 10) < 2147483648;

const keysOf = <T extends Object>(obj: T): Array<keyof T> => Array.from(Object.keys(obj)) as any;

const OpplysningBelopInput = ({
    textKey,
    inputType,
    radIndex,
    vedleggRad,
    handleBlur,
    handleChange,
}: {
    textKey: string;
    inputType: Exclude<InputType, "beskrivelse">;
    radIndex: number;
    vedleggRad: VedleggRadFrontend;
    handleBlur: (radIndex: number, inputFelt: InputType, key: string) => void;
    handleChange: (input: string, radIndex: number, inputFelt: InputType, key: string) => void;
}) => {
    const {t} = useTranslation();
    const feil = useSelector((state: State) => state.validering.feil);

    return (
        <TextField
            label={t(`${textKey}.${inputType}.label`)}
            id={`${textKey}.${inputType}.${radIndex}`.replace(/\./gi, "_")}
            onChange={(event) =>
                handleChange(event.target.value, radIndex, inputType, `${textKey}.${inputType}.${radIndex}`)
            }
            onBlur={() => handleBlur(radIndex, inputType, `${textKey}.${inputType}.${radIndex}`)}
            defaultValue={vedleggRad[inputType]?.toString() ?? ""}
            required={false}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            error={getFeil(feil, t, `${textKey}.${inputType}`, radIndex)}
            maxLength={8}
        />
    );
};

const OpplysningTekstInput = ({
    textKey,
    inputType,
    radIndex,
    vedleggRad,
    handleBlur,
    handleChange,
}: {
    textKey: string;
    radIndex: number;
    inputType: "beskrivelse";
    vedleggRad: VedleggRadFrontend;
    handleBlur: (radIndex: number, inputFelt: InputType, key: string) => void;
    handleChange: (input: string, radIndex: number, inputFelt: InputType, key: string) => void;
}) => {
    const key = `${textKey}.${inputType}.${radIndex}`;
    const id = key.replace(/\./gi, "_");
    const {t} = useTranslation();
    const feil = useSelector((state: State) => state.validering.feil);

    return (
        <TextField
            label={t(`${textKey}.${inputType}.label`)}
            id={id}
            onChange={(event) => handleChange(event.target.value, radIndex, inputType, key)}
            onBlur={() => handleBlur(radIndex, inputType, key)}
            defaultValue={vedleggRad[inputType]?.toString() ?? ""}
            required={false}
            error={getFeil(feil, t, `${textKey}.${inputType}`, radIndex)}
            maxLength={100}
        />
    );
};

const TabellView = (props: {opplysning: VedleggFrontend; gruppeIndex: number}) => {
    const behandlingsId = useBehandlingsId();
    const dispatch = useDispatch();
    const feil = useSelector((state: State) => state.validering.feil);

    const handleTekstChange = (input: string, radIndex: number, key: string) => {
        const opplysningUpdated = {...props.opplysning};
        const raderUpdated =
            props.opplysning.rader?.map((e) => ({
                ...e,
            })) ?? [];

        raderUpdated[radIndex].beskrivelse = input;

        opplysningUpdated.rader = raderUpdated;

        if (input === "") dispatch(clearValideringsfeil(key));

        dispatch(updateOpplysning(opplysningUpdated));
    };

    const handleBelopChange = (input: string, radIndex: number, inputFelt: InputType, key: string) => {
        const opplysningUpdated = {...props.opplysning};
        const raderUpdated =
            props.opplysning.rader?.map((e) => ({
                ...e,
            })) ?? [];

        if (inputFelt !== "beskrivelse") raderUpdated[radIndex][inputFelt] = parseInt(input);
        else raderUpdated[radIndex][inputFelt] = input;

        opplysningUpdated.rader = raderUpdated;

        if ((inputFelt !== "beskrivelse" && erGyldigTall(input)) || input === "") dispatch(clearValideringsfeil(key));

        dispatch(updateOpplysning(opplysningUpdated));
    };

    const handleBlur = (radIndex: number, inputFelt: InputType, key: string) => {
        const input = props.opplysning.rader?.[radIndex][inputFelt];

        if (inputFelt !== "beskrivelse" && input && input !== "" && !erGyldigTall(input as string)) {
            dispatch(setValideringsfeil(ValideringsFeilKode.ER_TALL, key));
            dispatch(updateOpplysning(props.opplysning));
        } else {
            dispatch(lagreOpplysningHvisGyldigAction(behandlingsId, props.opplysning, feil));
        }
    };

    const handleLeggTilRad = () => {
        const opplysningUpdated = {...props.opplysning};
        const raderUpdated =
            props.opplysning.rader?.map((e) => ({
                ...e,
            })) ?? [];
        raderUpdated.push(getTomVedleggRad());
        opplysningUpdated.rader = raderUpdated;
        dispatch(updateOpplysning(opplysningUpdated));
    };

    const handleFjernRad = (radIndex: number, valideringsKey: string) => {
        const opplysningUpdated = {...props.opplysning};
        const raderUpdated =
            props.opplysning.rader?.map((e) => ({
                ...e,
            })) ?? [];
        raderUpdated.splice(radIndex, 1);
        opplysningUpdated.rader = raderUpdated;
        fjernAlleFeilForOpplysning(feil, valideringsKey);
        inputRadValiderAlle(opplysningUpdated, props.opplysning);
        const feilUpdated = inputRadFeil(feil, valideringsKey, radIndex);
        dispatch(lagreOpplysningHvisGyldigAction(behandlingsId, opplysningUpdated, feilUpdated));
    };

    const inputRadFeil = (feil: Valideringsfeil[], valideringsKey: string, radIndex: number) =>
        feil.filter(
            (f) =>
                f.faktumKey !== `${valideringsKey}.beskrivelse.${radIndex}` &&
                f.faktumKey !== `${valideringsKey}.belop.${radIndex}` &&
                f.faktumKey !== `${valideringsKey}.brutto.${radIndex}` &&
                f.faktumKey !== `${valideringsKey}.netto.${radIndex}` &&
                f.faktumKey !== `${valideringsKey}.avdrag.${radIndex}` &&
                f.faktumKey !== `${valideringsKey}.renter.${radIndex}`
        );

    const inputRadValiderAlle = (opplysningUpdated: VedleggFrontend, opplysning: VedleggFrontend) => {
        opplysningUpdated.rader.forEach((rad, index: number) => {
            keysOf(rad)
                .filter((key) => key !== "beskrivelse")
                .filter((key) => !!rad[key])
                .forEach((key) => {
                    setValideringsfeilHvisUgyldigTall(key, rad[key]?.toString() ?? "", opplysning, index);
                });
        });
    };

    const setValideringsfeilHvisUgyldigTall = (
        key: InputType,
        value: string | undefined,
        opplysning: VedleggFrontend,
        index: number
    ) => {
        if (!value) {
            // I refaktor her må jeg vite dette, men når refaktor er ferdig bør den slettes
            logWarning("setValideringsfeilHvisUgyldigTall value false");
        }
        const spc = getSpcForOpplysning(opplysning.type);
        if (spc && !erGyldigTall(value ?? "")) {
            const validationKey: string = `${spc.textKey}.${key}.${index}`;
            dispatch(setValideringsfeil(ValideringsFeilKode.ER_TALL, validationKey));
        }
    };

    const fjernAlleFeilForOpplysning = (feil: Valideringsfeil[], valideringsKey: string) => {
        getFeilForOpplysning(feil, valideringsKey).forEach(({faktumKey}) => {
            dispatch(clearValideringsfeil(faktumKey));
        });
    };

    const opplysningSpc = getSpcForOpplysning(props.opplysning.type);
    const textKey = opplysningSpc?.textKey ?? "";

    if (!props.opplysning.rader) return null;

    const innhold = props.opplysning.rader.map((vedleggRad, radIndex: number) => {
        return (
            <div key={radIndex}>
                {opplysningSpc?.radInnhold.map((inputType) =>
                    inputType === "beskrivelse" ? (
                        <OpplysningTekstInput
                            textKey={textKey}
                            inputType={inputType}
                            key={`${textKey}.${inputType}.${radIndex}`}
                            radIndex={radIndex}
                            vedleggRad={vedleggRad}
                            handleBlur={handleBlur}
                            handleChange={handleTekstChange}
                        />
                    ) : (
                        <OpplysningBelopInput
                            textKey={textKey}
                            inputType={inputType}
                            key={`${textKey}.${inputType}.${radIndex}`}
                            radIndex={radIndex}
                            vedleggRad={vedleggRad}
                            handleBlur={handleBlur}
                            handleChange={handleBelopChange}
                        />
                    )
                )}

                {radIndex > 0 && (
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

    return (
        <>
            {innhold}
            {opplysningSpc?.antallRader === "flere" && (
                <LinkButton onClick={() => handleLeggTilRad()} id={props.gruppeIndex + "_link"}>
                    <span aria-hidden={true}>+ </span>Legg til
                </LinkButton>
            )}
        </>
    );
};

export default TabellView;
