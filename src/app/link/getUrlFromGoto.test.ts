import {describe, it, expect, vi} from "vitest";
import {BASE_PATH} from "../../lib/constants";
import {logger} from "@navikt/next-logger";
import {getUrlFromGoto} from "./getUrlFromGoto.ts";

vi.mock("@navikt/next-logger");

describe("getGotoParam", () => {
    it("should return BASE_PATH if gotoParam is null", () => {
        expect(getUrlFromGoto(null)).toBe(BASE_PATH);
    });

    it("should return BASE_PATH if gotoParam is an empty string", () => {
        expect(getUrlFromGoto("")).toBe(BASE_PATH);
    });

    it("should return BASE_PATH if gotoParam is /", () => {
        expect(getUrlFromGoto("/")).toBe(BASE_PATH);
        expect(logger.warn).toHaveBeenCalledWith(`/link got goto=/, redirecting to ${BASE_PATH}`);
    });

    it("should return the gotoParam without trailing slash if provided", () => {
        expect(getUrlFromGoto("/example/path/")).toBe("/example/path");
    });

    it("should return BASE_PATH if gotoParam is '/link' to prevent infinite redirect loop", () => {
        expect(getUrlFromGoto(`${BASE_PATH}/link`)).toBe(BASE_PATH);
        expect(logger.warn).toHaveBeenCalledWith(`infinite redirect loop detected, redirecting to ${BASE_PATH}`);
    });

    it("should return the gotoParam if it is not '/link' and does not end with a trailing slash", () => {
        expect(getUrlFromGoto("/another/path")).toBe("/another/path");
    });
});
