import Layout from "#app/[lang]/(auth)/sign-in/layout.tsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
    component: Layout,
    args: {},
    parameters: {},
    decorators: [],
} satisfies Meta<typeof Layout>;

export default meta;

type Story = StoryObj<typeof Layout>;

export const Primary: Story = {};
