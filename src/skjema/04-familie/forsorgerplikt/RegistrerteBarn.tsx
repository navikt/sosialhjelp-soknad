import * as React from "react";
import {Barn} from "./ForsorgerPliktTypes";
import JaNeiSporsmal from "../../../nav-soknad/faktum/JaNeiSporsmal";
import {getFaktumSporsmalTekst, getInputFaktumTekst, replaceDotWithUnderscore} from "../../../nav-soknad/utils";
import {LegendTittleStyle} from "../../../nav-soknad/components/sporsmal/Sporsmal";
import {SoknadsSti} from "../../../digisos/redux/soknadsdata/soknadsdataReducer";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../../digisos/redux/reducers";
import {ValideringsFeilKode} from "../../../digisos/redux/validering/valideringActionTypes";
import {erSamvaersgrad} from "../../../nav-soknad/validering/valideringer";
import {clearValideringsfeil, setValideringsfeil} from "../../../digisos/redux/validering/valideringActions";
import {Input} from "nav-frontend-skjema";
import {getFeil} from "../../../nav-soknad/utils/enhancedComponentUtils";
import {SysteminfoItem, Systeminfo} from "../../../nav-soknad/components/systeminfo/Systeminfo";
import {useTranslation} from "react-i18next";
import {useSoknadsdata} from "../../../digisos/redux/soknadsdata/useSoknadsdata";
import {logAmplitudeEvent} from "../../../nav-soknad/utils/amplitude";

const SAMVAERSGRAD_KEY = "system.familie.barn.true.barn.grad";

const RegistrerteBarn = () => {
    const {soknadsdata, lagre, oppdater} = useSoknadsdata(SoknadsSti.FORSORGERPLIKT);
    const feil = useSelector((state: State) => state.validering.feil);
    const forsorgerplikt = soknadsdata.familie.forsorgerplikt;

    const dispatch = useDispatch();

    const {t} = useTranslation("skjema");

    const handleClickJaNeiSpsm = (verdi: boolean, barnIndex: number) => {
        const barnet = forsorgerplikt.ansvar[barnIndex];
        barnet.harDeltBosted = verdi;
        oppdater(forsorgerplikt);
        lagre(forsorgerplikt);

        logAmplitudeEvent("svart på sporsmal", {
            sporsmal: "Har barnet delt bosted?",
            verdi: verdi ? "Ja" : "Nei",
        });
    };

    const onChangeSamvaersgrad = (verdi: string, barnIndex: number) => {
        const barnet = forsorgerplikt.ansvar[barnIndex];
        barnet.samvarsgrad = parseInt(verdi, 10);
        oppdater(forsorgerplikt);
    };

    const onBlur = (barnIndex: number, samvaersgradBarnKeyMedIndex: string) => {
        if (validerSamvaersgrad(forsorgerplikt.ansvar[barnIndex].samvarsgrad, samvaersgradBarnKeyMedIndex))
            lagre(forsorgerplikt);
    };

    const validerSamvaersgrad = (verdi: number | null, samvaersgradBarnKeyMedIndex: string) => {
        const gyldig = erSamvaersgrad(verdi);
        gyldig
            ? dispatch(clearValideringsfeil(samvaersgradBarnKeyMedIndex))
            : dispatch(setValideringsfeil(ValideringsFeilKode.ER_SAMVAERSGRAD, samvaersgradBarnKeyMedIndex));
        return gyldig;
    };

    const barn = soknadsdata.familie.forsorgerplikt.ansvar;
    const tekster = getInputFaktumTekst(t, SAMVAERSGRAD_KEY);

    React.useEffect(() => {
        barn.forEach((barnet) => {
            if (!barnet.erFolkeregistrertSammen) {
                logAmplitudeEvent("sporsmal ikke vist", {
                    sporsmal: "Har barnet delt bosted?",
                });
            }
        });
    }, [barn]);

    return (
        <div>
            {barn.map((barnet: Barn, index: number) => {
                const samvaersgradBarnKeyMedIndex = SAMVAERSGRAD_KEY + index;
                const feil_: string | undefined = getFeil(feil, t, samvaersgradBarnKeyMedIndex, undefined);
                return (
                    <div key={index} className={index + 1 === barn.length ? "barn barn_siste_liste_element" : "barn"}>
                        <Systeminfo>
                            <SysteminfoItem label={t("kontakt.system.personalia.navn")}>
                                {barnet.barn.navn.fulltNavn}
                            </SysteminfoItem>
                            <SysteminfoItem label={t("familierelasjon.fodselsdato")}>
                                {barnet.barn.fodselsdato ?? ""}
                            </SysteminfoItem>
                            <SysteminfoItem label={t("familierelasjon.samme_folkeregistrerte_adresse")}>
                                {barnet.erFolkeregistrertSammen ? "Ja" : "Nei"}
                            </SysteminfoItem>
                        </Systeminfo>
                        {barnet.erFolkeregistrertSammen && (
                            <div className="skjema-sporsmal skjema-sporsmal__innhold barn_samvaer_block">
                                <JaNeiSporsmal
                                    id={"barn_radio_" + index}
                                    tekster={getFaktumSporsmalTekst(t, "system.familie.barn.true.barn.deltbosted")}
                                    faktumKey={"system.familie.barn.true.barn.deltbosted"}
                                    verdi={barnet.harDeltBosted}
                                    onChange={(verdi: boolean) => handleClickJaNeiSpsm(verdi, index)}
                                    legendTittelStyle={LegendTittleStyle.FET_NORMAL}
                                />
                            </div>
                        )}
                        {!barnet.erFolkeregistrertSammen && (
                            <div className="skjema-sporsmal skjema-sporsmal__innhold barn_samvaer_block">
                                <Input
                                    id={replaceDotWithUnderscore(samvaersgradBarnKeyMedIndex)}
                                    className={"input--xxl faktumInput"}
                                    type="number"
                                    autoComplete="off"
                                    name={"barn" + index + "_samvaersgrad"}
                                    value={barnet.samvarsgrad !== null ? barnet.samvarsgrad.toString() : ""}
                                    onChange={(event: any) => onChangeSamvaersgrad(event.target.value, index)}
                                    onBlur={() => onBlur(index, samvaersgradBarnKeyMedIndex)}
                                    label={tekster.label}
                                    placeholder={tekster.pattern}
                                    feil={feil_}
                                    maxLength={3}
                                    required={false}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default RegistrerteBarn;
