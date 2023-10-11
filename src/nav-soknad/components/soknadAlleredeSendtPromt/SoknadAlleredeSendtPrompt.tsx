import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {visSoknadAlleredeSendtPrompt} from "../../../digisos/redux/ettersendelse/ettersendelseActions";
import {State} from "../../../digisos/redux/reducers";
import {BodyShort, Heading, Modal} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";

const SoknadAlleredeSendtPrompt = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation("skjema", {keyPrefix: "visSoknadAlleredeSendtPrompt"});

    const open = useSelector((state: State) => state.ettersendelse.visSoknadAlleredeSendtPromt);

    return (
        <Modal open={open} onClose={() => dispatch(visSoknadAlleredeSendtPrompt(false))}>
            <Modal.Header>
                <Heading size={"large"} level={"2"}>
                    {t("overskrift")}
                </Heading>
            </Modal.Header>
            <Modal.Body className={"flex gap-2"}>
                <BodyShort>{t("tekst")}</BodyShort>
            </Modal.Body>
        </Modal>
    );
};

export default SoknadAlleredeSendtPrompt;
