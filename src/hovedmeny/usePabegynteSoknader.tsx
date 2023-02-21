import {useHentPabegynteSoknader} from "../generated/informasjon-ressurs/informasjon-ressurs";
import {add, isAfter} from "date-fns";
import {PabegyntSoknad} from "../generated/model";

export const DAYS_BEFORE_DELETION = 14;

export interface PabegyntSoknadData {
    behandlingsId: string;
    lastUpdatedDate: Date;
    deleteDate: Date;
}

export const filterAndSortPabegynteSoknader = (
    pabegynteSoknader: PabegyntSoknad[] | undefined,
    currentDate: Date
): PabegyntSoknadData[] | undefined =>
    pabegynteSoknader
        ?.map((soknad) => ({
            behandlingsId: soknad.behandlingsId,
            lastUpdatedDate: new Date(soknad.sistOppdatert),
            deleteDate: add(new Date(soknad.sistOppdatert), {days: DAYS_BEFORE_DELETION}),
        }))
        .filter((soknad) => isAfter(add(soknad.lastUpdatedDate, {days: DAYS_BEFORE_DELETION}), currentDate))
        .sort((firstItem, secondItem) => {
            if (isAfter(firstItem.lastUpdatedDate, secondItem.lastUpdatedDate)) {
                return -1;
            }
            return 1;
        });

export const usePabegynteSoknader = () => {
    const {data: pabegynteSoknaderResponse} = useHentPabegynteSoknader();
    return filterAndSortPabegynteSoknader(pabegynteSoknaderResponse, new Date());
};
