import type { Meta, StoryObj } from "@storybook/react";
import { ActionButton } from "#app/_components/action-button.tsx";

const meta: Meta<typeof ActionButton> = {
    component: ActionButton,
    tags: ["autodocs"],
    args: {
        children: "Submit",
    },
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

type Story = StoryObj<typeof ActionButton>;

export const Primary: Story = {};

export const Loading: Story = {
    args: {
        loading: true,
    },
};
