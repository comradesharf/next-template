import type { Meta, StoryObj } from "@storybook/react";
import { Brand } from "#app/_components/icon.tsx";

const meta: Meta<typeof Brand> = {
    component: Brand,
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

type Story = StoryObj<typeof Brand>;

export const Primary: Story = {};
