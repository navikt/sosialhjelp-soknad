import {FormattedMessage, useIntl} from "react-intl";
import * as React from "react";
import {useState} from "react";
import {getIntlText} from "../../../../nav-soknad/utils";
import Sporsmal from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import SoknadsmottakerInfo from "./SoknadsmottakerInfo";
import {useAlgebraic} from "../../../../lib/hooks/useAlgebraic";
import {useBehandlingsId} from "../../../../nav-soknad/hooks/useBehandlingsId";
import {AdresseVisning} from "./AdresseVisning";
import {updateAdresse, useHentAdresser} from "../../../../generated/adresse-ressurs/adresse-ressurs";
import {Radio, RadioGroup} from "@navikt/ds-react";
import styled from "styled-components";
import {formaterSoknadsadresse} from "./AdresseUtils";
import {AdresseSok} from "./AdresseSok";
import {AdresseFrontend, AdresserFrontend, AdresserFrontendValg} from "../../../../generated/model";
import cx from "classnames";
import {useErrorHandler} from "../../../../lib/hooks/useErrorHandler";

const HorizontalRadioGroup = styled(RadioGroup)`
    .navds-radio {
        width: 100%;
        border: 1px solid black;
        padding: 0 1rem;
        margin: 1rem 0 0 0;
        border-radius: 5px;
    }
`;

const AdresseView = () => {
    const behandlingsId = useBehandlingsId();
    const {request, refetch} = useAlgebraic(useHentAdresser(behandlingsId));
    const errorHandler = useErrorHandler();

    // Because PUTing type = "soknad" and soknad = null yields an error,
    // we use this to indicate whether we want to show the search box.
    const [showSearchAnyway, setShowSearchAnyway] = useState<boolean>(false);
    const intl = useIntl();

    const setAdresser = async (adresser: AdresserFrontend, valg: AdresserFrontendValg, soknad: AdresseFrontend) => {
        await updateAdresse(behandlingsId, {
            ...{...adresser, navEnhet: undefined},
            valg: soknad ? "soknad" : null,
            soknad,
        });
        await refetch();
    };

    return request.match({
        NotAsked: () => null,
        Loading: () => <TextPlaceholder lines={3} />,
        Done: (response) =>
            response.match({
                Error: errorHandler,
                Ok: (adresser) => (
                    <Sporsmal
                        id="soknadsmottaker"
                        noValidateOnBlur={true}
                        sporsmal={getIntlText(intl, `soknadsmottaker.sporsmal`)}
                        hjelpetekst={getIntlText(intl, `soknadsmottaker.hjelpetekst.tekst`)}
                    >
                        <div className={"mb-4"}>
                            <HorizontalRadioGroup
                                legend={getIntlText(intl, `soknadsmottaker.infotekst.tekst`)}
                                value={!showSearchAnyway ? adresser.valg : "soknad"}
                                onChange={async (valg) => {
                                    if (valg === "soknad") {
                                        setShowSearchAnyway(true);
                                    } else {
                                        setShowSearchAnyway(false);
                                        await setAdresser(adresser, valg, null);
                                    }
                                }}
                            >
                                <Radio value={"folkeregistrert"}>
                                    <FormattedMessage id="kontakt.system.oppholdsadresse.folkeregistrertAdresse" />
                                    <AdresseVisning valg={"folkeregistrert"} />
                                </Radio>
                                <Radio value={"midlertidig"} className={cx({hidden: !adresser.midlertidig})}>
                                    <FormattedMessage id="kontakt.system.oppholdsadresse.midlertidigAdresse" />
                                    <AdresseVisning valg={"midlertidig"} />
                                </Radio>
                                <Radio value={"soknad"}>
                                    <FormattedMessage id="kontakt.system.oppholdsadresse.valg.soknad" />
                                </Radio>
                                {(adresser.valg === "soknad" || showSearchAnyway) && (
                                    <AdresseSok
                                        defaultValue={formaterSoknadsadresse(adresser.soknad?.gateadresse)}
                                        onChange={async (soknad) => setAdresser(adresser, "soknad", soknad)}
                                    />
                                )}
                            </HorizontalRadioGroup>
                        </div>
                        <SoknadsmottakerInfo navEnhet={adresser.navEnhet} />
                    </Sporsmal>
                ),
            }),
    });
};

export {AdresseView};

export default AdresseView;
