import * as React from "react";
import {useState} from "react";
import {KontonrShow} from "./KontonrShow.tsx";
import {KontonrEdit} from "./KontonrEdit.tsx";
import {Systeminfo} from "../../../lib/components/systeminfo/Systeminfo.tsx";
import {Loader} from "@navikt/ds-react";
import {useKontonummer} from "../../../lib/hooks/data/useKontonummer.ts";
import {PersonaliaEditKnapp} from "../PersonaliaEditKnapp.tsx";

export const Kontonr = () => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const {data, updateKontoInformasjon, isLoading} = useKontonummer();

    if (isLoading || data === undefined) {
        return <Loader />;
    }

    const {kontonummerBruker, kontonummerRegister, harIkkeKonto} = data;

    return (
        <Systeminfo>
            {!editMode ? (
                <div className={"flex justify-between items-center"}>
                    <KontonrShow
                        kontonummerRegister={kontonummerRegister}
                        kontonummerBruker={kontonummerBruker}
                        harIkkeKonto={harIkkeKonto}
                    />
                    <PersonaliaEditKnapp onClick={() => setEditMode(true)} />
                </div>
            ) : (
                <KontonrEdit
                    defaultValues={{
                        kontonummerBruker: kontonummerBruker ?? null,
                        harIkkeKonto: harIkkeKonto,
                    }}
                    onSave={async ({kontonummerBruker, harIkkeKonto}) => {
                        await updateKontoInformasjon({harIkkeKonto, kontonummerBruker});
                        setEditMode(false);
                    }}
                    onCancel={() => setEditMode(false)}
                />
            )}
        </Systeminfo>
    );
};
