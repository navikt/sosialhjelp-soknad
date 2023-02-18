import * as React from "react";
import {TelefonData} from "./telefon/Telefon";
import {AdresseData} from "./adresse/Adresse";
import Sporsmal from "../../../nav-soknad/components/sporsmal/Sporsmal";
import {BasisPersonaliaData} from "./BasisPersonalia";
import {useTranslation} from "react-i18next";
import Kontonr from "./Kontonr";
import {SkjemaSteg} from "../../../nav-soknad/components/SkjemaSteg/ny/SkjemaSteg";
import {useHentAdresser} from "../../../generated/adresse-ressurs/adresse-ressurs";
import {useBehandlingsId} from "../../../nav-soknad/hooks/useBehandlingsId";
import {useEffect, useState} from "react";
import {FieldErrorsImpl} from "react-hook-form";
import {NavEnhetFrontend} from "../../../generated/model";
import {erAktiv} from "../../../nav-soknad/containers/navEnhetStatus";

const Personopplysninger = () => {
    const {t} = useTranslation("skjema");
    const {data: adresser} = useHentAdresser(useBehandlingsId());
    const [error, setError] = useState<string | null>(null);
    const onRequestNavigation = () =>
        new Promise<void>((resolve, reject) => {
            if (adresser?.navEnhet === null) {
                setError("soknadsmottaker.feilmelding");
                reject();
            } else if (!erAktiv(adresser?.navEnhet)) {
                // FIXME: Egen feilmelding for inaktive NAV-kontorer
                setError("soknadsmottaker.feilmelding");
                reject();
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
                <Sporsmal
                    id={"soknadsmottaker"}
                    sporsmal={t("kontakt.system.personalia.sporsmal")}
                    infotekst={t("kontakt.system.personalia.infotekst.tekst")}
                >
                    <BasisPersonaliaData />
                </Sporsmal>
                <Sporsmal sporsmal={t(`soknadsmottaker.sporsmal`)} hjelpetekst={t("soknadsmottaker.hjelpetekst.tekst")}>
                    <AdresseData />
                </Sporsmal>
                <Sporsmal sporsmal={t("kontakt.telefon.sporsmal")} infotekst={t("kontakt.telefon.infotekst.tekst")}>
                    <TelefonData />
                </Sporsmal>
                <Kontonr />
                <SkjemaSteg.Buttons />
            </SkjemaSteg.Content>
        </SkjemaSteg.Container>
    );
};

export default Personopplysninger;
