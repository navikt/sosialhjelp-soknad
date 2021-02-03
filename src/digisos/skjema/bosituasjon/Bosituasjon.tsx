import * as React from "react";
import {useIntl} from "react-intl";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import Sporsmal, {LegendTittleStyle} from "../../../nav-soknad/components/sporsmal/Sporsmal";
import {getFaktumSporsmalTekst} from "../../../nav-soknad/utils";
import RadioEnhanced from "../../../nav-soknad/faktum/RadioEnhanced";
import Underskjema from "../../../nav-soknad/components/underskjema";
import {Bosituasjon} from "./bosituasjonTypes";
import {SoknadsSti, oppdaterSoknadsdataSti} from "../../redux/soknadsdata/soknadsdataReducer";
import InputEnhanced from "../../../nav-soknad/faktum/InputEnhanced";
import {erTall} from "../../../nav-soknad/validering/valideringer";
import {onEndretValideringsfeil} from "../../redux/soknadsdata/soknadsdataContainerUtils";
import {ValideringsFeilKode} from "../../redux/validering/valideringActionTypes";
import {State} from "../../redux/reducers";
import {hentSoknadsdata, lagreSoknadsdata} from "../../redux/soknadsdata/soknadsdataActions";
import {clearValideringsfeil, setValideringsfeil} from "../../redux/validering/valideringActions";

const FAKTUM_KEY_ANTALL = "bosituasjon.antallpersoner";

enum Bosituasjonsvalg {
    eier = "eier",
    leier = "leier",
    kommunal = "kommunal",
    ingen = "ingen",
    annet = "annet",
}

enum Annetvalg {
    foreldre = "annet.botype.foreldre",
    familie = "annet.botype.familie",
    venner = "annet.botype.venner",
    institusjon = "annet.botype.institusjon",
    fengsel = "annet.botype.fengsel",
    krisesenter = "annet.botype.krisesenter",
}

