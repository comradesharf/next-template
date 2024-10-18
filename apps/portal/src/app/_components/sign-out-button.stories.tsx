import { SignOutButton } from "#app/_components/sign-out-button.tsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SignOutButton> = {
    component: SignOutButton,
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

type Story = StoryObj<typeof SignOutButton>;

export const Primary: Story = {
};
