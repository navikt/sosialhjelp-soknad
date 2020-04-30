import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {State} from "../../redux/reducers";
import NavFrontendModal from "nav-frontend-modal";
import {visLasteOppVedleggModal} from "../../redux/soknad/soknadActions";
import {useIntl, FormattedMessage} from "react-intl";
import {Undertittel, Systemtittel} from "nav-frontend-typografi";

export const OpplastingAvVedleggModal = () => {
    const modalSynlig = useSelector((state: State) => state.soknad.visLasteOppVedleggModal);

    const dispatch = useDispatch();

    const intl = useIntl();

    return (
        <NavFrontendModal
            isOpen={modalSynlig}
            contentLabel={intl.formatMessage({
                id: "avbryt.avbryt",
            })}
            closeButton={true}
            onRequestClose={() => {
                dispatch(visLasteOppVedleggModal(false));
            }}
            style={{
                content: {
                    overflowY: "auto",
                },
            }}
        >
            <div className="modal-innhold">
                <Systemtittel>
                    <FormattedMessage id="opplysninger.informasjon.modal.overskrift" />
                </Systemtittel>

                <Undertittel>
                    <FormattedMessage id="opplysninger.informasjon.modal.bolk1.tittel" />
                </Undertittel>
                <p>
                    <FormattedMessage id="opplysninger.informasjon.modal.bolk1.avsnitt1" />
                </p>
                <p>
                    <FormattedMessage id="opplysninger.informasjon.modal.bolk1.avsnitt2" />
                </p>
                <p>
                    <FormattedMessage id="opplysninger.informasjon.modal.bolk1.avsnitt3" />
                </p>

                <Undertittel>
                    <FormattedMessage id="opplysninger.informasjon.modal.bolk2.tittel" />
                </Undertittel>
                <p>
                    <FormattedMessage id="opplysninger.informasjon.modal.bolk2.avsnitt1" />
                </p>

                <Undertittel>
                    <FormattedMessage id="opplysninger.informasjon.modal.bolk3.tittel" />
                </Undertittel>
                <p>
                    <FormattedMessage id="opplysninger.informasjon.modal.bolk3.avsnitt1" />
                </p>
            </div>
        </NavFrontendModal>
    );
};
