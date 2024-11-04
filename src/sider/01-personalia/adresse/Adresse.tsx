import * as React from "react";
import {NavEnhet} from "./NavEnhet";
import {AdresseVisning} from "./AdresseVisning";
import {BodyLong, Heading, Radio} from "@navikt/ds-react";
import {formaterSoknadsadresse} from "./AdresseUtils";
import {AdresseSok} from "./AdresseSok";
import cx from "classnames";
import {useTranslation} from "react-i18next";
import {HorizontalRadioGroup} from "../../../lib/components/form/HorizontalRadioGroup";
import {useAdresserOld} from "./useAdresserOld.tsx";
import type {AdresserInputAdresseValg, VegAdresse} from "../../../generated/new/model";
import {AdresserFrontendValg, GateadresseFrontend} from "../../../generated/model";
import {useIsNyDatamodell} from "../../../generated/soknad-ressurs/soknad-ressurs.ts";
import useAdresserNew from "./useAdresserNew.tsx";
import {useBehandlingsId} from "../../../lib/hooks/common/useBehandlingsId.ts";
import {TextPlaceholder} from "../../../lib/components/animasjoner/TextPlaceholder.tsx";

export const AdresseData = () => {
    const {t} = useTranslation();
    const behandlingsId = useBehandlingsId();
    const {data: isNyModell, isPending} = useIsNyDatamodell(behandlingsId);
    const oldAdresser = useAdresserOld(isNyModell === false);
    const newAdresser = useAdresserNew(isNyModell === true);

    if (isPending || oldAdresser?.isPending || newAdresser?.query?.isPending) return <TextPlaceholder />;

    const folkeregistrert = oldAdresser?.folkeregistrert ?? newAdresser?.query?.data?.folkeregistrertAdresse;
    const midlertidig = oldAdresser?.midlertidig ?? newAdresser?.query?.data?.midlertidigAdresse;
    const brukerdefinert = oldAdresser?.brukerdefinert ?? newAdresser?.query?.data?.brukerAdresse;
    const valg = oldAdresser?.valg ?? newAdresser?.query?.data?.adresseValg?.toLowerCase();
    const navEnhet = oldAdresser?.navEnhet ?? newAdresser?.query?.data?.navenhet;
    return (
        <div className={"space-y-2"} id={"adressefelt"}>
            <Heading size={"small"} level={"3"}>
                {t("soknadsmottaker.sporsmal")}
            </Heading>
            <BodyLong spacing>{t("soknadsmottaker.hjelpetekst.tekst")}</BodyLong>
            <BodyLong spacing>{t("soknadsmottaker.hjelpetekst.ingress")}</BodyLong>
            <HorizontalRadioGroup
                legend={""}
                value={oldAdresser?.valg ?? newAdresser?.query.data?.adresseValg?.toLowerCase()}
                className={"!mb-4"}
                onChange={(value: string) => {
                    if (oldAdresser) {
                        oldAdresser.setAdresseValg?.(value as AdresserFrontendValg);
                    }
                    if (newAdresser) {
                        newAdresser.setAdresseValg(value.toUpperCase() as AdresserInputAdresseValg);
                    }
                }}
            >
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
                        defaultValue={formaterSoknadsadresse(brukerdefinert as VegAdresse | GateadresseFrontend)}
                        onChange={(adresse) => {
                            if (oldAdresser) {
                                oldAdresser.setBrukerdefinertAdresse?.(adresse);
                            }
                            if (newAdresser) {
                                const gateadresse = adresse?.gateadresse;
                                if (gateadresse) {
                                    newAdresser.setBrukerdefinertAdresse({
                                        ...gateadresse,
                                        adresselinjer: gateadresse.adresselinjer ?? [],
                                        landkode: gateadresse.landkode ?? "",
                                        type: "VegAdresse",
                                    });
                                }
                            }
                        }}
                    />
                )}
            </HorizontalRadioGroup>
            <NavEnhet
                navEnhet={navEnhet}
                isPending={oldAdresser?.isPending ?? newAdresser?.query.isPending}
                isFetching={newAdresser?.query.isFetching}
            />
        </div>
    );
};
