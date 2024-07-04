import * as React from "react";
import {useEffect, useState} from "react";
import {NavEnhet} from "./NavEnhet";
import {useAlgebraic} from "../../../lib/hooks/common/useAlgebraic";
import {useBehandlingsId} from "../../../lib/hooks/common/useBehandlingsId";
import {AdresseVisning} from "./AdresseVisning";
import {
    getHentAdresserQueryKey,
    updateAdresse,
    useHentAdresser,
} from "../../../generated/adresse-ressurs/adresse-ressurs";
import {BodyLong, Heading, Radio} from "@navikt/ds-react";
import {formaterSoknadsadresse} from "./AdresseUtils";
import {AdresseSok} from "./AdresseSok";
import {AdresseFrontend, AdresserFrontend, AdresserFrontendValg} from "../../../generated/model";
import cx from "classnames";
import {useTranslation} from "react-i18next";
import {HorizontalRadioGroup} from "../../../lib/components/form/HorizontalRadioGroup";
import {useQueryClient} from "@tanstack/react-query";
import {logAmplitudeEvent} from "../../../lib/amplitude/Amplitude";
//import {useAmplitude} from "../../../lib/amplitude/useAmplitude";

export const AdresseData = () => {
    //const {logEvent} = useAmplitude();
    const queryClient = useQueryClient();
    const behandlingsId = useBehandlingsId();
    const {expectOK, data} = useAlgebraic(useHentAdresser(behandlingsId));
    const [uncommittedAdressevalg, setUncommittedAdressevalg] = useState<AdresserFrontendValg | null>(null);
    const {t} = useTranslation();

    useEffect(() => {
        if (data) setUncommittedAdressevalg(data.valg ?? null);
    }, [data]);

    const setAdresser = async (adresser: AdresserFrontend, valg: AdresserFrontendValg, soknad?: AdresseFrontend) => {
        const inputAdresser = {
            ...adresser,
            valg: soknad ? "soknad" : valg,
            soknad,
        };

        queryClient.setQueryData(getHentAdresserQueryKey(behandlingsId), {...inputAdresser, navEnhet: null});
        // TODO: Fiks PUT /adresser så den returnerer Adresser
        const navEnheter = (await updateAdresse(behandlingsId, {...inputAdresser})) as any;

        if (navEnheter?.soknad) {
            queryClient.setQueryData(getHentAdresserQueryKey(behandlingsId), {
                ...inputAdresser,
                navEnhet: navEnheter?.navEnhet,
            });
        } else {
            queryClient.setQueryData(getHentAdresserQueryKey(behandlingsId), {
                ...inputAdresser,
                navEnhet: navEnheter[0] ?? null,
            });
        }
    };

    return expectOK((adresser) => (
        <div className={"space-y-2"} id={"adressefelt"}>
            <Heading size={"small"} level={"3"}>
                {t("soknadsmottaker.sporsmal")}
            </Heading>
            <BodyLong spacing>{t("soknadsmottaker.hjelpetekst.tekst")}</BodyLong>
            <BodyLong spacing>{t("soknadsmottaker.hjelpetekst.ingress")}</BodyLong>
            <HorizontalRadioGroup
                legend={""}
                value={uncommittedAdressevalg}
                className={"!mb-4"}
                onChange={async (addresseValgt) => {
                    setUncommittedAdressevalg(addresseValgt);
                    if (addresseValgt !== "soknad") await setAdresser(adresser, addresseValgt);
                    await logAmplitudeEvent("adresseValg", {addresseValgt});
                }}
            >
                <Radio
                    value={"folkeregistrert"}
                    className={cx({hidden: !adresser.folkeregistrert})}
                    data-testid="addresse-valg"
                >
                    {t("kontakt.system.oppholdsadresse.folkeregistrertAdresse")}
                    <AdresseVisning adresse={adresser.folkeregistrert} />
                </Radio>
                <Radio value={"midlertidig"} className={cx({hidden: !adresser.midlertidig})}>
                    {t("kontakt.system.oppholdsadresse.midlertidigAdresse")}
                    <AdresseVisning adresse={adresser.midlertidig} />
                </Radio>
                <Radio value={"soknad"} className={"!mb-0"}>
                    {t("kontakt.system.oppholdsadresse.valg.soknad")}
                </Radio>
                {uncommittedAdressevalg === "soknad" && (
                    <AdresseSok
                        defaultValue={formaterSoknadsadresse(adresser.soknad?.gateadresse)}
                        onChange={async (soknad) => setAdresser(adresser, "soknad", soknad)}
                    />
                )}
            </HorizontalRadioGroup>
            <NavEnhet navEnhet={adresser.navEnhet} />
        </div>
    ));
};
