import * as React from "react";
import {FormattedMessage} from "react-intl";
import {useDispatch} from "react-redux";
import BehandlingAvPersonopplysningerModal from "./BehandlingAvPersonopplysningerModal";
import {visSamtykkeInfo} from "../../redux/soknad/soknadActions";
import {LinkButton} from "../../../nav-soknad/components/linkButton/LinkButton";
import {Accordion, BodyLong, Heading} from "@navikt/ds-react";
import styled from "styled-components";

const LeftAlignedButton = styled(LinkButton)`
    text-align: left;
`;

const Personopplysninger = () => {
    const dispatch = useDispatch();

    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header
                    style={{
                        padding: "1rem 5em",
                        borderTop: "2px solid rgba(0, 0, 0, 0.56)",
                    }}
                >
                    <FormattedMessage id="informasjon.tekster.personopplysninger.tittel" />
                </Accordion.Header>
                <Accordion.Content className={"!px-24 !py-12"}>
                    <Heading level="3" size="small" spacing>
                        <FormattedMessage id="informasjon.tekster.personopplysninger.innhenting.tittel" />
                    </Heading>
                    <BodyLong spacing>
                        <FormattedMessage id="informasjon.tekster.personopplysninger.innhenting.tekst" />
                    </BodyLong>

                    <Heading level="3" size="small" spacing>
                        <FormattedMessage id="informasjon.tekster.personopplysninger.fordusender.tittel" />
                    </Heading>
                    <BodyLong spacing>
                        <FormattedMessage id="informasjon.tekster.personopplysninger.fordusender.tekst" />
                    </BodyLong>
                    <Heading level="3" size="small" spacing>
                        <FormattedMessage id="informasjon.tekster.personopplysninger.ettersendt.tittel" />
                    </Heading>
                    <BodyLong spacing>
                        <FormattedMessage id="informasjon.tekster.personopplysninger.ettersendt.tekst" />
                    </BodyLong>

                    <Heading level="3" size="small" spacing>
                        <FormattedMessage id="informasjon.tekster.personopplysninger.rettigheter.tittel" />
                    </Heading>
                    <BodyLong spacing>
                        <FormattedMessage id="informasjon.tekster.personopplysninger.rettigheter.tekst" />
                    </BodyLong>
                    <LeftAlignedButton
                        className="navds-link"
                        onClick={() => {
                            dispatch(visSamtykkeInfo(true));
                        }}
                    >
                        <FormattedMessage id="informasjon.tekster.personopplysninger.rettigheter.lenke" />
                    </LeftAlignedButton>

                    <BodyLong>
                        <FormattedMessage id="informasjon.tekster.personopplysninger.sporsmal" />
                    </BodyLong>
                    <BehandlingAvPersonopplysningerModal />
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default Personopplysninger;
