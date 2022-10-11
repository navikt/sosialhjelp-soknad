import {add, isAfter} from "date-fns";
import {PabegynteSoknaderResponse} from "../redux/soknad/soknadTypes";

export const DAYS_BEFORE_DELETION = 14;

export const filterAndSortPabegynteSoknader = (pabegynteSoknader: PabegynteSoknaderResponse[], currentDate: Date) => {
    return pabegynteSoknader
        .map((soknad) => ({
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
};
