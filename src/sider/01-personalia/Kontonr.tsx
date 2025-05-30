import * as React from "react";
import {startTransition, useState} from "react";
import {KontonrShow} from "./KontonrShow.tsx";
import {KontonrEdit} from "./KontonrEdit.tsx";
import {Systeminfo} from "../../lib/components/systeminfo/Systeminfo.tsx";
import {Loader} from "@navikt/ds-react";
import {useKontonummer} from "../../lib/hooks/data/useKontonummer.ts";
import {PersonaliaEditKnapp} from "./PersonaliaEditKnapp.tsx";

export const Kontonr = () => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const {kontoinformasjon, updateKontoInformasjon, isLoading, isMutating} = useKontonummer();

    if (isLoading || kontoinformasjon === undefined) return <Loader />;

    return (
        <Systeminfo>
            {!editMode ? (
                <div className={"flex justify-between items-center"}>
                    <KontonrShow kontoinformasjon={kontoinformasjon} />
                    <PersonaliaEditKnapp disabled={isMutating} onClick={() => setEditMode(true)} />
                </div>
            ) : (
                <KontonrEdit
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
