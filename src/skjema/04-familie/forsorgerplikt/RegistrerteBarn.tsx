import * as React from "react";
import {Barn} from "./ForsorgerPliktTypes";
import JaNeiSporsmal from "../../../nav-soknad/faktum/JaNeiSporsmal";
import {getFaktumSporsmalTekst, getInputFaktumTekst, replaceDotWithUnderscore} from "../../../nav-soknad/utils";
import {LegendTittleStyle} from "../../../nav-soknad/components/sporsmal/Sporsmal";
import {SoknadsSti, oppdaterSoknadsdataSti} from "../../../digisos/redux/soknadsdata/soknadsdataReducer";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../../digisos/redux/reducers";
import {hentSoknadsdata, lagreSoknadsdata} from "../../../digisos/redux/soknadsdata/soknadsdataActions";
import {ValideringsFeilKode} from "../../../digisos/redux/validering/valideringActionTypes";
import {erSamvaersgrad} from "../../../nav-soknad/validering/valideringer";
import {clearValideringsfeil, setValideringsfeil} from "../../../digisos/redux/validering/valideringActions";
import {Input} from "nav-frontend-skjema";
import {getFeil} from "../../../nav-soknad/utils/enhancedComponentUtils";
import {SysteminfoItem, Systeminfo} from "../../../nav-soknad/components/systeminfo/Systeminfo";
import {useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../../lib/hooks/useBehandlingsId";
import {logAmplitudeEvent} from "../../../nav-soknad/utils/amplitude";
import {useEffect} from "react";

const SAMVAERSGRAD_KEY = "system.familie.barn.true.barn.grad";

const RegistrerteBarn = () => {
    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const behandlingsId = useBehandlingsId();
    const feil = useSelector((state: State) => state.validering.feil);

    const dispatch = useDispatch();

    const {t} = useTranslation("skjema");

    useEffect(() => {
        hentSoknadsdata(behandlingsId, SoknadsSti.FORSORGERPLIKT, dispatch);
    }, [behandlingsId, dispatch]);

    const handleClickJaNeiSpsm = (verdi: boolean, barnIndex: number) => {
        const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
        const barnet = forsorgerplikt.ansvar[barnIndex];
        barnet.harDeltBosted = verdi;
        dispatch(oppdaterSoknadsdataSti(SoknadsSti.FORSORGERPLIKT, forsorgerplikt));
        lagreSoknadsdata(behandlingsId, SoknadsSti.FORSORGERPLIKT, forsorgerplikt, dispatch);

        logAmplitudeEvent("barn har delt bosted", {
            barnIndex,
            harDeltBosted: verdi,
        });
    };

    const onChangeSamvaersgrad = (verdi: string, barnIndex: number) => {
        const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
        const barnet = forsorgerplikt.ansvar[barnIndex];
        barnet.samvarsgrad = parseInt(verdi, 10);
        dispatch(oppdaterSoknadsdataSti(SoknadsSti.FORSORGERPLIKT, forsorgerplikt));
    };

    const onBlur = (barnIndex: number, samvaersgradBarnKeyMedIndex: string) => {
        const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
        const samvaersgrad = forsorgerplikt.ansvar[barnIndex].samvarsgrad;
        if (validerSamvaersgrad(samvaersgrad, samvaersgradBarnKeyMedIndex)) {
            lagreSoknadsdata(behandlingsId, SoknadsSti.FORSORGERPLIKT, forsorgerplikt, dispatch);
        }
    };

    const validerSamvaersgrad = (verdi: number | null, samvaersgradBarnKeyMedIndex: string): boolean => {
        if (!erSamvaersgrad(verdi)) {
            dispatch(setValideringsfeil(ValideringsFeilKode.ER_SAMVAERSGRAD, samvaersgradBarnKeyMedIndex));
            return false;
        }
        dispatch(clearValideringsfeil(samvaersgradBarnKeyMedIndex));

        return true;
    };

    const barn = soknadsdata.familie.forsorgerplikt.ansvar;
    const tekster = getInputFaktumTekst(t, SAMVAERSGRAD_KEY);

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
