import * as React from "react";
import {startTransition, useState} from "react";
import {Systeminfo} from "../../lib/components/systeminfo/Systeminfo.tsx";
import {TelefonShow} from "./TelefonShow.tsx";
import {TelefonEditBrukerdefinert} from "./TelefonEditBrukerdefinert.tsx";
import {PersonaliaEditKnapp} from "./PersonaliaEditKnapp.tsx";
import {TelefonnummerDto} from "../../generated/new/model/telefonnummerDto.ts";
import {TelefonnummerInput} from "../../generated/new/model/telefonnummerInput.ts";

export const Telefon = ({
    telefonnummer: {telefonnummerBruker, telefonnummerRegister},
    setTelefonnummer,
    isMutating,
}: {
    telefonnummer: TelefonnummerDto;
    setTelefonnummer: (input: TelefonnummerInput) => void;
    isMutating: boolean;
}) => {
    const [editMode, setEditMode] = useState<boolean>(false);

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
