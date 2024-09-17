import * as React from "react";
import {useEffect, useState} from "react";
import {TelefonData} from "./Telefon";
import {AdresseData} from "./adresse/Adresse";
import {BasisPersonalia} from "./BasisPersonalia";
import {Kontonr} from "./Kontonr";
import {DigisosValidationError, SkjemaSteg} from "../../lib/components/SkjemaSteg/ny/SkjemaSteg";
import {FieldErrorsImpl} from "react-hook-form";
import {NavEnhetFrontend} from "../../generated/model";
import {erAktiv} from "../../lib/navEnhetStatus";
import {useHentAdresser} from "../../generated/adresse-ressurs/adresse-ressurs";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId.ts";
import {SkjemaStegButtons} from "../../lib/components/SkjemaSteg/ny/SkjemaStegButtons.tsx";
import {SkjemaStegErrorSummary} from "../../lib/components/SkjemaSteg/ny/SkjemaStegErrorSummary.tsx";
import {SkjemaContent} from "../../lib/components/SkjemaSteg/ny/SkjemaContent.tsx";
import {SkjemaStegTitle} from "../../lib/components/SkjemaSteg/ny/SkjemaStegTitle.tsx";

interface Props {
    shortSpacing?: boolean;
    includeNextArrow?: boolean;
}

export const Personopplysninger = ({shortSpacing, includeNextArrow}: Props) => {
    const [error, setError] = useState<string | null>(null);
    const {data: {navEnhet} = {navEnhet: null}} = useHentAdresser(useBehandlingsId());

    const onRequestNavigation = () =>
        new Promise<void>((resolve, reject) => {
            if (!navEnhet) {
                setError("validering.adresseMangler");
                reject(new DigisosValidationError("NAV-enhet ikke satt"));
            } else if (!erAktiv(navEnhet)) {
                // FIXME: Egen feilmelding for inaktive NAV-kontorer
                setError("validering.adresseMangler");
                reject("NAV-enhet inaktiv");
            } else {
                setError(null);
                resolve();
            }
        });

    // Midlertidig hack til komponentene under kan behandles som react-hook-form-inputs
    useEffect(() => {
        if (erAktiv(navEnhet)) setError(null);
    }, [navEnhet]);

    return (
        <SkjemaSteg skipStepper page={1} onRequestNavigation={onRequestNavigation}>
            <SkjemaContent className={shortSpacing ? "lg:space-y-12" : ""}>
                <SkjemaStegTitle className={shortSpacing ? "lg:mb-12" : ""} />
                {error && (
                    <SkjemaStegErrorSummary
                        errors={{adressefelt: {message: error}} as FieldErrorsImpl<NavEnhetFrontend>}
                    />
                )}
                <BasisPersonalia />
                <AdresseData />
                <TelefonData />
                <Kontonr />
                <SkjemaStegButtons includeNextArrow={includeNextArrow} />
            </SkjemaContent>
        </SkjemaSteg>
    );
};

export default Personopplysninger;
