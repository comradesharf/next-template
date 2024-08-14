import type { Meta, StoryObj } from '@storybook/react';
import Layout from '#app/[lang]/[...404]/layout.tsx';

const meta = {
    component: Layout,
    args: {},
    parameters: {},
    decorators: [],
} satisfies Meta<typeof Layout>;

export default meta;

type Story = StoryObj<typeof Layout>;

export const Primary: Story = {};
