import {Attachment} from "@navikt/ds-icons";
import {Accordion, Heading, Link} from "@navikt/ds-react";
import {getInnsynUrl} from "../../../nav-soknad/utils/rest-utils";
import React from "react";
import {useHarNyligInnsendteSoknader} from "../../../generated/informasjon-ressurs/informasjon-ressurs";

export const EttersendDokuPanel = () => {
    const {data: nyligInnsendte} = useHarNyligInnsendteSoknader();

    if (!nyligInnsendte?.antallNyligInnsendte) return null;

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
};
