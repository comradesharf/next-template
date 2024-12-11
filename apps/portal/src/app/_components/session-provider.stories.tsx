import type { Meta, StoryObj } from "@storybook/react";
import { SessionProvider } from "#app/_components/session-provider.tsx";

const meta: Meta<typeof SessionProvider> = {
    component: SessionProvider,
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

type Story = StoryObj<typeof SessionProvider>;

export const Primary: Story = {};
