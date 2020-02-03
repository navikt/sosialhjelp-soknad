import * as React from "react";
import {onEndretValideringsfeil} from "../../../redux/soknadsdata/soknadsdataContainerUtils";
import {FormattedHTMLMessage, useIntl} from "react-intl";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {
    SoknadsSti,
    oppdaterSoknadsdataSti,
} from "../../../redux/soknadsdata/soknadsdataReducer";
import Sporsmal, {
    LegendTittleStyle,
} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {
    getFaktumSporsmalTekst,
    replaceDotWithUnderscore,
} from "../../../../nav-soknad/utils";
import {Formue, FormueId} from "./FormueTypes";
import CheckboxPanel from "../../../../nav-soknad/faktum/CheckboxPanel";
import TextareaEnhanced from "../../../../nav-soknad/faktum/TextareaEnhanced";
import NivaTreSkjema from "../../../../nav-soknad/components/nivaTreSkjema";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {maksLengde} from "../../../../nav-soknad/validering/valideringer";
import {ValideringsFeilKode} from "../../../redux/validering/valideringActionTypes";
import {REST_STATUS} from "../../../redux/soknad/soknadTypes";
import {
    hentSoknadsdata,
    lagreSoknadsdata,
} from "../../../redux/soknadsdata/soknadsdataActions";
import {State} from "../../../redux/reducers";
import {
    setValideringsfeil,
    clearValideringsfeil,
} from "../../../redux/validering/valideringActions";

const MAX_CHARS = 500;
const FORMUE = "inntekt.bankinnskudd";
const FORMUE_ANNET_TEXT_AREA_FAKTUM_KEY = FORMUE + "formue.annet.textarea";

export const FormueView = () => {
    const [oppstartsModus, setOppstartsModus] = useState(true);

    const dispatch = useDispatch();

    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const behandlingsId = useSelector(
        (state: State) => state.soknad.behandlingsId
    );
    const feil = useSelector((state: State) => state.validering.feil);

    const intl = useIntl();

    useEffect(() => {
        if (behandlingsId) {
            dispatch(hentSoknadsdata(behandlingsId, SoknadsSti.FORMUE));
        }
    }, [behandlingsId, dispatch]);

    useEffect(() => {
        if (
            oppstartsModus &&
            soknadsdata.restStatus.inntekt.formue === REST_STATUS.OK
        ) {
            setOppstartsModus(false);
        }
    }, [oppstartsModus, soknadsdata.restStatus.inntekt.formue]);

    const handleClickCheckbox = (idToToggle: FormueId) => {
        const restStatus = soknadsdata.restStatus.inntekt.formue;
        if (oppstartsModus && restStatus === REST_STATUS.OK && behandlingsId) {
            const formue: Formue = soknadsdata.inntekt.formue;

            let formueElement: boolean | string = formue[idToToggle];
            if (
                typeof formueElement === "boolean" &&
                typeof formue[idToToggle] === "boolean"
            ) {
                // @ts-ignore
                formue[idToToggle] = !formueElement;
            }

            if (formue && !formue.annet) {
                formue.beskrivelseAvAnnet = "";
            }
            dispatch(oppdaterSoknadsdataSti(SoknadsSti.FORMUE, formue));
            dispatch(
                lagreSoknadsdata(behandlingsId, SoknadsSti.FORMUE, formue)
            );
        }
    };

    const onChangeAnnet = (value: string) => {
        const formue: Formue | undefined = soknadsdata.inntekt.formue;
        if (formue) {
            formue.beskrivelseAvAnnet = value;
            dispatch(oppdaterSoknadsdataSti(SoknadsSti.FORMUE, formue));
        }
        validerTekstfeltVerdi(value, FORMUE_ANNET_TEXT_AREA_FAKTUM_KEY);
    };

    const onBlurTekstfeltAnnet = () => {
        const formue: Formue | undefined = soknadsdata.inntekt.formue;
        if (formue && behandlingsId) {
            const beskrivelseAvAnnet = formue.beskrivelseAvAnnet;
            const feilmeldingAnnet:
                | ValideringsFeilKode
                | undefined = validerTekstfeltVerdi(
                beskrivelseAvAnnet,
                FORMUE_ANNET_TEXT_AREA_FAKTUM_KEY
            );
            if (!feilmeldingAnnet) {
                dispatch(
                    lagreSoknadsdata(behandlingsId, SoknadsSti.FORMUE, formue)
                );
            }
        }
    };

    const validerTekstfeltVerdi = (
        verdi: string,
        faktumKey: string
    ): ValideringsFeilKode | undefined => {
        const feilkode: ValideringsFeilKode | undefined = maksLengde(
            verdi,
            MAX_CHARS
        );
        onEndretValideringsfeil(feilkode, faktumKey, feil, () => {
            feilkode
                ? dispatch(setValideringsfeil(feilkode, faktumKey))
                : dispatch(clearValideringsfeil(faktumKey));
        });
        return feilkode;
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
            label = <FormattedHTMLMessage id={FORMUE + ".true.type." + navn} />;
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
            tekster={getFaktumSporsmalTekst(intl, FORMUE + ".true.type")}
            legendTittelStyle={LegendTittleStyle.FET_NORMAL}
        >
            {renderCheckBox(FormueId.BRUKSKONTO)}
            {renderCheckBox(FormueId.SPAREKONTO)}
            {renderCheckBox(FormueId.BSU)}
            {renderCheckBox(FormueId.LIVSFORSIKRING)}
            {renderCheckBox(FormueId.VERDIPAPIRER)}
            {renderCheckBox(FormueId.ANNET)}
            <NivaTreSkjema
                visible={formue !== undefined && formue.annet}
                size="small"
            >
                <TextareaEnhanced
                    id={replaceDotWithUnderscore(
                        FORMUE_ANNET_TEXT_AREA_FAKTUM_KEY
                    )}
                    placeholder=""
                    onChange={(evt: any) => onChangeAnnet(evt.target.value)}
                    onBlur={() => onBlurTekstfeltAnnet()}
                    faktumKey={FORMUE_ANNET_TEXT_AREA_FAKTUM_KEY}
                    labelId={FORMUE + ".true.type.annet.true.beskrivelse.label"}
                    maxLength={MAX_CHARS}
                    value={
                        formue && formue.beskrivelseAvAnnet
                            ? formue.beskrivelseAvAnnet
                            : ""
                    }
                />
            </NivaTreSkjema>
        </Sporsmal>
    );
};

export default FormueView;
