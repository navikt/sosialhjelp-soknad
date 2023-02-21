import {addDays, subDays} from "date-fns";
import {filterAndSortPabegynteSoknader} from "./usePabegynteSoknader";
import {PabegyntSoknad} from "../generated/model";

describe("Util funksjoner for påbegynte søknader", () => {
    it("skal ikke kræsje på tomt array", () => {
        expect(filterAndSortPabegynteSoknader([], new Date())).toEqual([]);
    });

    it("skal mappe søknader riktig", () => {
        const sistOppdatert = subDays(new Date(), 1);
        const pabegynteSoknaderResponse: PabegyntSoknad[] = [
            {
                behandlingsId: "123",
                sistOppdatert: sistOppdatert.toISOString(),
            },
        ];
        const filtrerteSoknader = filterAndSortPabegynteSoknader(pabegynteSoknaderResponse, new Date());
        expect(filtrerteSoknader?.length).toBe(1);
        expect(filtrerteSoknader?.[0]).toEqual({
            behandlingsId: "123",
            lastUpdatedDate: sistOppdatert,
            deleteDate: addDays(sistOppdatert, 14),
        });
    });

    it("skal ikke returnere søknader eldre enn 14 dager", () => {
        const currentDate = new Date();
        const pabegynteSoknaderResponse: PabegyntSoknad[] = [
            {
                behandlingsId: "123",
                sistOppdatert: subDays(currentDate, 14).toISOString(),
            },
        ];
        const filtrerteSoknader = filterAndSortPabegynteSoknader(pabegynteSoknaderResponse, currentDate);
        expect(filtrerteSoknader?.length).toBe(0);
    });

    it("skal sortere påbegynte søknader med nyeste først", () => {
        const currentDate = new Date();
        const pabegynteSoknaderResponse: PabegyntSoknad[] = [
            {
                behandlingsId: "eldre",
                sistOppdatert: subDays(currentDate, 2).toISOString(),
            },
            {
                behandlingsId: "ny",
                sistOppdatert: subDays(currentDate, 1).toISOString(),
            },
        ];
        const filtrerteSoknader = filterAndSortPabegynteSoknader(pabegynteSoknaderResponse, currentDate);
        expect(filtrerteSoknader?.length).toBe(2);
        expect(filtrerteSoknader?.[0].behandlingsId).toBe("ny");
    });
});
