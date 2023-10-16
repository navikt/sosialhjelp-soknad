import * as React from "react";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../lib/hooks/useBehandlingsId";
import {updateKontonummer, useHentKontonummer} from "../../generated/kontonummer-ressurs/kontonummer-ressurs";
import Sporsmal from "../../nav-soknad/components/sporsmal/Sporsmal";
import {KontonrShow} from "./KontonrShow";
import {KontonrEdit} from "./KontonrEdit";
import {LinkButton} from "../../nav-soknad/components/linkButton/LinkButton";
import {useAlgebraic} from "../../lib/hooks/useAlgebraic";
import {Systeminfo} from "../../nav-soknad/components/systeminfo/Systeminfo";
import {useDigisosMutation} from "./useDigisosMutation";

export const Kontonr = () => {
    const behandlingsId = useBehandlingsId();
    const [editMode, setEditMode] = useState<boolean>(false);
    const {expectOK} = useAlgebraic(useHentKontonummer(behandlingsId));
    const {t} = useTranslation("skjema", {keyPrefix: "kontakt"});
    const {mutate} = useDigisosMutation(useHentKontonummer, updateKontonummer);

    return expectOK((data) => (
        <Sporsmal sporsmal={t("kontonummer.sporsmal")} infotekst={t("kontonummer.infotekst.tekst")}>
            {editMode ? (
                <KontonrEdit
                    defaultValues={data}
                    onSave={async (data) => {
                        await mutate(data);
                        setEditMode(false);
                    }}
                    onCancel={() => setEditMode(false)}
                />
            ) : (
                <Systeminfo>
                    <KontonrShow />
                    <LinkButton onClick={() => setEditMode(true)} data-testid="kontonummer-endreknapp">
                        {t("system.kontonummer.endreknapp.label")}
                    </LinkButton>
                </Systeminfo>
            )}
        </Sporsmal>
    ));
};

export default Kontonr;
