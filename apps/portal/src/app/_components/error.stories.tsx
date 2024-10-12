import type { Meta, StoryObj } from '@storybook/react';
import { ErrorComp } from '#app/_components/error.tsx';

const meta: Meta<typeof ErrorComp> = {
    component: ErrorComp,
    tags: ['autodocs'],
    args: {},
    parameters: {
        layout: 'centered',
        docs: {
            story: {
                inline: true,
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof ErrorComp>;

export const Primary: Story = {};
