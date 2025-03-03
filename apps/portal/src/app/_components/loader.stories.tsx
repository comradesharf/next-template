import type { Meta, StoryObj } from "@storybook/react";
import { Loader } from "#app/_components/loader.tsx";

const meta: Meta<typeof Loader> = {
    component: Loader,
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

type Story = StoryObj<typeof Loader>;

export const Primary: Story = {};
