/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import {rest} from "msw";
import {faker} from "@faker-js/faker";

export const getHentBasisPersonaliaMock = () => ({
    navn: {
        fornavn: faker.helpers.arrayElement([faker.random.word(), undefined]),
        mellomnavn: faker.helpers.arrayElement([faker.random.word(), undefined]),
        etternavn: faker.helpers.arrayElement([faker.random.word(), undefined]),
        fulltNavn: faker.helpers.arrayElement([faker.random.word(), undefined]),
    },
    fornavn: faker.random.word(),
    fulltNavn: faker.random.word(),
    fodselsnummer: faker.helpers.arrayElement([faker.random.word(), undefined]),
    statsborgerskap: faker.helpers.arrayElement([faker.random.word(), undefined]),
    nordiskBorger: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
});

export const getBasisPersonaliaRessursMSW = () => [
    rest.get("*/soknader/:behandlingsId/personalia/basisPersonalia", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"), ctx.json(getHentBasisPersonaliaMock()));
    }),
];
