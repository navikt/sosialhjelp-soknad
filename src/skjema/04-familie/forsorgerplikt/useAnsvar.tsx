import {useForsorgerplikt} from "./useForsorgerplikt";

export const useAnsvar = (barnIndex: number) => {
    const {forsorgerplikt, setBarn, isPending} = useForsorgerplikt();

    const ansvar = forsorgerplikt?.ansvar[barnIndex];
    const setSamvaersgrad = async (samvaersgrad?: number) => {
        if (!ansvar) return;
        await setBarn(barnIndex, samvaersgrad);
    };

    const setHarDeltBosted = async (harDeltBosted?: boolean) => {
        if (!ansvar) return;
        await setBarn(barnIndex, undefined, harDeltBosted);
    };

    return {ansvar, setSamvaersgrad, setHarDeltBosted, isPending};
};
