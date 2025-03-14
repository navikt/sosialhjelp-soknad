import * as React from "react";
import {useState} from "react";
import {TelefonEditBrukerdefinert} from "./TelefonEditBrukerdefinert";
import {TelefonShow} from "./TelefonShow";
import {Systeminfo} from "../../lib/components/systeminfo/Systeminfo";
import {Heading, Loader} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {useTelefonnummer} from "../../lib/hooks/data/useTelefonnummer.tsx";

export const TelefonData = () => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const {telefonnummerBruker, telefonnummerRegister, setTelefonnummer, isLoading} = useTelefonnummer();
    const {t} = useTranslation("skjema");

    if (isLoading) {
        return (
            <section aria-labelledby={"telefon-heading"} className={"space-y-2"}>
                <Heading id={"telefon-heading"} size={"small"} level={"3"}>
                    {t("kontakt.telefon.sporsmal")}
                </Heading>
                <Loader />
            </section>
        );
    }
    return (
        <section aria-labelledby={"telefon-heading"} className={"space-y-2"}>
            <Heading id={"telefon-heading"} size={"small"} level={"3"}>
                {t("kontakt.telefon.sporsmal")}
            </Heading>
            {editMode ? (
                <Systeminfo>
                    <TelefonShow
                        telefonnummerBruker={telefonnummerBruker}
                        telefonnummerRegister={telefonnummerRegister}
                    />
                    <TelefonEditBrukerdefinert
                        telefonnummerBruker={telefonnummerBruker}
                        setTelefonnummer={setTelefonnummer}
                        onClose={() => setEditMode(false)}
                    />
                </Systeminfo>
            ) : (
                <Systeminfo>
                    <TelefonShow
                        onEdit={() => setEditMode(true)}
                        telefonnummerBruker={telefonnummerBruker}
                        telefonnummerRegister={telefonnummerRegister}
                    />
                </Systeminfo>
            )}
        </section>
    );
};
