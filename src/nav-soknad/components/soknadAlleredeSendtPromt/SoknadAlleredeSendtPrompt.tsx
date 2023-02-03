import * as React from "react";
import {Innholdstittel, Normaltekst} from "nav-frontend-typografi";
import {useDispatch, useSelector} from "react-redux";
import {visSoknadAlleredeSendtPrompt} from "../../../digisos/redux/ettersendelse/ettersendelseActions";
import {basePath} from "../../../configuration";
import {State} from "../../../digisos/redux/reducers";
import {Modal} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";

const SoknadAlleredeSendtPrompt = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation("skjema", {keyPrefix: "visSoknadAlleredeSendtPrompt"});

    const visPrompt = useSelector((state: State) => state.ettersendelse.visSoknadAlleredeSendtPromt);

    const onClose = () => {
        dispatch(visSoknadAlleredeSendtPrompt(false));
    };

    return (
        <Modal open={visPrompt} onClose={() => onClose()}>
            <Modal.Content>
                <div className="avbrytmodal">
                    <div className="avbrytmodal__infoikon_wrapper">
                        <img src={`${basePath}/statisk/bilder/ikon_ark.svg`} alt={""} />
                    </div>

                    <Innholdstittel className="blokk-s avbrytmodal__overskrift">{t("overskrift")}</Innholdstittel>
                    <Normaltekst className="blokk-xxs avbrytmodal__tekst">{t("tekst")}</Normaltekst>
                </div>
            </Modal.Content>
        </Modal>
    );
};

export default SoknadAlleredeSendtPrompt;
