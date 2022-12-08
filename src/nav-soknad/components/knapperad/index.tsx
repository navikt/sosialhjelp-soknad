import * as React from "react";
import {getIntlTextOrKey} from "../../utils";
import {useIntl} from "react-intl";
import {Button, Loader} from "@navikt/ds-react";

interface Props {
    gaViderePending?: boolean;
    sendSoknadServiceUnavailable?: boolean;
    gaVidereLabel?: string;
    gaVidere?: () => void;
    gaTilbake?: () => void;
    avbryt?: () => void;
    lastOppVedleggPending?: boolean;
}

const SkjemaKnapperad: React.FC<Props> = ({
    gaViderePending,
    sendSoknadServiceUnavailable,
    gaVidere,
    gaTilbake,
    avbryt,
    gaVidereLabel,
    lastOppVedleggPending,
}) => {
    const intl = useIntl();
    const loading = gaViderePending || lastOppVedleggPending;
    const forwardInhibited = loading || sendSoknadServiceUnavailable;
    const backwardInhibited = loading || !gaTilbake;

    return (
        <div className="skjema-knapperad ikke-juridisk-tekst">
            <Button variant="primary" id="gaa_videre_button" onClick={gaVidere} disabled={forwardInhibited}>
                {gaVidereLabel ? gaVidereLabel : getIntlTextOrKey(intl, "skjema.knapper.gaavidere")}
                {loading && <Loader />}
            </Button>
            <Button variant="primary" id="gaa_tilbake_button" onClick={gaTilbake} disabled={backwardInhibited}>
                {getIntlTextOrKey(intl, "skjema.knapper.tilbake")}
                {lastOppVedleggPending && <Loader />}
            </Button>
            <Button onClick={gaViderePending ? undefined : avbryt} variant="tertiary">
                {getIntlTextOrKey(intl, "skjema.knapper.avbryt")}
            </Button>
        </div>
    );
};

export default SkjemaKnapperad;
