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
import {useIsNyDatamodell} from "../../generated/soknad-ressurs/soknad-ressurs.ts";
import {
    updateKontoInformasjonBruker,
    useGetKontonummer,
} from "../../generated/new/kontonummer-controller/kontonummer-controller.ts";
import {TextPlaceholder} from "../../lib/components/animasjoner/TextPlaceholder.tsx";
import {KontonummerInputDto} from "../../generated/model/kontonummerInputDto.ts";
import {KontonummerFrontend} from "../../generated/model";
import {UpdateKontoInformasjonBrukerBody} from "../../generated/new/model/index.ts";
import {Result} from "@swan-io/boxed";

interface Props {
    editMode: boolean;
    mutateOld?: (data: KontonummerInputDto) => Promise<Result<unknown, any>>;
    mutateNew?: (data: UpdateKontoInformasjonBrukerBody) => Promise<Result<unknown, any>>;
    setEditMode: (value: ((prevState: boolean) => boolean) | boolean) => void;
    defaultValues: KontonummerFrontend;
}

const Kontonr = ({editMode, mutateOld, mutateNew, setEditMode, defaultValues}: Props) => {
    const {t} = useTranslation("skjema");
    return (
        <div className={"space-y-2"}>
            <Heading size={"small"} level={"3"}>
                {t("kontakt.kontonummer.sporsmal")}
            </Heading>
            {editMode ? (
                <Systeminfo>
                    <KontonrShow />
                    <KontonrEdit
                        defaultValues={defaultValues}
                        onSave={async (data) => {
                            if (mutateOld) {
                                await mutateOld(data);
                            } else if (mutateNew) {
                                if (data.harIkkeKonto) {
                                    await mutateNew({type: "HarIkkeKonto", harIkkeKonto: true});
                                } else {
                                    await mutateNew({
                                        type: "KontonummerBruker",
                                        kontonummer: data.brukerutfyltVerdi ?? undefined,
                                    });
                                }
                            }
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
    );
};

export const KontonrWrapper = () => {
    const behandlingsId = useBehandlingsId();
    const [editMode, setEditMode] = useState<boolean>(false);
    const {data: isNyDatamodell, isPending} = useIsNyDatamodell(behandlingsId);

    const {expectOK: expectOkNew} = useAlgebraic(
        useGetKontonummer(behandlingsId, {query: {enabled: isNyDatamodell === true}})
    );
    const {expectOK: expectOkOld} = useAlgebraic(
        useHentKontonummer(behandlingsId, {query: {enabled: isNyDatamodell === false}})
    );
    const {mutate: mutateOld} = useDigisosMutation(useHentKontonummer, updateKontonummer, isNyDatamodell === false);
    const {mutate: mutateNew} = useDigisosMutation(
        useGetKontonummer,
        updateKontoInformasjonBruker,
        isNyDatamodell === true
    );

    if (isPending) {
        return <TextPlaceholder lines={1} />;
    }

    if (isNyDatamodell === true) {
        return expectOkNew((data) => (
            <Kontonr
                mutateNew={mutateNew}
                setEditMode={setEditMode}
                editMode={editMode}
                defaultValues={{
                    systemverdi: data.kontonummerRegister,
                    brukerdefinert: Boolean(data.kontonummerBruker),
                    harIkkeKonto: Boolean(data.harIkkeKonto),
                    brukerutfyltVerdi: data.kontonummerBruker,
                }}
            />
        ));
    } else if (isNyDatamodell === false) {
        return expectOkOld((data) => (
            <Kontonr mutateOld={mutateOld} setEditMode={setEditMode} editMode={editMode} defaultValues={data} />
        ));
    } else {
        return null;
    }
};

export default KontonrWrapper;
