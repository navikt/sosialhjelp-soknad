/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import {rest} from "msw";
import {faker} from "@faker-js/faker";

export const getFeatureTogglesMock = () => ({
    clcz3q95q0006ecs9eglf9uxo: faker.datatype.boolean(),
});

export const getFeatureToggleRessursMSW = () => [
    rest.get("*/feature-toggle", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"), ctx.json(getFeatureTogglesMock()));
    }),
];
