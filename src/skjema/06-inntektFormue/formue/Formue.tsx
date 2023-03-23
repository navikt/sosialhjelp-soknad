import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {SoknadsSti, oppdaterSoknadsdataSti} from "../../../digisos/redux/soknadsdata/soknadsdataReducer";
import Sporsmal, {LegendTittleStyle} from "../../../nav-soknad/components/sporsmal/Sporsmal";
import {getFaktumSporsmalTekst, replaceDotWithUnderscore} from "../../../nav-soknad/utils";
import {Formue, FormueId} from "./FormueTypes";
import CheckboxPanel from "../../../nav-soknad/faktum/CheckboxPanel";
import TextareaEnhanced from "../../../nav-soknad/faktum/TextareaEnhanced";
import NivaTreSkjema from "../../../nav-soknad/components/nivaTreSkjema";
import TextPlaceholder from "../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {hentSoknadsdata, lagreSoknadsdata} from "../../../digisos/redux/soknadsdata/soknadsdataActions";
import {State} from "../../../digisos/redux/reducers";
import {validateAndDispatchTextFieldMaxLength} from "../../../nav-soknad/validering/validateAndDispatch";
import {useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../../lib/hooks/useBehandlingsId";
import {REST_STATUS} from "../../../digisos/redux/soknadsdata/soknadsdataTypes";
import {useSoknadsdata} from "../../../digisos/redux/soknadsdata/useSoknadsdata";

const MAX_CHARS = 500;
const FORMUE = "inntekt.bankinnskudd";
const FORMUE_ANNET_TEXT_AREA_FAKTUM_KEY = FORMUE + "formue.annet.textarea";

export const FormueView = () => {
    const [oppstartsModus, setOppstartsModus] = useState(true);

    const dispatch = useDispatch();

    const soknadsdata = useSoknadsdata();
    const behandlingsId = useBehandlingsId();
    const feil = useSelector((state: State) => state.validering.feil);

    const {t} = useTranslation("skjema");

    useEffect(() => {
        hentSoknadsdata(behandlingsId, SoknadsSti.FORMUE, dispatch);
    }, [behandlingsId, dispatch]);

    useEffect(() => {
        if (oppstartsModus && soknadsdata.restStatus.inntekt.formue === REST_STATUS.OK) {
            setOppstartsModus(false);
        }
    }, [oppstartsModus, soknadsdata.restStatus.inntekt.formue]);

    const handleClickCheckbox = (idToToggle: FormueId) => {
        const restStatus = soknadsdata.restStatus.inntekt.formue;
        if (!oppstartsModus && restStatus === REST_STATUS.OK && behandlingsId) {
            const formue: Formue = soknadsdata.inntekt.formue;

            let formueElement: boolean | string = formue[idToToggle];
            if (typeof formueElement === "boolean" && typeof formue[idToToggle] === "boolean") {
                // @ts-ignore
                formue[idToToggle] = !formueElement;
            }

            if (formue && !formue.annet) {
                formue.beskrivelseAvAnnet = "";
            }
            dispatch(oppdaterSoknadsdataSti(SoknadsSti.FORMUE, formue));
            lagreSoknadsdata(behandlingsId, SoknadsSti.FORMUE, formue, dispatch);
        }
    };

    const onChangeAnnet = (value: string) => {
        const formue: Formue | undefined = soknadsdata.inntekt.formue;
        if (formue) {
            formue.beskrivelseAvAnnet = value;
            dispatch(oppdaterSoknadsdataSti(SoknadsSti.FORMUE, formue));
        }
        validateAndDispatchTextFieldMaxLength(value, FORMUE_ANNET_TEXT_AREA_FAKTUM_KEY, MAX_CHARS, feil, dispatch);
    };

    const onBlurTekstfeltAnnet = () => {
        const formue: Formue | undefined = soknadsdata.inntekt.formue;
        if (formue && behandlingsId) {
            const beskrivelseAvAnnet = formue.beskrivelseAvAnnet;
            const erInnenforMaksLengde = validateAndDispatchTextFieldMaxLength(
                beskrivelseAvAnnet,
                FORMUE_ANNET_TEXT_AREA_FAKTUM_KEY,
                MAX_CHARS,
                feil,
                dispatch
            );
            if (erInnenforMaksLengde) {
                lagreSoknadsdata(behandlingsId, SoknadsSti.FORMUE, formue, dispatch);
            }
        }
    };

    const renderCheckBox = (navn: FormueId) => {
        const formue: Formue = soknadsdata.inntekt.formue;
        let label: React.ReactNode;
        const restStatus = soknadsdata.restStatus.inntekt.formue;
        if (oppstartsModus && restStatus === REST_STATUS.OK) {
            setOppstartsModus(false);
        }
        if (oppstartsModus) {
            label = <TextPlaceholder lines={1} style={{marginTop: "0.2rem"}} />;
        } else {
            label = t(FORMUE + ".true.type." + navn);
        }

        return (
            <CheckboxPanel
                id={"formue_" + navn + "_checkbox"}
                name={navn}
                checked={!!formue[navn]}
                label={label}
                onClick={() => handleClickCheckbox(navn)}
            />
        );
    };

    const formue: Formue | undefined = soknadsdata.inntekt.formue;
    return (
        <Sporsmal
            tekster={getFaktumSporsmalTekst(t, FORMUE + ".true.type")}
            legendTittelStyle={LegendTittleStyle.FET_NORMAL}
        >
            {renderCheckBox(FormueId.BRUKSKONTO)}
            {renderCheckBox(FormueId.SPAREKONTO)}
            {renderCheckBox(FormueId.BSU)}
            {renderCheckBox(FormueId.LIVSFORSIKRING)}
            {renderCheckBox(FormueId.VERDIPAPIRER)}
            {renderCheckBox(FormueId.ANNET)}
            <NivaTreSkjema visible={formue !== undefined && formue.annet} size="small">
                <TextareaEnhanced
                    id={replaceDotWithUnderscore(FORMUE_ANNET_TEXT_AREA_FAKTUM_KEY)}
                    placeholder=""
                    onChange={(evt: any) => onChangeAnnet(evt.target.value)}
                    onBlur={() => onBlurTekstfeltAnnet()}
                    faktumKey={FORMUE_ANNET_TEXT_AREA_FAKTUM_KEY}
                    labelId={FORMUE + ".true.type.annet.true.beskrivelse.label"}
                    maxLength={MAX_CHARS}
                    value={formue && formue.beskrivelseAvAnnet ? formue.beskrivelseAvAnnet : ""}
                />
            </NivaTreSkjema>
        </Sporsmal>
    );
};

export default FormueView;
