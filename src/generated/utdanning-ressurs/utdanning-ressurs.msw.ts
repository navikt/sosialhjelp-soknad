/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import {rest} from "msw";
import {faker} from "@faker-js/faker";

export const getHentUtdanningMock = () => ({
    erStudent: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
    studengradErHeltid: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
});

export const getUtdanningRessursMSW = () => [
    rest.get("*/soknader/:behandlingsId/utdanning", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"), ctx.json(getHentUtdanningMock()));
    }),
    rest.put("*/soknader/:behandlingsId/utdanning", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
    }),
];
