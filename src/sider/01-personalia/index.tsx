import * as React from "react";
import {useEffect, useState} from "react";
import {TelefonData} from "./Telefon";
import {AdresseData} from "./adresse/Adresse";
import {BasisPersonalia} from "./BasisPersonalia";
import Kontonr from "./Kontonr";
import {SkjemaHeadings, SkjemaSteg} from "../../lib/components/SkjemaSteg/SkjemaSteg.tsx";
import {FieldErrorsImpl} from "react-hook-form";
import {NavEnhetFrontend} from "../../generated/model";
import {erAktiv} from "../../lib/navEnhetStatus";
import {useHentAdresser} from "../../generated/adresse-ressurs/adresse-ressurs";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId.ts";
import {SkjemaStegErrorSummary} from "../../lib/components/SkjemaSteg/SkjemaStegErrorSummary.tsx";
import {SkjemaStegBlock} from "../../lib/components/SkjemaSteg/SkjemaStegBlock.tsx";
import {SkjemaStegTitle} from "../../lib/components/SkjemaSteg/SkjemaStegTitle.tsx";
import {useTranslation} from "react-i18next";
import {SkjemaStegButtons} from "../../lib/components/SkjemaSteg/SkjemaStegButtons.tsx";
import {scrollToTop} from "../../lib/utils";
import {useNavigate} from "react-router";
import {DigisosLanguageKey} from "../../lib/i18n.ts";
import {logAmplitudeSkjemaStegFullfort} from "../../lib/logAmplitudeSkjemaStegFullfort.ts";
import {useGetAdresser} from "../../generated/new/adresse-controller/adresse-controller.ts";
import {useIsNyDatamodell} from "../../generated/soknad-ressurs/soknad-ressurs.ts";

export const Personopplysninger = ({shortSpacing}: {shortSpacing?: boolean}) => {
    const [error, setError] = useState<DigisosLanguageKey | null>(null);
    const errors = !error ? undefined : ({adressefelt: {message: error}} as FieldErrorsImpl<NavEnhetFrontend>);
    const behandlingsId = useBehandlingsId();
    const {data: isNyModell} = useIsNyDatamodell(behandlingsId);
    const {data: {navEnhet: navEnhetOld} = {navEnhet: null}} = useHentAdresser(behandlingsId, {
        query: {enabled: isNyModell === false},
    });
    const {data: {navenhet: navEnhetNy} = {navenhet: null}} = useGetAdresser(behandlingsId, {
        query: {enabled: isNyModell === true},
    });
    const {t} = useTranslation("skjema");
    const navigate = useNavigate();

    const validate = () => {
        if ((!navEnhetNy && !navEnhetOld) || (!erAktiv(navEnhetOld) && !erAktiv(navEnhetNy))) {
            setError("validering.adresseMangler");
            scrollToTop();
            return false;
        }
        return true;
    };

    const onClickNext = async () => {
        if (!validate()) return;
        await logAmplitudeSkjemaStegFullfort(1);
        navigate(`../2`);
    };

    // Midlertidig hack til komponentene under kan behandles som react-hook-form-inputs
    useEffect(() => {
        if (erAktiv(navEnhetOld) || erAktiv(navEnhetNy)) setError(null);
    }, [navEnhetOld, navEnhetNy]);

    return (
        <SkjemaSteg>
            <SkjemaStegBlock className={shortSpacing ? "lg:space-y-12" : ""}>
                <SkjemaStegTitle
                    className={shortSpacing ? "lg:mb-12" : ""}
                    title={t(SkjemaHeadings[1].tittel)}
                    icon={SkjemaHeadings[1].ikon}
                />
                <SkjemaStegErrorSummary errors={errors} />
                <BasisPersonalia />
                <AdresseData />
                <TelefonData />
                <Kontonr />
                <SkjemaStegButtons onNext={onClickNext} />
            </SkjemaStegBlock>
        </SkjemaSteg>
    );
};

export default Personopplysninger;
