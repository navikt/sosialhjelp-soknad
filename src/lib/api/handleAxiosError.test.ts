import {beforeEach, describe, expect, it, vi} from "vitest";
import {handleAxiosError} from "./handleAxiosError.ts"; // adjust path
import axios, {AxiosError, AxiosHeaders, AxiosResponse} from "axios";
import {logger} from "@navikt/next-logger";

vi.mock("@navikt/next-logger", () => ({
    logger: {
        warn: vi.fn(),
        error: vi.fn(),
    },
}));

const withTimeout = <T>(promise: Promise<T>, timeoutMs = 200): Promise<T | "timeout"> =>
    Promise.race([promise, new Promise<"timeout">((resolve) => setTimeout(() => resolve("timeout"), timeoutMs))]);

const expectNeverResolves = async (promise: Promise<unknown>, ms = 50) => {
    if ((await withTimeout(promise, ms)) !== "timeout")
        throw new Error("Expected promise to never resolve, but it did.");
};

export const mockAxiosCancel = () => new axios.Cancel();

export const mockAxiosError = <T = never>(
    response: Pick<AxiosResponse<T>, "status" | "data"> | undefined,
    message: string = "Mocked request failure"
): AxiosError =>
    new AxiosError(
        message,
        `ERR_NETWORK`,
        {headers: new AxiosHeaders()},
        null,
        response as AxiosResponse<T> | undefined
    );

const mockLocationAssign = vi.fn();

beforeEach(() => {
    Object.defineProperty(window, "location", {
        writable: true,
        value: {
            assign: mockLocationAssign,
            pathname: "/some/path",
        },
    });

    vi.resetAllMocks();
});

const config = {method: "GET", url: "/api/data"};
const options = {};

describe("handleAxiosError", () => {
    it("ignores cancelled requests", async () => {
        await expectNeverResolves(handleAxiosError(config, options)(mockAxiosCancel()));
        expect(logger.warn).not.toHaveBeenCalled();
        expect(mockLocationAssign).not.toHaveBeenCalled();
    });

    it("logs non-Axios errors and never resolves", async () => {
        const error = new Error("boom");
        await expectNeverResolves(handleAxiosError(config, options)(error));
        expect(logger.warn).toHaveBeenCalledWith({error}, expect.stringContaining("non-AxiosError"));
    });

    it("throws for Axios errors with no response", async () => {
        const error = mockAxiosError(undefined, "Network error");
        await expect(() => handleAxiosError(config, options)(error)).rejects.toThrow();
        expect(logger.warn).toHaveBeenCalledWith(
            expect.objectContaining({method: "GET"}),
            expect.stringContaining("nettverksfeil")
        );
    });

    it("redirs to mock-alt login in case of UnauthorizedMelding", async () => {
        const error = mockAxiosError({status: 401, data: {loginUrl: "https://login.example.com"}});
        await expectNeverResolves(handleAxiosError(config, options)(error));
        expect(mockLocationAssign).toHaveBeenCalledWith(expect.stringContaining("https://login.example.com"));
    });

    it("redirs to wonderwall if 401 has no loginUrl", async () => {
        const error = mockAxiosError({status: 401, data: {}});
        await expectNeverResolves(handleAxiosError(config, options)(error));
        expect(mockLocationAssign).toHaveBeenCalledWith(expect.stringContaining("/sosialhjelp/soknad/oauth2/login"));
    });

    it("redirects on 403/404/410", async () => {
        for (const status of [403, 404, 410]) {
            const error = mockAxiosError({status, data: {}});
            await expectNeverResolves(handleAxiosError(config, options)(error));
            expect(mockLocationAssign).toHaveBeenCalledWith(`/sosialhjelp/soknad/informasjon?reason=axios${status}`);
        }
    });

    it("logs and rethrows other errors", async () => {
        const error = mockAxiosError({status: 500, data: undefined});
        await expect(() => handleAxiosError(config, options)(error)).rejects.toThrow();
        expect(logger.warn).toHaveBeenCalledWith(
            expect.objectContaining({status: 500}),
            expect.stringContaining("non-OK response in axiosInstance")
        );
    });
});
