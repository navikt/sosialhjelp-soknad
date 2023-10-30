import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {SoknadsSti} from "../../../digisos/redux/soknadsdata/soknadsdataReducer";
import NivaTreSkjema from "../../../nav-soknad/components/nivaTreSkjema";
import {State} from "../../../digisos/redux/reducers";
import {validateAndDispatchTextFieldMaxLength} from "../../../nav-soknad/validering/validateAndDispatch";
import {useTranslation} from "react-i18next";
import {REST_STATUS} from "../../../digisos/redux/soknadsdata/soknadsdataTypes";
import {useSoknadsdata} from "../../../digisos/redux/soknadsdata/useSoknadsdata";
import {Checkbox, CheckboxGroup, Textarea} from "@navikt/ds-react";
import {FormueFrontend} from "../../../generated/model";
import {DigisosReadMore} from "./DigisosReadMore";

const MAX_CHARS = 500;
const FORMUE_ANNET_TEXT_AREA_FAKTUM_KEY = "inntekt.bankinnskudd.formue.annet.textarea";

export const FormueView = () => {
    const [oppstartsModus, setOppstartsModus] = useState(true);

    const dispatch = useDispatch();

    const {soknadsdata, lagre, oppdater} = useSoknadsdata(SoknadsSti.FORMUE);
    const formue: FormueFrontend = soknadsdata.inntekt.formue;

    const feil = useSelector((state: State) => state.validering.feil);
    const restStatus = soknadsdata.restStatus.inntekt.formue;

    const {t} = useTranslation("skjema");

    useEffect(() => {
        if (oppstartsModus && restStatus === REST_STATUS.OK) setOppstartsModus(false);
    }, [oppstartsModus, restStatus]);

    const handleClickCheckbox = (values: (keyof Omit<FormueFrontend, "beskrivelseAvAnnet">)[]) => {
        values.forEach((value) => {
            formue[value] = true;
        });
        if (formue && !formue.annet) formue.beskrivelseAvAnnet = "";
        oppdater(formue);
        lagre(formue);
    };

    const onChangeAnnet = (value: string) => {
        if (formue) {
            formue.beskrivelseAvAnnet = value;
            oppdater(formue);
        }
        validateAndDispatchTextFieldMaxLength(value, FORMUE_ANNET_TEXT_AREA_FAKTUM_KEY, MAX_CHARS, feil, dispatch);
    };

    const onBlurTekstfeltAnnet = () => {
        if (!formue) return;
        const {beskrivelseAvAnnet} = formue;
        const erInnenforMaksLengde = validateAndDispatchTextFieldMaxLength(
            beskrivelseAvAnnet ?? "",
            FORMUE_ANNET_TEXT_AREA_FAKTUM_KEY,
            MAX_CHARS,
            feil,
            dispatch
        );
        if (erInnenforMaksLengde) lagre(formue);
    };

    return (
        <CheckboxGroup
            legend={t("inntekt.bankinnskudd.true.type.sporsmal")}
            description={<DigisosReadMore>{t("inntekt.bankinnskudd.true.type.hjelpetekst.tekst")}</DigisosReadMore>}
            onChange={handleClickCheckbox}
        >
            <Checkbox name={"brukskonto"} value={"brukskonto"}>
                {t("inntekt.bankinnskudd.true.type.brukskonto")}
            </Checkbox>
            <Checkbox name={"sparekonto"} value={"sparekonto"}>
                {t("inntekt.bankinnskudd.true.type.sparekonto")}
            </Checkbox>
            <Checkbox name={"bsu"} value={"bsu"}>
                {t("inntekt.bankinnskudd.true.type.bsu")}
            </Checkbox>
            <Checkbox name={"livsforsikring"} value={"livsforsikring"}>
                {t("inntekt.bankinnskudd.true.type.livsforsikring")}
            </Checkbox>
            <Checkbox name={"verdipapirer"} value={"verdipapirer"}>
                {t("inntekt.bankinnskudd.true.type.verdipapirer")}
            </Checkbox>
            <Checkbox name={"annet"} value={"annet"}>
                {t("inntekt.bankinnskudd.true.type.annet")}
            </Checkbox>
            <NivaTreSkjema visible={formue?.annet} size="small">
                <Textarea
                    onChange={(evt) => onChangeAnnet(evt.target.value)}
                    onBlur={onBlurTekstfeltAnnet}
                    label={t("inntekt.bankinnskudd.true.type.annet.true.beskrivelse.label")}
                    maxLength={MAX_CHARS}
                    value={formue?.beskrivelseAvAnnet}
                />
            </NivaTreSkjema>
        </CheckboxGroup>
    );
};

export default FormueView;
