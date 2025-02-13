import type { Meta, StoryObj } from "@storybook/react";
import { SimpleAction } from "#app/_components/simple-action.tsx";

const meta: Meta<typeof SimpleAction> = {
    component: SimpleAction,
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

type Story = StoryObj<typeof SimpleAction>;

export const Primary: Story = {};
