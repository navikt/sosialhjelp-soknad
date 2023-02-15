import * as React from "react";
import {useState} from "react";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import SoknadsmottakerInfo from "./SoknadsmottakerInfo";
import {useAlgebraic} from "../../../../lib/hooks/useAlgebraic";
import {useBehandlingsId} from "../../../../nav-soknad/hooks/useBehandlingsId";
import {AdresseVisning} from "./AdresseVisning";
import {updateAdresse, useHentAdresser} from "../../../../generated/adresse-ressurs/adresse-ressurs";
import {Radio} from "@navikt/ds-react";
import {formaterSoknadsadresse} from "./AdresseUtils";
import {AdresseSok} from "./AdresseSok";
import {AdresseFrontend, AdresserFrontend, AdresserFrontendValg} from "../../../../generated/model";
import cx from "classnames";
import {useErrorHandler} from "../../../../lib/hooks/useErrorHandler";
import {useTranslation} from "react-i18next";
import {putNavEnhet} from "../../../../generated/nav-enhet-ressurs/nav-enhet-ressurs";
import {HorizontalRadioGroup} from "../../../../nav-soknad/components/form/HorizontalRadioGroup";

export const AdresseData = () => {
    const behandlingsId = useBehandlingsId();
    const {request, refetch} = useAlgebraic(
        useHentAdresser(behandlingsId, {
            query: {
                onSuccess: ({valg}) => {
                    setUncommittedAdressevalg(valg!);
                },
            },
        })
    );
    const errorHandler = useErrorHandler();

    const [uncommittedAdressevalg, setUncommittedAdressevalg] = useState<AdresserFrontendValg | null>(null);
    const {t} = useTranslation();

    const setAdresser = async (adresser: AdresserFrontend, valg: AdresserFrontendValg, soknad?: AdresseFrontend) => {
        const inputAdresser = {
            ...{...adresser, navEnhet: undefined},
            valg: soknad ? "soknad" : valg,
            soknad,
        };

        // TODO: Fiks PUT /adresser så den returnerer Adresser
        const navEnheter = await updateAdresse(behandlingsId, inputAdresser);

        // Velg den første NAV-enheten
        // TODO: Fiks PUT /adresser så navEnhet[0].valgt = true
        const navEnhet = {...navEnheter[0], valgt: true};
        await putNavEnhet(behandlingsId, navEnhet);

        await refetch();
    };

    return request.match({
        NotAsked: () => null,
        Loading: () => <TextPlaceholder lines={3} />,
        Done: (response) => {
            return response.match({
                Error: errorHandler,
                Ok: (adresser) => (
                    <>
                        <HorizontalRadioGroup
                            legend={t("soknadsmottaker.infotekst.tekst")}
                            value={uncommittedAdressevalg}
                            onChange={async (valg) => {
                                setUncommittedAdressevalg(valg);
                                if (valg !== "soknad") await setAdresser(adresser, valg);
                            }}
                        >
                            <Radio value={"folkeregistrert"} className={cx({hidden: !adresser.folkeregistrert})}>
                                {t("kontakt.system.oppholdsadresse.folkeregistrertAdresse")}
                                <AdresseVisning adresse={adresser.folkeregistrert} />
                            </Radio>
                            <Radio value={"midlertidig"} className={cx({hidden: !adresser.midlertidig})}>
                                {t("kontakt.system.oppholdsadresse.midlertidigAdresse")}
                                <AdresseVisning adresse={adresser.midlertidig} />
                            </Radio>
                            <Radio value={"soknad"}>{t("kontakt.system.oppholdsadresse.valg.soknad")}</Radio>
                            {uncommittedAdressevalg === "soknad" && (
                                <AdresseSok
                                    defaultValue={formaterSoknadsadresse(adresser.soknad?.gateadresse)}
                                    onChange={async (soknad) => setAdresser(adresser, "soknad", soknad)}
                                />
                            )}
                        </HorizontalRadioGroup>
                        <SoknadsmottakerInfo navEnhet={adresser.navEnhet} />
                    </>
                ),
            });
        },
    });
};
