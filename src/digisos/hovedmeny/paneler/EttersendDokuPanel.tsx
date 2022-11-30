import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import {Attachment} from "@navikt/ds-icons";
import {Heading, Link} from "@navikt/ds-react";
import {getInnsynUrl} from "../../../nav-soknad/utils/rest-utils";
import React from "react";

export const EttersendDokuPanel = () => (
    <Ekspanderbartpanel
        tittel={
            <div className="flex items-center px-4 py-2">
                <div className={"rounded-full bg-green-500/40 p-3 mr-4 hidden lg:block"}>
                    <Attachment className={"w-8 h-8"} />
                </div>
                <Heading level="2" size="small">
                    Send dokumentasjon til en innsendt søknad
                </Heading>
            </div>
        }
    >
        <div className={"pl-28"}>
            Dokumentasjon kan sendes til søknader du har sendt inn tidligere.
            <ul className={"list-disc list-inside py-5"}>
                <li>
                    Gå til listen over <Link href={getInnsynUrl()}>dine sosialhjelpssøknader</Link>
                </li>
                <li>Åpne søknaden du ønsker å ettersende dokumenter til</li>
                <li>Last opp dokumentene du skal ettersende under “dine vedlegg”</li>
            </ul>
        </div>
    </Ekspanderbartpanel>
);
