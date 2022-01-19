import * as React from "react";
import {useState} from "react";
import {Barn} from "./ForsorgerPliktTypes";
import {useIntl} from "react-intl";
import JaNeiSporsmal from "../../../../nav-soknad/faktum/JaNeiSporsmal";
import {getFaktumSporsmalTekst} from "../../../../nav-soknad/utils";
import Sporsmal, {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import InputEnhanced from "../../../../nav-soknad/faktum/InputEnhanced";
import {getTomtAnsvarMedBarn} from "./ForsorgerPliktUtils";
import {LinkButton} from "../../../../nav-soknad/components/linkButton/LinkButton";
import Underskjema from "../../../../nav-soknad/components/underskjema";
import {konverterFraISODato, konverterTilISODato} from "../sivilstatus/datoUtils";
import {fdato} from "../../../../nav-soknad/validering/valideringer";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../../redux/reducers";
import {oppdaterSoknadsdataSti, SoknadsSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import {clearValideringsfeil, setValideringsfeil} from "../../../redux/validering/valideringActions";
import {lagreSoknadsdata, setPath} from "../../../redux/soknadsdata/soknadsdataActions";
import styled from "styled-components";
import {Button} from "@navikt/ds-react";
import {ValideringsFeilKode} from "../../../redux/validering/valideringActionTypes";

const TEXT_KEY = "familie.barn.true.barn";
const TEXT_KEY_FNR = TEXT_KEY + ".fnr";
const TEXT_KEY_FIRST_NAME = TEXT_KEY + ".name.first";
const TEXT_KEY_LAST_NAME = TEXT_KEY + ".name.last";

const LeggTilBarnSkjema = styled.div`
    .underskjema__boks {
        max-width: 620px;
        background-color: var(--navds-semantic-color-canvas-background);
        margin-left: 0;
        margin-right: 0;
        margin-bottom: 1rem;
        border-radius: 8px;
    }

    .underskjema__innhold:before {
        background-color: var(--navds-semantic-color-canvas-background) !important;
    }

    .underskjema__innhold {
        padding-top: 1rem;
        padding-bottom: 1rem;
    }
`;

const BrukerregistrerteBarn = () => {
    const dispatch = useDispatch();
    const intl = useIntl();
    const [datoFormatFeilIndex, setDatoFormatFeilIndex] = useState(-1);
    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const annsvarsListe = useSelector(
        (state: State) => state.soknadsdata.familie.forsorgerplikt.brukerregistrertAnsvar
    );
    const behandlingsId = useSelector((state: State) => state.soknad.behandlingsId);

    const handleLeggTilBarn = () => {
        const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
        annsvarsListe.push(getTomtAnsvarMedBarn());
        dispatch(oppdaterSoknadsdataSti(SoknadsSti.FORSORGERPLIKT, forsorgerplikt));
        onBlur();
    };

    const handleFjernBarn = (radIndex: number) => {
        const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
        const brukerregistrerteAnsvar = forsorgerplikt.brukerregistrertAnsvar;
        const antallBrukerregistrerteBarn = brukerregistrerteAnsvar.length;
        const ansvar = soknadsdata.familie.forsorgerplikt.ansvar;
        const antallSystemBarn = ansvar.length;
        if (antallBrukerregistrerteBarn === 1 && antallSystemBarn === 0) {
            forsorgerplikt.barnebidrag = null;
            forsorgerplikt.harForsorgerplikt = false;
        }
        brukerregistrerteAnsvar.splice(radIndex, 1);
        dispatch(oppdaterSoknadsdataSti(SoknadsSti.FORSORGERPLIKT, forsorgerplikt));
        onBlur();
    };

    const oppdaterTekstfelt = (sti: string, verdi: string | null, barnIndex: number) => {
        if (verdi && verdi.length === 0) {
            verdi = null;
        }
        const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
        const barnet = forsorgerplikt.brukerregistrertAnsvar[barnIndex].barn;
        setPath(barnet, sti, verdi);
        dispatch(oppdaterSoknadsdataSti(SoknadsSti.FORSORGERPLIKT, forsorgerplikt));
    };

    const onClickBorSammen = (verdi: boolean, barnIndex: number) => {
        const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
        const barnet = forsorgerplikt.brukerregistrertAnsvar[barnIndex];
        if (verdi !== barnet.borSammenMed) {
            barnet.harDeltBosted = null;
            barnet.samvarsgrad = null;
            barnet.borSammenMed = verdi;

            dispatch(oppdaterSoknadsdataSti(SoknadsSti.FORSORGERPLIKT, forsorgerplikt));
            onBlur();
        }
    };

    const onClickHarDeltBosted = (verdi: boolean, barnIndex: number) => {
        const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
        const barnet = forsorgerplikt.brukerregistrertAnsvar[barnIndex];
        barnet.harDeltBosted = verdi;
        dispatch(oppdaterSoknadsdataSti(SoknadsSti.FORSORGERPLIKT, forsorgerplikt));
        onBlur();
    };

    const onChangeSamvaersgrad = (verdi: string, barnIndex: number) => {
        const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
        const barnet = forsorgerplikt.brukerregistrertAnsvar[barnIndex];
        const samvarsgrad = Number.parseInt(verdi, 10);
        barnet.samvarsgrad = Number.isNaN(samvarsgrad) ? null : samvarsgrad;
        dispatch(oppdaterSoknadsdataSti(SoknadsSti.FORSORGERPLIKT, forsorgerplikt));
        onBlur();
    };

    const onFokus = (barnIndex: number) => {
        if (barnIndex !== datoFormatFeilIndex) {
            dispatch(clearValideringsfeil(TEXT_KEY_FNR + barnIndex));
        }
        dispatch(clearValideringsfeil(TEXT_KEY_FIRST_NAME + barnIndex));
        dispatch(clearValideringsfeil(TEXT_KEY_LAST_NAME + barnIndex));
    };

    const onBlur = () => {
        const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
        const barn: Barn[] = forsorgerplikt.brukerregistrertAnsvar;
        let feilkodeFodselsdato = null;
        let ingenFeilKoder = true;
        for (let i = 0; i < barn.length; i++) {
            let barnet = barn[i];
            let fodselsdato: string = barnet.barn.fodselsdato ? barnet.barn.fodselsdato : "";
            if (fodselsdato === "") {
                barnet.barn.fodselsdato = null;
                dispatch(clearValideringsfeil(TEXT_KEY_FNR + i));
                setDatoFormatFeilIndex(-1);
            }
            if (fodselsdato !== "") {
                fodselsdato = konverterFraISODato(fodselsdato);
                feilkodeFodselsdato = fdato(fodselsdato);
                if (feilkodeFodselsdato) {
                    dispatch(setValideringsfeil(feilkodeFodselsdato, TEXT_KEY_FNR + i));
                    setDatoFormatFeilIndex(i);
                    ingenFeilKoder = false;
                } else {
                    dispatch(clearValideringsfeil(TEXT_KEY_FNR + i));
                    setDatoFormatFeilIndex(-1);
                }

                if (!feilkodeFodselsdato && fodselsdato) {
                    fodselsdato = konverterTilISODato(fodselsdato);
                    barnet.barn.fodselsdato = fodselsdato;
                }
            }
            if (barnet.samvarsgrad) {
                if (barnet.samvarsgrad < 0 || barnet.samvarsgrad > 100) {
                    dispatch(
                        setValideringsfeil(
                            ValideringsFeilKode.ER_SAMVAERSGRAD,
                            "system.familie.barn.true.barn.grad" + i
                        )
                    );
                    ingenFeilKoder = false;
                } else {
                    dispatch(clearValideringsfeil("system.familie.barn.true.barn.grad" + i));
                }
            }
        }
        if (ingenFeilKoder && behandlingsId) {
            lagreSoknadsdata(behandlingsId, SoknadsSti.FORSORGERPLIKT, forsorgerplikt, dispatch);
        }
    };

    return (
        <Sporsmal sprakNokkel="familierelasjon.faktum.leggtil" legendTittelStyle={LegendTittleStyle.FET_NORMAL}>
            <LeggTilBarnSkjema>
                {annsvarsListe.map((barnet: Barn, index: number) => (
                    <Underskjema visible={true} arrow={index === 0} key={index}>
                        <LinkButton
                            onClick={() => {
                                handleFjernBarn(index);
                            }}
                            id={index + "_fjern_brukerregistrert_barn_lenke"}
                        >
                            Slett informasjon
                        </LinkButton>

                        <Sporsmal sprakNokkel={TEXT_KEY} legendTittelStyle={LegendTittleStyle.FET_NORMAL}>
                            <InputEnhanced
                                getName={() => TEXT_KEY_FIRST_NAME + index}
                                id={TEXT_KEY_FIRST_NAME + index}
                                maxLength={100}
                                verdi={barnet.barn.navn.fornavn}
                                onChange={(verdi: string) => oppdaterTekstfelt("navn/fornavn", verdi, index)}
                                onBlur={() => onBlur()}
                                onFocus={() => onFokus(index)}
                                faktumKey={TEXT_KEY_FIRST_NAME + index}
                                textKey={TEXT_KEY + ".fornavn"}
                                required={false}
                                autoFocus
                            />

                            <InputEnhanced
                                getName={() => TEXT_KEY + "_mellomnavn_input" + index}
                                id={TEXT_KEY + "_mellomnavn_input" + index}
                                maxLength={100}
                                verdi={barnet.barn.navn.mellomnavn ? barnet.barn.navn.mellomnavn : ""}
                                onChange={(verdi: string) => oppdaterTekstfelt("navn/mellomnavn", verdi, index)}
                                onBlur={() => onBlur()}
                                onFocus={() => onFokus(index)}
                                faktumKey={TEXT_KEY + ".mellomnavn"}
                                required={false}
                            />

                            <InputEnhanced
                                getName={() => TEXT_KEY_LAST_NAME + index}
                                id={TEXT_KEY_LAST_NAME + index}
                                maxLength={100}
                                verdi={barnet.barn.navn.etternavn}
                                onChange={(verdi: string) => oppdaterTekstfelt("navn/etternavn", verdi, index)}
                                onBlur={() => onBlur()}
                                onFocus={() => onFokus(index)}
                                faktumKey={TEXT_KEY_LAST_NAME + index}
                                textKey={TEXT_KEY + ".etternavn"}
                                required={false}
                            />

                            <InputEnhanced
                                getName={() => TEXT_KEY_FNR + index}
                                id={TEXT_KEY_FNR + index}
                                maxLength={8}
                                minLength={8}
                                verdi={barnet.barn.fodselsdato ? konverterFraISODato(barnet.barn.fodselsdato) : ""}
                                onChange={(verdi: string) => oppdaterTekstfelt("fodselsdato", verdi, index)}
                                bredde="S"
                                onBlur={() => onBlur()}
                                onFocus={() => onFokus(index)}
                                faktumKey={TEXT_KEY_FNR + index}
                                textKey={TEXT_KEY_FNR}
                                required={false}
                            />

                            <div className="skjema-sporsmal skjema-sporsmal__innhold barn_samvaer_block">
                                <JaNeiSporsmal
                                    id={"brukerregistrert_brukerregistrert_barn_radio_" + index}
                                    tekster={getFaktumSporsmalTekst(intl, "familie.barn.true.barn.borsammen")}
                                    faktumKey={"familie.barn.true.barn.borsammen"}
                                    verdi={barnet.borSammenMed}
                                    onChange={(verdi: boolean) => onClickBorSammen(verdi, index)}
                                    legendTittelStyle={LegendTittleStyle.NORMAL}
                                />
                            </div>
                            {barnet.borSammenMed === true && (
                                <div className="skjema-sporsmal skjema-sporsmal__innhold barn_samvaer_block">
                                    <JaNeiSporsmal
                                        id={"brukerregistrert_barn" + index + "_deltbosted"}
                                        tekster={getFaktumSporsmalTekst(intl, "familie.barn.true.barn.deltbosted")}
                                        faktumKey={"familie.barn.true.barn.deltbosted"}
                                        verdi={barnet.harDeltBosted}
                                        onChange={(verdi: boolean) => onClickHarDeltBosted(verdi, index)}
                                        legendTittelStyle={LegendTittleStyle.FET_NORMAL}
                                    />
                                </div>
                            )}
                            {barnet.borSammenMed === false && (
                                <div className="skjema-sporsmal skjema-sporsmal__innhold barn_samvaer_block">
                                    <InputEnhanced
                                        getName={() => "brukerregistrert_barn" + index + "_samvaersgrad"}
                                        id={"brukerregistrert_barn" + index + "_samvaersgrad"}
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        maxLength={3}
                                        verdi={barnet.samvarsgrad !== null ? barnet.samvarsgrad.toString() : ""}
                                        onChange={(verdi: string) => onChangeSamvaersgrad(verdi, index)}
                                        onBlur={() => onBlur()}
                                        onFocus={() => onFokus(index)}
                                        faktumKey={"system.familie.barn.true.barn.grad" + index}
                                        textKey="system.familie.barn.true.barn.grad"
                                        required={false}
                                    />
                                </div>
                            )}
                        </Sporsmal>
                    </Underskjema>
                ))}
                <div className="legg-til-barn-knapp">
                    <Button
                        variant="tertiary"
                        onClick={() => handleLeggTilBarn()}
                        id={"legg_til_brukerregistrert_barn_link"}
                    >
                        <span aria-hidden={true}>+ </span>Legg til barn som ikke er registrert
                    </Button>
                </div>
            </LeggTilBarnSkjema>
        </Sporsmal>
    );
};

export default BrukerregistrerteBarn;