const BosituasjonView = () => {
    const behandlingsId = useSelector((state: State) => state.soknad.behandlingsId);
    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const feil = useSelector((state: State) => state.validering.feil);

    const dispatch = useDispatch();

    const intl = useIntl();

    useEffect(() => {
        if (behandlingsId) {
            dispatch(hentSoknadsdata(behandlingsId, SoknadsSti.BOSITUASJON));
        }
    }, [behandlingsId, dispatch]);

    const handleRadioClick = (verdi: string): void => {
        if (behandlingsId) {
            const bosituasjon = soknadsdata.bosituasjon;
            if (verdi && verdi.indexOf("annet.botype.") !== -1) {
                const botype = verdi.replace("annet.botype.", "");
                bosituasjon.botype = botype;
                dispatch(oppdaterSoknadsdataSti(SoknadsSti.BOSITUASJON, bosituasjon));
                const valideringsfeil = validerAntallPersoner(bosituasjon.antallPersoner);
                if (!valideringsfeil) {
                    dispatch(lagreSoknadsdata(behandlingsId, SoknadsSti.BOSITUASJON, bosituasjon));
                }
            } else {
                const botype = verdi;
                bosituasjon.botype = botype;
                dispatch(oppdaterSoknadsdataSti(SoknadsSti.BOSITUASJON, bosituasjon));
                const valideringsfeil = validerAntallPersoner(bosituasjon.antallPersoner);
                if (!valideringsfeil) {
                    dispatch(lagreSoknadsdata(behandlingsId, SoknadsSti.BOSITUASJON, bosituasjon));
                }
            }
        }
    };

    const erValgt = (verdi: string): boolean => {
        verdi = verdi.replace("annet.botype.", "");
        const {botype} = soknadsdata.bosituasjon;
        return botype === verdi;
    };

    const renderRadioknapp = (id: string, name: string) => {
        if (Object.keys(Annetvalg).find((s) => s === id) && !erValgt(Bosituasjonsvalg.annet)) {
            return null;
        }
        return (
            <RadioEnhanced
                id={"bosituasjon_radio_" + id}
                faktumKey="bosituasjon"
                value={id}
                checked={erValgt(id)}
                onChange={() => handleRadioClick(id)}
                name={name}
            />
        );
    };

    const onBlurAntall = () => {
        if (behandlingsId) {
            const {botype, antallPersoner} = soknadsdata.bosituasjon;
            const valideringsfeil = validerAntallPersoner(antallPersoner);
            if (!valideringsfeil) {
                const oppdatertBosituasjon: Bosituasjon = {
                    botype,
                    antallPersoner,
                };
                dispatch(lagreSoknadsdata(behandlingsId, SoknadsSti.BOSITUASJON, oppdatertBosituasjon));
                dispatch(oppdaterSoknadsdataSti(SoknadsSti.BOSITUASJON, oppdatertBosituasjon));
                dispatch(clearValideringsfeil(FAKTUM_KEY_ANTALL));
            }
        }
    };

    const validerAntallPersoner = (antallPersoner: string | null) => {
        if (!antallPersoner || antallPersoner.length === 0) {
            return null;
        }
        const feilkode: ValideringsFeilKode | undefined = erTall(antallPersoner, true);
        onEndretValideringsfeil(feilkode, FAKTUM_KEY_ANTALL, feil, () => {
            feilkode
                ? dispatch(setValideringsfeil(feilkode, FAKTUM_KEY_ANTALL))
                : dispatch(clearValideringsfeil(FAKTUM_KEY_ANTALL));
        });
        return feilkode;
    };

    const onChangeAntall = (verdi: string) => {
        const bosituasjon = soknadsdata.bosituasjon;
        bosituasjon.antallPersoner = verdi;
        dispatch(oppdaterSoknadsdataSti(SoknadsSti.BOSITUASJON, bosituasjon));
        dispatch(clearValideringsfeil(FAKTUM_KEY_ANTALL));
    };

    const bosituasjon: Bosituasjon = soknadsdata.bosituasjon;
    let synligUnderskjema: boolean = false;
    if (erValgt(Bosituasjonsvalg.annet) || Object.keys(Annetvalg).find((v) => v === bosituasjon.botype)) {
        synligUnderskjema = true;
    }

    const antallPersoner = bosituasjon.antallPersoner != null ? bosituasjon.antallPersoner : "";

    return (
        <div>
            <Sporsmal
                tekster={getFaktumSporsmalTekst(intl, "bosituasjon")}
                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
            >
                {renderRadioknapp(Bosituasjonsvalg.eier, "bosituasjon_radio")}
                {renderRadioknapp(Bosituasjonsvalg.leier, "bosituasjon_radio")}
                {renderRadioknapp(Bosituasjonsvalg.kommunal, "bosituasjon_radio")}
                {renderRadioknapp(Bosituasjonsvalg.ingen, "bosituasjon_radio")}
                {renderRadioknapp(Bosituasjonsvalg.annet, "bosituasjon_radio")}
                <div className="skjema-sporsmal--jaNeiSporsmal">
                    <Underskjema visible={synligUnderskjema} arrow={true}>
                        <Sporsmal
                            tekster={getFaktumSporsmalTekst(intl, "bosituasjon")}
                            legendTittelStyle={LegendTittleStyle.FET_NORMAL}
                            stil="system"
                        >
                            {renderRadioknapp(Annetvalg.foreldre, "bosituasjon_annetValg")}
                            {renderRadioknapp(Annetvalg.familie, "bosituasjon_annetValg")}
                            {renderRadioknapp(Annetvalg.venner, "bosituasjon_annetValg")}
                            {renderRadioknapp(Annetvalg.institusjon, "bosituasjon_annetValg")}
                            {renderRadioknapp(Annetvalg.fengsel, "bosituasjon_annetValg")}
                            {renderRadioknapp(Annetvalg.krisesenter, "bosituasjon_annetValg")}
                        </Sporsmal>
                    </Underskjema>
                </div>
            </Sporsmal>
            <Sporsmal
                tekster={getFaktumSporsmalTekst(intl, FAKTUM_KEY_ANTALL)}
                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
            >
                <InputEnhanced
                    id={FAKTUM_KEY_ANTALL}
                    type="tel"
                    maxLength={2}
                    pattern="\\d*"
                    bredde={"XS"}
                    className="skjemaelement__enLinje185bredde"
                    verdi={antallPersoner}
                    onChange={(verdi: string) => onChangeAntall(verdi)}
                    onBlur={() => onBlurAntall()}
                    getName={() => FAKTUM_KEY_ANTALL}
                    faktumKey={FAKTUM_KEY_ANTALL}
                    required={false}
                />
            </Sporsmal>
        </div>
    );
};

export default BosituasjonView;
