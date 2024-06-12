import {useQueryClient} from "@tanstack/react-query";
import {useBehandlingsId} from "../common/useBehandlingsId";
import {
    putSkatteetatenSamtykke,
    useHentSkattbareInntekter,
} from "../../../generated/skattbar-inntekt-ressurs/skattbar-inntekt-ressurs";
import {isValid} from "date-fns";
import {formatTidspunkt} from "../../utils";

export const useSkattData = () => {
    const queryClient = useQueryClient();
    const behandlingsId = useBehandlingsId();

    const {data, isLoading, queryKey} = useHentSkattbareInntekter(behandlingsId);

    const setSamtykke = async (samtykke: boolean) => {
        queryClient.setQueryData(queryKey, await putSkatteetatenSamtykke(behandlingsId, {samtykke}));
    };

    const samtykke = data?.samtykke ?? null;
    const samtykkeTimestamp = new Date(data?.samtykkeTidspunkt ?? "");
    const samtykkeTidspunkt = isValid(samtykkeTimestamp) ? formatTidspunkt(samtykkeTimestamp) : "";
    const inntekt = data?.inntektFraSkatteetaten;
    const isError = !!data?.inntektFraSkatteetatenFeilet || (samtykke && samtykkeTidspunkt === "");

    return {inntekt, isError, samtykke, samtykkeTidspunkt, isLoading, setSamtykke};
};
