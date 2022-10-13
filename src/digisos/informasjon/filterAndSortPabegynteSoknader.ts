import {add, compareDesc, isAfter} from "date-fns";
import {PabegynteSoknaderResponse} from "../redux/soknad/soknadTypes";

export const DAYS_BEFORE_DELETION = 14;

const expiryDate = (sistOppdatert: Date) => add(sistOppdatert, {days: DAYS_BEFORE_DELETION});

export const filterAndSortPabegynteSoknader = (pabegynteSoknader: PabegynteSoknaderResponse[], now: Date) =>
    pabegynteSoknader
        .map((soknad) => {
            const sistOppdatert = new Date(soknad.sistOppdatert);

            return {
                ...soknad,
                sistOppdatert,
                deleteDate: expiryDate(sistOppdatert),
            };
        })
        .filter(({sistOppdatert}) => isAfter(expiryDate(sistOppdatert), now))
        .sort((a, b) => compareDesc(a.sistOppdatert, b.sistOppdatert));
