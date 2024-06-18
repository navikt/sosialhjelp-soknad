import {describe, it, expect} from "vitest";
import {linkPagePath} from "../../config";
import {buildGotoSearchParameter} from "./buildGotoSearchParameter";

describe("buildGotoSearchParameter", () => {
    const testCases = [
        {
            description: 'should set the "goto" parameter to the pathname when not on a redirect page',
            location: {pathname: "/some/path", search: ""},
            expectedGoto: "/some/path",
        },
        {
            description: 'should keep the original "goto" parameter if on a redirect page',
            location: {pathname: linkPagePath, search: "?goto=/original/path"},
            expectedGoto: "/original/path",
        },
        {
            description:
                'should set the "goto" parameter to the pathname if on a redirect page but no underlying "goto"',
            location: {pathname: linkPagePath, search: ""},
            expectedGoto: linkPagePath,
        },
        {
            description:
                'should set the "goto" parameter to the pathname if not on a redirect page, even with a "goto" parameter in search',
            location: {pathname: "/some/path", search: "?goto=/some/other/path"},
            expectedGoto: "/some/path",
        },
        {
            description: "should handle pathname with special characters",
            location: {pathname: "/some/path with spaces", search: ""},
            expectedGoto: "/some/path%20with%20spaces",
        },
        {
            description: "should handle search params with special characters",
            location: {pathname: linkPagePath, search: "?goto=/path/with%20special%20characters"},
            expectedGoto: "/path/with%20special%20characters",
        },
        {
            description: "should handle empty pathname",
            location: {pathname: "", search: ""},
            expectedGoto: "",
        },
        {
            description: "should handle empty search and non-empty pathname",
            location: {pathname: "/non-empty", search: ""},
            expectedGoto: "/non-empty",
        },
        {
            description: 'should handle multiple search params and override "goto" parameter',
            location: {pathname: "/some/path", search: "?param1=value1&goto=/original/path&param2=value2"},
            expectedGoto: "/some/path",
        },
        {
            description: 'should return only the "goto" parameter in the result',
            location: {pathname: "/some/path", search: "?param1=value1&param2=value2"},
            expectedGoto: "/some/path",
        },
    ];

    testCases.forEach(({description, location, expectedGoto}) => {
        it(description, () => {
            const result = buildGotoSearchParameter(location);
            const params = new URLSearchParams(result);

            expect(params.get("goto")).toBe(decodeURIComponent(expectedGoto)); // Ensure correct decoding
            expect(Array.from(params.entries()).length).toBe(1); // Ensure only the "goto" parameter is present
        });
    });
});
