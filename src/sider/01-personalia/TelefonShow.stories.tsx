import type {Meta, StoryObj} from "@storybook/react";

import {TelefonShow} from "./TelefonShow";

const meta = {
    component: TelefonShow,
} satisfies Meta<typeof TelefonShow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        register: 345245,
    },
};
