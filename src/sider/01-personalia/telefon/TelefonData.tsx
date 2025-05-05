import * as React from "react";
import {useState} from "react";
import {Systeminfo} from "../../../lib/components/systeminfo/Systeminfo.tsx";
import {TelefonShow} from "./TelefonShow.tsx";
import {TelefonEdit} from "./TelefonEdit.tsx";
import {TelefonnummerDto} from "../../../generated/new/model/telefonnummerDto.ts";
import {phoneNumberParsedOrUndefined} from "../../../lib/hooks/data/phoneNumberParsedOrUndefined.ts";
import {TelefonnummerInput} from "../../../generated/new/model/telefonnummerInput.ts";
import {PersonaliaEditKnapp} from "../PersonaliaEditKnapp.tsx";

export const TelefonData = ({
    setTelefonnummer,
    telefonnummer,
}: {
    setTelefonnummer: (input: Partial<TelefonnummerInput>) => Promise<void>;
    telefonnummer: TelefonnummerDto;
}) => {
    const [editMode, setEditMode] = useState<boolean>(false);

    const bruker = phoneNumberParsedOrUndefined(telefonnummer.telefonnummerBruker);
    const register = phoneNumberParsedOrUndefined(telefonnummer.telefonnummerRegister);

    return (
        <Systeminfo>
            {!editMode ? (
                <div className={"flex justify-between items-center"}>
                    <TelefonShow bruker={bruker} register={register} />
                    <PersonaliaEditKnapp onClick={() => setEditMode(true)} />
                </div>
            ) : (
                <TelefonEdit
                    telefonnummerBruker={bruker}
                    setTelefonnummer={setTelefonnummer}
                    onClose={() => setEditMode(false)}
                />
            )}
        </Systeminfo>
    );
};
