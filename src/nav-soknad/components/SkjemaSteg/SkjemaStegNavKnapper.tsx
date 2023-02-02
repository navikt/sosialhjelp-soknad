import * as React from "react";
import {getIntlTextOrKey} from "../../utils";
import {FormattedMessage, useIntl} from "react-intl";
import {Button, Loader} from "@navikt/ds-react";
import {visAvbrytSoknadModal} from "../../../digisos/redux/soknad/soknadActions";
import {useDispatch} from "react-redux";
import {minSideUrl} from "../avbrytsoknad/AvbrytSoknad";

interface SkjemaStegNavigasjonProps {
    gaViderePending?: boolean;
    sendSoknadServiceUnavailable?: boolean;
    gaVidereLabel?: string;
    gaVidere?: () => void;
    gaTilbake?: () => void;
    lastOppVedleggPending?: boolean;
}

export const SkjemaStegNavKnapper = ({
    gaViderePending,
    sendSoknadServiceUnavailable,
    gaVidere,
    gaTilbake,
    gaVidereLabel,
    lastOppVedleggPending,
}: SkjemaStegNavigasjonProps) => {
    const dispatch = useDispatch();
    const intl = useIntl();

    const loading = gaViderePending || lastOppVedleggPending;
    const forwardInhibited = loading || sendSoknadServiceUnavailable;
    const backwardInhibited = loading || !gaTilbake;

    return (
        <div className={"space-y-8 lg:space-y-16 pt-2 md:pt-5 lg:pt-10 pb-8 lg:pb-16"}>
            <div className="space-x-3">
                <Button variant="secondary" id="gaa_tilbake_button" onClick={gaTilbake} disabled={backwardInhibited}>
                    {getIntlTextOrKey(intl, "skjema.knapper.tilbake")}
                    {lastOppVedleggPending && <Loader />}
                </Button>
                <Button variant="primary" id="gaa_videre_button" onClick={gaVidere} disabled={forwardInhibited}>
                    {gaVidereLabel ? gaVidereLabel : getIntlTextOrKey(intl, "skjema.knapper.gaavidere")}
                    {loading && <Loader />}
                </Button>
            </div>
            <div>
                <Button variant="tertiary" onClick={() => (window.location.href = minSideUrl)}>
                    <FormattedMessage id={"avbryt.fortsettsenere"} />
                </Button>
                <Button variant="tertiary" onClick={() => dispatch(visAvbrytSoknadModal())}>
                    <FormattedMessage id={"avbryt.slett"} />
                </Button>
            </div>
        </div>
    );
};

export default SkjemaStegNavKnapper;
