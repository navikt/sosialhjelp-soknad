import * as React from "react";
import {FormattedMessage, useIntl} from "react-intl";
import {useSelector, useDispatch} from "react-redux";
import {finnValgtEnhetsNavn} from "../../data/kommuner";
import {Soknadsdata} from "../../redux/soknadsdata/soknadsdataReducer";
import {State} from "../../redux/reducers";
import {visSamtykkeInfo} from "../../redux/soknad/soknadActions";
import {Button, Modal} from "@navikt/ds-react";
import styled from "styled-components";

export const replaceNavkontor = (text: string, valgtEnhetsNavn?: string) => {
    // Hvis ikke valgtEnhetsNavn finnes, erstattes søkestrengen med capture-gruppa ([\w\s-]*)
    // som er 1 eller fler bokstaver, whitespace eller '-', feks "NAV-kontoret ditt" fra søknads-api-tekstene
    return text.replace(/{navkontor:([\w\s-]*)}/g, valgtEnhetsNavn ? valgtEnhetsNavn : "$1");
};
const getText = (soknadsdata: Soknadsdata, text: string) => {
    const valgtEnhetsNavn = finnValgtEnhetsNavn(soknadsdata);
    return replaceNavkontor(text, valgtEnhetsNavn);
};

const CenteredContent = styled.div`
    text-align: center;
`;

const BehandlingAvPersonopplysningerModal = () => {
    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const modalSynlig = useSelector((state: State) => state.soknad.visSamtykkeInfo);

    const intl = useIntl();

    const dispatch = useDispatch();

    const text = intl.messages["soknadsosialhjelp.forstesiden.bekreftInfoModal.body"].toString();
    return (
        <Modal
            open={modalSynlig || false}
            onClose={() => {
                dispatch(visSamtykkeInfo(false));
            }}
        >
            <Modal.Content>
                <div className="personopplysning_info">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: getText(soknadsdata, text),
                        }}
                    />
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

export default BehandlingAvPersonopplysningerModal;
