import * as React from "react";
import {useEffect, useState} from "react";
import {TelefonData} from "./Telefon";
import {AdresseData} from "./adresse/Adresse";
import {BasisPersonalia} from "./BasisPersonalia";
import {Kontonr} from "./Kontonr";
import {SkjemaHeadings, SkjemaSteg} from "../../lib/components/SkjemaSteg/ny/SkjemaSteg";
import {FieldErrorsImpl} from "react-hook-form";
import {NavEnhetFrontend} from "../../generated/model";
import {erAktiv} from "../../lib/navEnhetStatus";
import {useHentAdresser} from "../../generated/adresse-ressurs/adresse-ressurs";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId.ts";
import {SkjemaStegErrorSummary} from "../../lib/components/SkjemaSteg/ny/SkjemaStegErrorSummary.tsx";
import {SkjemaContent} from "../../lib/components/SkjemaSteg/ny/SkjemaContent.tsx";
import {SkjemaStegTitle} from "../../lib/components/SkjemaSteg/ny/SkjemaStegTitle.tsx";
import {useTranslation} from "react-i18next";
import {SkjemaStegButtonsV2} from "../../lib/components/SkjemaSteg/ny/SkjemaStegButtonsV2.tsx";
import {scrollToTop} from "../../lib/utils";
import {useNavigate} from "react-router";
import {DigisosLanguageKey} from "../../lib/i18n.ts";
import {logAmplitudeSkjemaStegFullfort} from "./logAmplitudeSkjemaStegFullfort.tsx";

export const Personopplysninger = ({shortSpacing}: {shortSpacing?: boolean}) => {
    const [error, setError] = useState<DigisosLanguageKey | null>(null);
    const errors = !error ? undefined : ({adressefelt: {message: error}} as FieldErrorsImpl<NavEnhetFrontend>);
    const {data: {navEnhet} = {navEnhet: null}} = useHentAdresser(useBehandlingsId());
    const {t} = useTranslation("skjema");
    const navigate = useNavigate();

    const validate = () => {
        if (!navEnhet || !erAktiv(navEnhet)) {
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
        if (erAktiv(navEnhet)) setError(null);
    }, [navEnhet]);

    return (
        <SkjemaSteg page={1}>
            <SkjemaContent className={shortSpacing ? "lg:space-y-12" : ""}>
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
                <SkjemaStegButtonsV2 onNext={onClickNext} />
            </SkjemaContent>
        </SkjemaSteg>
    );
};

export default Personopplysninger;
