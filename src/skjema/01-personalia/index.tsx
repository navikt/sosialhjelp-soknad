import * as React from "react";
import {TelefonData} from "./telefon/Telefon";
import {AdresseData} from "./adresse/Adresse";
import {BasisPersonalia} from "./BasisPersonalia";
import Kontonr from "./Kontonr";
import {DigisosValidationError, SkjemaSteg} from "../../nav-soknad/components/SkjemaSteg/ny/SkjemaSteg";
import {useHentAdresser} from "../../generated/adresse-ressurs/adresse-ressurs";
import {useBehandlingsId} from "../../lib/hooks/useBehandlingsId";
import {useEffect, useState} from "react";
import {FieldErrorsImpl} from "react-hook-form";
import {NavEnhetFrontend} from "../../generated/model";
import {erAktiv} from "../../nav-soknad/containers/navEnhetStatus";

const Personopplysninger = () => {
    const behandlingsId = useBehandlingsId();
    const {data: adresser} = useHentAdresser(behandlingsId);
    const [error, setError] = useState<string | null>(null);
    const onRequestNavigation = () =>
        new Promise<void>((resolve, reject) => {
            if (adresser?.navEnhet === null) {
                setError("soknadsmottaker.feilmelding");
                reject(new DigisosValidationError("NAV-enhet ikke satt"));
            } else if (!erAktiv(adresser?.navEnhet)) {
                // FIXME: Egen feilmelding for inaktive NAV-kontorer
                setError("soknadsmottaker.feilmelding");
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
            <SkjemaSteg.Content>
                <SkjemaSteg.Title />
                {error && (
                    <SkjemaSteg.ErrorSummary
                        errors={{soknadsmottaker: {message: error}} as FieldErrorsImpl<NavEnhetFrontend>}
                    />
                )}
                <BasisPersonalia />
                <AdresseData />
                <TelefonData />
                <Kontonr />
                <SkjemaSteg.Buttons />
            </SkjemaSteg.Content>
        </SkjemaSteg.Container>
    );
};

export default Personopplysninger;
