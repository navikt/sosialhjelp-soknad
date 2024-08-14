import {useBehandlingsId} from "../common/useBehandlingsId";
import {useQueryClient} from "@tanstack/react-query";
import {updateBarneutgifter, useHentBarneutgifter} from "../../../generated/barneutgift-ressurs/barneutgift-ressurs";
import {BarneutgifterFrontend} from "../../../generated/model";

export const useBarneutgifter = () => {
    const behandlingsId = useBehandlingsId();
    const queryClient = useQueryClient();
    const {data: barneutgifter, queryKey} = useHentBarneutgifter(behandlingsId);

    const setBarneutgifter = async (
        valg: (keyof Omit<BarneutgifterFrontend, "bekreftelse" | "harForsorgerplikt">)[]
    ) => {
        if (!barneutgifter) return;

        const oppdatert = {
            ...barneutgifter,
            fritidsaktiviteter: valg.includes("fritidsaktiviteter"),
            barnehage: valg.includes("barnehage"),
            sfo: valg.includes("sfo"),
            tannregulering: valg.includes("tannregulering"),
            annet: valg.includes("annet"),
        };

        await updateBarneutgifter(behandlingsId, oppdatert);
        queryClient.setQueryData(queryKey, oppdatert);
    };

    const setBekreftelse = async (bekreftelse: boolean) => {
        if (!barneutgifter) return;

        const oppdatert = {
            ...barneutgifter,
            bekreftelse: bekreftelse,
        };

        queryClient.setQueryData(queryKey, oppdatert);
        await updateBarneutgifter(behandlingsId, oppdatert);
    };

    return {barneutgifter, setBarneutgifter, setBekreftelse};
};
