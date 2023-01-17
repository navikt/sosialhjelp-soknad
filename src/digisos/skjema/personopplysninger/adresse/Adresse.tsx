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
import {oppdaterSoknadsdataSti, SoknadsSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import {useDispatch} from "react-redux";
import {Adresser, NavEnhet} from "./AdresseTypes";
import {clearValideringsfeil} from "../../../redux/validering/valideringActions";

const HorizontalRadioGroup = styled(RadioGroup)`
    .navds-radio {
        width: 100%;
        border: 1px solid black;
        padding: 0 1rem;
        margin: 1rem 0 0 0;
        border-radius: 5px;
    }

    margin-bottom: 1rem !important;
`;

const AdresseView = () => {
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
    const dispatch = useDispatch();

    const [uncommittedAdressevalg, setUncommittedAdressevalg] = useState<AdresserFrontendValg | null>(null);
    const intl = useIntl();

    const setAdresser = async (adresser: AdresserFrontend, valg: AdresserFrontendValg, soknad?: AdresseFrontend) => {
        const inputAdresser = {
            ...{...adresser, navEnhet: undefined},
            valg: soknad ? "soknad" : valg,
            soknad,
        };
        const navEnheter = (await updateAdresse(behandlingsId, inputAdresser)) as unknown as NavEnhet[];
        dispatch(oppdaterSoknadsdataSti(SoknadsSti.VALGT_NAV_ENHET, navEnheter[0] ?? null));
        dispatch(oppdaterSoknadsdataSti(SoknadsSti.NAV_ENHETER, navEnheter));
        dispatch(oppdaterSoknadsdataSti(SoknadsSti.ADRESSER, inputAdresser as unknown as Adresser));
        dispatch(clearValideringsfeil("soknadsmottaker"));
        await refetch();
    };

    return request.match({
        NotAsked: () => null,
        Loading: () => <TextPlaceholder lines={3} />,
        Done: (response) => {
            return response.match({
                Error: errorHandler,
                Ok: (adresser) => (
                    <Sporsmal
                        id="soknadsmottaker"
                        noValidateOnBlur={true}
                        sporsmal={getIntlText(intl, `soknadsmottaker.sporsmal`)}
                        hjelpetekst={getIntlText(intl, `soknadsmottaker.hjelpetekst.tekst`)}
                    >
                        <HorizontalRadioGroup
                            legend={getIntlText(intl, `soknadsmottaker.infotekst.tekst`)}
                            value={uncommittedAdressevalg}
                            onChange={async (valg) => {
                                setUncommittedAdressevalg(valg);
                                if (valg !== "soknad") await setAdresser(adresser, valg);
                            }}
                        >
                            <Radio value={"folkeregistrert"}>
                                <FormattedMessage id="kontakt.system.oppholdsadresse.folkeregistrertAdresse" />
                                <AdresseVisning adresse={adresser.folkeregistrert} />
                            </Radio>
                            <Radio value={"midlertidig"} className={cx({hidden: !adresser.midlertidig})}>
                                <FormattedMessage id="kontakt.system.oppholdsadresse.midlertidigAdresse" />
                                <AdresseVisning adresse={adresser.midlertidig} />
                            </Radio>
                            <Radio value={"soknad"}>
                                <FormattedMessage id="kontakt.system.oppholdsadresse.valg.soknad" />
                            </Radio>
                            {uncommittedAdressevalg === "soknad" && (
                                <AdresseSok
                                    defaultValue={formaterSoknadsadresse(adresser.soknad?.gateadresse)}
                                    onChange={async (soknad) => setAdresser(adresser, "soknad", soknad)}
                                />
                            )}
                        </HorizontalRadioGroup>
                        <SoknadsmottakerInfo navEnhet={adresser.navEnhet} />
                    </Sporsmal>
                ),
            });
        },
    });
};

export {AdresseView};

export default AdresseView;
