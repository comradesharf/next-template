import type { Meta, StoryObj } from '@storybook/react';
import { DateTime } from '#app/_components/date-time.tsx';

const meta: Meta<typeof DateTime> = {
    component: DateTime,
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

type Story = StoryObj<typeof DateTime>;

export const Primary: Story = {};
