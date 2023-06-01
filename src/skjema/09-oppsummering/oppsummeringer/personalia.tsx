import {Heading} from "@navikt/ds-react";
import {BasisPersonaliaData} from "../../01-personalia/BasisPersonalia";
import {TelefonShow} from "../../01-personalia/telefon/TelefonShow";
import React, {ReactNode} from "react";
import {Systeminfo, SysteminfoItem} from "../../../nav-soknad/components/systeminfo/Systeminfo";
import {KontonrShow} from "../../01-personalia/KontonrShow";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const OppsummeringHeading = ({children, stepNr}: {children: ReactNode; stepNr: number}) => {
    const {t} = useTranslation();
    return (
        <div className={"flex border-b-2 my-2 justify-between items-end leading-4"}>
            <Heading size={"small"} level={"3"}>
                {children}
            </Heading>
            <Link className="navds-link py-1" to={`../${stepNr}`}>
                {t("endre")}
            </Link>
        </div>
    );
};

export const NyOppsummeringPrototypePersonalia = () => {
    return (
        <div className={"pb-4"}>
            <OppsummeringHeading stepNr={1}>Om deg</OppsummeringHeading>
            <Systeminfo>
                <BasisPersonaliaData />
                <SysteminfoItem comment={"Du har valgt:"} label={"Adresse"}>
                    Testverdigata 1, 1337 Sandvika
                </SysteminfoItem>
                <TelefonShow />
                <KontonrShow />
            </Systeminfo>
        </div>
    );
};
