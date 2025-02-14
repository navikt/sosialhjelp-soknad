import * as React from "react";
import {NavEnhet} from "./NavEnhet";
import {AdresseVisning} from "./AdresseVisning";
import {Alert, BodyLong, Heading, Loader, Radio} from "@navikt/ds-react";
import {formaterSoknadsadresse} from "./AdresseUtils";
import {AdresseSok} from "./AdresseSok";
import cx from "classnames";
import {useTranslation} from "react-i18next";
import {HorizontalRadioGroup} from "../../../lib/components/form/HorizontalRadioGroup";
import {AdresserDtoAdresseValg} from "../../../generated/new/model/adresserDtoAdresseValg.ts";
import {useAdresser} from "./useAdresser.tsx";

export const AdresseData = () => {
    const {t} = useTranslation();

    const {
        folkeregistrert,
        midlertidig,
        brukerAdresse,
        adresseValg,
        navenhet,
        isLoading,
        error,
        setAdresse,
        variables,
        setAdressevalg,
        isUpdatePending,
        showSpinner,
    } = useAdresser();

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <Alert variant={"error"}>{t("personalia.adressefeil")}</Alert>;
    }

    return (
        <section aria-labelledby={"soknadsmottaker-label"} className={"space-y-2"} id={"adressefelt"}>
            <Heading id={"soknadsmottaker-label"} size={"small"} level={"3"} className={"flex gap-4"}>
                {t("soknadsmottaker.sporsmal")}
                {showSpinner && <Loader />}
            </Heading>
            <BodyLong spacing>{t("soknadsmottaker.hjelpetekst.tekst")}</BodyLong>
            <BodyLong spacing>{t("soknadsmottaker.hjelpetekst.ingress")}</BodyLong>
            <HorizontalRadioGroup
                legend={"Addressevalg"}
                hideLegend
                value={isUpdatePending ? variables?.data.adresseValg : adresseValg}
                className={"!mb-4"}
                onChange={setAdressevalg}
            >
                <Radio
                    value={AdresserDtoAdresseValg.FOLKEREGISTRERT}
                    className={cx({hidden: !folkeregistrert})}
                    data-testid="addresse-valg"
                >
                    {t("kontakt.system.oppholdsadresse.folkeregistrertAdresse")}
                    <AdresseVisning adresse={folkeregistrert} />
                </Radio>
                <Radio value={AdresserDtoAdresseValg.MIDLERTIDIG} className={cx({hidden: !midlertidig})}>
                    {t("kontakt.system.oppholdsadresse.midlertidigAdresse")}
                    <AdresseVisning adresse={midlertidig} />
                </Radio>
                <Radio value={AdresserDtoAdresseValg.SOKNAD} className={"!mb-0"}>
                    {t("kontakt.system.oppholdsadresse.valg.soknad")}
                </Radio>
                {adresseValg === AdresserDtoAdresseValg.SOKNAD && (
                    <AdresseSok defaultValue={formaterSoknadsadresse(brukerAdresse)} onChange={setAdresse} />
                )}
            </HorizontalRadioGroup>
            <NavEnhet navEnhet={navenhet} />
        </section>
    );
};
