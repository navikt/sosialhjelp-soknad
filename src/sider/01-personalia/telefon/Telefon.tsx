import * as React from "react";
import {startTransition, useState} from "react";
import {Systeminfo} from "../../../lib/components/systeminfo/Systeminfo.tsx";
import {TelefonShow} from "./TelefonShow.tsx";
import {TelefonEditBrukerdefinert} from "./TelefonEditBrukerdefinert.tsx";
import {phoneNumberParsedOrUndefined} from "./phoneNumberParsedOrUndefined.ts";
import {PersonaliaEditKnapp} from "../PersonaliaEditKnapp.tsx";
import {Loader} from "@navikt/ds-react";
import {UseTelefonnummerResult} from "./useTelefonnummer.ts";

export const Telefon = ({isLoading, setTelefonnummer, telefonnummer, isMutating}: UseTelefonnummerResult) => {
    const [editMode, setEditMode] = useState<boolean>(false);

    if (isLoading || !telefonnummer) {
        return <Loader />;
    }

    const bruker = phoneNumberParsedOrUndefined(telefonnummer.telefonnummerBruker);
    const register = phoneNumberParsedOrUndefined(telefonnummer.telefonnummerRegister);

    return (
        <Systeminfo>
            {!editMode ? (
                <div className={"flex justify-between items-center"}>
                    <TelefonShow bruker={bruker} register={register} />
                    <PersonaliaEditKnapp onClick={() => setEditMode(true)} disabled={isMutating} />
                </div>
            ) : (
                <TelefonEditBrukerdefinert
                    telefonnummerBruker={bruker}
                    onChange={(telefonnummer) => {
                        startTransition(() => setTelefonnummer(telefonnummer));
                        setEditMode(false);
                    }}
                    onCancel={() => setEditMode(false)}
                />
            )}
        </Systeminfo>
    );
};
