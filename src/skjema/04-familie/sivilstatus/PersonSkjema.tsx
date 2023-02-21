import * as React from "react";
import InputEnhanced from "../../../nav-soknad/faktum/InputEnhanced";
import {setPath, lagreSoknadsdata} from "../../../digisos/redux/soknadsdata/soknadsdataActions";
import {SoknadsSti, oppdaterSoknadsdataSti} from "../../../digisos/redux/soknadsdata/soknadsdataReducer";
import {erTall, fdato, maksLengde, minLengde} from "../../../nav-soknad/validering/valideringer";
import {konverterFraISODato, konverterTilISODato} from "./datoUtils";
import RadioEnhanced from "../../../nav-soknad/faktum/RadioEnhanced";
import Sporsmal, {LegendTittleStyle} from "../../../nav-soknad/components/sporsmal/Sporsmal";
import {Familie, Sivilstatus} from "./FamilieTypes";
import {useSelector, useDispatch} from "react-redux";
import {State} from "../../../digisos/redux/reducers";
import {clearValideringsfeil, setValideringsfeil} from "../../../digisos/redux/validering/valideringActions";
import {ValideringsFeilKode} from "../../../digisos/redux/validering/valideringActionTypes";
import {getFaktumSporsmalTekst} from "../../../nav-soknad/utils";
import {useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../../lib/hooks/useBehandlingsId";

const FAKTUM_KEY = "familie.sivilstatus.gift.ektefelle";
const FAKTUM_KEY_FNR = FAKTUM_KEY + ".fnr";
const FAKTUM_KEY_PERSONNUMMER = FAKTUM_KEY + ".pnr";

const PersonSkjema = () => {
    const behandlingsId = useBehandlingsId();
    const soknadsdata = useSelector((state: State) => state.soknadsdata);

    const dispatch = useDispatch();
    const {t} = useTranslation("skjema");

    const oppdaterTekstfelt = (sti: string, verdi: string | null) => {
        dispatch(clearValideringsfeil(FAKTUM_KEY_FNR));
        dispatch(clearValideringsfeil(FAKTUM_KEY_PERSONNUMMER));
        if (verdi && verdi.length === 0) {
            verdi = null;
        }
        const sivilstatus = soknadsdata.familie.sivilstatus;
        const ektefelle = sivilstatus.ektefelle;

        setPath(ektefelle, sti, verdi);
        dispatch(oppdaterSoknadsdataSti(SoknadsSti.SIVILSTATUS, sivilstatus));
    };

    const onBlur = () => {
        const sivilstatus = soknadsdata.familie.sivilstatus;
        const harFeil = valider(sivilstatus);
        if (!harFeil && behandlingsId) {
            lagreSoknadsdata(behandlingsId, SoknadsSti.SIVILSTATUS, sivilstatus, dispatch);
        }
    };

    function valider(sivilstatus: Sivilstatus) {
        const feilkodeFodselsdato = validerOgOppdaterFodselsdato(sivilstatus);
        const feilkodePersonnummer = validerOgOppdaterPersonnummer(sivilstatus);
        return feilkodeFodselsdato || feilkodePersonnummer;
    }

    function validerOgOppdaterPersonnummer(sivilstatus: Sivilstatus) {
        const personnummer: string | null = sivilstatus.ektefelle ? sivilstatus.ektefelle.personnummer : null;
        let feilkodePersonnummer = null;
        if (personnummer && personnummer !== "") {
            if (!minLengde(personnummer, 5)) {
                feilkodePersonnummer = ValideringsFeilKode.MIN_LENGDE;
            }
            if (!feilkodePersonnummer && !maksLengde(personnummer, 5)) {
                feilkodePersonnummer = ValideringsFeilKode.MAX_LENGDE;
            }
            if (!feilkodePersonnummer && !erTall(personnummer, true)) {
                feilkodePersonnummer = ValideringsFeilKode.ER_TALL;
            }

            feilkodePersonnummer
                ? dispatch(setValideringsfeil(feilkodePersonnummer, FAKTUM_KEY_PERSONNUMMER))
                : dispatch(clearValideringsfeil(FAKTUM_KEY_PERSONNUMMER));
        } else {
            dispatch(clearValideringsfeil(FAKTUM_KEY_PERSONNUMMER));
        }
        return feilkodePersonnummer;
    }

    function validerOgOppdaterFodselsdato(sivilstatus: Sivilstatus) {
        let feilkodeFodselsdato = null;
        let fodselsdato: string | null = sivilstatus.ektefelle ? sivilstatus.ektefelle.fodselsdato : null;

        if (sivilstatus.ektefelle && sivilstatus.ektefelle.fodselsdato === "") {
            sivilstatus.ektefelle.fodselsdato = null;
        }
        if (sivilstatus.ektefelle && sivilstatus.ektefelle.personnummer === "") {
            sivilstatus.ektefelle.personnummer = null;
        }
        if (fodselsdato && fodselsdato !== "") {
            fodselsdato = konverterFraISODato(fodselsdato);
            feilkodeFodselsdato = fdato(fodselsdato);
            feilkodeFodselsdato
                ? dispatch(setValideringsfeil(feilkodeFodselsdato, FAKTUM_KEY_FNR))
                : dispatch(clearValideringsfeil(FAKTUM_KEY_FNR));

            if (!feilkodeFodselsdato && sivilstatus.ektefelle && sivilstatus.ektefelle.fodselsdato) {
                sivilstatus.ektefelle.fodselsdato = konverterTilISODato(sivilstatus.ektefelle.fodselsdato);
            }
        } else {
            dispatch(clearValideringsfeil(FAKTUM_KEY_FNR));
        }
        return feilkodeFodselsdato;
    }

    const onClickBorSammen = (verdi: boolean) => {
        const sivilstatus = soknadsdata.familie.sivilstatus;
        sivilstatus.borSammenMed = verdi;
        dispatch(oppdaterSoknadsdataSti(SoknadsSti.SIVILSTATUS, sivilstatus));
        const harFeil = valider(sivilstatus);
        if (!harFeil && behandlingsId) {
            lagreSoknadsdata(behandlingsId, SoknadsSti.SIVILSTATUS, sivilstatus, dispatch);
        }
    };

    const ektefelle = soknadsdata.familie.sivilstatus.ektefelle;
    if (!ektefelle) {
        return <div className="personskjema" />;
    }
    const fodselsdato = ektefelle.fodselsdato ? konverterFraISODato(ektefelle.fodselsdato) : "";
    if (!ektefelle.personnummer) {
        ektefelle.personnummer = "";
    }
    const personnummer = ektefelle.personnummer || "";

    const familie: Familie = soknadsdata.familie;
    const borSammenMed = familie && familie.sivilstatus ? familie.sivilstatus.borSammenMed : null;

    return (
        <div className="personskjema">
            <InputEnhanced
                getName={() => FAKTUM_KEY + "_fornavn_input"}
                id={FAKTUM_KEY + "_fornavn_input"}
                maxLength={100}
                verdi={ektefelle.navn.fornavn}
                onChange={(verdi: string) => oppdaterTekstfelt("navn/fornavn", verdi)}
                onBlur={() => onBlur()}
                faktumKey="familie.sivilstatus.gift.ektefelle.fornavn"
                required={false}
            />

            <InputEnhanced
                getName={() => FAKTUM_KEY + "_mellomnavn_input"}
                id={FAKTUM_KEY + "_mellomnavn_input"}
                maxLength={100}
                verdi={ektefelle.navn.mellomnavn ? ektefelle.navn.mellomnavn : ""}
                onChange={(verdi: string) => oppdaterTekstfelt("navn/mellomnavn", verdi)}
                onBlur={() => onBlur()}
                faktumKey="familie.sivilstatus.gift.ektefelle.mellomnavn"
                required={false}
            />

            <InputEnhanced
                className="pb-4"
                getName={() => FAKTUM_KEY + "_etternavn_input"}
                id={FAKTUM_KEY + "_etternavn_input"}
                maxLength={100}
                verdi={ektefelle.navn.etternavn}
                onChange={(verdi: string) => oppdaterTekstfelt("navn/etternavn", verdi)}
                onBlur={() => onBlur()}
                faktumKey="familie.sivilstatus.gift.ektefelle.etternavn"
                required={false}
            />

            <InputEnhanced
                getName={() => FAKTUM_KEY_FNR}
                id={FAKTUM_KEY_FNR}
                maxLength={8}
                minLength={8}
                verdi={fodselsdato}
                onChange={(verdi: string) => oppdaterTekstfelt("fodselsdato", verdi)}
                bredde="S"
                onBlur={() => onBlur()}
                faktumKey="familie.sivilstatus.gift.ektefelle.fnr"
                required={false}
            />

            <InputEnhanced
                getName={() => FAKTUM_KEY_PERSONNUMMER}
                id={FAKTUM_KEY_PERSONNUMMER}
                maxLength={5}
                minLength={5}
                verdi={personnummer}
                onChange={(verdi: string) => oppdaterTekstfelt("personnummer", verdi)}
                bredde="S"
                onBlur={() => onBlur()}
                faktumKey="familie.sivilstatus.gift.ektefelle.pnr"
                required={false}
            />

            <Sporsmal
                tekster={getFaktumSporsmalTekst(t, "familie.sivilstatus.gift.ektefelle.borsammen")}
                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
            >
                <RadioEnhanced
                    id={"sivilstatus_gift_bor_sammen_radio_ja"}
                    faktumKey="familie.sivilstatus.gift.ektefelle.borsammen"
                    value="true"
                    checked={borSammenMed === true}
                    onChange={() => onClickBorSammen(true)}
                    name="borsammen"
                />
                <RadioEnhanced
                    id={"sivilstatus_gift_bor_sammen_radio_nei"}
                    faktumKey="familie.sivilstatus.gift.ektefelle.borsammen"
                    value="false"
                    checked={borSammenMed === false}
                    onChange={() => onClickBorSammen(false)}
                    name="borsammen"
                />
            </Sporsmal>
        </div>
    );
};

export default PersonSkjema;
