import {useEffect, useState} from "react";
import {sendSoknad} from "../../generated/soknad-actions/soknad-actions";
import digisosConfig from "../../lib/config";
import {faro} from "@grafana/faro-react";
import {logAmplitudeEvent} from "../../lib/amplitude/Amplitude.tsx";
import {useAdresser} from "../01-personalia/adresse/useAdresser.tsx";
import {useContextFeatureToggles} from "../../lib/providers/useContextFeatureToggles.ts";

export const useSendSoknad = (behandlingsId: string) => {
    const [isError, setIsError] = useState<boolean>(false);
    const {brukerAdresse} = useAdresser();
    const [endretAdresse, setEndretAdresse] = useState<boolean>(false);

    const featureFlagData = useContextFeatureToggles();

    useEffect(() => {
        if (brukerAdresse) {
            setEndretAdresse(true);
        } else {
            setEndretAdresse(false);
        }
    }, [brukerAdresse]);

    const sendSoknaden = async (
        isKortSoknad: boolean,
        selectedKategorier: string[] | undefined,
        situasjonEndret: string | undefined
    ) => {
        setIsError(false);
        const {id, antallDokumenter, forrigeSoknadSendt} = await sendSoknad(behandlingsId);
        const shouldAddParam = featureFlagData?.["sosialhjelp.innsyn.uxsignals_kort_soknad"] && isKortSoknad;
        try {
            await logAmplitudeEvent("Søknad sendt", {
                AntallDokumenterSendt: antallDokumenter,
                KortSoknad: isKortSoknad ? "Ja" : "Nei",
                EndrerSokerAdresse: endretAdresse ? "Ja" : "Nei",
                forrigeSoknadSendt: forrigeSoknadSendt,
                kategorier: selectedKategorier?.length ? "Ja" : "Ikke utfylt",
                valgteKategorier: selectedKategorier?.length ? selectedKategorier : "Ikke utfylt",
                situasjonEndret: situasjonEndret !== "Ikke utfylt" ? "Ja" : "Ikke utfylt",
            });
            window.location.assign(
                `${digisosConfig.innsynURL}/${id}/status${shouldAddParam ? "?kortSoknad=true" : ""}`
            );
        } catch (e: any) {
            faro.api.pushError(e);
            setIsError(true);
            throw e;
        }
    };
    return {sendSoknad: sendSoknaden, isError};
};
