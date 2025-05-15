import {Decorator, Meta, StoryObj} from "@storybook/react";
import Personopplysninger from "./index.tsx";
import {MemoryRouter, Route, Routes} from "react-router";
import {ReactNode} from "react";
import {
    getGetAdresserMockHandler,
    getUpdateAdresserMockHandler,
} from "../../generated/new/adresse-controller/adresse-controller.msw.ts";
import {
    getGetTelefonnummerMockHandler,
    getUpdateTelefonnummerMockHandler,
} from "../../generated/new/telefonnummer-controller/telefonnummer-controller.msw.ts";
import {
    getGetKontonummerMockHandler,
    getUpdateKontoInformasjonBrukerMockHandler,
} from "../../generated/new/kontonummer-controller/kontonummer-controller.msw.ts";
import {getGetBasisPersonaliaMockHandler} from "../../generated/new/basis-personalia-controller/basis-personalia-controller.msw.ts";
import {VegAdresseType} from "../../generated/new/model/vegAdresseType.ts";
import {AdresserDtoAdresseValg} from "../../generated/new/model/adresserDtoAdresseValg.ts";

const meta = {
    tags: ["autodocs"],
    component: Personopplysninger,
} satisfies Meta<typeof Personopplysninger>;

export default meta;

const WithLocation =
    (entry: string): Decorator =>
    (Story: () => ReactNode) => (
        <MemoryRouter initialEntries={[entry]}>
            <Routes>
                <Route path={"/soknad/:soknadId"} element={<Story />} />
            </Routes>
        </MemoryRouter>
    );

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: [WithLocation("/soknad/mock-id-42")],
    parameters: {
        msw: [
            getGetAdresserMockHandler({
                adresseValg: AdresserDtoAdresseValg.FOLKEREGISTRERT,
                folkeregistrertAdresse: {
                    adresselinjer: [],
                    gatenavn: "Frognerveien",
                    husnummer: "22",
                    husbokstav: "B",
                    postnummer: "0263",
                    poststed: "Oslo",
                    kommunenummer: "0301",
                    landkode: "NO",
                    type: VegAdresseType.VegAdresse,
                },
                navenhet: {
                    enhetsnavn: "Sentrum, Oslo kommune",
                    enhetsnummer: "0301",
                    kommunenummer: "0301",
                    kommunenavn: "Oslo",
                    isMottakMidlertidigDeaktivert: false,
                    isMottakDeaktivert: false,
                },
            }),
            getUpdateAdresserMockHandler(),
            getGetTelefonnummerMockHandler({telefonnummerRegister: "+4781549300"}),
            getUpdateTelefonnummerMockHandler(),
            getGetKontonummerMockHandler({kontonummerBruker: "15034573407"}),
            getUpdateKontoInformasjonBrukerMockHandler(),
            getGetBasisPersonaliaMockHandler({
                navn: {
                    fornavn: "Enkefru",
                    mellomnavn: "Stengelføhn",
                    etternavn: "Glad",
                    fulltNavn: "Enkefru Stengelføhn Glad",
                },
                fodselsnummer: "55051867040",
                nordiskBorger: true,
                statsborgerskap: "Norsk",
            }),
        ],
    },
};
