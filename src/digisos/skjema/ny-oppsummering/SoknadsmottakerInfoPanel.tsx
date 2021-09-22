import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {State} from "../../redux/reducers";
import Veilederpanel from "nav-frontend-veilederpanel";
import Brevkonvolutt from "../../../nav-soknad/components/svg/Brevkonvolutt";
import {FormattedMessage} from "react-intl";
import {visSamtykkeInfo} from "../../redux/soknad/soknadActions";
import {LinkButton} from "../../../nav-soknad/components/linkButton/LinkButton";
import {BodyShort, Heading} from "@navikt/ds-react";

export const SoknadsmottakerInfoPanel = () => {
    const valgtSoknadsmottaker = useSelector((state: State) => state.soknad.valgtSoknadsmottaker);
    const dispatch = useDispatch();
    if (valgtSoknadsmottaker) {
        const valgtEnhetsNavn = `${valgtSoknadsmottaker.enhetsnavn}, ${valgtSoknadsmottaker.kommunenavn} kommune`;
        return (
            <Veilederpanel
                type="plakat"
                fargetema="advarsel"
                svg={<Brevkonvolutt visBakgrundsSirkel={false} />}
                kompakt
            >
                <Heading level="2" size="medium" spacing>
                    Søknaden din blir sendt til {valgtEnhetsNavn}
                </Heading>
                <BodyShort spacing>
                    Dette kontoret har ansvar for å behandle søknaden din, og {valgtEnhetsNavn} lagrer opplysningene fra
                    søknaden.
                </BodyShort>

                <LinkButton
                    type="button"
                    onClick={() => {
                        dispatch(visSamtykkeInfo(true));
                    }}
                >
                    <BodyShort spacing>
                        <FormattedMessage id="informasjon.tekster.personopplysninger.rettigheter.lenke" />
                    </BodyShort>
                </LinkButton>
            </Veilederpanel>
        );
    } else {
        return null;
    }
};
