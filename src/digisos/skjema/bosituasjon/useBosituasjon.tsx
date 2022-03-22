import {determineCredentialsParameter, getApiBaseUrl, getCookie} from "../../../nav-soknad/utils/rest-utils";
import useSWR from "swr";
import {SoknadsSti} from "../../redux/soknadsdata/soknadsdataReducer";
import {BosituasjonData} from "./bosituasjonTypes";

const soknadsdataUrl = (brukerBehandlingId: string, sti: string): string => `soknader/${brukerBehandlingId}/${sti}`;

const getHeaders = (): Headers => {
    return new Headers({
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN-SOKNAD-API"),
        accept: "application/json, text/plain, */*",
    });
};

const fetcher = async (url: string) => {
    const res = await fetch(getApiBaseUrl(true) + url, {
        headers: getHeaders(),
        credentials: determineCredentialsParameter(),
    });
    return await res.json();
};

export const useBosituasjon = (behandlingsId: string) => {
    const {data, error} = useSWR<BosituasjonData>(soknadsdataUrl(behandlingsId, SoknadsSti.BOSITUASJON), fetcher);

    return {
        bosituasjon: data,
        isLoading: !error && !data,
        isError: error,
    };
};
