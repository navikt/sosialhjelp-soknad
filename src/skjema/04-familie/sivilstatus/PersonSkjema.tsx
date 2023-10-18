import * as React from "react";
import {setPath} from "../../../digisos/redux/soknadsdata/soknadsdataActions";
import {SoknadsSti} from "../../../digisos/redux/soknadsdata/soknadsdataReducer";
import {erTall, fdato, maksLengde, minLengde} from "../../../nav-soknad/validering/valideringer";
import {konverterFraISODato, konverterTilISODato} from "./datoUtils";
import {Familie, Sivilstatus} from "./FamilieTypes";
import {useDispatch} from "react-redux";
import {clearValideringsfeil, setValideringsfeil} from "../../../digisos/redux/validering/valideringActions";
import {ValideringsFeilKode} from "../../../digisos/redux/validering/valideringActionTypes";
import {useTranslation} from "react-i18next";
import {useSoknadsdata} from "../../../digisos/redux/soknadsdata/useSoknadsdata";
import {Heading, Radio, RadioGroup, TextField} from "@navikt/ds-react";

const FAKTUM_KEY = "familie.sivilstatus.gift.ektefelle";
const FAKTUM_KEY_FNR = FAKTUM_KEY + ".fnr";
const FAKTUM_KEY_PERSONNUMMER = FAKTUM_KEY + ".pnr";

const PersonSkjema = () => {
    const {soknadsdata, lagre, oppdater} = useSoknadsdata(SoknadsSti.SIVILSTATUS);
    const sivilstatus = soknadsdata.familie.sivilstatus;
    const dispatch = useDispatch();
    const {t} = useTranslation("skjema");

    const oppdaterTekstfelt = (sti: string, verdi: string | null) => {
        dispatch(clearValideringsfeil(FAKTUM_KEY_FNR));
        dispatch(clearValideringsfeil(FAKTUM_KEY_PERSONNUMMER));
        if (verdi?.length === 0) verdi = null;
        const sivilstatus = soknadsdata.familie.sivilstatus;
        const ektefelle = sivilstatus.ektefelle;

        setPath(ektefelle, sti, verdi);
        oppdater(sivilstatus);
    };

    const onBlur = () => {
        if (valid(sivilstatus)) lagre(sivilstatus);
    };

    function valid(sivilstatus: Sivilstatus) {
        const feilkodeFodselsdato = validerOgOppdaterFodselsdato(sivilstatus);
        const feilkodePersonnummer = validerOgOppdaterPersonnummer(sivilstatus);
        return !(feilkodeFodselsdato || feilkodePersonnummer);
    }

    function validerOgOppdaterPersonnummer(sivilstatus: Sivilstatus) {
        const personnummer = sivilstatus.ektefelle?.personnummer ?? null;
        let feilkodePersonnummer = null;

        if (personnummer?.length) {
            if (!minLengde(personnummer, 5)) {
                feilkodePersonnummer = ValideringsFeilKode.MIN_LENGDE;
            } else if (!maksLengde(personnummer, 5)) {
                feilkodePersonnummer = ValideringsFeilKode.MAX_LENGDE;
            } else if (!erTall(personnummer, true)) {
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

        const {ektefelle} = sivilstatus;
        if (ektefelle) {
            if (ektefelle.fodselsdato === "") ektefelle.fodselsdato = null;
            if (ektefelle.personnummer === "") ektefelle.personnummer = null;
        }

        if (fodselsdato?.length) {
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
        oppdater(sivilstatus);
        if (valid(sivilstatus)) lagre(sivilstatus);
    };

    const ektefelle = soknadsdata.familie.sivilstatus.ektefelle;
    if (!ektefelle) {
        return <div className="personskjema" />;
    }
    const fodselsdato = ektefelle.fodselsdato ? konverterFraISODato(ektefelle.fodselsdato) : "";
    if (!ektefelle.personnummer) ektefelle.personnummer = "";
    const personnummer = ektefelle.personnummer;

    const familie: Familie = soknadsdata.familie;
    const borSammenMed = familie && familie.sivilstatus ? familie.sivilstatus.borSammenMed : null;

    return (
        <div className="space-y-4">
            <Heading size={"small"} level={"3"} spacing>
                {t("familie.sivilstatus.gift.ektefelle.sporsmal")}
            </Heading>
            <TextField
                maxLength={100}
                value={ektefelle.navn.fornavn}
                onChange={({target: {value}}) => oppdaterTekstfelt("navn/fornavn", value)}
                onBlur={() => onBlur()}
                label={t("familie.sivilstatus.gift.ektefelle.fornavn.label")}
                required={false}
            />
            <TextField
                maxLength={100}
                value={ektefelle.navn.mellomnavn ? ektefelle.navn.mellomnavn : ""}
                onChange={({target: {value}}) => oppdaterTekstfelt("navn/mellomnavn", value)}
                onBlur={() => onBlur()}
                label={t("familie.sivilstatus.gift.ektefelle.mellomnavn.label")}
                required={false}
            />
            <TextField
                className="pb-4"
                maxLength={100}
                value={ektefelle.navn.etternavn}
                onChange={({target: {value}}) => oppdaterTekstfelt("navn/etternavn", value)}
                onBlur={() => onBlur()}
                label={t("familie.sivilstatus.gift.ektefelle.etternavn.label")}
                required={false}
            />
            <TextField
                maxLength={8}
                minLength={8}
                value={fodselsdato}
                onChange={({target: {value}}) => oppdaterTekstfelt("fodselsdato", value)}
                style={{width: "140px"}}
                onBlur={() => onBlur()}
                label={t("familie.sivilstatus.gift.ektefelle.fnr.label")}
                required={false}
            />
            <TextField
                maxLength={5}
                minLength={5}
                value={personnummer}
                onChange={({target: {value}}) => oppdaterTekstfelt("personnummer", value)}
                style={{width: "140px"}}
                onBlur={() => onBlur()}
                label={t("familie.sivilstatus.gift.ektefelle.pnr.label")}
                required={false}
            />

            <RadioGroup
                legend={t("familie.sivilstatus.gift.ektefelle.borsammen.sporsmal")}
                onChange={(value) => onClickBorSammen(value === "false")}
                value={borSammenMed?.toString()}
            >
                <Radio value="true">{t("familie.sivilstatus.gift.ektefelle.borsammen.true")}</Radio>
                <Radio value="false">{t("familie.sivilstatus.gift.ektefelle.borsammen.false")}</Radio>
            </RadioGroup>
        </div>
    );
};

export default PersonSkjema;
