import * as React from "react";
import {SysteminfoItem} from "../../../lib/components/systeminfo/Systeminfo.tsx";
import {useTranslation} from "react-i18next";
import {PhoneNumber} from "libphonenumber-js";
import {BodyShort} from "@navikt/ds-react";
import {formatPhoneNumber} from "./formatPhoneNumber.ts";

export const TelefonnummerShow = ({bruker, register}: {bruker?: PhoneNumber; register?: PhoneNumber}) => {
    const {t} = useTranslation();

    // Hvis brukeren har overstyrt telefonnummer
    if (bruker)
        return (
            <div role={"none"}>
                <SysteminfoItem as="div">{formatPhoneNumber(bruker)}</SysteminfoItem>
            </div>
        );

    // Bruker har et telefonnummer i registeret
    if (register)
        return (
            <div role={"none"}>
                <SysteminfoItem as="div">{formatPhoneNumber(register)}</SysteminfoItem>
                <BodyShort className={"pt-2"} role={"note"}>
                    {t("kontakt.system.telefoninfo.infotekst.tekst")}
                </BodyShort>
            </div>
        );

    // Bruker har hverken oppgitt et nummer eller har et i registeret
    return (
        <div role={"none"}>
            {t("kontakt.system.telefoninfo.ingeninfo")} <br />
        </div>
    );
};
