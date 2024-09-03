import * as React from "react";
import {BodyShort, Button, Modal, Heading, Alert} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {faro} from "@grafana/faro-react";
import {TrashIcon} from "@navikt/aksel-icons";
import {useBehandlingsId} from "../../hooks/common/useBehandlingsId";
import {useSlettSoknad} from "../../../generated/soknad-ressurs/soknad-ressurs";
import digisosConfig from "../../config";
import {logError} from "../../log/loggerUtils";
import {logAmplitudeEvent} from "../../amplitude/Amplitude";

export const AvbrytSoknadModal = ({open, onClose}: {open: boolean; onClose: () => void}) => {
    const behandlingsId = useBehandlingsId();
    const {t} = useTranslation();
    const {mutateAsync, isPending: isLoading, isError} = useSlettSoknad();

    const deleteAndRedirect = async () => {
        try {
            await mutateAsync({behandlingsId});
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
                        <TrashIcon />
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
