import {useEffect, useState} from "react";
import {sendSoknad} from "../../generated/soknad-actions/soknad-actions";
import digisosConfig from "../../lib/config";
import {faro} from "@grafana/faro-react";
import {logAmplitudeEvent} from "../../lib/amplitude/Amplitude.tsx";
import {useAdresser} from "../01-personalia/adresse/useAdresser.tsx";

export const useSendSoknad = (behandlingsId: string) => {
    const [isError, setIsError] = useState<boolean>(false);
    const {brukerdefinert} = useAdresser();
    const [endretAdresse, setEndretAdresse] = useState<boolean>(false);

    useEffect(() => {
        if (brukerdefinert) {
            setEndretAdresse(true);
        } else {
            setEndretAdresse(false);
        }
    }, [brukerdefinert]);

    const sendSoknaden = async (isKortSoknad: boolean) => {
        setIsError(false);
        try {
            try {
                const response = await sendSoknad(behandlingsId);
                const {id, antallDokumenter, sendtTil, forrigeSoknadSendt} = response;
                logAmplitudeEvent("Soknad sendt", {
                    id: id,
                    sendtTil: sendtTil,
                    forrigeSoknadSendt: forrigeSoknadSendt,
                    AntallDokumenterSendt: antallDokumenter,
                    KortSoknad: isKortSoknad ? "Ja" : "Nei",
                    EndrerSokerAdresse: endretAdresse ? "Ja" : "Nei",
                });
                window.location.assign(`${digisosConfig.innsynURL}${id}/status`);
            } catch (e: any) {
                faro.api.pushError(e);
                throw e;
            }
        } catch (e: any) {
            faro.api.pushError(e);
            setIsError(true);
        }
    };

    return {sendSoknad: sendSoknaden, isError};
};
