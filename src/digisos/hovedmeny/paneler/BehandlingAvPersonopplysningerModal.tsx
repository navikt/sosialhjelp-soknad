import * as React from "react";
import {Button, Modal} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";

const BehandlingAvPersonopplysningerModal = ({open, onClose}: {open: boolean; onClose: () => void}) => {
    const {t} = useTranslation("skjema");

    // FIXME: this is broken!!
    return (
        <Modal open={open} onClose={onClose}>
            <Modal.Content>
                <div className="personopplysning_info">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: t("soknadsosialhjelp.forstesiden.bekreftInfoModal.body"),
                        }}
                    />
                    <div className={"text-center m-8"}>
                        <Button variant="primary" onClick={() => onClose()}>
                            {t("soknadsosialhjelp.forstesiden.bekreftInfoModal.lukk")}
                        </Button>
                    </div>
                </div>
            </Modal.Content>
        </Modal>
    );
};

export default BehandlingAvPersonopplysningerModal;
