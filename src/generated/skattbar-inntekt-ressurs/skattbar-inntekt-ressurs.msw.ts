/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import {rest} from "msw";
import {faker} from "@faker-js/faker";

export const getHentSkattbareInntekterMock = () => ({
    inntektFraSkatteetaten: faker.helpers.arrayElement([
        Array.from({length: faker.datatype.number({min: 1, max: 10})}, (_, i) => i + 1).map(() => ({
            organisasjoner: faker.helpers.arrayElement([
                Array.from({length: faker.datatype.number({min: 1, max: 10})}, (_, i) => i + 1).map(() => ({
                    utbetalinger: faker.helpers.arrayElement([
                        Array.from({length: faker.datatype.number({min: 1, max: 10})}, (_, i) => i + 1).map(() => ({
                            brutto: faker.helpers.arrayElement([
                                faker.datatype.number({min: undefined, max: undefined}),
                                undefined,
                            ]),
                            forskuddstrekk: faker.helpers.arrayElement([
                                faker.datatype.number({min: undefined, max: undefined}),
                                undefined,
                            ]),
                            tittel: faker.helpers.arrayElement([faker.random.word(), undefined]),
                        })),
                        undefined,
                    ]),
                    organisasjonsnavn: faker.helpers.arrayElement([faker.random.word(), undefined]),
                    orgnr: faker.helpers.arrayElement([faker.random.word(), undefined]),
                    fom: faker.helpers.arrayElement([faker.random.word(), undefined]),
                    tom: faker.helpers.arrayElement([faker.random.word(), undefined]),
                })),
                undefined,
            ]),
        })),
        undefined,
    ]),
    inntektFraSkatteetatenFeilet: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
    samtykke: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
    samtykkeTidspunkt: faker.helpers.arrayElement([faker.random.word(), undefined]),
});

export const getSkattbarInntektRessursMSW = () => [
    rest.post("*/soknader/:behandlingsId/inntekt/skattbarinntektogforskuddstrekk/samtykke", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
    }),
    rest.get("*/soknader/:behandlingsId/inntekt/skattbarinntektogforskuddstrekk", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"), ctx.json(getHentSkattbareInntekterMock()));
    }),
];
