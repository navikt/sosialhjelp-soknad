import {capitalizeText} from "./stringUtils";

describe("stringUtils", () => {
    it("should capitalize first character", () => {
        expect(capitalizeText("one two three")).toBe("One Two Three");
    });
    it("should capitalize single character words", () => {
        expect(capitalizeText("a b c")).toBe("A B C");
    });
    it("should handle empty strings", () => {
        expect(capitalizeText("")).toBe("");
    });
});
