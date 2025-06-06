import {describe, it, expect, vi, afterEach} from "vitest";
import {handleSessionCheck} from "./useDecoratorLogin";

const mocked = vi.hoisted(() => {
    return {
        getSessionInfo: vi.fn(),
    };
});

vi.mock("../../../generated/informasjon-ressurs/informasjon-ressurs.ts", () => ({
    getSessionInfo: mocked.getSessionInfo,
}));

describe("handleSessionCheck", () => {
    afterEach(() => {
        vi.clearAllMocks();
        vi.unstubAllGlobals();
    });
    it("should return early if isEnabled is false", async () => {
        const setIsLoading = vi.fn();
        const router = {replace: vi.fn()};

        // @ts-expect-error Not fully mocked object
        await handleSessionCheck(false, setIsLoading, router);

        expect(setIsLoading).not.toHaveBeenCalled();
        expect(router.replace).not.toHaveBeenCalled();
    });

    it("should route on 401 from /session", async () => {
        const setIsLoading = vi.fn();
        const router = {replace: vi.fn()};
        const fetchMock = vi.fn(() => Promise.resolve({status: 401}));

        vi.stubGlobal("fetch", fetchMock);

        // @ts-expect-error Not fully mocked object
        await handleSessionCheck(true, setIsLoading, router);

        expect(setIsLoading).toHaveBeenCalledWith(true);
        expect(router.replace).toHaveBeenCalledWith(
            "https://login.ekstern.dev.nav.no/oauth2/login?redirect=http://localhost:3000/"
        );
    });

    it("should replace and return when session is inactive", async () => {
        const setIsLoading = vi.fn();
        const router = {replace: vi.fn()};
        const fetchMock = vi.fn(() =>
            Promise.resolve({
                status: 200,
                json: () => Promise.resolve({session: {active: false}}),
            })
        );

        vi.stubGlobal("fetch", fetchMock);

        // @ts-expect-error Not fully mocked object
        await handleSessionCheck(true, setIsLoading, router);

        expect(setIsLoading).toHaveBeenCalledWith(true);
        expect(router.replace).toHaveBeenCalledWith(
            "https://login.ekstern.dev.nav.no/oauth2/login?redirect=http://localhost:3000/"
        );
    });

    it("should redirect to logout if dekorator session and soknad session do not match", async () => {
        const setIsLoading = vi.fn();
        const router = {replace: vi.fn()};
        const fetchMock = vi
            .fn()
            .mockResolvedValueOnce(
                Promise.resolve({status: 200, json: () => Promise.resolve({session: {active: true}})})
            )
            .mockResolvedValueOnce(
                Promise.resolve({
                    status: 200,
                    ok: true,
                    json: () => Promise.resolve({userId: "12345"}),
                })
            );
        vi.stubGlobal("fetch", fetchMock);

        // Mock getSessionInfo to return a different personId
        mocked.getSessionInfo.mockReturnValue(Promise.resolve({personId: "67890"}));

        // @ts-expect-error Not fully mocked object
        await handleSessionCheck(true, setIsLoading, router);

        expect(setIsLoading).toHaveBeenCalledWith(true);
        expect(router.replace).toHaveBeenCalledWith("");
    });

    it("should not replace if everything looks good", async () => {
        let isLoading = false;
        const obj = {
            setIsLoading: (loading: boolean) => {
                isLoading = loading;
            },
        };
        const setLoadingSpy = vi.spyOn(obj, "setIsLoading");
        const router = {replace: vi.fn()};
        const fetchMock = vi
            .fn()
            .mockResolvedValueOnce(
                Promise.resolve({status: 200, json: () => Promise.resolve({session: {active: true}})})
            )
            .mockResolvedValueOnce(
                Promise.resolve({
                    status: 200,
                    ok: true,
                    json: () => Promise.resolve({userId: "12345"}),
                })
            );
        vi.stubGlobal("fetch", fetchMock);

        // Mock getSessionInfo to return the same personId
        mocked.getSessionInfo.mockReturnValue(Promise.resolve({personId: "12345"}));

        // @ts-expect-error Not fully mocked object
        await handleSessionCheck(true, setLoadingSpy, router);

        expect(setLoadingSpy).toHaveBeenCalledWith(true);
        expect(setLoadingSpy).toHaveBeenCalledWith(false);
        expect(isLoading).toBe(false);
        expect(router.replace).not.toHaveBeenCalled();
    });
});
