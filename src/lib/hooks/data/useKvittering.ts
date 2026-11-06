import {useHentKvittering} from "../../../generated";

const delTidspunkt = (tidspunkt: string): {dato: string; klokkeslett: string} | undefined => {
    const match = tidspunkt.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
    if (!match) return undefined;
    const [, aar, maaned, dag, time, minutt] = match;
    return {dato: `${dag}.${maaned}.${aar}`, klokkeslett: `${time}:${minutt}`};
};

export const useKvittering = (digisosId: string) => {
    const {data, isPending, isError, error} = useHentKvittering(digisosId, {query: {retry: 0}});

    return {
        tidspunktSendt: data ? delTidspunkt(data.tidspunktSendt) : undefined,
        soknadPdfUrl: data?.soknadPdfUrl,
        isPending,
        isError,
        error,
    };
};
