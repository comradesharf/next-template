import type { Meta, StoryObj } from "@storybook/react";
import { MotionButton } from "#app/_components/motion-button.tsx";

const meta: Meta<typeof MotionButton> = {
    component: MotionButton,
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

type Story = StoryObj<typeof MotionButton>;

export const Primary: Story = {};
