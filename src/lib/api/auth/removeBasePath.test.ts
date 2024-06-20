import {describe, it, expect} from "vitest";
import {removeBasePath} from "./removeBasePath";

interface TestCase {
    input: string | null;
    prefix: string;
    expected: string | null;
}

const testCases: TestCase[] = [
    {input: null, prefix: "/base", expected: null},
    {input: "/other/path", prefix: "/base", expected: "/other/path"},
    {input: "/base/path", prefix: "/base", expected: "/path"},
    {input: "/base", prefix: "/base", expected: null},
    {input: "/base/path", prefix: "/base/", expected: "path"},
    {input: "/base/path", prefix: "", expected: "/base/path"},
    {input: "", prefix: "/base", expected: null},
    {input: "/ba", prefix: "/base", expected: "/ba"},
    {input: "/base/base/path", prefix: "/base", expected: "/base/path"},
];

describe("removeBasePath", () => {
    testCases.forEach(({input, prefix, expected}) => {
        it(`should return ${expected} for input "${input}" with prefix "${prefix}"`, () => {
            expect(removeBasePath(input, prefix)).toBe(expected);
        });
    });
});
