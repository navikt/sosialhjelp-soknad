import * as React from "react";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {updateKontonummer, useHentKontonummer} from "../../generated/kontonummer-ressurs/kontonummer-ressurs";
import {KontonrShow} from "./KontonrShow";
import {KontonrEdit} from "./KontonrEdit";
import {useAlgebraic} from "../../lib/hooks/common/useAlgebraic";
import {Systeminfo} from "../../lib/components/systeminfo/Systeminfo";
import {useDigisosMutation} from "../../lib/hooks/common/useDigisosMutation";
import {Heading} from "@navikt/ds-react";

export const Kontonr = () => {
    const behandlingsId = useBehandlingsId();
    const [editMode, setEditMode] = useState<boolean>(false);
    const {expectOK} = useAlgebraic(useHentKontonummer(behandlingsId));
    const {t} = useTranslation("skjema", {keyPrefix: "kontakt"});
    const {mutate} = useDigisosMutation(useHentKontonummer, updateKontonummer);

    return expectOK((data) => (
        <div className={"space-y-2"}>
            <Heading size={"small"} level={"3"}>
                {t("kontonummer.sporsmal")}
            </Heading>
            {editMode ? (
                <Systeminfo>
                    <KontonrShow />
                    <KontonrEdit
                        defaultValues={data}
                        onSave={async (data) => {
                            await mutate(data);
                            setEditMode(false);
                        }}
                        onCancel={() => setEditMode(false)}
                    />
                </Systeminfo>
            ) : (
                <Systeminfo>
                    <KontonrShow onEdit={() => setEditMode(true)} />
                </Systeminfo>
            )}
        </div>
    ));
};
