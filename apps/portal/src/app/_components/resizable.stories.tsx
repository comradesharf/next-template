import type { Meta, StoryObj } from '@storybook/react';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '#app/_components/resizable.tsx';

const meta: Meta<typeof ResizablePanelGroup> = {
    component: ResizablePanelGroup,
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
            <ResizablePanelGroup
                direction="horizontal"
                className="max-w-md rounded-lg border md:min-w-[450px]"
            >
                <ResizablePanel defaultSize={50}>
                    <div className="flex h-[200px] items-center justify-center p-6">
                        <span className="font-semibold">One</span>
                    </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={50}>
                    <ResizablePanelGroup direction="vertical">
                        <ResizablePanel defaultSize={25}>
                            <div className="flex h-full items-center justify-center p-6">
                                <span className="font-semibold">Two</span>
                            </div>
                        </ResizablePanel>
                        <ResizableHandle />
                        <ResizablePanel defaultSize={75}>
                            <div className="flex h-full items-center justify-center p-6">
                                <span className="font-semibold">Three</span>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
        );
    },
};

export default meta;

type Story = StoryObj<typeof ResizablePanelGroup>;

export const Primary: Story = {};

export const Handle: Story = {
    render: function Component() {
        return (
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel>One</ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel>Two</ResizablePanel>
            </ResizablePanelGroup>
        );
    },
};

export const Vertical: Story = {
    render: function Component() {
        return (
            <ResizablePanelGroup
                direction="vertical"
                className="min-h-[200px] max-w-md rounded-lg border md:min-w-[450px]"
            >
                <ResizablePanel defaultSize={25}>
                    <div className="flex h-full items-center justify-center p-6">
                        <span className="font-semibold">Header</span>
                    </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={75}>
                    <div className="flex h-full items-center justify-center p-6">
                        <span className="font-semibold">Content</span>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        );
    },
};
