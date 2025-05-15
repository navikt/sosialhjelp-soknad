// noinspection JSUnusedGlobalSymbols

import {Meta, StoryObj} from "@storybook/react";
import {useArgs} from "@storybook/preview-api";
import {Telefon} from "./Telefon";
import {fn} from "@storybook/test";
import React, {ComponentProps} from "react";
import {TelefonnummerDto} from "../../generated/new/model";

const meta = {
    tags: ["autodocs"],
    component: Telefon,
    argTypes: {isMutating: {control: {type: "boolean"}}, telefonnummer: {control: {type: "object"}}},
} satisfies Meta<typeof Telefon>;

export default meta;

type Story = StoryObj<typeof meta>;

const render = () => {
    const [currentArgs, updateArgs] = useArgs<ComponentProps<typeof Telefon>>();

    return (
        <Telefon
            {...currentArgs}
            setTelefonnummer={(input) => updateArgs({telefonnummer: {...(currentArgs.telefonnummer ?? {}), ...input}})}
        />
    );
};

const storyTemplate = (name: string, initialState: TelefonnummerDto): Story => ({
    name,
    args: {telefonnummer: initialState, setTelefonnummer: fn(), isMutating: false},
    render,
});

export const RegisterHarMobilnummer = storyTemplate("KRR har et mobilnummer", {
    telefonnummerBruker: undefined,
    telefonnummerRegister: "+4798765432",
});

export const RegisterHarFastnummer = storyTemplate("KRR har et fastnummer", {
    telefonnummerBruker: undefined,
    telefonnummerRegister: "+4722222222",
});

export const RegisterHarUtenlandsk = storyTemplate("KRR har utenlandsk nummer", {
    telefonnummerBruker: undefined,
    telefonnummerRegister: "+12127365000",
});

export const BrukerHarMobilnummer = storyTemplate("Bruker og KRR har et nummer", {
    telefonnummerBruker: "+4798765432",
    telefonnummerRegister: "+4798765433",
});

export const BrukerHarUtenlandskNummer = storyTemplate("Bruker men ikke KRR har et nummer", {
    telefonnummerBruker: "+443031237300",
});
