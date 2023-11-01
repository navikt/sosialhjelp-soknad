import * as React from "react";
import {SoknadsSti} from "../../../digisos/redux/soknadsdata/soknadsdataReducer";
import NivaTreSkjema from "../../../nav-soknad/components/nivaTreSkjema";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../../digisos/redux/reducers";
import {validateAndDispatchTextFieldMaxLength} from "../../../nav-soknad/validering/validateAndDispatch";
import {useTranslation} from "react-i18next";
import {Checkbox, CheckboxGroup, Heading, ReadMore, Textarea} from "@navikt/ds-react";
import {REST_STATUS} from "../../../digisos/redux/soknadsdata/soknadsdataTypes";
import {useSoknadsdata} from "../../../digisos/redux/soknadsdata/useSoknadsdata";
import {UtbetalingerFrontend} from "../../../generated/model";
import {YesNoInput} from "../../../nav-soknad/components/form/YesNoInput";

const MAX_CHARS = 500;
const UTBETALINGER = "inntekt.inntekter";
const TEXT_AREA_ANNET_FAKTUM_KEY = UTBETALINGER + "utbetalinger.annet.textarea";

export const UtbetalingerView = () => {
    const [oppstartsModus, setOppstartsModus] = React.useState(true);

    const dispatch = useDispatch();

    const {soknadsdata, lagre, oppdater} = useSoknadsdata(SoknadsSti.UTBETALINGER);
    const feil = useSelector((state: State) => state.validering.feil);
    const utbetalinger: UtbetalingerFrontend = soknadsdata.inntekt.utbetalinger;
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

    const handleClickRadio = (utbetalinger: (keyof UtbetalingerFrontend)[]) => {
        const ny: UtbetalingerFrontend = {
            bekreftelse: !!utbetalinger.length,
            utbytte: utbetalinger.includes("utbytte"),
            salg: utbetalinger.includes("salg"),
            forsikring: utbetalinger.includes("forsikring"),
            annet: utbetalinger.includes("annet"),
            beskrivelseAvAnnet: utbetalinger.includes("annet")
                ? soknadsdata.inntekt.utbetalinger.beskrivelseAvAnnet
                : "",
        };
        oppdater(ny);
        lagre(ny);
    };

    const onChangeAnnet = (value: string) => {
        utbetalinger.beskrivelseAvAnnet = value;
        oppdater(utbetalinger);
        validateAndDispatchTextFieldMaxLength(value, TEXT_AREA_ANNET_FAKTUM_KEY, MAX_CHARS, feil, dispatch);
    };

    const onBlurTekstfeltAnnet = () => {
        const utbetalinger: UtbetalingerFrontend = soknadsdata.inntekt.utbetalinger;
        const beskrivelseAvAnnet = utbetalinger.beskrivelseAvAnnet ?? "";
        const erInnenforMaksLengde = validateAndDispatchTextFieldMaxLength(
            beskrivelseAvAnnet,
            TEXT_AREA_ANNET_FAKTUM_KEY,
            MAX_CHARS,
            feil,
            dispatch
        );

        if (erInnenforMaksLengde) lagre(utbetalinger);
    };

    if (oppstartsModus && restStatus === REST_STATUS.OK) setOppstartsModus(false);
    return (
        <div>
            <YesNoInput
                legend={
                    <Heading size="medium" level="2">
                        {t("inntekt.inntekter.tittel")}
                    </Heading>
                }
                description={
                    <ReadMore header={t("generelt.merinfo")}>{t("inntekt.inntekter.hjelpetekst.tekst")}</ReadMore>
                }
                defaultValue={utbetalinger.bekreftelse ?? null}
                onChange={(checked) => handleClickJaNeiSpsm(checked)}
                name={"utbetalinger-bekreftelse"}
            />

            {utbetalinger.bekreftelse && (
                <CheckboxGroup
                    legend={t("inntekt.inntekter.true.type.sporsmal")}
                    onChange={(navn: (keyof UtbetalingerFrontend)[]) => handleClickRadio(navn)}
                    value={Object.keys(utbetalinger).filter((key) => utbetalinger[key as keyof UtbetalingerFrontend])}
                >
                    <Checkbox value={"utbytte"}>{t("inntekt.inntekter.true.type.utbytte")}</Checkbox>
                    <Checkbox value={"salg"}>{t("inntekt.inntekter.true.type.salg")}</Checkbox>
                    <Checkbox value={"forsikring"}>{t("inntekt.inntekter.true.type.forsikringsutbetalinger")}</Checkbox>
                    <Checkbox value={"annet"}>{t("inntekt.inntekter.true.type.annet")}</Checkbox>
                    <NivaTreSkjema visible={utbetalinger.annet} size="small">
                        <Textarea
                            onChange={(evt: any) => onChangeAnnet(evt.target.value)}
                            onBlur={() => onBlurTekstfeltAnnet()}
                            label={t("inntekt.inntekter.true.type.annet.true.beskrivelse.label")}
                            maxLength={MAX_CHARS}
                            value={utbetalinger?.beskrivelseAvAnnet ?? ""}
                        />
                    </NivaTreSkjema>
                </CheckboxGroup>
            )}
        </div>
    );
};

export default UtbetalingerView;
