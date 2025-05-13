import * as React from "react";
import {SysteminfoItem} from "../../lib/components/systeminfo/Systeminfo.tsx";
import {useTranslation} from "react-i18next";
import {BodyShort} from "@navikt/ds-react";
import {formatPhoneNumber} from "./formatPhoneNumber.ts";
import {phoneNumberParsedOrUndefined} from "../../lib/hooks/data/phoneNumberParsedOrUndefined.ts";

export const TelefonShow = ({bruker, register}: {bruker: string | undefined; register: string | undefined}) => {
    const {t} = useTranslation();

    const telefonnummerBruker = phoneNumberParsedOrUndefined(bruker);
    const telefonnummerRegister = phoneNumberParsedOrUndefined(register);

    // Hvis brukeren har overstyrt telefonnummer
    if (telefonnummerBruker)
        return (
            <div role={"none"}>
                <SysteminfoItem as="div">{formatPhoneNumber(telefonnummerBruker)}</SysteminfoItem>
            </div>
        );

    // Bruker har et telefonnummer i registeret
    if (telefonnummerRegister)
        return (
            <div role={"none"}>
                <SysteminfoItem as="div">{formatPhoneNumber(telefonnummerRegister)}</SysteminfoItem>
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
