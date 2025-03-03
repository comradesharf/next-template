import type { Meta, StoryObj } from "@storybook/react";
import { NotFound } from "#app/_components/not-found.tsx";

const meta: Meta<typeof NotFound> = {
    component: NotFound,
    tags: ["autodocs", "not-found"],
    args: {},
    parameters: {
        layout: "centered",
        docs: {
            story: {
                inline: true,
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof NotFound>;

export const Primary: Story = {};
