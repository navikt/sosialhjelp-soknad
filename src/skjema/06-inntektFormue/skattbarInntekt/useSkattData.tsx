import {useTranslation} from "react-i18next";
import {useQueryClient} from "@tanstack/react-query";
import {useBehandlingsId} from "../../../lib/hooks/useBehandlingsId";
import {
    useHentSkattbareInntekter,
    usePutSkatteetatenSamtykke,
} from "../../../generated/skattbar-inntekt-ressurs/skattbar-inntekt-ressurs";
import {SkattbarInntektFrontend} from "../../../generated/model";
import {isValid} from "date-fns";
import {formatTidspunkt} from "../../../nav-soknad/utils";

export const useSkattData = () => {
    const {t} = useTranslation("skjema");

    const queryClient = useQueryClient();
    const behandlingsId = useBehandlingsId();

    const {data, isLoading: isFetching, queryKey} = useHentSkattbareInntekter(behandlingsId);
    const {mutate, isLoading: isMutating} = usePutSkatteetatenSamtykke();

    const updateCache = (data: SkattbarInntektFrontend) => queryClient.setQueryData(queryKey, data);
    const setSamtykke = (samtykke: boolean) =>
        mutate(
            {
                behandlingsId,
                data: {samtykke},
            },
            {onSuccess: updateCache}
        );
    const isLoading = isFetching || isMutating;
    const samtykke = data?.samtykke ?? null;

    const samtykkeTimestamp = new Date(data?.samtykkeTidspunkt!);
    const samtykkeTidspunkt = isValid(samtykkeTimestamp) ? formatTidspunkt(samtykkeTimestamp, t) : "";

    return {data, samtykke, samtykkeTidspunkt, isLoading, setSamtykke};
};
