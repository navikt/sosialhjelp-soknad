import {Decorator} from "@storybook/react";
import {ReactNode} from "react";
import {MemoryRouter, Route, Routes} from "react-router";

/**
 * Returnerer en dekorator som mocker soknadId alle steder useSoknadId() brukes.
 * @param soknadId - ønsket mock-søknadId
 */
export const MockSoknadIdUrlParam =
    (soknadId: string): Decorator =>
    (Story: () => ReactNode) => (
        <MemoryRouter initialEntries={[`/soknad/${soknadId}`]}>
            <Routes>
                <Route path={"/soknad/:soknadId"} element={<Story />} />
            </Routes>
        </MemoryRouter>
    );
