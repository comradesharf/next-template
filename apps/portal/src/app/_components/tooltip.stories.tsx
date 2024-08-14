import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '#app/_components/button.tsx';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '#app/_components/tooltip.tsx';

const meta: Meta<typeof Tooltip> = {
    component: Tooltip,
    subcomponents: {
        Tooltip,
        TooltipContent,
        TooltipProvider,
        TooltipTrigger,
    } as Meta['subcomponents'],
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
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="outline">Hover</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Add to library</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Primary: Story = {};
