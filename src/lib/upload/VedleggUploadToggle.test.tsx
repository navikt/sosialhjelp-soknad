import {beforeEach, describe, expect, it, vi} from "vitest";
import {render, waitFor} from "@testing-library/react";
import {NextIntlClientProvider} from "next-intl";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {DocumentProvider} from "./DocumentContext.tsx";
import {VedleggUpload} from "./VedleggUpload.tsx";
import {DokumentasjonDtoType} from "../../generated/model";
import nb from "../../../messages/nb.json";

vi.mock("../hooks/dokumentasjon/useAlleredeLevert.ts", () => ({
    default: () => ({alleredeLevert: false, updateAlleredeLevert: vi.fn()}),
}));
vi.mock("./AlreadyUploadedCheckbox.tsx", () => ({AlreadyUploadedCheckbox: () => null}));
const eventSource = vi.fn();

const renderIt = (mode: "tus" | "sync") =>
    render(
        <QueryClientProvider client={new QueryClient()}>
            <NextIntlClientProvider locale="nb" messages={nb}>
                <DocumentProvider contextId="ctx" mode={mode}>
                    <VedleggUpload
                        kategori={"k" as unknown as DokumentasjonDtoType}
                        soknadId="s1"
                        contextId="ctx"
                        label="Last opp"
                        fileListHeadingLevel="3"
                    />
                </DocumentProvider>
            </NextIntlClientProvider>
        </QueryClientProvider>
    );

describe("VedleggUpload modus", () => {
    const fetchMock = vi.fn();
    beforeEach(() => {
        fetchMock.mockReset();
        eventSource.mockReset();
        fetchMock.mockResolvedValue(new Response(JSON.stringify({submissionId: "", uploads: []}), {status: 200}));
        vi.stubGlobal("fetch", fetchMock);
        vi.stubGlobal(
            "EventSource",
            class {
                constructor(url: string) {
                    eventSource(url);
                }
                close() {}
            }
        );
        vi.stubGlobal("matchMedia", (q: string) => ({
            matches: false,
            media: q,
            addEventListener() {},
            removeEventListener() {},
            addListener() {},
            removeListener() {},
        }));
    });

    it("tus (toggle av): ingen fetch mot /submission eller /files, bruker EventSource", async () => {
        renderIt("tus");
        await waitFor(() => expect(eventSource).toHaveBeenCalled());
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it("sync (toggle på): henter status og bruker ikke EventSource", async () => {
        renderIt("sync");
        await waitFor(() => expect(fetchMock).toHaveBeenCalled());
        expect(fetchMock.mock.calls[0][0]).toMatch(/\/submission\/context\/ctx$/);
        expect(eventSource).not.toHaveBeenCalled();
    });
});
