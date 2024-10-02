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
                console.log("before await sendSoknad");
                const {antallDokumenter} = await sendSoknad(behandlingsId);
                console.log("before try catch");
                try {
                    console.log("Before logging to Amplitude");
                    await logAmplitudeEvent("Søknad sendt", {
                        AntallDokumenterSendt: antallDokumenter,
                        KortSoknad: isKortSoknad ? "Ja" : "Nei",
                        EndrerSokerAdresse: endretAdresse ? "Ja" : "Nei",
                    }).then();
                    console.log("After logging to Amplitude");

                    // Navigate after logging completes
                    window.location.assign(`${digisosConfig.innsynURL}${behandlingsId}/status`);
                } catch (e: any) {
                    console.log("Error logging to Amplitude or navigating:", {
                        message: e.message,
                        code: e.code,
                        status: e.response?.status,
                        data: e.response?.data,
                        config: e.config, // Log the request configuration as well
                    });
                    setIsError(true);
                }
            } catch (e: any) {
                faro.api.pushError(e);
                console.log("inne error sending søknad:", {
                    message: e.message,
                    code: e.code,
                    status: e.response?.status,
                    data: e.response?.data,
                    config: e.config, // Log the request configuration as well
                });
                throw e;
            }
        } catch (e: any) {
            faro.api.pushError(e);
            console.log("ute error sending søknad:", {
                message: e.message,
                code: e.code,
                status: e.response?.status,
                data: e.response?.data,
                config: e.config, // Log the request configuration as well
            });
            setIsError(true);
            throw e;
        }
    };

    return {sendSoknad: sendSoknaden, isError};
};
