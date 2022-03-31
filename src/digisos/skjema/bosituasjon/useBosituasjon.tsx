import {fetchPut, fetchToJson} from "../../../nav-soknad/utils/rest-utils";
import useSWR from "swr";
import {SoknadsSti} from "../../redux/soknadsdata/soknadsdataReducer";
import {BosituasjonData, initialBosituasjonState} from "./bosituasjonTypes";
import {soknadsdataUrl} from "../../redux/soknadsdata/soknadsdataActions";

export const useBosituasjon = (behandlingsId: string) => {
    const soknadUrl = soknadsdataUrl(behandlingsId, SoknadsSti.BOSITUASJON);

    // Note: As I am using fallbackData to provide an initial value, `data` is never undefined, even though the
    // type system thinks it can be. Thus, I use `data!` to inform TypeScript that it can't be undefined.
    // See issue: https://github.com/vercel/swr/issues/1410
    const {data, error, mutate} = useSWR<BosituasjonData>([soknadUrl, true], fetchToJson, {
        fallbackData: initialBosituasjonState,
    });

    const putBosituasjon = async (newData: BosituasjonData) => {
        await fetchPut(soknadUrl, JSON.stringify(newData), true);
        return newData;
    };

    // Updates local bosituasjon state first, then stores it to server.
    const setBosituasjon = async (nyBosituasjon: Partial<BosituasjonData>) => {
        const newData = {...data!, ...nyBosituasjon};
        await mutate(putBosituasjon(newData), {optimisticData: newData});
    };

    return {
        bosituasjon: data!,
        setBosituasjon,
        isLoading: !error && !data,
        isError: error,
    };
};
