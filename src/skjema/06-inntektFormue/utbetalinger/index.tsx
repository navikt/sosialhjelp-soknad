import * as React from "react";
import {SoknadsSti} from "../../../digisos/redux/soknadsdata/soknadsdataReducer";
import Sporsmal, {LegendTittleStyle} from "../../../nav-soknad/components/sporsmal/Sporsmal";
import {getFaktumSporsmalTekst, getIntlTextOrKey, replaceDotWithUnderscore} from "../../../nav-soknad/utils";
import JaNeiSporsmal from "../../../nav-soknad/faktum/JaNeiSporsmal";
import {Utbetalinger, UtbetalingerKeys} from "./utbetalingerTypes";
import CheckboxPanel from "../../../nav-soknad/faktum/CheckboxPanel";
import TextareaEnhanced from "../../../nav-soknad/faktum/TextareaEnhanced";
import NivaTreSkjema from "../../../nav-soknad/components/nivaTreSkjema";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../../digisos/redux/reducers";
import {validateAndDispatchTextFieldMaxLength} from "../../../nav-soknad/validering/validateAndDispatch";
import {useTranslation} from "react-i18next";
import {Heading} from "@navikt/ds-react";
import {REST_STATUS} from "../../../digisos/redux/soknadsdata/soknadsdataTypes";
import {useSoknadsdata} from "../../../digisos/redux/soknadsdata/useSoknadsdata";

const MAX_CHARS = 500;
const UTBETALINGER = "inntekt.inntekter";
const TEXT_AREA_ANNET_FAKTUM_KEY = UTBETALINGER + "utbetalinger.annet.textarea";

export const UtbetalingerView = () => {
    const [oppstartsModus, setOppstartsModus] = React.useState(true);

    const dispatch = useDispatch();

    const {soknadsdata, lagre, oppdater} = useSoknadsdata(SoknadsSti.UTBETALINGER);
    const feil = useSelector((state: State) => state.validering.feil);
    const utbetalinger: Utbetalinger = soknadsdata.inntekt.utbetalinger;
    const restStatus = soknadsdata.restStatus.inntekt.utbetalinger;

    const {t} = useTranslation("skjema");

    React.useEffect(() => {
        if (oppstartsModus && restStatus === REST_STATUS.OK) setOppstartsModus(false);
    }, [oppstartsModus, restStatus]);

    const handleClickJaNeiSpsm = (verdi: boolean) => {
        if (restStatus !== REST_STATUS.OK) return;

        utbetalinger.bekreftelse = verdi;

        if (!verdi) {
            utbetalinger.salg = false;
            utbetalinger.utbytte = false;
            utbetalinger.forsikring = false;
            utbetalinger.annet = false;
            utbetalinger.beskrivelseAvAnnet = "";
        }

        oppdater(utbetalinger);
        lagre(utbetalinger);
    };

    const handleClickRadio = (idToToggle: UtbetalingerKeys) => {
        const utbetalinger: Utbetalinger = soknadsdata.inntekt.utbetalinger;
        //@ts-ignore
        utbetalinger[idToToggle] = !utbetalinger[idToToggle];
        if (!utbetalinger.bekreftelse || !utbetalinger.annet) {
            utbetalinger.beskrivelseAvAnnet = "";
        }
        oppdater(utbetalinger);
        lagre(utbetalinger);
    };

    const onChangeAnnet = (value: string) => {
        utbetalinger.beskrivelseAvAnnet = value;
        oppdater(utbetalinger);
        validateAndDispatchTextFieldMaxLength(value, TEXT_AREA_ANNET_FAKTUM_KEY, MAX_CHARS, feil, dispatch);
    };

    const onBlurTekstfeltAnnet = () => {
        const utbetalinger: Utbetalinger = soknadsdata.inntekt.utbetalinger;
        const beskrivelseAvAnnet = utbetalinger.beskrivelseAvAnnet;
        const erInnenforMaksLengde = validateAndDispatchTextFieldMaxLength(
            beskrivelseAvAnnet,
            TEXT_AREA_ANNET_FAKTUM_KEY,
            MAX_CHARS,
            feil,
            dispatch
        );

        if (erInnenforMaksLengde) lagre(utbetalinger);
    };

    const renderCheckBox = (navn: UtbetalingerKeys, textKey: string) => {
        const utbetalinger: Utbetalinger = soknadsdata.inntekt.utbetalinger;

        if (typeof utbetalinger[navn] === "boolean") {
            const isChecked = !!(utbetalinger[navn] && utbetalinger[navn] === true);

            return (
                <CheckboxPanel
                    id={"boutgifter_" + navn + "_checkbox"}
                    name={navn}
                    checked={isChecked}
                    label={t(`${UTBETALINGER}.true.type.${textKey}`)}
                    onClick={() => handleClickRadio(navn)}
                />
            );
        }
    };

    if (oppstartsModus && restStatus === REST_STATUS.OK) setOppstartsModus(false);

    return (
        <div className="skjema-sporsmal">
            <Heading size="medium" level="2">
                {getIntlTextOrKey(t, "inntekt.inntekter.titel")}
            </Heading>
            <JaNeiSporsmal
                visPlaceholder={oppstartsModus}
                tekster={getFaktumSporsmalTekst(t, UTBETALINGER)}
                faktumKey={UTBETALINGER}
                verdi={utbetalinger.bekreftelse}
                onChange={(verdi: boolean) => handleClickJaNeiSpsm(verdi)}
                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
            >
                <Sporsmal tekster={getFaktumSporsmalTekst(t, UTBETALINGER + ".true.type")}>
                    {renderCheckBox(UtbetalingerKeys.UTBYTTE, UtbetalingerKeys.UTBYTTE)}
                    {renderCheckBox(UtbetalingerKeys.SALG, UtbetalingerKeys.SALG)}
                    {renderCheckBox(UtbetalingerKeys.FORSIKRING, UtbetalingerKeys.FORSIKRING)}
                    {renderCheckBox(UtbetalingerKeys.ANNET, UtbetalingerKeys.ANNET)}
                    <NivaTreSkjema visible={!!(utbetalinger.bekreftelse && utbetalinger.annet)} size="small">
                        <TextareaEnhanced
                            id={replaceDotWithUnderscore(TEXT_AREA_ANNET_FAKTUM_KEY)}
                            placeholder=""
                            onChange={(evt: any) => onChangeAnnet(evt.target.value)}
                            onBlur={() => onBlurTekstfeltAnnet()}
                            faktumKey={TEXT_AREA_ANNET_FAKTUM_KEY}
                            labelId={UTBETALINGER + ".true.type.annet.true.beskrivelse.label"}
                            maxLength={MAX_CHARS}
                            value={utbetalinger.beskrivelseAvAnnet ? utbetalinger.beskrivelseAvAnnet : ""}
                        />
                    </NivaTreSkjema>
                </Sporsmal>
            </JaNeiSporsmal>
        </div>
    );
};

export default UtbetalingerView;
