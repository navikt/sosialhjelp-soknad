import * as React from "react";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../../nav-soknad/hooks/useBehandlingsId";
import {useHentKontonummer} from "../../../generated/kontonummer-ressurs/kontonummer-ressurs";
import Sporsmal from "../../../nav-soknad/components/sporsmal/Sporsmal";
import {KontonrShow} from "./KontonrShow";
import {KontonrEdit} from "./KontonrEdit";
import {LinkButton} from "../../../nav-soknad/components/linkButton/LinkButton";
import {useAlgebraic} from "../../../lib/hooks/useAlgebraic";

export const Kontonr = () => {
    const behandlingsId = useBehandlingsId();
    const [editMode, setEditMode] = useState<boolean>(false);
    const {expectOK} = useAlgebraic(useHentKontonummer(behandlingsId));
    const {t} = useTranslation("skjema", {keyPrefix: "kontakt"});

    return expectOK(({brukerutfyltVerdi, brukerdefinert, harIkkeKonto}) => (
        <Sporsmal sporsmal={t("kontonummer.sporsmal")} infotekst={t("kontonummer.infotekst.tekst")}>
            {editMode ? (
                <KontonrEdit onClose={() => setEditMode(false)} />
            ) : (
                <div className={"space-y-2"}>
                    <KontonrShow />
                    <LinkButton onClick={() => setEditMode(true)}>
                        {t("system.kontonummer.endreknapp.label")}
                    </LinkButton>
                </div>
            )}
        </Sporsmal>
    ));
};

export default Kontonr;
