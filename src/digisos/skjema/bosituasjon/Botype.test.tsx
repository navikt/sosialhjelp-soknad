import {waitFor} from "@testing-library/react";
import Botype from "./Botype";
import {setupServer} from "msw/node";
import {rest} from "msw";
import {soknadsdataUrl} from "../../redux/soknadsdata/soknadsdataActions";
import {SoknadsSti} from "../../redux/soknadsdata/soknadsdataReducer";
import "@testing-library/jest-dom/extend-expect";
import {BosituasjonData} from "./bosituasjonTypes";
import {getApiBaseUrl} from "../../../nav-soknad/utils/rest-utils";
import {render} from "../../../test/test-utils";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const endpoint = (behandlingsID: string, mockData: Partial<BosituasjonData>) =>
    rest.get(getApiBaseUrl(true) + soknadsdataUrl(behandlingsID, SoknadsSti.BOSITUASJON), (_req, res, ctx) =>
        res(ctx.json(mockData))
    );

const server = setupServer(
    endpoint("botypeEier", {botype: "eier", antallPersoner: null}),
    endpoint("botypeLeier", {botype: "leier", antallPersoner: null})
);

test("Eier is checked if botype = 'eier'", async () => {
    const {getByRole} = render(<Botype behandlingsId={"botypeEier"} />);

    await waitFor(() => expect(getByRole("radio", {name: "Jeg bor i bolig jeg eier selv"})).toBeChecked());
    await waitFor(() => expect(getByRole("radio", {name: "Jeg leier privat bolig"})).not.toBeChecked());
});

test("Eier is not checked if botype = 'leier'", async () => {
    const {getByRole} = render(<Botype behandlingsId={"botypeLeier"} />);

    await waitFor(() => expect(getByRole("radio", {name: "Jeg bor i bolig jeg eier selv"})).not.toBeChecked());
    await waitFor(() => expect(getByRole("radio", {name: "Jeg leier privat bolig"})).toBeChecked());
});
