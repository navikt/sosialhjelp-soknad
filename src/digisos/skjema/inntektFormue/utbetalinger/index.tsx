import * as React from "react";
import {FormattedMessage, useIntl} from "react-intl";
import {SoknadsSti, oppdaterSoknadsdataSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import Sporsmal, {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {getFaktumSporsmalTekst, getIntlTextOrKey, replaceDotWithUnderscore} from "../../../../nav-soknad/utils";
import JaNeiSporsmal from "../../../../nav-soknad/faktum/JaNeiSporsmal";
import {Utbetalinger, UtbetalingerKeys} from "./utbetalingerTypes";
import CheckboxPanel from "../../../../nav-soknad/faktum/CheckboxPanel";
import TextareaEnhanced from "../../../../nav-soknad/faktum/TextareaEnhanced";
import NivaTreSkjema from "../../../../nav-soknad/components/nivaTreSkjema";
import {REST_STATUS} from "../../../redux/soknad/soknadTypes";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../../redux/reducers";
import {hentSoknadsdata, lagreSoknadsdata} from "../../../redux/soknadsdata/soknadsdataActions";
import {validateAndDispatchTextFieldMaxLength} from "../../../../nav-soknad/validering/validateAndDispatch";

const MAX_CHARS = 500;
const UTBETALINGER = "inntekt.inntekter";
const TEXT_AREA_ANNET_FAKTUM_KEY = UTBETALINGER + "utbetalinger.annet.textarea";

export const UtbetalingerView = () => {
    const [oppstartsModus, setOppstartsModus] = React.useState(true);

    const dispatch = useDispatch();

    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const behandlingsId = useSelector((state: State) => state.soknad.behandlingsId);

    const feil = useSelector((state: State) => state.validering.feil);

    const intl = useIntl();

    React.useEffect(() => {
        if (behandlingsId) {
            dispatch(hentSoknadsdata(behandlingsId, SoknadsSti.UTBETALINGER));
        }
    }, [behandlingsId, dispatch]);

    React.useEffect(() => {
        if (oppstartsModus && soknadsdata.restStatus.inntekt.utbetalinger === REST_STATUS.OK) {
            setOppstartsModus(false);
        }
    }, [oppstartsModus, soknadsdata.restStatus.inntekt.utbetalinger]);

    const handleClickJaNeiSpsm = (verdi: boolean) => {
        const restStatus = soknadsdata.restStatus.inntekt.utbetalinger;
        if (restStatus === REST_STATUS.OK && behandlingsId) {
            const utbetalinger: Utbetalinger = soknadsdata.inntekt.utbetalinger;
            utbetalinger.bekreftelse = verdi;
            if (!verdi) {
                utbetalinger.salg = false;
                utbetalinger.utbytte = false;
                utbetalinger.forsikring = false;
                utbetalinger.annet = false;
                utbetalinger.beskrivelseAvAnnet = "";
            }
            dispatch(oppdaterSoknadsdataSti(SoknadsSti.UTBETALINGER, utbetalinger));
            dispatch(lagreSoknadsdata(behandlingsId, SoknadsSti.UTBETALINGER, utbetalinger));
        }
    };

    const handleClickRadio = (idToToggle: UtbetalingerKeys) => {
        if (behandlingsId) {
            const utbetalinger: Utbetalinger = soknadsdata.inntekt.utbetalinger;
            //@ts-ignore
            utbetalinger[idToToggle] = !utbetalinger[idToToggle];
            if (!utbetalinger.bekreftelse || !utbetalinger.annet) {
                utbetalinger.beskrivelseAvAnnet = "";
            }
            dispatch(oppdaterSoknadsdataSti(SoknadsSti.UTBETALINGER, utbetalinger));
            dispatch(lagreSoknadsdata(behandlingsId, SoknadsSti.UTBETALINGER, utbetalinger));
        }
    };

    const onChangeAnnet = (value: string) => {
        const utbetalinger: Utbetalinger = soknadsdata.inntekt.utbetalinger;
        utbetalinger.beskrivelseAvAnnet = value;
        dispatch(oppdaterSoknadsdataSti(SoknadsSti.UTBETALINGER, utbetalinger));
        validateAndDispatchTextFieldMaxLength(value, TEXT_AREA_ANNET_FAKTUM_KEY, MAX_CHARS, feil, dispatch);
    };

    const onBlurTekstfeltAnnet = () => {
        if (behandlingsId) {
            const utbetalinger: Utbetalinger = soknadsdata.inntekt.utbetalinger;
            const beskrivelseAvAnnet = utbetalinger.beskrivelseAvAnnet;
            const erInnenforMaksLengde = validateAndDispatchTextFieldMaxLength(
                beskrivelseAvAnnet,
                TEXT_AREA_ANNET_FAKTUM_KEY,
                MAX_CHARS,
                feil,
                dispatch
            );

            if (erInnenforMaksLengde) {
                dispatch(lagreSoknadsdata(behandlingsId, SoknadsSti.UTBETALINGER, utbetalinger));
            }
        }
    };

    const renderCheckBox = (navn: UtbetalingerKeys, textKey: string) => {
        const utbetalinger: Utbetalinger = soknadsdata.inntekt.utbetalinger;

        if (typeof utbetalinger[navn] === "boolean") {
            const isChecked: boolean = !!(utbetalinger[navn] && utbetalinger[navn] === true);

            return (
                <CheckboxPanel
                    id={"boutgifter_" + navn + "_checkbox"}
                    name={navn}
                    checked={isChecked}
                    label={<FormattedMessage id={UTBETALINGER + ".true.type." + textKey} />}
                    onClick={() => handleClickRadio(navn)}
                />
            );
        }
    };

    const utbetalinger: Utbetalinger = soknadsdata.inntekt.utbetalinger;
    const restStatus = soknadsdata.restStatus.inntekt.utbetalinger;
    if (oppstartsModus === true && restStatus === REST_STATUS.OK) {
        setOppstartsModus(false);
    }
    return (
        <div className="skjema-sporsmal">
            <h2>{getIntlTextOrKey(intl, "inntekt.inntekter.titel")}</h2>
            <JaNeiSporsmal
                visPlaceholder={oppstartsModus}
                tekster={getFaktumSporsmalTekst(intl, UTBETALINGER)}
                faktumKey={UTBETALINGER}
                verdi={utbetalinger.bekreftelse}
                onChange={(verdi: boolean) => handleClickJaNeiSpsm(verdi)}
                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
            >
                <Sporsmal tekster={getFaktumSporsmalTekst(intl, UTBETALINGER + ".true.type")}>
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
