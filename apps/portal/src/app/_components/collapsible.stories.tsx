import type { Meta, StoryObj } from '@storybook/react';
import { ChevronsUpDownIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '#app/_components/button.tsx';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '#app/_components/collapsible.tsx';

const meta: Meta<typeof Collapsible> = {
    component: Collapsible,
    subcomponents: {
        Collapsible,
        CollapsibleContent,
        CollapsibleTrigger,
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
        const [isOpen, setIsOpen] = useState(false);

        return (
            <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className="w-[350px] space-y-2"
            >
                <div className="flex items-center justify-between space-x-4 px-4">
                    <h4 className="text-sm font-semibold">
                        @peduarte starred 3 repositories
                    </h4>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="w-9 p-0">
                            <ChevronsUpDownIcon className="h-4 w-4" />
                            <span className="sr-only">Toggle</span>
                        </Button>
                    </CollapsibleTrigger>
                </div>
                <div className="rounded-md border px-4 py-3 font-mono text-sm">
                    @radix-ui/primitives
                </div>
                <CollapsibleContent className="space-y-2">
                    <div className="rounded-md border px-4 py-3 font-mono text-sm">
                        @radix-ui/colors
                    </div>
                    <div className="rounded-md border px-4 py-3 font-mono text-sm">
                        @stitches/react
                    </div>
                </CollapsibleContent>
            </Collapsible>
        );
    },
};

export default meta;

type Story = StoryObj<typeof Collapsible>;

export const Primary: Story = {};
