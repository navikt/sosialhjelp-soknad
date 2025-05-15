import type {Meta, StoryObj} from "@storybook/react";

import {Telefon} from "./Telefon";
import {fn} from "@storybook/test";
import {getGetTelefonnummerResponseMock} from "../../generated/new/telefonnummer-controller/telefonnummer-controller.msw";

const meta = {
    tags: ["autodocs"],
    component: Telefon,
    argTypes: {isMutating: {control: {type: "boolean"}}, telefonnummer: {control: {type: "object"}}},
} satisfies Meta<typeof Telefon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        telefonnummer: getGetTelefonnummerResponseMock({
            telefonnummerRegister: "22345678",
            telefonnummerBruker: "87654321",
        }),
        setTelefonnummer: fn(),
        isMutating: false,
    },
};
