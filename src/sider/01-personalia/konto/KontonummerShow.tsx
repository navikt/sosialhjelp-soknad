import {useTranslation} from "react-i18next";
import * as React from "react";
import {SysteminfoItem} from "../../../lib/components/systeminfo/Systeminfo.tsx";
import {formatKontonummer} from "@fremtind/jkl-formatters-util";
import {BodyShort, Label} from "@navikt/ds-react";
import {KontoinformasjonDto} from "../../../generated/new/model/kontoinformasjonDto.ts";

export const KontonummerShow = ({
    kontoinformasjon: {harIkkeKonto, kontonummerBruker, kontonummerRegister},
}: {
    kontoinformasjon: KontoinformasjonDto;
}) => {
    const {t} = useTranslation("skjema");

    if (harIkkeKonto)
        return (
            <div>
                <BodyShort className={"pb-3"}>{t("kontakt.kontonummer.bruker.stringValue")}</BodyShort>
                <SysteminfoItem as="div">
                    <span className={"italic"}> {t("kontakt.kontonummer.harikke.true")}</span>
                </SysteminfoItem>
            </div>
        );

    if (kontonummerBruker)
        return (
            <div>
                <BodyShort className={"pb-3"}>{t("kontakt.kontonummer.bruker.stringValue")}</BodyShort>
                <Label>{t(`kontakt.kontonummer.sporsmal`)}:</Label>
                <BodyShort>{formatKontonummer(kontonummerBruker)}</BodyShort>
            </div>
        );

    if (kontonummerRegister)
        return (
            <div>
                <BodyShort>{formatKontonummer(kontonummerRegister)}</BodyShort>
                <BodyShort className={"pt-2"}>{t("kontakt.system.kontonummer.infotekst.tekst")}</BodyShort>
            </div>
        );

    return (
        <div>
            {t("kontakt.kontonummer.ingeninfo")} <br />
        </div>
    );
};
