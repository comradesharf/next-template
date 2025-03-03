import type { Meta, StoryObj } from "@storybook/react";
import { Lordicon } from "#app/_components/lordicon.tsx";

const meta: Meta<typeof Lordicon> = {
    component: Lordicon,
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

type Story = StoryObj<typeof Lordicon>;

export const Primary: Story = {};
