import {Attachment} from "@navikt/ds-icons";
import {Accordion, Heading} from "@navikt/ds-react";
import React from "react";
import {Trans, useTranslation} from "react-i18next";
import {useGetSessionInfo} from "../../generated/informasjon-ressurs/informasjon-ressurs";
import {innsynURL} from "../../lib/config";

export const EttersendDokuPanel = () => {
    const {data} = useGetSessionInfo();
    const {t} = useTranslation("skjema");

    if (!data?.numRecentlySent) return null;

    return (
        <Accordion>
            <Accordion.Item className={"bg-white rounded-md"}>
                <Accordion.Header className={"!items-center !border-0 !py-6 !px-8 rounded-t-md"}>
                    <div className={"flex items-center gap-8"}>
                        <div
                            className={
                                "rounded-full bg-green-500/40 w-11 h-11 justify-center items-center tw-hidden lg:flex"
                            }
                        >
                            <Attachment className={"w-6 h-6 block"} aria-hidden="true" />
                        </div>
                        <Heading level="2" size="small">
                            {t("applikasjon.dokumentasjon.tittel")}
                        </Heading>
                    </div>
                </Accordion.Header>
                <Accordion.Content className={"!px-0 !border-0"}>
                    <div className={"p-4 lg:pl-24"}>
                        {t("applikasjon.dokumentasjon.informasjon.del1")}
                        <ul className={"list-disc list-inside py-5"}>
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
                    </div>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};
