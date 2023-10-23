import {useTranslation} from "react-i18next";
import {useQueryClient} from "@tanstack/react-query";
import {useBehandlingsId} from "../../../lib/hooks/useBehandlingsId";
import {
    putSkatteetatenSamtykke,
    useHentSkattbareInntekter,
} from "../../../generated/skattbar-inntekt-ressurs/skattbar-inntekt-ressurs";
import {isValid} from "date-fns";
import {formatTidspunkt} from "../../../nav-soknad/utils";

export const useSkattData = () => {
    const {t} = useTranslation("skjema");

    const queryClient = useQueryClient();
    const behandlingsId = useBehandlingsId();

    const {data, isLoading, queryKey} = useHentSkattbareInntekter(behandlingsId);

    const setSamtykke = async (samtykke: boolean) => {
        queryClient.setQueryData(queryKey, await putSkatteetatenSamtykke(behandlingsId, {samtykke}));
    };

    const samtykke = data?.samtykke ?? null;

    const samtykkeTimestamp = new Date(data?.samtykkeTidspunkt!);
    const samtykkeTidspunkt = isValid(samtykkeTimestamp) ? formatTidspunkt(samtykkeTimestamp, t) : "";

    return {data, samtykke, samtykkeTidspunkt, isLoading, setSamtykke};
};
