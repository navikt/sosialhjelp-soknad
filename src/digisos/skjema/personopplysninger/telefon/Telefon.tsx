import * as React from "react";
import {useState} from "react";
import {TelefonEditBrukerdefinert} from "./TelefonEditBrukerdefinert";
import {TelefonShow} from "./TelefonShow";
import {Systeminfo} from "../../../../nav-soknad/components/systeminfo/Systeminfo";

export const strip47 = (phoneNumber: string) => phoneNumber.replace(/^\+47/, "");

export const TelefonData = () => {
    const [editMode, setEditMode] = useState<boolean>(false);

    return (
        <div className={"space-y-2"}>
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
