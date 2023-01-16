/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import {rest} from "msw";
import {faker} from "@faker-js/faker";

export const getGetUtslagskriterierMock = () => ({
    clcz3q95l0002ecs97sxn9rnz: {},
});

export const getHentTeksterMock = () => ({
    clcz3q95m0003ecs99t376j2x: faker.random.word(),
});

export const getHentPabegynteSoknaderMock = () =>
    Array.from({length: faker.datatype.number({min: 1, max: 10})}, (_, i) => i + 1).map(() => ({
        sistOppdatert: faker.random.word(),
        behandlingsId: faker.random.word(),
    }));

export const getHentKommunestatusMock = () => ({
    clcz3q95n0004ecs97sdacg6g: {
        kommunenummer: faker.random.word(),
        kanMottaSoknader: faker.datatype.boolean(),
        kanOppdatereStatus: faker.datatype.boolean(),
        harMidlertidigDeaktivertMottak: faker.datatype.boolean(),
        harMidlertidigDeaktivertOppdateringer: faker.datatype.boolean(),
        harNksTilgang: faker.datatype.boolean(),
        behandlingsansvarlig: faker.helpers.arrayElement([faker.random.word(), undefined]),
        kontaktPersoner: faker.helpers.arrayElement([
            {
                fagansvarligEpost: Array.from({length: faker.datatype.number({min: 1, max: 10})}, (_, i) => i + 1).map(
                    () => faker.random.word()
                ),
                tekniskAnsvarligEpost: Array.from(
                    {length: faker.datatype.number({min: 1, max: 10})},
                    (_, i) => i + 1
                ).map(() => faker.random.word()),
            },
            undefined,
        ]),
    },
});

export const getTriggeKommuneloggMock = () => faker.random.word();

export const getHarNyligInnsendteSoknaderMock = () => ({
    antallNyligInnsendte: faker.datatype.number({min: undefined, max: undefined}),
});

export const getHentFornavnMock = () => ({
    clcz3q95o0005ecs916jw9vpd: faker.random.word(),
});

export const getAdresseSokMock = () =>
    Array.from({length: faker.datatype.number({min: 1, max: 10})}, (_, i) => i + 1).map(() => ({
        adresse: faker.helpers.arrayElement([faker.random.word(), undefined]),
        husnummer: faker.helpers.arrayElement([faker.random.word(), undefined]),
        husbokstav: faker.helpers.arrayElement([faker.random.word(), undefined]),
        kommunenummer: faker.helpers.arrayElement([faker.random.word(), undefined]),
        kommunenavn: faker.helpers.arrayElement([faker.random.word(), undefined]),
        postnummer: faker.helpers.arrayElement([faker.random.word(), undefined]),
        poststed: faker.helpers.arrayElement([faker.random.word(), undefined]),
        geografiskTilknytning: faker.helpers.arrayElement([faker.random.word(), undefined]),
        gatekode: faker.helpers.arrayElement([faker.random.word(), undefined]),
        bydel: faker.helpers.arrayElement([faker.random.word(), undefined]),
        type: faker.helpers.arrayElement(["GATEADRESSE", "MATRIKKELADRESSE"]),
    }));

export const getInformasjonRessursMSW = () => [
    rest.post("*/informasjon/actions/logg", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
    }),
    rest.get("*/informasjon/utslagskriterier/sosialhjelp", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"), ctx.json(getGetUtslagskriterierMock()));
    }),
    rest.get("*/informasjon/tekster", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"), ctx.json(getHentTeksterMock()));
    }),
    rest.get("*/informasjon/pabegynteSoknader", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"), ctx.json(getHentPabegynteSoknaderMock()));
    }),
    rest.get("*/informasjon/kommunestatus", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"), ctx.json(getHentKommunestatusMock()));
    }),
    rest.get("*/informasjon/kommunelogg", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"), ctx.json(getTriggeKommuneloggMock()));
    }),
    rest.get("*/informasjon/harNyligInnsendteSoknader", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"), ctx.json(getHarNyligInnsendteSoknaderMock()));
    }),
    rest.get("*/informasjon/fornavn", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"), ctx.json(getHentFornavnMock()));
    }),
    rest.get("*/informasjon/adressesok", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"), ctx.json(getAdresseSokMock()));
    }),
];
