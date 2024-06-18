import {describe, it, expect} from "vitest";
import {humanizeFilesize} from "./humanizeFilesize";

describe("humanizeFilesize", () => {
    it("should return empty string when input is null", () => {
        expect(humanizeFilesize(null)).toBe("");
    });

    it('should return "0 bytes" when input is 0', () => {
        expect(humanizeFilesize(0)).toBe("0 bytes");
    });

    it("should correctly humanize sizes in bytes", () => {
        expect(humanizeFilesize(1)).toBe("1 byte");
        expect(humanizeFilesize(2)).toBe("2 bytes");
        expect(humanizeFilesize(1023)).toBe("1023 bytes");
    });

    it("should correctly humanize sizes in kibibytes", () => {
        expect(humanizeFilesize(1024)).toBe("1 KiB");
        expect(humanizeFilesize(1024 * 1.5)).toBe("1.5 KiB");
        expect(humanizeFilesize(1024 * 1023)).toBe("1023 KiB");
    });

    it("should correctly humanize sizes in mebibytes", () => {
        expect(humanizeFilesize(Math.pow(1024, 2))).toBe("1 MiB");
        expect(humanizeFilesize(Math.pow(1024, 2) * 1.5)).toBe("1.5 MiB");
        expect(humanizeFilesize(Math.pow(1024, 2) * 1023)).toBe("1023 MiB");
    });

    it("should correctly humanize sizes in gibibytes", () => {
        expect(humanizeFilesize(Math.pow(1024, 3))).toBe("1 GiB");
        expect(humanizeFilesize(Math.pow(1024, 3) * 1.5)).toBe("1.5 GiB");
        expect(humanizeFilesize(Math.pow(1024, 3) * 1023)).toBe("1023 GiB");
    });

    it("should correctly humanize sizes in tebibytes", () => {
        expect(humanizeFilesize(Math.pow(1024, 4))).toBe("1 TiB");
        expect(humanizeFilesize(Math.pow(1024, 4) * 1.5)).toBe("1.5 TiB");
        expect(humanizeFilesize(Math.pow(1024, 4) * 1023)).toBe("1023 TiB");
    });

    it("should correctly humanize sizes in pebibytes", () => {
        expect(humanizeFilesize(Math.pow(1024, 5))).toBe("1 PiB");
        expect(humanizeFilesize(Math.pow(1024, 5) * 1.5)).toBe("1.5 PiB");
        expect(humanizeFilesize(Math.pow(1024, 5) * 1023)).toBe("1023 PiB");
    });

    it("should correctly humanize sizes in exbibytes", () => {
        expect(humanizeFilesize(Math.pow(1024, 6))).toBe("1 EiB");
        expect(humanizeFilesize(Math.pow(1024, 6) * 1.5)).toBe("1.5 EiB");
        expect(humanizeFilesize(Math.pow(1024, 6) * 1023)).toBe("1023 EiB");
    });

    it("should correctly humanize sizes in zebibytes", () => {
        expect(humanizeFilesize(Math.pow(1024, 7))).toBe("1 ZiB");
        expect(humanizeFilesize(Math.pow(1024, 7) * 1.5)).toBe("1.5 ZiB");
        expect(humanizeFilesize(Math.pow(1024, 7) * 1023)).toBe("1023 ZiB");
    });

    it("should correctly humanize sizes in yobibytes", () => {
        expect(humanizeFilesize(Math.pow(1024, 8))).toBe("1 YiB");
        expect(humanizeFilesize(Math.pow(1024, 8) * 1.5)).toBe("1.5 YiB");
        expect(humanizeFilesize(Math.pow(1024, 8) * 1023)).toBe("1023 YiB");
    });

    it("should handle extremely large sizes beyond Yottabytes", () => {
        const veryLargeNumber = Math.pow(1024, 9) * 1.5;
        expect(humanizeFilesize(veryLargeNumber)).toBe("1536 YiB");
    });

    it("should handle edge case where bytes is 1", () => {
        expect(humanizeFilesize(1)).toBe("1 byte");
    });
});
