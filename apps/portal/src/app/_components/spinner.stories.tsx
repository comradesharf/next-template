import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "#app/_components/spinner.tsx";

const meta: Meta<typeof Spinner> = {
    component: Spinner,
    tags: ["autodocs"],
    args: {
        defaultValue: 0,
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

type Story = StoryObj<typeof Spinner>;

export const Primary: Story = {};
