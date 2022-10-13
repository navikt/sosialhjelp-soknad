import * as React from "react";
import {FormattedMessage, useIntl} from "react-intl";
import {useSelector, useDispatch} from "react-redux";
import {State} from "../../redux/reducers";
import {setVisPersondataModal} from "../../redux/soknad/soknadActions";
import {Button, Modal} from "@navikt/ds-react";

const PersonopplysningerUtfyllendeModal = () => {
    const {visPersondataModal} = useSelector((state: State) => state.soknad);

    const intl = useIntl();

    const dispatch = useDispatch();

    return (
        <Modal open={visPersondataModal} onClose={() => dispatch(setVisPersondataModal(false))}>
            <Modal.Content>
                <div
                    style={{maxWidth: "800px", margin: "2rem"}}
                    dangerouslySetInnerHTML={{
                        __html: intl.formatMessage({id: "soknadsosialhjelp.forstesiden.bekreftInfoModal.body"}),
                    }}
                />
                <div style={{textAlign: "center"}}>
                    <Button variant="primary" onClick={() => dispatch(setVisPersondataModal(false))}>
                        <FormattedMessage id={"soknadsosialhjelp.forstesiden.bekreftInfoModal.lukk"} />
                    </Button>
                </div>
            </Modal.Content>
        </Modal>
    );
};

export default PersonopplysningerUtfyllendeModal;
