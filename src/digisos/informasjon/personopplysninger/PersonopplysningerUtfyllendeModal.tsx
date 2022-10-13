import * as React from "react";
import {FormattedMessage, useIntl} from "react-intl";
import {useSelector, useDispatch} from "react-redux";
import {State} from "../../redux/reducers";
import {visSamtykkeInfo} from "../../redux/soknad/soknadActions";
import {Button, Modal} from "@navikt/ds-react";
import styled from "styled-components";

const CenteredContent = styled.div`
    text-align: center;
`;

const PersonopplysningerUtfyllendeModal = () => {
    const modalSynlig = useSelector((state: State) => state.soknad.visSamtykkeInfo);

    const intl = useIntl();

    const dispatch = useDispatch();

    const __html = intl.messages["soknadsosialhjelp.forstesiden.bekreftInfoModal.body"].toString();
    return (
        <Modal
            open={modalSynlig || false}
            onClose={() => {
                dispatch(visSamtykkeInfo(false));
            }}
        >
            <Modal.Content>
                <div className="personopplysning_info">
                    <div dangerouslySetInnerHTML={{__html}} />
                </div>

                <CenteredContent>
                    <Button
                        variant="primary"
                        onClick={() => {
                            dispatch(visSamtykkeInfo(false));
                        }}
                    >
                        <FormattedMessage id={"soknadsosialhjelp.forstesiden.bekreftInfoModal.lukk"} />
                    </Button>
                </CenteredContent>
            </Modal.Content>
        </Modal>
    );
};

export default PersonopplysningerUtfyllendeModal;
