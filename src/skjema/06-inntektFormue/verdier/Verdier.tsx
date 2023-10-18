import * as React from "react";
import {onEndretValideringsfeil} from "../../../digisos/redux/validering/valideringUtils";
import {SoknadsSti} from "../../../digisos/redux/soknadsdata/soknadsdataReducer";
import {LegendTittleStyle} from "../../../nav-soknad/components/sporsmal/Sporsmal";
import {getFaktumSporsmalTekst} from "../../../nav-soknad/utils";
import JaNeiSporsmal from "../../../nav-soknad/faktum/JaNeiSporsmal";
import NivaTreSkjema from "../../../nav-soknad/components/nivaTreSkjema";
import {maksLengde} from "../../../nav-soknad/validering/valideringer";
import {ValideringsFeilKode} from "../../../digisos/redux/validering/valideringActionTypes";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../../digisos/redux/reducers";
import {setValideringsfeil, clearValideringsfeil} from "../../../digisos/redux/validering/valideringActions";
import {useTranslation} from "react-i18next";
import {REST_STATUS} from "../../../digisos/redux/soknadsdata/soknadsdataTypes";
import {useSoknadsdata} from "../../../digisos/redux/soknadsdata/useSoknadsdata";
import {Checkbox, CheckboxGroup, Textarea} from "@navikt/ds-react";
import {VerdierFrontend} from "../../../generated/model";

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

    const handleClickRadio = (checked: (keyof VerdierFrontend)[]) => {
        const ny: VerdierFrontend = {
            bekreftelse: !!checked.length,
            bolig: checked.includes("bolig"),
            campingvogn: checked.includes("campingvogn"),
            kjoretoy: checked.includes("kjoretoy"),
            fritidseiendom: checked.includes("fritidseiendom"),
            annet: checked.includes("annet"),
            beskrivelseAvAnnet: checked.includes("annet") ? verdier.beskrivelseAvAnnet : "",
        };

        oppdater(ny);
        lagre(ny);
    };

    const onChangeAnnet = (value: string) => {
        verdier.beskrivelseAvAnnet = value;
        oppdater(verdier);
        lagre(verdier);
    };

    const onBlurTekstfeltAnnet = () => {
        const {beskrivelseAvAnnet} = verdier;
        const erGyldigLengde = validerTekstfeltVerdi(beskrivelseAvAnnet ?? "", VERDIER_TEXT_AREA_ANNET_FAKTUM_KEY);
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

    return (
        <JaNeiSporsmal
            visPlaceholder={oppstartsModus && restStatus !== REST_STATUS.OK}
            tekster={getFaktumSporsmalTekst(t, VERDIER)}
            faktumKey={VERDIER}
            verdi={verdier.bekreftelse ?? null}
            onChange={(verdi: boolean) => handleClickJaNeiSpsm(verdi)}
            legendTittelStyle={LegendTittleStyle.FET_NORMAL}
        >
            <CheckboxGroup
                legend={t("inntekt.eierandeler.true.type.sporsmal")}
                onChange={(navn: (keyof VerdierFrontend)[]) => handleClickRadio(navn)}
                value={Object.keys(verdier).filter((key) => verdier[key as keyof VerdierFrontend])}
            >
                <Checkbox value={"bolig"}>{t("inntekt.eierandeler.true.type.bolig")} </Checkbox>
                <Checkbox value={"campingvogn"}>{t("inntekt.eierandeler.true.type.campingvogn")}</Checkbox>
                <Checkbox value={"kjoretoy"}>{t("inntekt.eierandeler.true.type.kjoretoy")}</Checkbox>
                <Checkbox value={"fritidseiendom"}>{t("inntekt.eierandeler.true.type.fritidseiendom")}</Checkbox>
                <Checkbox value={"annet"}>{t("inntekt.eierandeler.true.type.annet")}</Checkbox>
                <NivaTreSkjema visible={verdier.annet} size="small">
                    <Textarea
                        label={t("inntekt.eierandeler.true.type.annet.true.beskrivelse.label")}
                        onChange={(evt: any) => onChangeAnnet(evt.target.value)}
                        onBlur={() => onBlurTekstfeltAnnet()}
                        maxLength={MAX_CHARS}
                        value={verdier?.beskrivelseAvAnnet ?? ""}
                    />
                </NivaTreSkjema>
            </CheckboxGroup>
        </JaNeiSporsmal>
    );
};

export default VerdierView;
