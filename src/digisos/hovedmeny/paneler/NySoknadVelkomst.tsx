import {useSelector} from "react-redux";
import {State} from "../../redux/reducers";
import VelkomstSnakkeboble from "../../../nav-soknad/components/snakkeboble/Snakkeboble";
import {BodyLong, Heading} from "@navikt/ds-react";
import {FormattedMessage} from "react-intl";
import * as React from "react";

export const NySoknadVelkomst = () => {
    const {fornavn} = useSelector((state: State) => state.soknad);

    return (
        <div className={"p-8 lg:py-12 lg:px-24"}>
            <VelkomstSnakkeboble fornavn={fornavn} />
            <Heading level="2" size="small" spacing>
                <FormattedMessage id="informasjon.start.undertittel" />
            </Heading>
            <BodyLong spacing>
                <FormattedMessage id="informasjon.start.tekst_del1" />
            </BodyLong>
            <BodyLong spacing>
                <FormattedMessage id="informasjon.start.tekst_del2" />
            </BodyLong>
            <BodyLong spacing>
                <FormattedMessage
                    id="informasjon.start.tekst_del3"
                    values={{
                        a: (msg) => (
                            // Disable target-blank-rule on internal urls
                            /* eslint-disable react/jsx-no-target-blank */
                            <a href="https://www.nav.no/okonomisk-sosialhjelp#soknad" target="_blank">
                                {msg}
                            </a>
                            /* eslint-enable react/jsx-no-target-blank */
                        ),
                    }}
                />
            </BodyLong>
            <Heading level="2" size="small" spacing>
                <FormattedMessage id="informasjon.svarpasoknad.undertittel" />
            </Heading>
            <BodyLong spacing>
                <FormattedMessage id="informasjon.svarpasoknad.tekst" />
            </BodyLong>
            <Heading level="2" size="small" spacing>
                <FormattedMessage id="informasjon.nodsituasjon.undertittel" />
            </Heading>
            <BodyLong spacing>
                <FormattedMessage
                    id="informasjon.nodsituasjon.tekst"
                    values={{
                        a: (msg) => (
                            // Disable target-blank-rule on internal urls
                            /* eslint-disable react/jsx-no-target-blank */
                            <a href="https://www.nav.no/sok-nav-kontor" target="_blank">
                                {msg}
                            </a>
                            /* eslint-enable react/jsx-no-target-blank */
                        ),
                    }}
                />
            </BodyLong>
        </div>
    );
};
