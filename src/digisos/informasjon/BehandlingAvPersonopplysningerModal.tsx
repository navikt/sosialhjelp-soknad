import * as React from "react";
import NavFrontendModal from "nav-frontend-modal";
import {FormattedMessage, useIntl} from "react-intl";
import {useSelector, useDispatch} from "react-redux";
import {Knapp} from "nav-frontend-knapper";
import {finnValgtEnhetsNavn} from "../data/kommuner";
import {Soknadsdata} from "../redux/soknadsdata/soknadsdataReducer";
import {State} from "../redux/reducers";
import {visSamtykkeInfo} from "../redux/soknad/soknadActions";

export const replaceNavkontor = (text: string, valgtEnhetsNavn?: string) => {
    // Hvis ikke valgtEnhetsNavn finnes, erstattes søkestrengen med capture-gruppa ([\w\s-]*)
    // som er 1 eller fler bokstaver, whitespace eller '-', feks "NAV-kontoret ditt" fra søknads-api-tekstene
    return text.replace(/{navkontor:([\w\s-]*)}/g, valgtEnhetsNavn ? valgtEnhetsNavn : "$1");
};
const getText = (soknadsdata: Soknadsdata, text: string) => {
    const valgtEnhetsNavn = finnValgtEnhetsNavn(soknadsdata);
    return replaceNavkontor(text, valgtEnhetsNavn);
};

const BehandlingAvPersonopplysningerModal = () => {
    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const modalSynlig = useSelector((state: State) => state.soknad.visSamtykkeInfo);

    const intl = useIntl();

    const dispatch = useDispatch();

    const text = intl.messages["soknadsosialhjelp.forstesiden.bekreftInfoModal.body"].toString();
    return (
        <NavFrontendModal
            isOpen={modalSynlig || false}
            contentLabel={intl.formatMessage({
                id: "avbryt.avbryt",
            })}
            closeButton={true}
            onRequestClose={() => {
                dispatch(visSamtykkeInfo(false));
            }}
            style={{
                content: {
                    overflowY: "auto",
                },
            }}
        >
            <div className="personopplysning_info">
                <div
                    dangerouslySetInnerHTML={{
                        __html: getText(soknadsdata, text),
                    }}
                />
            </div>

            <div className="behandlingAvPersonopplysningerModal--lukke-knapp">
                <Knapp
                    htmlType="button"
                    type="hoved"
                    onClick={() => {
                        dispatch(visSamtykkeInfo(false));
                    }}
                >
                    <FormattedMessage id={"soknadsosialhjelp.forstesiden.bekreftInfoModal.lukk"} />
                </Knapp>
            </div>
        </NavFrontendModal>
    );
};

export default BehandlingAvPersonopplysningerModal;
