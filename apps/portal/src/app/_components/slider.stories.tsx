import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "#app/_components/slider.tsx";

const meta: Meta<typeof Slider> = {
    component: Slider,
    tags: ["autodocs"],
    args: {
        defaultValue: [50],
        max: 100,
        step: 1,
        className: "w-[60%]",
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

type Story = StoryObj<typeof Slider>;

export const Primary: Story = {};
