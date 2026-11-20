import {beforeEach, describe, expect, it, vi} from "vitest";
import {renderHook} from "@testing-library/react";
import {useUploadMode} from "./useUploadMode.ts";

const state = {newUpload: false, flag: false};
vi.mock("./useNewUploadEnabled.ts", () => ({useNewUploadEnabled: () => state.newUpload}));
vi.mock("../../../featuretoggles/context.tsx", () => ({useFlag: () => ({enabled: state.flag})}));

describe("useUploadMode", () => {
    beforeEach(() => Object.assign(state, {newUpload: false, flag: false}));
    it.each([
        [false, false, "tus"],
        [true, false, "tus"],
        [false, true, "tus"],
        [true, true, "sync"],
    ])("newUpload=%s flag=%s gir %s", (newUpload, flag, expected) => {
        Object.assign(state, {newUpload, flag});
        expect(renderHook(() => useUploadMode()).result.current).toBe(expected);
    });
});
