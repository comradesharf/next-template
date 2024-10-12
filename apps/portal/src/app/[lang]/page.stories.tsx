import type { Meta, StoryObj } from '@storybook/react';
import Page from '#app/[lang]/page.tsx';

const meta: Meta<typeof Page> = {
    component: Page,
};

export default meta;

type Story = StoryObj<typeof Page>;

export const Primary: Story = {};
