import * as React from "react";
import {useEffect, useState} from "react";
import {AdresseData} from "./adresse/Adresse";
import {BasisPersonalia} from "./BasisPersonalia";
import {Kontonummer} from "./konto/Kontonummer.tsx";
import {SkjemaHeadings, SkjemaSteg} from "../../lib/components/SkjemaSteg/SkjemaSteg.tsx";
import {FieldErrorsImpl} from "react-hook-form";
import {erAktiv} from "../../lib/navEnhetStatus";
import {SkjemaStegErrorSummary} from "../../lib/components/SkjemaSteg/SkjemaStegErrorSummary.tsx";
import {SkjemaStegBlock} from "../../lib/components/SkjemaSteg/SkjemaStegBlock.tsx";
import {SkjemaStegTitle} from "../../lib/components/SkjemaSteg/SkjemaStegTitle.tsx";
import {useTranslation} from "react-i18next";
import {SkjemaStegButtons} from "../../lib/components/SkjemaSteg/SkjemaStegButtons.tsx";
import {scrollToTop} from "../../lib/utils";
import {useNavigate} from "react-router";
import {DigisosLanguageKey} from "../../lib/i18n/common.ts";
import {logAmplitudeSkjemaStegFullfort} from "../../lib/logAmplitudeSkjemaStegFullfort.ts";
import {mutationKey, useAdresser} from "./adresse/useAdresser.tsx";
import {useIsMutating} from "@tanstack/react-query";
import {useSoknadId} from "../../lib/hooks/common/useSoknadId.ts";
import {NavEnhetDto} from "../../generated/new/model";
import {Telefon} from "./telefon/Telefon.tsx";
import {PersonopplysningerSection} from "./PersonopplysningerSection.tsx";
import {useKontonummer} from "./konto/useKontonummer.ts";
import {useTelefonnummer} from "./telefon/useTelefonnummer.ts";
import {BodyLong} from "@navikt/ds-react";
import {NavEnhet} from "./adresse/NavEnhet.tsx";
import {useGetBasisPersonalia} from "../../generated/new/basis-personalia-controller/basis-personalia-controller.ts";

export const Personopplysninger = ({shortSpacing}: {shortSpacing?: boolean}) => {
    const [error, setError] = useState<DigisosLanguageKey | null>(null);
    const errors = !error ? undefined : ({adressefelt: {message: error}} as FieldErrorsImpl<NavEnhetDto>);
    const soknadId = useSoknadId();
    const mutating = useIsMutating({mutationKey: mutationKey(soknadId)});
    const isMutating = mutating > 0;
    const {t} = useTranslation("skjema");
    const navigate = useNavigate();

    const basisPersonalia = useGetBasisPersonalia(soknadId);
    const adressedata = useAdresser();
    const telefonnummer = useTelefonnummer();
    const kontonummer = useKontonummer();

    const validate = () => {
        if (!adressedata.navEnhet || !erAktiv(adressedata.navEnhet)) {
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
        if (erAktiv(adressedata.navEnhet)) setError(null);
    }, [adressedata.navEnhet]);

    return (
        <SkjemaSteg>
            <SkjemaStegBlock className={shortSpacing ? "lg:space-y-12" : ""}>
                <SkjemaStegTitle
                    className={shortSpacing ? "lg:mb-12" : ""}
                    title={t(SkjemaHeadings[1].tittel)}
                    icon={SkjemaHeadings[1].ikon}
                />
                <SkjemaStegErrorSummary errors={errors} />
                <PersonopplysningerSection heading={t("kontakt.system.personalia.sporsmal")}>
                    <BasisPersonalia {...basisPersonalia} />
                </PersonopplysningerSection>
                <PersonopplysningerSection heading={t("soknadsmottaker.sporsmal")}>
                    <BodyLong spacing>{t("soknadsmottaker.hjelpetekst.tekst")}</BodyLong>
                    <BodyLong spacing>{t("soknadsmottaker.hjelpetekst.ingress")}</BodyLong>
                    <AdresseData {...adressedata} />
                    {adressedata.navEnhet && <NavEnhet navEnhet={adressedata.navEnhet} />}
                </PersonopplysningerSection>
                <PersonopplysningerSection heading={t("kontakt.telefon.sporsmal")}>
                    <Telefon {...telefonnummer} />
                </PersonopplysningerSection>
                <PersonopplysningerSection heading={t("kontakt.kontonummer.sporsmal")}>
                    <Kontonummer {...kontonummer} />
                </PersonopplysningerSection>
                <SkjemaStegButtons onNext={onClickNext} isNextPending={isMutating} />
            </SkjemaStegBlock>
        </SkjemaSteg>
    );
};

export default Personopplysninger;
