import {fetchPut, fetchToJson} from "../../../nav-soknad/utils/rest-utils";
import useSWR from "swr";
import {SoknadsSti} from "../../redux/soknadsdata/soknadsdataReducer";
import {BosituasjonData} from "./bosituasjonTypes";
import {soknadsdataUrl} from "../../redux/soknadsdata/soknadsdataActions";

export const useBosituasjon = (behandlingsId: string) => {
    const soknadUrl = soknadsdataUrl(behandlingsId, SoknadsSti.BOSITUASJON);

    const {data, error, mutate} = useSWR<BosituasjonData>([soknadUrl, true], fetchToJson);

    // Updates local bosituasjon state first, then stores it to server.
    const setBosituasjon = async (nyBosituasjon: Partial<BosituasjonData>) => {
        const updatedBosituasjon = {...(data as BosituasjonData), ...nyBosituasjon};
        await mutate(
            async (dataPayload) => {
                await fetchPut(soknadUrl, JSON.stringify(dataPayload), true);
                // The put doesn't return anything, so we just return what we got back.
                return dataPayload;
            },
            // We assume the request succeeded and use the new data until fetchPut resolves
            {optimisticData: updatedBosituasjon}
        );
    };

    return {
        bosituasjon: data,
        setBosituasjon,
        isLoading: !error && !data,
        isError: error,
    };
};
