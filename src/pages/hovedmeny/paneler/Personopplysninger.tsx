import * as React from "react";
import {BehandlingAvPersonopplysningerModal} from "./BehandlingAvPersonopplysningerModal";
import {Accordion, BodyLong, Heading, Link} from "@navikt/ds-react";
import styled from "styled-components";
import {Trans, useTranslation} from "react-i18next";
import {useState} from "react";
import {LinkButton} from "../../../lib/components/LinkButton";

const LeftAlignedButton = styled(LinkButton)`
    text-align: left;
`;

export const Personopplysninger = () => {
    const {t} = useTranslation("skjema");
    const [visPersonopplysningerModal, setVisPersonopplysningerModal] = useState<boolean>(false);

    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header
                    style={{
                        padding: "1rem 5em",
                        borderTop: "2px solid rgba(0, 0, 0, 0.56)",
                    }}
                >
                    {t("informasjon.tekster.personopplysninger.tittel")}
                </Accordion.Header>
                <Accordion.Content className={"!px-24 !py-12"}>
                    <Heading level="3" size="small" spacing>
                        {t("informasjon.tekster.personopplysninger.innhenting.tittel")}
                    </Heading>
                    <BodyLong spacing>
                        <Trans
                            t={t}
                            i18nKey={"informasjon.tekster.personopplysninger.innhenting.tekst"}
                            components={{
                                a: <Link href="https://www.nav.no/">nav.no</Link>,
                            }}
                        />
                    </BodyLong>
                    <Heading level="3" size="small" spacing>
                        {t("informasjon.tekster.personopplysninger.fordusender.tittel")}
                    </Heading>
                    <BodyLong spacing>{t("informasjon.tekster.personopplysninger.fordusender.tekst")}</BodyLong>
                    <Heading level="3" size="small" spacing>
                        {t("informasjon.tekster.personopplysninger.ettersendt.tittel")}
                    </Heading>
                    <BodyLong spacing>{t("informasjon.tekster.personopplysninger.ettersendt.tekst")}</BodyLong>
                    <Heading level="3" size="small" spacing>
                        {t("informasjon.tekster.personopplysninger.rettigheter.tittel")}
                    </Heading>
                    <BodyLong spacing>{t("informasjon.tekster.personopplysninger.rettigheter.tekst")}</BodyLong>
                    <LeftAlignedButton className="navds-link" onClick={() => setVisPersonopplysningerModal(true)}>
                        {t("informasjon.tekster.personopplysninger.rettigheter.lenke")}
                    </LeftAlignedButton>
                    <BodyLong>{t("informasjon.tekster.personopplysninger.sporsmal")}</BodyLong>
                    <BehandlingAvPersonopplysningerModal
                        open={visPersonopplysningerModal}
                        onClose={() => setVisPersonopplysningerModal(false)}
                    />
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};
