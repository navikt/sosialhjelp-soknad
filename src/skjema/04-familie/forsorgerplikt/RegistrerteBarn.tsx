import * as React from "react";
import {Barn} from "./ForsorgerPliktTypes";
import {getInputFaktumTekst, replaceDotWithUnderscore} from "../../../nav-soknad/utils";
import {SoknadsSti} from "../../../digisos/redux/soknadsdata/soknadsdataReducer";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../../digisos/redux/reducers";
import {ValideringsFeilKode} from "../../../digisos/redux/validering/valideringActionTypes";
import {erSamvaersgrad} from "../../../nav-soknad/validering/valideringer";
import {clearValideringsfeil, setValideringsfeil} from "../../../digisos/redux/validering/valideringActions";
import {getFeil} from "../../../nav-soknad/utils/enhancedComponentUtils";
import {Systeminfo, SysteminfoItem} from "../../../nav-soknad/components/systeminfo/Systeminfo";
import {useTranslation} from "react-i18next";
import {useSoknadsdata} from "../../../digisos/redux/soknadsdata/useSoknadsdata";
import {logAmplitudeEvent} from "../../../nav-soknad/utils/amplitude";
import {LocalizedDate} from "../../../components/LocalizedDate";
import {ReadMore, TextField} from "@navikt/ds-react";
import cx from "classnames";
import {YesNoInput} from "../../../nav-soknad/components/form/YesNoInput";

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
        const grad = parseInt(verdi, 10);
        if (!isNaN(grad)) {
            const barnet = forsorgerplikt.ansvar[barnIndex];
            barnet.samvarsgrad = grad;
            oppdater(forsorgerplikt);
        }
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
        barn.filter(({erFolkeregistrertSammen}) => !erFolkeregistrertSammen).forEach((barnet) => {
            logAmplitudeEvent("sporsmal ikke vist", {
                sporsmal: "Har barnet delt bosted?",
            });
        });
    }, [barn]);

    return (
        <div>
            {barn.map((barnet: Barn, index: number) => (
                <div
                    key={index}
                    className={cx("barn space-y-2", {barn_siste_liste_element: index + 1 === barn.length})}
                >
                    <Systeminfo>
                        <SysteminfoItem label={t("kontakt.system.personalia.navn")}>
                            {barnet.barn.navn.fulltNavn}
                        </SysteminfoItem>
                        <SysteminfoItem label={t("familierelasjon.fodselsdato")}>
                            <LocalizedDate date={barnet.barn.fodselsdato} />
                        </SysteminfoItem>
                        <SysteminfoItem label={t("familierelasjon.samme_folkeregistrerte_adresse")}>
                            {barnet.erFolkeregistrertSammen
                                ? t("familie.barn.true.barn.borsammen.true")
                                : t("familie.barn.true.barn.borsammen.false")}
                        </SysteminfoItem>
                    </Systeminfo>
                    {barnet.erFolkeregistrertSammen ? (
                        <YesNoInput
                            legend={t("system.familie.barn.true.barn.deltbosted.sporsmal")}
                            description={
                                <ReadMore header={"Les mer"}>
                                    {t("system.familie.barn.true.barn.deltbosted.hjelpetekst.tekst")}
                                </ReadMore>
                            }
                            defaultValue={barnet.harDeltBosted}
                            onChange={(verdi: boolean) => handleClickJaNeiSpsm(verdi, index)}
                        />
                    ) : (
                        <TextField
                            id={replaceDotWithUnderscore(SAMVAERSGRAD_KEY + index)}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            autoComplete="off"
                            htmlSize={15}
                            name={"barn" + index + "_samvaersgrad"}
                            value={barnet.samvarsgrad !== null ? barnet.samvarsgrad.toString() : ""}
                            onChange={({target: {value}}) => onChangeSamvaersgrad(value, index)}
                            onBlur={() => onBlur(index, SAMVAERSGRAD_KEY + index)}
                            label={tekster.label}
                            description={tekster.pattern}
                            error={getFeil(feil, t, SAMVAERSGRAD_KEY + index, undefined)}
                            maxLength={3}
                            required={false}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default RegistrerteBarn;
