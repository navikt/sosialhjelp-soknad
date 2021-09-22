import * as React from "react";
import {Innholdstittel, Normaltekst} from "nav-frontend-typografi";
import {FormattedMessage} from "react-intl";
import {useDispatch, useSelector} from "react-redux";
import {visSoknadAlleredeSendtPrompt} from "../../../digisos/redux/ettersendelse/ettersendelseActions";
import {getContextPathForStaticContent} from "../../../configuration";
import {State} from "../../../digisos/redux/reducers";
import {Modal} from "@navikt/ds-react";

const KEY = "visSoknadAlleredeSendtPrompt";

const SoknadAlleredeSendtPromt = () => {
    const dispatch = useDispatch();

    const visPrompt = useSelector((state: State) => state.ettersendelse.visSoknadAlleredeSendtPromt);

    const onClose = () => {
        dispatch(visSoknadAlleredeSendtPrompt(false));
    };

    return (
        <Modal open={visPrompt} onClose={() => onClose()}>
            <Modal.Content>
                <div className="avbrytmodal">
                    <div className="avbrytmodal__infoikon_wrapper">
                        <img src={`${getContextPathForStaticContent()}/statisk/bilder/ikon_ark.svg`} alt={""} />
                    </div>

                    <Innholdstittel className="blokk-s avbrytmodal__overskrift">
                        <FormattedMessage id={KEY + ".overskrift"} />
                    </Innholdstittel>
                    <Normaltekst className="blokk-xxs avbrytmodal__tekst">
                        <FormattedMessage id={KEY + ".tekst"} />
                    </Normaltekst>
                </div>
            </Modal.Content>
        </Modal>
    );
};

export default SoknadAlleredeSendtPromt;
