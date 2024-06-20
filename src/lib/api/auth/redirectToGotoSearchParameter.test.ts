import {describe, it, expect, vi, beforeEach} from "vitest";
import {redirectToGotoSearchParameter} from "./redirectToGotoSearchParameter";
import {redirect} from "react-router-dom";
import {removeBasePath} from "./removeBasePath";

vi.mock("react-router-dom", () => ({
    redirect: vi.fn(),
}));

vi.mock("../../config", () => ({
    basePath: "/base",
}));

vi.mock("./removeBasePath", () => ({
    removeBasePath: vi.fn(),
}));

interface TestCase {
    search: string;
    removeBasePathResult: string | null;
    expectedRedirect: string;
}

const testCases: TestCase[] = [
    {search: "?goto=/base/path", removeBasePathResult: "/path", expectedRedirect: "/path"},
    {search: "?goto=/other/path", removeBasePathResult: "/other/path", expectedRedirect: "/other/path"},
    {search: "?goto=/base", removeBasePathResult: null, expectedRedirect: "/"},
    {search: "?goto=", removeBasePathResult: null, expectedRedirect: "/"},
    {search: "", removeBasePathResult: null, expectedRedirect: "/"},
];

describe("redirectToGotoSearchParameter", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    testCases.forEach(({search, removeBasePathResult, expectedRedirect}) => {
        it(`should redirect to ${expectedRedirect} for search string "${search}" and removeBasePathResult "${removeBasePathResult}"`, async () => {
            Object.defineProperty(window, "location", {value: {search: search}, writable: true});

            // @ts-expect-error - We are mocking the function
            removeBasePath.mockReturnValue(removeBasePathResult);
            await redirectToGotoSearchParameter();
            expect(redirect).toHaveBeenCalledWith(expectedRedirect);
        });
    });
});
