import {renderHook, act} from "@testing-library/react-hooks";
import {useOpplysningMutation} from "./useOpplysningMutation";
import {useBehandlingsId} from "../common/useBehandlingsId";
import {useQueryClient} from "@tanstack/react-query";
import {logWarning} from "../../log/loggerUtils";
import {mergeRowUpdateIntoQueryData} from "./mergeRowUpdateIntoQueryData";
import {
    useHentOkonomiskeOpplysninger,
    useUpdateOkonomiskOpplysning,
} from "../../../generated/okonomiske-opplysninger-ressurs/okonomiske-opplysninger-ressurs";
import {vi, describe, beforeEach, afterEach, it, expect} from "vitest";

// Mock dependencies using vitest
vi.mock("../common/useBehandlingsId");
vi.mock("@tanstack/react-query");
vi.mock("../../log/loggerUtils");
vi.mock("./mergeRowUpdateIntoQueryData");
vi.mock("../../../generated/okonomiske-opplysninger-ressurs/okonomiske-opplysninger-ressurs");

describe("useOpplysningMutation", () => {
    let mockBehandlingsId: string;
    let mockServerMutation: ReturnType<typeof vi.fn>;
    let mockSetQueryData: ReturnType<typeof vi.fn>;
    let mockGetQueryData: ReturnType<typeof vi.fn>;
    let mockQueryKey: string[];
    let mockMergedData: {updatedData: string};

    beforeEach(() => {
        // Initializing common mock values
        mockBehandlingsId = "test-behandling-id";
        mockServerMutation = vi.fn();
        mockSetQueryData = vi.fn();
        mockGetQueryData = vi.fn();
        mockQueryKey = ["test-query-key"];
        mockMergedData = {updatedData: "test-updated-data"};

        (useBehandlingsId as ReturnType<typeof vi.fn>).mockReturnValue(mockBehandlingsId);
        (useUpdateOkonomiskOpplysning as ReturnType<typeof vi.fn>).mockReturnValue({
            mutate: mockServerMutation,
        });
        (useHentOkonomiskeOpplysninger as ReturnType<typeof vi.fn>).mockReturnValue({
            queryKey: mockQueryKey,
        });
        (useQueryClient as ReturnType<typeof vi.fn>).mockReturnValue({
            getQueryData: mockGetQueryData,
            setQueryData: mockSetQueryData,
        });
        (mergeRowUpdateIntoQueryData as ReturnType<typeof vi.fn>).mockReturnValue(mockMergedData);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    const renderAndMutate = (data: any) => {
        const {result} = renderHook(() => useOpplysningMutation());
        act(() => {
            result.current.mutateOpplysning(data);
        });
    };

    it("should update cache when mutateClientCache is called", () => {
        mockGetQueryData.mockReturnValue([{id: 1, data: "test-data"}]);

        renderAndMutate({id: 1, data: "updated-test-data"});

        expect(mockSetQueryData).toHaveBeenCalledWith(mockQueryKey, mockMergedData);
        expect(mockServerMutation).toHaveBeenCalledWith({
            behandlingsId: mockBehandlingsId,
            data: {id: 1, data: "updated-test-data"},
        });
    });

    it("should log warning if cache data is missing", () => {
        mockGetQueryData.mockReturnValue(undefined);

        renderAndMutate({id: 1, data: "updated-test-data"});

        expect(logWarning).toHaveBeenCalledWith(
            "burde ikke skje: forsøk på å oppdatere økonomiske opplysninger før de er hentet?"
        );
        expect(mockServerMutation).toHaveBeenCalledWith({
            behandlingsId: mockBehandlingsId,
            data: {id: 1, data: "updated-test-data"},
        });
    });

    it("should log error if mergeRowUpdateIntoQueryData throws", () => {
        mockGetQueryData.mockReturnValue([{id: 1, data: "test-data"}]);
        (mergeRowUpdateIntoQueryData as ReturnType<typeof vi.fn>).mockImplementation(() => {
            throw new Error("Test error");
        });

        renderAndMutate({id: 1, data: "updated-test-data"});

        expect(logWarning).toHaveBeenCalledWith(
            "Klarte ikke å oppdatere økonomiske opplysninger i cache: Error: Test error"
        );
        expect(mockServerMutation).toHaveBeenCalledWith({
            behandlingsId: mockBehandlingsId,
            data: {id: 1, data: "updated-test-data"},
        });
    });
});
