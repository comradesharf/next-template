import type { Meta, StoryObj } from "@storybook/react";
import { BackButton } from "#app/_components/back-button.tsx";

const meta: Meta<typeof BackButton> = {
    component: BackButton,
    tags: ["autodocs"],
    args: {
        children: "Back",
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

type Story = StoryObj<typeof BackButton>;

export const Primary: Story = {};
