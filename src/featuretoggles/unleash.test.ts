import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";

const cookieValues = new Map<string, string>();

vi.mock("server-only", () => ({}));
vi.mock("next/server", () => ({connection: vi.fn(async () => undefined)}));
vi.mock("next/headers", () => ({
    cookies: vi.fn(async () => ({
        get: (name: string) => (cookieValues.has(name) ? {value: cookieValues.get(name)} : undefined),
    })),
}));
vi.mock("./toggles", () => ({
    UNLEASH_COOKIE_NAME: "unleash-session-id",
    EXPECTED_TOGGLES: ["sosialhjelp.soknad.test"],
}));
const getAndValidateDefinitions = vi.fn();
vi.mock("./definitions", () => ({getAndValidateDefinitions: () => getAndValidateDefinitions()}));

const importUnleash = async () => import("./unleash");

describe("getToggles", () => {
    beforeEach(() => {
        vi.resetModules();
        cookieValues.clear();
        getAndValidateDefinitions.mockReset();
    });
    afterEach(() => vi.unstubAllEnvs());

    it("slår på alle toggles lokalt og lar cookie overstyre", async () => {
        vi.stubEnv("NEXT_PUBLIC_DIGISOS_ENV", "localhost");
        cookieValues.set("sosialhjelp.soknad.test", "false");
        const {getToggles} = await importUnleash();

        expect(await getToggles()).toEqual([
            expect.objectContaining({name: "sosialhjelp.soknad.test", enabled: false}),
        ]);
        expect(getAndValidateDefinitions).not.toHaveBeenCalled();
    });

    it("ignorerer cookie og spør Unleash i prod", async () => {
        vi.stubEnv("NEXT_PUBLIC_DIGISOS_ENV", "prod");
        vi.stubEnv("NAIS_CLUSTER_NAME", "prod-gcp");
        cookieValues.set("sosialhjelp.soknad.test", "true");
        getAndValidateDefinitions.mockRejectedValue(new Error("nede"));
        const {getToggles} = await importUnleash();

        expect(await getToggles()).toEqual([
            expect.objectContaining({name: "sosialhjelp.soknad.test", enabled: false}),
        ]);
        expect(getAndValidateDefinitions).toHaveBeenCalled();
    });

    it("ignorerer cookie i prod-gcp selv om bygget sier mock", async () => {
        vi.stubEnv("NEXT_PUBLIC_DIGISOS_ENV", "mock");
        vi.stubEnv("NAIS_CLUSTER_NAME", "prod-gcp");
        cookieValues.set("sosialhjelp.soknad.test", "true");
        getAndValidateDefinitions.mockRejectedValue(new Error("nede"));
        const {getToggles} = await importUnleash();

        expect(await getToggles()).toEqual([expect.objectContaining({enabled: false})]);
    });

    it("slår på alle toggles i e2e", async () => {
        vi.stubEnv("NEXT_PUBLIC_DIGISOS_ENV", "e2e");
        const {getToggles} = await importUnleash();

        expect(await getToggles()).toEqual([expect.objectContaining({enabled: true})]);
    });
});

describe("getFlag", () => {
    it("gir avslått toggle når den mangler", async () => {
        const {getFlag} = await importUnleash();
        expect(getFlag("sosialhjelp.soknad.test" as never, []).enabled).toBe(false);
    });
});
