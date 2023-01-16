/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import {rest} from "msw";
import {faker} from "@faker-js/faker";

export const getHentNavEnheterMock = () =>
    Array.from({length: faker.datatype.number({min: 1, max: 10})}, (_, i) => i + 1).map(() => ({
        orgnr: faker.helpers.arrayElement([faker.random.word(), undefined]),
        enhetsnr: faker.helpers.arrayElement([faker.random.word(), undefined]),
        enhetsnavn: faker.random.word(),
        kommunenavn: faker.helpers.arrayElement([faker.random.word(), undefined]),
        kommuneNr: faker.helpers.arrayElement([faker.random.word(), undefined]),
        behandlingsansvarlig: faker.helpers.arrayElement([faker.random.word(), undefined]),
        valgt: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
        isMottakMidlertidigDeaktivert: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
        isMottakDeaktivert: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
    }));

export const getHentValgtNavEnhetMock = () => ({
    orgnr: faker.helpers.arrayElement([faker.random.word(), undefined]),
    enhetsnr: faker.helpers.arrayElement([faker.random.word(), undefined]),
    enhetsnavn: faker.random.word(),
    kommunenavn: faker.helpers.arrayElement([faker.random.word(), undefined]),
    kommuneNr: faker.helpers.arrayElement([faker.random.word(), undefined]),
    behandlingsansvarlig: faker.helpers.arrayElement([faker.random.word(), undefined]),
    valgt: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
    isMottakMidlertidigDeaktivert: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
    isMottakDeaktivert: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
});

export const getNavEnhetRessursMSW = () => [
    rest.get("*/soknader/:behandlingsId/personalia/navEnheter", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"), ctx.json(getHentNavEnheterMock()));
    }),
    rest.put("*/soknader/:behandlingsId/personalia/navEnheter", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
    }),
    rest.get("*/soknader/:behandlingsId/personalia/navEnhet", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"), ctx.json(getHentValgtNavEnhetMock()));
    }),
];
