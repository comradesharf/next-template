import type { Meta, StoryObj } from "@storybook/react";
import { PhoneInput } from "#app/_components/phone-input.tsx";

const meta: Meta<typeof PhoneInput> = {
    component: PhoneInput,
    tags: ["autodocs"],
    args: {},
    parameters: {
        layout: "padded",
        docs: {
            story: {
                inline: true,
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof PhoneInput>;

export const Primary: Story = {};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};
