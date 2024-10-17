import {useBehandlingsId} from "../common/useBehandlingsId";
import {useQueryClient} from "@tanstack/react-query";
import {updateUtbetalinger, useHentUtbetalinger} from "../../../generated/utbetaling-ressurs/utbetaling-ressurs";
import {UtbetalingerFrontend} from "../../../generated/model";

export const useUtbetalinger = () => {
    const behandlingsId = useBehandlingsId();
    const queryClient = useQueryClient();
    const {data: utbetalinger, queryKey} = useHentUtbetalinger(behandlingsId);

    const setBekreftelse = async (bekreftelse: boolean) => {
        if (!utbetalinger) return;
        const oppdatert = {...utbetalinger};
        oppdatert.bekreftelse = bekreftelse;

        if (!bekreftelse) {
            oppdatert.salg = false;
            oppdatert.utbytte = false;
            oppdatert.forsikring = false;
            oppdatert.annet = false;
            oppdatert.beskrivelseAvAnnet = "";
        }

        await updateUtbetalinger(behandlingsId, oppdatert);
        queryClient.setQueryData(queryKey, oppdatert);
    };

    const setUtbetalinger = async (valg: (keyof UtbetalingerFrontend)[]) => {
        if (!utbetalinger) return;

        const oppdatert: UtbetalingerFrontend = {
            ...utbetalinger,
            utbytte: valg.includes("utbytte"),
            salg: valg.includes("salg"),
            forsikring: valg.includes("forsikring"),
            annet: valg.includes("annet"),
            beskrivelseAvAnnet: valg.includes("annet") ? utbetalinger.beskrivelseAvAnnet : "",
        };

        await updateUtbetalinger(behandlingsId, oppdatert);
        queryClient.setQueryData(queryKey, oppdatert);
    };

    const setBeskrivelseAvAnnet = async (beskrivelseAvAnnet: string) => {
        if (!utbetalinger) return;
        const oppdatert = {...utbetalinger, beskrivelseAvAnnet};
        await updateUtbetalinger(behandlingsId, oppdatert);
        queryClient.setQueryData(queryKey, oppdatert);
    };

    return {utbetalinger, setBekreftelse, setUtbetalinger, setBeskrivelseAvAnnet};
};
