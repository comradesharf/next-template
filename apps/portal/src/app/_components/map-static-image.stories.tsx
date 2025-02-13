import type { Meta, StoryObj } from "@storybook/react";
import { MapStaticImage } from "#app/_components/map-static-image.tsx";

const meta: Meta<typeof MapStaticImage> = {
    component: MapStaticImage,
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

type Story = StoryObj<typeof MapStaticImage>;

export const Primary: Story = {};
