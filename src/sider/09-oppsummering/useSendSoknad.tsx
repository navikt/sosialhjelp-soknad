import {useState} from "react";
import {sendSoknad} from "../../generated/soknad-actions/soknad-actions";
//import digisosConfig from "../../lib/config";
import {faro} from "@grafana/faro-react";
import {logAmplitudeEvent} from "../../lib/amplitude/Amplitude"; // Import the logging function

export const useSendSoknad = (behandlingsId: string) => {
    const [isError, setIsError] = useState<boolean>(false);

    logAmplitudeEvent("blir dette logget?");

    const sendSoknaden = async () => {
        setIsError(false);
        try {
            try {
                // Call the backend to send the application
                try {
                    console.log("send1");
                    const response = await sendSoknad(behandlingsId);
                    console.log("Response from sendSoknad:", response); // This will print if successful
                    const {id, antallDokumenter, kortSoknad} = response;
                    console.log("send2", id, antallDokumenter, kortSoknad); // Check destructuring

                    console.log("send3");
                    await logAmplitudeEvent("soknad_sendt", {antallDokumenter, kortSoknad});
                    console.log("send4");
                } catch (error) {
                    console.error("Caught Error:", error); // Catch any error and log it
                }
                // Log Amplitude Event
                console.log("send3");
                //await logAmplitudeEvent("soknad_sendt", {
                //    antallDokumenter,
                //    kortSoknad,
                //});
                //console.log("send4")

                // Redirect to status page after successful submission
                //window.location.assign(`${digisosConfig.innsynURL}${id}/status`);
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
