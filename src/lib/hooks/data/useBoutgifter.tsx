import {useBehandlingsId} from "../common/useBehandlingsId";
import {useQueryClient} from "@tanstack/react-query";
import {updateBoutgifter, useHentBoutgifter} from "../../../generated/boutgift-ressurs/boutgift-ressurs";
import {BoutgifterFrontend} from "../../../generated/model";

export const useBoutgifter = () => {
    const behandlingsId = useBehandlingsId();
    const queryClient = useQueryClient();
    const {data: boutgifter, queryKey} = useHentBoutgifter(behandlingsId);

    const setBoutgifter = async (
        valg: (keyof Omit<BoutgifterFrontend, "bekreftelse" | "skalViseInfoVedBekreftelse">)[]
    ) => {
        if (!boutgifter) return;

        const oppdatert = {
            ...boutgifter,
            husleie: valg.includes("husleie"),
            strom: valg.includes("strom"),
            kommunalAvgift: valg.includes("kommunalAvgift"),
            oppvarming: valg.includes("oppvarming"),
            boliglan: valg.includes("boliglan"),
            annet: valg.includes("annet"),
            bekreftelse: !!valg.length,
        };

        await updateBoutgifter(behandlingsId, oppdatert);
        queryClient.setQueryData(queryKey, oppdatert);
    };

    return {boutgifter, setBoutgifter};
};
