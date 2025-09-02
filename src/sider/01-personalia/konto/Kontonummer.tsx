import * as React from "react";
import {startTransition, useState} from "react";
import {KontonummerShow} from "./KontonummerShow.tsx";
import {KontonummerEdit} from "./KontonummerEdit.tsx";
import {Systeminfo} from "../../../lib/components/systeminfo/Systeminfo.tsx";
import {Loader} from "@navikt/ds-react";
import {UseKontonummerResult} from "./useKontonummer.ts";
import {PersonaliaEditKnapp} from "../PersonaliaEditKnapp.tsx";

export const Kontonummer = ({
    kontoinformasjon,
    updateKontoInformasjon,
    isLoading,
    isMutating,
}: UseKontonummerResult) => {
    const [editMode, setEditMode] = useState<boolean>(false);

    if (isLoading || kontoinformasjon === undefined) return <Loader />;

    return (
        <Systeminfo>
            {!editMode ? (
                <div className={"flex justify-between items-center"}>
                    <KontonummerShow kontoinformasjon={kontoinformasjon} />
                    <PersonaliaEditKnapp disabled={isMutating} onClick={() => setEditMode(true)} />
                </div>
            ) : (
                <KontonummerEdit
                    defaultValues={kontoinformasjon}
                    onCancel={() => setEditMode(false)}
                    onSave={(data) =>
                        startTransition(() => {
                            updateKontoInformasjon(data);
                            setEditMode(false);
                        })
                    }
                />
            )}
        </Systeminfo>
    );
};
