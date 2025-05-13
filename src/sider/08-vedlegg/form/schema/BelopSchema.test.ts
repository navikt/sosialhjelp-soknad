import {describe, it, expect} from "vitest";
import {BelopSchema} from "./BelopSchema.ts";
import {ValideringsFeilKode} from "../../../../lib/validering.ts";

describe("BelopSchema", () => {
    it("should parse valid numeric string", () => {
        const result = BelopSchema.safeParse("1234");
        expect(result.success).toBe(true);
        expect(result.data).toBe(1234);
    });

    it("should parse valid number", () => {
        const result = BelopSchema.safeParse(5678);
        expect(result.success).toBe(true);
        expect(result.data).toBe(5678);
    });

    it("should allow undefined", () => {
        const result = BelopSchema.safeParse(undefined);
        expect(result.success).toBe(true);
        expect(result.data).toBe(undefined);
    });

    it("should treat empty string as undefined", () => {
        const result = BelopSchema.safeParse("");
        expect(result.success).toBe(true);
        expect(result.data).toBe(undefined);
    });

    it("should fail on non-numeric string", () => {
        const result = BelopSchema.safeParse("abc");
        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toBe(ValideringsFeilKode.ER_TALL);
    });

    it("should fail on negative number", () => {
        const result = BelopSchema.safeParse(-100);
        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toBe(ValideringsFeilKode.ER_TALL);
    });

    it("should fail on negative number string", () => {
        const result = BelopSchema.safeParse("-1");
        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toBe(ValideringsFeilKode.ER_TALL);
    });

    it("should fail on null input", () => {
        const result = BelopSchema.safeParse(null);
        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toBe(ValideringsFeilKode.ER_TALL);
    });

    it("should fail on boolean input", () => {
        const result = BelopSchema.safeParse(true);
        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toBe(ValideringsFeilKode.ER_TALL);
    });

    it("should fail on object input", () => {
        const result = BelopSchema.safeParse({amount: 10});
        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toBe(ValideringsFeilKode.ER_TALL);
    });

    it("should fail on array input", () => {
        const result = BelopSchema.safeParse([10]);
        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toBe(ValideringsFeilKode.ER_TALL);
    });
});
