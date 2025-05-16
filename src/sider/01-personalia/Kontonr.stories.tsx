import type {Meta, StoryObj} from "@storybook/react";

import {Kontonr} from "./Kontonr";
import {useArgs} from "@storybook/preview-api";
import React, {ComponentProps} from "react";
import {fn} from "@storybook/test";
import {KontoinformasjonDto} from "../../generated/new/model/kontoinformasjonDto.ts";

const meta = {
    tags: ["autodocs"],
    component: Kontonr,
} satisfies Meta<typeof Kontonr>;

export default meta;

type Story = StoryObj<typeof meta>;

const render = () => {
    const [currentArgs, updateArgs] = useArgs<ComponentProps<typeof Kontonr>>();

    return (
        <Kontonr
            {...currentArgs}
            updateKontoInformasjon={(input) =>
                updateArgs({kontoinformasjon: {...(currentArgs.kontoinformasjon ?? {}), ...input}})
            }
        />
    );
};

const storyTemplate = (name: string, initialState: KontoinformasjonDto): Story => ({
    name,
    args: {kontoinformasjon: initialState, updateKontoInformasjon: fn(), isMutating: false, isLoading: false},
    render,
});

export const RegisterHarKontonummer = storyTemplate("Register har kontonummer", {
    kontonummerRegister: "15034573408",
});

export const RegisterHarIkkeKontonummer = storyTemplate(
    "Register har ikke kontonummer og bruker har ikke overstyrt",
    {}
);

export const BrukerHarKontonummer = storyTemplate("Bruker og register har kontonummer", {
    kontonummerBruker: "15034573408",
    kontonummerRegister: "15034573409",
});

export const BrukerHarIkkeKontonummer = storyTemplate(
    "Bruker oppgir at de ikke har fungerende konto (men registerverdi finnes)",
    {
        kontonummerBruker: undefined,
        kontonummerRegister: "15034573408",
        harIkkeKonto: true,
    }
);

export const HverkenBrukerEllerRegisterHarKontonummer = storyTemplate("Bruker og register har ikke kontonummer", {
    kontonummerBruker: undefined,
    kontonummerRegister: undefined,
    harIkkeKonto: true,
});
