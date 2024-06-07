import {describe, it, expect} from "vitest";
import {buildRedirectUrl, LocationFragment} from "./buildRedirectUrl";
import {linkPagePath} from "../../config";

describe("buildRedirectUrl", () => {
    describe("when making link-redirect url", () => {
        it("should preserve the goto parameter", () => {
            const locationFragment: LocationFragment = {
                origin: "https://example.com",
                pathname: linkPagePath,
                search: "?param1=value1&goto=destination",
            };

            const result = buildRedirectUrl(locationFragment);
            expect(result).toBe("https://example.com/sosialhjelp/soknad/link?goto=destination");
        });

        it("should construct URL correctly without goto parameter", () => {
            const locationFragment: LocationFragment = {
                origin: "https://example.com",
                pathname: linkPagePath,
                search: "?param1=value1",
            };

            const result = buildRedirectUrl(locationFragment);
            expect(result).toBe("https://example.com/sosialhjelp/soknad/link");
        });

        it("should handle empty search string", () => {
            const locationFragment: LocationFragment = {
                origin: "https://example.com",
                pathname: linkPagePath,
                search: "",
            };

            const result = buildRedirectUrl(locationFragment);
            expect(result).toBe("https://example.com/sosialhjelp/soknadlink");
        });
    });

    describe("when making general redirect url", () => {
        it("should construct the correct URL without search parameters", () => {
            const locationFragment: LocationFragment = {
                origin: "https://example.com",
                pathname: "/somepath",
                search: "",
            };

            const result = buildRedirectUrl(locationFragment);
            expect(result).toBe("https://example.com/somepath");
        });

        it("should omit all search values", () => {
            const locationFragment: LocationFragment = {
                origin: "https://example.com",
                pathname: "/somepath",
                search: "?param1=value1&param2=value2",
            };

            const result = buildRedirectUrl(locationFragment);
            expect(result).toBe("https://example.com/somepath");
        });

        it("should ignore the goto parameter when pathname is not /link", () => {
            const locationFragment: LocationFragment = {
                origin: "https://example.com",
                pathname: "/other",
                search: "?param1=value1&goto=destination",
            };

            const result = buildRedirectUrl(locationFragment);
            expect(result).toBe("https://example.com/other");
        });

        it("should handle complex URLs with multiple path segments and query parameters", () => {
            const locationFragment: LocationFragment = {
                origin: "https://example.com",
                pathname: "/complex/path/with/more/segments",
                search: "?param1=value1&goto=destination&param2=value2",
            };

            const result = buildRedirectUrl(locationFragment);
            expect(result).toBe("https://example.com/complex/path/with/more/segments");
        });

        it("should return correct URL when search string is null", () => {
            const locationFragment: LocationFragment = {
                origin: "https://example.com",
                pathname: "/somepath",
                search: "",
            };

            const result = buildRedirectUrl(locationFragment);
            expect(result).toBe("https://example.com/somepath");
        });
    });
});
