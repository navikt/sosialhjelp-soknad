import * as React from "react";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {updateKontonummer, useHentKontonummer} from "../../generated/kontonummer-ressurs/kontonummer-ressurs";
import {KontonrShow} from "./KontonrShow";
import {KontonrEdit} from "./KontonrEdit";
import {LinkButton} from "../../lib/components/LinkButton";
import {useAlgebraic} from "../../lib/hooks/common/useAlgebraic";
import {Systeminfo} from "../../lib/components/systeminfo/Systeminfo";
import {useDigisosMutation} from "../../lib/hooks/common/useDigisosMutation";
import {BodyShort, Heading} from "@navikt/ds-react";

export const Kontonr = () => {
    const behandlingsId = useBehandlingsId();
    const [editMode, setEditMode] = useState<boolean>(false);
    const {expectOK} = useAlgebraic(useHentKontonummer(behandlingsId));
    const {t} = useTranslation("skjema", {keyPrefix: "kontakt"});
    const {mutate} = useDigisosMutation(useHentKontonummer, updateKontonummer);

    return expectOK((data) => (
        <div>
            <Heading size="medium" level="2" spacing>
                {t("kontonummer.sporsmal")}
            </Heading>
            <BodyShort>{t("kontonummer.infotekst.tekst")}</BodyShort>
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
                    <li>
                        <LinkButton onClick={() => setEditMode(true)} data-testid="kontonummer-endreknapp">
                            {t("system.kontonummer.endreknapp.label")}
                        </LinkButton>
                    </li>
                </Systeminfo>
            )}
        </div>
    ));
};
