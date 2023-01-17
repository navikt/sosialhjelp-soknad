import {Attachment} from "@navikt/ds-icons";
import {Accordion, Heading, Link} from "@navikt/ds-react";
import {getInnsynUrl} from "../../../nav-soknad/utils/rest-utils";
import React from "react";

export const EttersendDokuPanel = () => (
    <Accordion>
        <Accordion.Item className={"bg-white rounded-md border-[1px]"}>
            <Accordion.Header className={"!items-center !border-0"}>
                <div className={"flex items-center px-4 py-2"}>
                    <div className={"rounded-full bg-green-500/40 p-3 mr-5 tw-hidden lg:block"}>
                        <Attachment className={"w-9 h-9"} aria-hidden="true" />
                    </div>
                    <Heading level="2" size="small">
                        Send dokumentasjon til en innsendt søknad
                    </Heading>
                </div>
            </Accordion.Header>
            <Accordion.Content className={"!px-0 !border-0"}>
                <div className={"p-4 lg:pl-24"}>
                    Dokumentasjon kan sendes til søknader du har sendt inn tidligere.
                    <ul className={"list-disc list-inside py-5"}>
                        <li>
                            Gå til listen over <Link href={getInnsynUrl()}>dine sosialhjelpssøknader</Link>
                        </li>
                        <li>Åpne søknaden du ønsker å ettersende dokumenter til</li>
                        <li>Last opp dokumentene du skal ettersende under “dine vedlegg”</li>
                    </ul>
                </div>
            </Accordion.Content>
        </Accordion.Item>
    </Accordion>
);
