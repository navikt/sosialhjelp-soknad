import * as React from "react";
import {NavEnhet} from "./NavEnhet";
import {AdresseVisning} from "./AdresseVisning";
import {BodyLong, Heading, Radio} from "@navikt/ds-react";
import {formaterSoknadsadresse} from "./AdresseUtils";
import {AdresseSok} from "./AdresseSok";
import cx from "classnames";
import {useTranslation} from "react-i18next";
import {HorizontalRadioGroup} from "../../../lib/components/form/HorizontalRadioGroup";
import {useAdresser} from "./useAdresser.tsx";
import {Dispatch, SetStateAction} from "react";
import {NavEnhetFrontend} from "../../../generated/model/index.ts";

export const AdresseData = ({setNavEnhet}: {setNavEnhet: Dispatch<SetStateAction<NavEnhetFrontend | undefined>>}) => {
    const {t} = useTranslation();

    const {
        isPending,
        valg,
        midlertidig,
        folkeregistrert,
        navEnhet,
        brukerdefinert,
        setAdresseValg,
        setBrukerdefinertAdresse,
    } = useAdresser(setNavEnhet);

    if (isPending) return <div>loading...</div>;

    return (
        <div className={"space-y-2"} id={"adressefelt"}>
            <Heading size={"small"} level={"3"}>
                {t("soknadsmottaker.sporsmal")}
            </Heading>
            <BodyLong spacing>{t("soknadsmottaker.hjelpetekst.tekst")}</BodyLong>
            <BodyLong spacing>{t("soknadsmottaker.hjelpetekst.ingress")}</BodyLong>
            <HorizontalRadioGroup legend={""} value={valg} className={"!mb-4"} onChange={setAdresseValg}>
                <Radio value={"folkeregistrert"} className={cx({hidden: !folkeregistrert})} data-testid="addresse-valg">
                    {t("kontakt.system.oppholdsadresse.folkeregistrertAdresse")}
                    <AdresseVisning adresse={folkeregistrert} />
                </Radio>
                <Radio value={"midlertidig"} className={cx({hidden: !midlertidig})}>
                    {t("kontakt.system.oppholdsadresse.midlertidigAdresse")}
                    <AdresseVisning adresse={midlertidig} />
                </Radio>
                <Radio value={"soknad"} className={"!mb-0"}>
                    {t("kontakt.system.oppholdsadresse.valg.soknad")}
                </Radio>
                {valg === "soknad" && (
                    <AdresseSok
                        defaultValue={formaterSoknadsadresse(brukerdefinert?.gateadresse)}
                        onChange={setBrukerdefinertAdresse}
                    />
                )}
            </HorizontalRadioGroup>
            <NavEnhet navEnhet={navEnhet} />
        </div>
    );
};
