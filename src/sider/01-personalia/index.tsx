import * as React from "react";
import {useEffect, useState} from "react";
import {AdresseData} from "./adresse/Adresse";
import {BasisPersonalia} from "./BasisPersonalia";
import {Kontonr} from "./konto/Kontonr.tsx";
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
import {Heading} from "@navikt/ds-react";
import {PersondataTelefon} from "./PersondataTelefon.tsx";

export const Personopplysninger = ({shortSpacing}: {shortSpacing?: boolean}) => {
    const [error, setError] = useState<DigisosLanguageKey | null>(null);
    const errors = !error ? undefined : ({adressefelt: {message: error}} as FieldErrorsImpl<NavEnhetDto>);
    const soknadId = useSoknadId();
    const {navenhet} = useAdresser();
    const mutating = useIsMutating({mutationKey: mutationKey(soknadId)});
    const isMutating = mutating > 0;
    const {t} = useTranslation("skjema");
    const navigate = useNavigate();

    const validate = () => {
        if (!navenhet || !erAktiv(navenhet)) {
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
        if (erAktiv(navenhet)) setError(null);
    }, [navenhet]);

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
                <section aria-labelledby={"telefon-heading"} className={"space-y-2"}>
                    <Heading id={"telefon-heading"} size={"small"} level={"3"}>
                        {t("kontakt.telefon.sporsmal")}
                    </Heading>
                    <PersondataTelefon />
                </section>

                <section aria-labelledby={"kontonummer-heading"} className={"space-y-2"}>
                    <Heading id={"kontonummer-heading"} size={"small"} level={"3"}>
                        {t("kontakt.kontonummer.sporsmal")}
                    </Heading>
                    <Kontonr />
                </section>
                <SkjemaStegButtons onNext={onClickNext} isNextPending={isMutating} />
            </SkjemaStegBlock>
        </SkjemaSteg>
    );
};

export default Personopplysninger;
