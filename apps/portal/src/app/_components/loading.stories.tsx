import type { Meta, StoryObj } from '@storybook/react';
import { Loading } from '#app/_components/loading.tsx';

const meta: Meta<typeof Loading> = {
    component: Loading,
    tags: ['autodocs'],
    args: {},
    parameters: {
        layout: 'padded',
        docs: {
            story: {
                inline: true,
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Loading>;

export const Primary: Story = {};
