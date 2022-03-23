import {fetchPut, fetchToJson} from "../../../nav-soknad/utils/rest-utils";
import useSWR from "swr";
import {SoknadsSti} from "../../redux/soknadsdata/soknadsdataReducer";
import {BosituasjonData} from "./bosituasjonTypes";
import {soknadsdataUrl} from "../../redux/soknadsdata/soknadsdataActions";

export const useBosituasjon = (behandlingsId: string) => {
    const {data, error, mutate} = useSWR<BosituasjonData>(
        [soknadsdataUrl(behandlingsId, SoknadsSti.BOSITUASJON), true],
        fetchToJson
    );

    const setBosituasjon = async (nySituasjon: Partial<BosituasjonData>) => {
        Object.assign(data, nySituasjon);
        await fetchPut(soknadsdataUrl(behandlingsId, SoknadsSti.BOSITUASJON), JSON.stringify(data), true);
        mutate(data);
    };

    return {
        bosituasjon: data,
        setBosituasjon,
        isLoading: !error && !data,
        isError: error,
    };
};
