"use client";
import {Attachment} from "@navikt/ds-icons";
import {BodyShort, ExpansionCard, Heading} from "@navikt/ds-react";
import React from "react";
import {Trans, useTranslation} from "react-i18next";
import {useGetSessionInfo} from "../../../generated/informasjon-ressurs/informasjon-ressurs";
import digisosConfig from "../../../lib/config";
import {HovedmenyCardHeader} from "./HovedmenyCardHeader.tsx";

export const EttersendDokuPanel = () => {
    const {data} = useGetSessionInfo();
    const {t} = useTranslation("skjema");

    if (!data?.numRecentlySent) return null;

    return (
        <ExpansionCard aria-label={t("applikasjon.dokumentasjon.tittel")}>
            <HovedmenyCardHeader icon={<Attachment className={"w-6 h-6"} />}>
                <Heading level={"2"} size={"small"}>
                    {t("applikasjon.dokumentasjon.tittel")}
                </Heading>
            </HovedmenyCardHeader>
            <ExpansionCard.Content className={"!border-0"}>
                <BodyShort spacing>{t("applikasjon.dokumentasjon.informasjon.del1")}</BodyShort>
                <ul className={"list-disc list-inside py-2"}>
                    <li>
                        <Trans
                            i18nKey="applikasjon.dokumentasjon.informasjon.del2"
                            components={{
                                lenke: (
                                    <a href={digisosConfig.innsynURL}>
                                        {t("applikasjon.dokumentasjon.informasjon.url")}
                                    </a>
                                ),
                            }}
                        />
                    </li>
                    <li>{t("applikasjon.dokumentasjon.informasjon.del3")}</li>
                    <li>{t("applikasjon.dokumentasjon.informasjon.del4")}</li>
                </ul>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};
