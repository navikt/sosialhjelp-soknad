import {useBehandlingsId} from "../common/useBehandlingsId";
import {useFeatureFlags} from "../../featureFlags";
import * as React from "react";
import {useEffect} from "react";
import {hentBegrunnelse, updateBegrunnelse} from "../../../generated/begrunnelse-ressurs/begrunnelse-ressurs";
import {BegrunnelseFrontend} from "../../../generated/model";
import {logAmplitudeEvent} from "../../utils/amplitude";
import {faro} from "@grafana/faro-react";

export const useBegrunnelse = () => {
    const behandlingsId = useBehandlingsId();
    const {begrunnelseNyTekst} = useFeatureFlags();
    const [isError, setIsError] = React.useState(false);

    const hent = () => hentBegrunnelse(behandlingsId);
    const lagre = async (data: BegrunnelseFrontend) => {
        logAmplitudeEvent("begrunnelse fullført", {
            hvaLengde: (Math.round((data?.hvaSokesOm?.length ?? 0) / 20) - 1) * 20,
            hvorforLengde: (Math.round((data?.hvorforSoke?.length ?? 0) / 20) - 1) * 20,
            begrunnelseNyTekst,
        });

        try {
            await updateBegrunnelse(behandlingsId, data);
        } catch (e) {
            setIsError(true);
            faro.api.pushError(e);
        }
    };

    useEffect(() => {
        logAmplitudeEvent("begrunnelse åpnet", {begrunnelseNyTekst});
    }, [begrunnelseNyTekst]);

    return {
        hent,
        lagre,
        isError,
    };
};
