import type { Meta, StoryObj } from "@storybook/react";
import { Form } from "#app/[lang]/(auth)/verify-email/[token]/_components/form.tsx";

const meta: Meta<typeof Form> = {
    component: Form,
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

type Story = StoryObj<typeof Form>;

export const Primary: Story = {};
