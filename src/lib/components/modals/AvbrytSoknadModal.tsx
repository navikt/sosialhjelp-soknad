import * as React from "react";
import {BodyShort, Button, Modal, Heading, Alert} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {faro} from "@grafana/faro-react";
import {TrashIcon} from "@navikt/aksel-icons";
import {useSoknadId} from "../../hooks/common/useSoknadId.ts";
import digisosConfig from "../../config";
import {logError} from "../../log/loggerUtils";
import {logAmplitudeEvent} from "../../amplitude/Amplitude";
import {useDeleteSoknad} from "../../../generated/new/soknad-lifecycle-controller/soknad-lifecycle-controller.ts";

export const AvbrytSoknadModal = ({open, onClose}: {open: boolean; onClose: () => void}) => {
    const soknadId = useSoknadId();
    const {t} = useTranslation();
    const {mutateAsync, isPending: isLoading, isError} = useDeleteSoknad();

    const deleteAndRedirect = async () => {
        try {
            await mutateAsync({soknadId: soknadId});
            window.location.assign(digisosConfig.minSideURL);
        } catch (e: any) {
            faro.api.pushError(e);
            await logError(`Feil ved sletting: ${e}`);
        }
    };

    // FIXME: Hardkodet norsk
    return (
        <Modal open={open} onClose={onClose} aria-label={t("avbryt.overskrift")}>
            <Modal.Header>
                <Heading level="1" size="large" spacing>
                    {t("avbryt.overskrift")}
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <BodyShort spacing>{t("avbryt.forklaring")}</BodyShort>
                {isError && <Alert variant={"error"}>Beklager, en feil oppstod ved sletting.</Alert>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" disabled={isLoading} onClick={deleteAndRedirect}>
                    <div className={"flex items-center gap-2"}>
                        <TrashIcon aria-hidden={true} />
                        {t("avbryt.slett")}
                    </div>
                </Button>
                <Button
                    variant="primary"
                    onClick={async () => {
                        await logAmplitudeEvent("Klikk på fortsett senere", {SoknadVersjon: "Standard"});
                        window.location.href = "/sosialhjelp/soknad/informasjon?reason=soknadDeleteModal";
                    }}
                >
                    {t("avbryt.fortsettsenere")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
