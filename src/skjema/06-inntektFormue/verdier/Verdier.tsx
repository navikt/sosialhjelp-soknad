import * as React from "react";
import {onEndretValideringsfeil} from "../../../digisos/redux/validering/valideringUtils";
import {SoknadsSti} from "../../../digisos/redux/soknadsdata/soknadsdataReducer";
import Sporsmal, {LegendTittleStyle} from "../../../nav-soknad/components/sporsmal/Sporsmal";
import {getFaktumSporsmalTekst, replaceDotWithUnderscore} from "../../../nav-soknad/utils";
import JaNeiSporsmal from "../../../nav-soknad/faktum/JaNeiSporsmal";
import {VerdierKeys} from "./VerdierTypes";
import CheckboxPanel from "../../../nav-soknad/faktum/CheckboxPanel";
import TextareaEnhanced from "../../../nav-soknad/faktum/TextareaEnhanced";
import NivaTreSkjema from "../../../nav-soknad/components/nivaTreSkjema";
import {maksLengde} from "../../../nav-soknad/validering/valideringer";
import {ValideringsFeilKode} from "../../../digisos/redux/validering/valideringActionTypes";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../../digisos/redux/reducers";
import {setValideringsfeil, clearValideringsfeil} from "../../../digisos/redux/validering/valideringActions";
import {useTranslation} from "react-i18next";
import {REST_STATUS} from "../../../digisos/redux/soknadsdata/soknadsdataTypes";
import {useSoknadsdata} from "../../../digisos/redux/soknadsdata/useSoknadsdata";

const MAX_CHARS = 500;
const VERDIER = "inntekt.eierandeler";
const VERDIER_TEXT_AREA_ANNET_FAKTUM_KEY = VERDIER + "verdier.annet.textarea";

export const VerdierView = () => {
    const [oppstartsModus, setOppstartsModus] = React.useState(true);
    const dispatch = useDispatch();
    const {soknadsdata, lagre, oppdater} = useSoknadsdata(SoknadsSti.VERDIER);
    const feil = useSelector((state: State) => state.validering.feil);
    const {t} = useTranslation("skjema");
    const verdier = soknadsdata.inntekt.verdier;
    const restStatus = soknadsdata.restStatus.inntekt.verdier;

    React.useEffect(() => {
        if (oppstartsModus && restStatus === REST_STATUS.OK) setOppstartsModus(false);
    }, [oppstartsModus, restStatus]);

    const handleClickJaNeiSpsm = (verdi: boolean) => {
        if (!(!oppstartsModus && restStatus === REST_STATUS.OK)) return;

        verdier.bekreftelse = verdi;
        if (!verdi) {
            verdier.bolig = false;
            verdier.campingvogn = false;
            verdier.kjoretoy = false;
            verdier.fritidseiendom = false;
            verdier.annet = false;
            verdier.beskrivelseAvAnnet = "";
        }
        oppdater(verdier);
        lagre(verdier);
    };

    const handleClickRadio = (idToToggle: VerdierKeys) => {
        //@ts-ignore
        verdier[idToToggle] = !verdier[idToToggle];
        if (!verdier.bekreftelse || !verdier.annet) {
            verdier.beskrivelseAvAnnet = "";
        }
        oppdater(verdier);
        lagre(verdier);
    };

    const onChangeAnnet = (value: string) => {
        verdier.beskrivelseAvAnnet = value;
        oppdater(verdier);
        lagre(verdier);
    };

    const onBlurTekstfeltAnnet = () => {
        const {beskrivelseAvAnnet} = verdier;
        const erGyldigLengde = validerTekstfeltVerdi(beskrivelseAvAnnet, VERDIER_TEXT_AREA_ANNET_FAKTUM_KEY);
        if (erGyldigLengde) lagre(verdier);
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
