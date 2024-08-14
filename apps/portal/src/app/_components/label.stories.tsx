import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '#app/_components/checkbox.tsx';
import { Label } from '#app/_components/label.tsx';

const meta: Meta<typeof Label> = {
    component: Label,
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
    render: function Component() {
        return (
            <div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>
            </div>
        );
    },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Primary: Story = {};
