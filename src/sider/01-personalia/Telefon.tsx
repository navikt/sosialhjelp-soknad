import * as React from "react";
import {startTransition, useState} from "react";
import {Systeminfo} from "../../lib/components/systeminfo/Systeminfo.tsx";
import {TelefonShow} from "./TelefonShow.tsx";
import {TelefonEditBrukerdefinert} from "./TelefonEditBrukerdefinert.tsx";
import {PersonaliaEditKnapp} from "./PersonaliaEditKnapp.tsx";
import {useTelefonnummer} from "../../lib/hooks/data/useTelefonnummer.tsx";
import {Loader} from "@navikt/ds-react";

export const Telefon = () => {
    const {isLoading, setTelefonnummer, telefonnummer, isMutating} = useTelefonnummer();
    const [editMode, setEditMode] = useState<boolean>(false);

    if (isLoading || !telefonnummer) {
        return <Loader />;
    }

    const {telefonnummerBruker, telefonnummerRegister} = telefonnummer;

    return (
        <Systeminfo>
            {!editMode ? (
                <div className={"flex justify-between items-center"}>
                    <TelefonShow bruker={telefonnummerBruker} register={telefonnummerRegister} />
                    <PersonaliaEditKnapp onClick={() => setEditMode(true)} disabled={isMutating} />
                </div>
            ) : (
                <TelefonEditBrukerdefinert
                    bruker={telefonnummerBruker}
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
