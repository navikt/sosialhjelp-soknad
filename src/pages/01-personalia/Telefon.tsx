import * as React from "react";
import {useState} from "react";
import {TelefonEditBrukerdefinert} from "./TelefonEditBrukerdefinert";
import {TelefonShow} from "./TelefonShow";
import {Systeminfo} from "../../lib/components/systeminfo/Systeminfo";
import {BodyShort, Heading} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";

export const strip47 = (phoneNumber: string) => phoneNumber.replace(/^\+47/, "");

export const TelefonData = () => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const {t} = useTranslation("skjema");
    return (
        <div className={"space-y-2"}>
            <Heading size={"small"} level={"3"}>
                {t("kontakt.telefon.sporsmal")}
            </Heading>
            <BodyShort>{t("kontakt.telefon.infotekst.tekst")}</BodyShort>
            {editMode ? (
                <TelefonEditBrukerdefinert onClose={() => setEditMode(false)} />
            ) : (
                <Systeminfo>
                    <TelefonShow onEdit={() => setEditMode(true)} />
                </Systeminfo>
            )}
        </div>
    );
};
