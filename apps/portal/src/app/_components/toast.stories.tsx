import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '#app/_components/button.tsx';
import { Toast, ToastAction } from '#app/_components/toast.tsx';
import { Toaster } from '#app/_components/toaster.tsx';
import { useToast } from '#app/_hooks/use-toast.ts';

const meta: Meta<typeof Toast> = {
    component: Toast,
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
    decorators: (Story) => (
        <>
            <Story />
            <Toaster />
        </>
    ),
    render: function Component() {
        const { toast } = useToast();

        return (
            <Button
                variant="outline"
                onClick={() => {
                    toast({
                        title: 'Scheduled: Catch up ',
                        description: 'Friday, February 10, 2023 at 5:57 PM',
                        action: (
                            <ToastAction altText="Goto schedule to undo">
                                Undo
                            </ToastAction>
                        ),
                    });
                }}
            >
                Add to calendar
            </Button>
        );
    },
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Primary: Story = {};

export const Simple: Story = {
    render: function Component() {
        const { toast } = useToast();

        return (
            <Button
                variant="outline"
                onClick={() => {
                    toast({
                        description: 'Your message has been sent.',
                    });
                }}
            >
                Show Toast
            </Button>
        );
    },
};

export const WithTitle: Story = {
    render: function Component() {
        const { toast } = useToast();

        return (
            <Button
                variant="outline"
                onClick={() => {
                    toast({
                        title: 'Uh oh! Something went wrong.',
                        description: 'There was a problem with your request.',
                    });
                }}
            >
                Show Toast
            </Button>
        );
    },
};

export const WithAction: Story = {
    render: function Component() {
        const { toast } = useToast();

        return (
            <Button
                variant="outline"
                onClick={() => {
                    toast({
                        title: 'Uh oh! Something went wrong.',
                        description: 'There was a problem with your request.',
                        action: (
                            <ToastAction altText="Try again">
                                Try again
                            </ToastAction>
                        ),
                    });
                }}
            >
                Show Toast
            </Button>
        );
    },
};

export const Destructive: Story = {
    render: function Component() {
        const { toast } = useToast();

        return (
            <Button
                variant="outline"
                onClick={() => {
                    toast({
                        variant: 'destructive',
                        title: 'Uh oh! Something went wrong.',
                        description: 'There was a problem with your request.',
                        action: (
                            <ToastAction altText="Try again">
                                Try again
                            </ToastAction>
                        ),
                    });
                }}
            >
                Show Toast
            </Button>
        );
    },
};
