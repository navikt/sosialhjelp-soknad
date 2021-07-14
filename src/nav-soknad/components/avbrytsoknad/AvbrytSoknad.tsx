import * as React from "react";
import NavFrontendModal from "nav-frontend-modal";
import {Innholdstittel, Normaltekst} from "nav-frontend-typografi";
import {Hovedknapp, Knapp} from "nav-frontend-knapper";
import {fortsettSoknad, slettSoknad} from "../../../digisos/redux/soknad/soknadActions";
import {FormattedMessage, useIntl} from "react-intl";
import {useDispatch, useSelector} from "react-redux";
import {navigerTilDittNav} from "../../../digisos/redux/navigasjon/navigasjonActions";
import {getContextPathForStaticContent} from "../../../configuration";
import {State} from "../../../digisos/redux/reducers";
import AlertStripe from "nav-frontend-alertstriper";

export const AvbrytSoknad = () => {
    const {behandlingsId, avbrytDialog, nedetid} = useSelector((state: State) => state.soknad);

    const dispatch = useDispatch();

    const intl = useIntl();

    const onAvbryt = () => {
        if (behandlingsId) {
            dispatch(slettSoknad(behandlingsId));
        }
    };

    const onFortsett = () => {
        dispatch(fortsettSoknad());
    };

    const onFortsettSenere = () => {
        dispatch(navigerTilDittNav());
    };

    return (
        <NavFrontendModal
            isOpen={avbrytDialog.synlig || false}
            contentLabel={intl.formatMessage({id: "avbryt.avbryt"})}
            onRequestClose={() => onFortsett()}
            shouldCloseOnOverlayClick={true}
        >
            <div className="avbrytmodal">
                <div className="avbrytmodal__infoikon_wrapper">
                    <img src={`${getContextPathForStaticContent()}/statisk/bilder/ikon_ark.svg`} alt={""} />
                </div>

                <Innholdstittel className="blokk-s avbrytmodal__overskrift">
                    <FormattedMessage id={"avbryt.overskrift"} />
                </Innholdstittel>
                <Normaltekst className="blokk-xxs avbrytmodal__tekst">
                    <FormattedMessage id={"avbryt.forklaring"} />
                </Normaltekst>
                {nedetid?.isPlanlagtNedetid && (
                    <AlertStripe type="info">
                        <FormattedMessage
                            id="nedetid.alertstripe.avbryt"
                            values={{
                                nedetidstart: nedetid?.nedetidStart,
                                nedetidslutt: nedetid?.nedetidSlutt,
                            }}
                        />
                    </AlertStripe>
                )}
                <div className="timeoutbox__knapperad">
                    <Hovedknapp type="hoved" onClick={() => onFortsettSenere()}>
                        <FormattedMessage id={"avbryt.fortsettsenere"} />
                    </Hovedknapp>
                    <Knapp type="hoved" onClick={() => onAvbryt()} className="avbrytmodal__slettknapp">
                        <FormattedMessage id={"avbryt.slett"} />
                    </Knapp>
                </div>
            </div>
        </NavFrontendModal>
    );
};
