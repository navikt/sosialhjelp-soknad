/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import {rest} from "msw";
import {faker} from "@faker-js/faker";

export const getSendSoknadMock = () => ({
    sendtTil: faker.helpers.arrayElement([faker.random.word(), undefined]),
    id: faker.helpers.arrayElement([faker.random.word(), undefined]),
});

export const getSoknadActionsMSW = () => [
    rest.post("*/soknader/:behandlingsId/actions/send", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"), ctx.json(getSendSoknadMock()));
    }),
];
