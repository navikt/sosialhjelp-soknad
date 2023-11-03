import {Attachment} from "@navikt/ds-icons";
import {BodyShort, ExpansionCard, Heading} from "@navikt/ds-react";
import React from "react";
import {Trans, useTranslation} from "react-i18next";
import {useGetSessionInfo} from "../../../generated/informasjon-ressurs/informasjon-ressurs";
import {innsynURL} from "../../../lib/config";

export const EttersendDokuPanel = () => {
    const {data} = useGetSessionInfo();
    const {t} = useTranslation("skjema");

    if (!data?.numRecentlySent) return null;

    return (
        <ExpansionCard aria-label={t("applikasjon.dokumentasjon.tittel")}>
            <ExpansionCard.Header className={"!border-0 [&>button]:my-auto"}>
                <div className={"flex items-center gap-6"}>
                    <div
                        className={
                            "rounded-full bg-green-500/40 w-11 h-11 justify-center items-center tw-hidden lg:flex"
                        }
                    >
                        <Attachment className={"w-6 h-6 block"} aria-hidden="true" />
                    </div>
                    <Heading level={"2"} size={"small"}>
                        {t("applikasjon.dokumentasjon.tittel")}
                    </Heading>
                </div>
            </ExpansionCard.Header>
            <ExpansionCard.Content className={"!border-0"}>
                <BodyShort spacing>{t("applikasjon.dokumentasjon.informasjon.del1")}</BodyShort>
                <ul className={"list-disc list-inside py-2"}>
                    <li>
                        <Trans
                            i18nKey="applikasjon.dokumentasjon.informasjon.del2"
                            components={{
                                lenke: <a href={innsynURL}>{t("applikasjon.dokumentasjon.informasjon.url")}</a>,
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
