import type { Meta, StoryObj } from "@storybook/react";
import Page from "#app/[lang]/page.tsx";

const meta = {
    component: Page,
    parameters: {},
    decorators: [],
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof Page>;

export const Primary: Story = {};
