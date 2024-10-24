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
import {useGetAdresser} from "../../../generated/new/adresse-controller/adresse-controller.ts";
import {useBehandlingsId} from "../../../lib/hooks/common/useBehandlingsId.ts";

export const AdresseData = () => {
    const {t} = useTranslation();
    const behandlingsid = useBehandlingsId();
    const {data} = useGetAdresser(behandlingsid);
    if (!data) {
        return null;
    }
    data.folkeregistrertAdresse

    const {
        isPending,
        valg,
        midlertidig,
        folkeregistrert,
        navEnhet,
        brukerdefinert,
        setAdresseValg,
        setBrukerdefinertAdresse,
    } = useAdresser();

    if (isPending) return null;

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
