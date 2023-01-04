import * as React from "react";
import {getIntlTextOrKey} from "../../utils";
import {FormattedMessage, useIntl} from "react-intl";
import {Button, Loader} from "@navikt/ds-react";
import {slettSoknad} from "../../../lib/slettSoknad";
import {fortsettSoknad, setShowServerError} from "../../../digisos/redux/soknad/soknadActions";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../../digisos/redux/reducers";
import {useSoknad} from "../../../digisos/redux/soknad/useSoknad";
import {minSideUrl} from "../avbrytsoknad/AvbrytSoknad";

interface SkjemaStegNavigasjonProps {
    gaViderePending?: boolean;
    sendSoknadServiceUnavailable?: boolean;
    gaVidereLabel?: string;
    gaVidere?: () => void;
    gaTilbake?: () => void;
    avbryt?: () => void;
    lastOppVedleggPending?: boolean;
}

export const SkjemaStegNavKnapper = ({
    gaViderePending,
    sendSoknadServiceUnavailable,
    gaVidere,
    gaTilbake,
    avbryt,
    gaVidereLabel,
    lastOppVedleggPending,
}: SkjemaStegNavigasjonProps) => {
    const {behandlingsId} = useSoknad();

    const dispatch = useDispatch();
    const intl = useIntl();

    const loading = gaViderePending || lastOppVedleggPending;
    const forwardInhibited = loading || sendSoknadServiceUnavailable;
    const backwardInhibited = loading || !gaTilbake;

    const onAvbrytSlett = async () => {
        if (!behandlingsId) return;
        if (!(await slettSoknad(behandlingsId))) {
            dispatch(setShowServerError(true));
        } else {
            window.location.href = minSideUrl;
        }
    };

    const onAvbrytFortsettSenere = () => {
        window.location.href = minSideUrl;
    };

    return (
        <div className={"space-y-16 px-6 pt-10"}>
            <div className="space-x-3">
                <Button variant="primary" id="gaa_tilbake_button" onClick={gaTilbake} disabled={backwardInhibited}>
                    {getIntlTextOrKey(intl, "skjema.knapper.tilbake")}
                    {lastOppVedleggPending && <Loader />}
                </Button>
                <Button variant="primary" id="gaa_videre_button" onClick={gaVidere} disabled={forwardInhibited}>
                    {gaVidereLabel ? gaVidereLabel : getIntlTextOrKey(intl, "skjema.knapper.gaavidere")}
                    {loading && <Loader />}
                </Button>
            </div>
            <Button variant="tertiary" onClick={onAvbrytFortsettSenere}>
                <FormattedMessage id={"avbryt.fortsettsenere"} />
            </Button>
            <Button variant="tertiary" onClick={onAvbrytSlett}>
                <FormattedMessage id={"avbryt.slett"} />
            </Button>
        </div>
    );
};

export default SkjemaStegNavKnapper;
