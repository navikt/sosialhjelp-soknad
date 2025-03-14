import * as React from "react";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {KontonrShow} from "./KontonrShow";
import {KontonrEdit} from "./KontonrEdit";
import {Systeminfo} from "../../lib/components/systeminfo/Systeminfo";
import {Heading, Loader} from "@navikt/ds-react";
import {useKontonummer} from "../../lib/hooks/data/useKontonummer.ts";

export const Kontonr = () => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const {t} = useTranslation("skjema");
    const {updateKontoInformasjon, harIkkeKonto, kontonummer, isLoading, isBrukerUtfylt} = useKontonummer();

    if (isLoading) {
        return (
            <section aria-labelledby={"kontonummer-heading"} className={"space-y-2"}>
                <Heading id={"kontonummer-heading"} size={"small"} level={"3"}>
                    {t("kontakt.kontonummer.sporsmal")}
                </Heading>
                <Loader />
            </section>
        );
    }

    return (
        <section aria-labelledby={"kontonummer-heading"} className={"space-y-2"}>
            <Heading id={"kontonummer-heading"} size={"small"} level={"3"}>
                {t("kontakt.kontonummer.sporsmal")}
            </Heading>
            {editMode ? (
                <Systeminfo>
                    <KontonrShow
                        isBrukerUtfylt={isBrukerUtfylt}
                        harIkkeKonto={harIkkeKonto}
                        kontonummer={kontonummer}
                    />
                    <KontonrEdit
                        defaultValues={{brukerutfyltVerdi: null, harIkkeKonto: harIkkeKonto ?? null}}
                        onSave={(data) => {
                            updateKontoInformasjon(data.harIkkeKonto, data.brukerutfyltVerdi);
                            setEditMode(false);
                        }}
                        onCancel={() => setEditMode(false)}
                    />
                </Systeminfo>
            ) : (
                <Systeminfo>
                    <KontonrShow
                        isBrukerUtfylt={isBrukerUtfylt}
                        harIkkeKonto={harIkkeKonto}
                        kontonummer={kontonummer}
                        onEdit={() => setEditMode(true)}
                    />
                </Systeminfo>
            )}
        </section>
    );
};
