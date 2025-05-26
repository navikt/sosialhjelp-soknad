import * as React from "react";
import {AdresseVisning} from "./AdresseVisning";
import {Alert, Loader, Radio} from "@navikt/ds-react";
import {formaterSoknadsadresse} from "./AdresseUtils";
import {AdresseSok} from "./AdresseSok";
import cx from "classnames";
import {useTranslation} from "react-i18next";
import {HorizontalRadioGroup} from "../../../lib/components/form/HorizontalRadioGroup";
import {AdresserDtoAdresseValg} from "../../../generated/new/model/adresserDtoAdresseValg.ts";
import {UseAdresserResult} from "./useAdresser.tsx";

export const AdresseData = ({
    folkeregistrert,
    midlertidig,
    brukerAdresse,
    adresseValg,
    isLoading,
    error,
    setAdresse,
    variables,
    setAdressevalg,
    isUpdatePending,
    showSpinner,
}: UseAdresserResult) => {
    const {t} = useTranslation();

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <Alert variant={"error"}>{t("personalia.adressefeil")}</Alert>;
    }

    return (
        <>
            {showSpinner && <Loader />}
            <HorizontalRadioGroup
                legend={"Addressevalg"}
                hideLegend
                value={isUpdatePending ? variables?.data.adresseValg : adresseValg}
                className={"mb-4!"}
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
                <Radio value={AdresserDtoAdresseValg.SOKNAD} className={"mb-0!"}>
                    {t("kontakt.system.oppholdsadresse.valg.soknad")}
                </Radio>
                {adresseValg === AdresserDtoAdresseValg.SOKNAD && (
                    <AdresseSok defaultValue={formaterSoknadsadresse(brukerAdresse)} onChange={setAdresse} />
                )}
            </HorizontalRadioGroup>
        </>
    );
};
