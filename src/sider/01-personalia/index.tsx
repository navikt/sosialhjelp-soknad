import * as React from "react";
import {TelefonData} from "./Telefon";
import {AdresseData} from "./adresse/Adresse";
import {BasisPersonalia} from "./BasisPersonalia";
import {Kontonr} from "./Kontonr";
import {DigisosValidationError, SkjemaSteg} from "../../lib/components/SkjemaSteg/ny/SkjemaSteg";
import {useHentAdresser} from "../../generated/client/adresse-ressurs/adresse-ressurs";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {useEffect, useState} from "react";
import {FieldErrorsImpl} from "react-hook-form";
import {NavEnhetFrontend} from "../../generated/client/model";
import {erAktiv} from "../../lib/navEnhetStatus";

interface Props {
    shortSpacing?: boolean;
    includeNextArrow?: boolean;
}

export const Personopplysninger = ({shortSpacing, includeNextArrow}: Props) => {
    const behandlingsId = useBehandlingsId();
    const {data: adresser} = useHentAdresser(behandlingsId);
    const [error, setError] = useState<string | null>(null);
    const onRequestNavigation = () =>
        new Promise<void>((resolve, reject) => {
            if (adresser?.navEnhet === null) {
                setError("validering.soknadsmottaker.feilmelding");
                reject(new DigisosValidationError("NAV-enhet ikke satt"));
            } else if (!erAktiv(adresser?.navEnhet)) {
                // FIXME: Egen feilmelding for inaktive NAV-kontorer
                setError("validering.soknadsmottaker.feilmelding");
                reject("NAV-enhet inaktiv");
            } else {
                setError(null);
                resolve();
            }
        });

    // Midlertidig hack til komponentene under kan behandles som react-hook-form-inputs
    useEffect(() => {
        if (erAktiv(adresser?.navEnhet)) setError(null);
    }, [adresser]);

    return (
        <SkjemaSteg.Container page={1} onRequestNavigation={onRequestNavigation}>
            <SkjemaSteg.Content className={shortSpacing ? "lg:space-y-12" : ""}>
                <SkjemaSteg.Title className={shortSpacing ? "lg:mb-12" : ""} />
                {error && (
                    <SkjemaSteg.ErrorSummary
                        errors={{adressefelt: {message: error}} as FieldErrorsImpl<NavEnhetFrontend>}
                    />
                )}
                <BasisPersonalia />
                <AdresseData />
                <TelefonData />
                <Kontonr />
                <SkjemaSteg.Buttons includeNextArrow={includeNextArrow} />
            </SkjemaSteg.Content>
        </SkjemaSteg.Container>
    );
};

export default Personopplysninger;
