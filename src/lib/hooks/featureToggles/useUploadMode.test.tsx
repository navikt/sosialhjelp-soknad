import {beforeEach, describe, expect, it, vi} from "vitest";
import {renderHook} from "@testing-library/react";
import {useUploadMode} from "./useUploadMode.ts";

const state = {flag: false};
vi.mock("../../../featuretoggles/context.tsx", () => ({useFlag: () => ({enabled: state.flag})}));

describe("useUploadMode", () => {
    beforeEach(() => Object.assign(state, {flag: false}));
    it.each([
        [false, "tus"],
        [true, "sync"],
    ])("flag=%s gir %s", (flag, expected) => {
        Object.assign(state, {flag});
        expect(renderHook(() => useUploadMode()).result.current).toBe(expected);
    });
});
