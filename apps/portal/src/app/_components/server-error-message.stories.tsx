import { ServerErrorMessage } from "#app/_components/server-error-message.tsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ServerErrorMessage> = {
    component: ServerErrorMessage,
    tags: ["autodocs"],
    args: {},
    parameters: {
        layout: "padded",
        docs: {
            story: {
                inline: true,
            },
        },
    }
};

export default meta;

type Story = StoryObj<typeof ServerErrorMessage>;

export const Primary: Story = {
};
