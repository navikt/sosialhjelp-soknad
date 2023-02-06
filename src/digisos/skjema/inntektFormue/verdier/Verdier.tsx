import * as React from "react";
import {onEndretValideringsfeil} from "../../../redux/validering/valideringUtils";
import {SoknadsSti, oppdaterSoknadsdataSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import Sporsmal, {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {getFaktumSporsmalTekst, replaceDotWithUnderscore} from "../../../../nav-soknad/utils";
import JaNeiSporsmal from "../../../../nav-soknad/faktum/JaNeiSporsmal";
import {Verdier, VerdierKeys} from "./VerdierTypes";
import CheckboxPanel from "../../../../nav-soknad/faktum/CheckboxPanel";
import TextareaEnhanced from "../../../../nav-soknad/faktum/TextareaEnhanced";
import NivaTreSkjema from "../../../../nav-soknad/components/nivaTreSkjema";
import {maksLengde} from "../../../../nav-soknad/validering/valideringer";
import {ValideringsFeilKode} from "../../../redux/validering/valideringActionTypes";
import {REST_STATUS} from "../../../redux/soknad/soknadTypes";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../../redux/reducers";
import {hentSoknadsdata, lagreSoknadsdata} from "../../../redux/soknadsdata/soknadsdataActions";
import {setValideringsfeil, clearValideringsfeil} from "../../../redux/validering/valideringActions";
import {useTranslation} from "react-i18next";

const MAX_CHARS = 500;
const VERDIER = "inntekt.eierandeler";
const VERDIER_TEXT_AREA_ANNET_FAKTUM_KEY = VERDIER + "verdier.annet.textarea";

export const VerdierView = () => {
    const [oppstartsModus, setOppstartsModus] = React.useState(true);

    const dispatch = useDispatch();

    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const behandlingsId = useSelector((state: State) => state.soknad.behandlingsId);

    const feil = useSelector((state: State) => state.validering.feil);

    const {t} = useTranslation("skjema");

    React.useEffect(() => {
        if (behandlingsId) {
            hentSoknadsdata(behandlingsId, SoknadsSti.VERDIER, dispatch);
        }
    }, [behandlingsId, dispatch]);

    React.useEffect(() => {
        if (oppstartsModus && soknadsdata.restStatus.inntekt.verdier === REST_STATUS.OK) {
            setOppstartsModus(false);
        }
    }, [oppstartsModus, soknadsdata.restStatus.inntekt.verdier]);

    const handleClickJaNeiSpsm = (verdi: boolean) => {
        const restStatus = soknadsdata.restStatus.inntekt.verdier;

        if (!oppstartsModus && restStatus === REST_STATUS.OK && behandlingsId) {
            const verdier: Verdier = soknadsdata.inntekt.verdier;
            verdier.bekreftelse = verdi;
            if (!verdi) {
                verdier.bolig = false;
                verdier.campingvogn = false;
                verdier.kjoretoy = false;
                verdier.fritidseiendom = false;
                verdier.annet = false;
                verdier.beskrivelseAvAnnet = "";
            }
            dispatch(oppdaterSoknadsdataSti(SoknadsSti.VERDIER, verdier));
            lagreSoknadsdata(behandlingsId, SoknadsSti.VERDIER, verdier, dispatch);
        }
    };

    const handleClickRadio = (idToToggle: VerdierKeys) => {
        if (behandlingsId) {
            const verdier: Verdier = soknadsdata.inntekt.verdier;
            //@ts-ignore
            verdier[idToToggle] = !verdier[idToToggle];
            if (!verdier.bekreftelse || !verdier.annet) {
                verdier.beskrivelseAvAnnet = "";
            }
            dispatch(oppdaterSoknadsdataSti(SoknadsSti.VERDIER, verdier));
            lagreSoknadsdata(behandlingsId, SoknadsSti.VERDIER, verdier, dispatch);
        }
    };

    const onChangeAnnet = (value: string) => {
        const verdier: Verdier = soknadsdata.inntekt.verdier;
        verdier.beskrivelseAvAnnet = value;
        dispatch(oppdaterSoknadsdataSti(SoknadsSti.VERDIER, verdier));
        validerTekstfeltVerdi(value, VERDIER_TEXT_AREA_ANNET_FAKTUM_KEY);
    };

    const onBlurTekstfeltAnnet = () => {
        const verdier: Verdier = soknadsdata.inntekt.verdier;
        const beskrivelseAvAnnet = verdier.beskrivelseAvAnnet;
        const erGyldigLengde = validerTekstfeltVerdi(beskrivelseAvAnnet, VERDIER_TEXT_AREA_ANNET_FAKTUM_KEY);

        if (erGyldigLengde && behandlingsId) {
            lagreSoknadsdata(behandlingsId, SoknadsSti.VERDIER, verdier, dispatch);
        }
    };

    const validerTekstfeltVerdi = (verdi: string, faktumKey: string): boolean => {
        const erInnenforMaksLengde = maksLengde(verdi, MAX_CHARS);
        onEndretValideringsfeil(
            erInnenforMaksLengde ? undefined : ValideringsFeilKode.MAX_LENGDE,
            faktumKey,
            feil,
            () => {
                erInnenforMaksLengde
                    ? dispatch(clearValideringsfeil(faktumKey))
                    : dispatch(setValideringsfeil(ValideringsFeilKode.MAX_LENGDE, faktumKey));
            }
        );
        return erInnenforMaksLengde;
    };

    const renderCheckBox = (navn: VerdierKeys) => {
        const verdier: Verdier = soknadsdata.inntekt.verdier;
        return (
            <CheckboxPanel
                id={"verdier_" + navn + "_checkbox"}
                name={navn}
                checked={!!verdier[navn]}
                label={t(VERDIER + ".true.type." + navn)}
                onClick={() => handleClickRadio(navn)}
            />
        );
    };

    const verdier: Verdier = soknadsdata.inntekt.verdier;
    const restStatus = soknadsdata.restStatus.inntekt.verdier;
    return (
        <JaNeiSporsmal
            visPlaceholder={oppstartsModus && restStatus !== REST_STATUS.OK}
            tekster={getFaktumSporsmalTekst(t, VERDIER)}
            faktumKey={VERDIER}
            verdi={verdier.bekreftelse}
            onChange={(verdi: boolean) => handleClickJaNeiSpsm(verdi)}
            legendTittelStyle={LegendTittleStyle.FET_NORMAL}
        >
            <Sporsmal
                tekster={getFaktumSporsmalTekst(t, VERDIER + ".true.type")}
                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
            >
                {renderCheckBox(VerdierKeys.BOLIG)}
                {renderCheckBox(VerdierKeys.CAMPINGVOGN)}
                {renderCheckBox(VerdierKeys.KJORETOY)}
                {renderCheckBox(VerdierKeys.FRITIDSEIENDOM)}
                {renderCheckBox(VerdierKeys.ANNET)}
                <NivaTreSkjema visible={!!(verdier.bekreftelse && verdier.annet)} size="small">
                    <TextareaEnhanced
                        id={replaceDotWithUnderscore(VERDIER_TEXT_AREA_ANNET_FAKTUM_KEY)}
                        placeholder=""
                        onChange={(evt: any) => onChangeAnnet(evt.target.value)}
                        onBlur={() => onBlurTekstfeltAnnet()}
                        faktumKey={VERDIER_TEXT_AREA_ANNET_FAKTUM_KEY}
                        labelId={VERDIER + ".true.type.annet.true.beskrivelse.label"}
                        maxLength={MAX_CHARS}
                        value={verdier.beskrivelseAvAnnet ? verdier.beskrivelseAvAnnet : ""}
                    />
                </NivaTreSkjema>
            </Sporsmal>
        </JaNeiSporsmal>
    );
};

export default VerdierView;
