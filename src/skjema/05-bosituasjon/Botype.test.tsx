import {waitFor} from "@testing-library/react";
import Botype from "./Botype";
import {setupServer} from "msw/node";
import {rest} from "msw";
import {soknadsdataUrl} from "../../digisos/redux/soknadsdata/soknadsdataActions";
import {SoknadsSti} from "../../digisos/redux/soknadsdata/soknadsdataReducer";
import "@testing-library/jest-dom/extend-expect";
import {BosituasjonData} from "./bosituasjonTypes";
import {render} from "../../test/test-utils";
import {baseURL} from "../../lib/config";

const mockGET = <T,>(url: string, mockData: Partial<T>) => {
    return rest.get(url, (_req, res, ctx) => res(ctx.json(mockData)));
};

const bosituasjonUrl = (behandlingsId: string) => baseURL + soknadsdataUrl(behandlingsId, SoknadsSti.BOSITUASJON);

const server = setupServer(
    mockGET<BosituasjonData>(bosituasjonUrl("botypeEier"), {botype: "eier", antallPersoner: null}),
    mockGET<BosituasjonData>(bosituasjonUrl("botypeLeier"), {botype: "leier", antallPersoner: null}),
    mockGET<BosituasjonData>(bosituasjonUrl("botypeAnnet"), {botype: "annet", antallPersoner: null}),
    mockGET<BosituasjonData>(bosituasjonUrl("botypeFengsel"), {botype: "fengsel", antallPersoner: null}),
    mockGET<BosituasjonData>(bosituasjonUrl("ingenBotype"), {botype: null, antallPersoner: null})
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Eier is checked if botype = 'eier'", async () => {
    const {getByRole} = render(<Botype />);

    await waitFor(() => expect(getByRole("radio", {name: "Jeg bor i bolig jeg eier selv"})).toBeChecked());
    await waitFor(() => expect(getByRole("radio", {name: "Jeg leier privat bolig"})).not.toBeChecked());
});

test("Eier is not checked if botype = 'leier'", async () => {
    const {getByRole} = render(<Botype />);

    await waitFor(() => expect(getByRole("radio", {name: "Jeg bor i bolig jeg eier selv"})).not.toBeChecked());
    await waitFor(() => expect(getByRole("radio", {name: "Jeg leier privat bolig"})).toBeChecked());
});

test("None checked if botype = null", async () => {
    const {queryByRole} = render(<Botype />);

    await waitFor(() => expect(queryByRole("radio", {checked: true})).toBeNull());
});

test("Annet submenu not in document if botype = leier", async () => {
    const {queryByText} = render(<Botype />);

    await waitFor(() => expect(queryByText("Vil du utdype?", {selector: "legend"})).not.toBeInTheDocument());
});

test("Annet submenu in document if botype = annet", async () => {
    const {getByText} = render(<Botype />);

    await waitFor(() => expect(getByText("Vil du utdype?", {selector: "legend"})).toBeInTheDocument());
});

test("Annet submenu in document if botype = fengsel", async () => {
    const {getByText} = render(<Botype />);

    await waitFor(() => expect(getByText("Vil du utdype?", {selector: "legend"})).toBeInTheDocument());
});
