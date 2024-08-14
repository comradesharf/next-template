import type { Meta, StoryObj } from '@storybook/react';
import { ArrowUpIcon, ChevronRightIcon, MailIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '#app/_components/button.tsx';

const meta: Meta<typeof Button> = {
    component: Button,
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
        return <Button>Button</Button>;
    },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {};

export const Destructive: Story = {
    render: function Component() {
        return <Button variant="destructive">Destructive</Button>;
    },
};

export const Outline: Story = {
    render: function Component() {
        return <Button variant="outline">Outline</Button>;
    },
};

export const Ghost: Story = {
    render: function Component() {
        return <Button variant="ghost">Ghost</Button>;
    },
};

export const AsLink: Story = {
    render: function Component() {
        return <Button variant="link">Link</Button>;
    },
};

export const Icon: Story = {
    render: function Component() {
        return (
            <Button variant="outline" size="icon">
                <ChevronRightIcon className="h-4 w-4" />
            </Button>
        );
    },
};

export const WithIcon: Story = {
    render: function Component() {
        return (
            <Button>
                <MailIcon className="mr-2 h-4 w-4" /> Login with Email
            </Button>
        );
    },
};

export const Loading: Story = {
    render: function Component() {
        return (
            <Button disabled>
                <ArrowUpIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
            </Button>
        );
    },
};

export const AsChild: Story = {
    render: function Component() {
        return (
            <Button asChild>
                <Link href="/login">Login</Link>
            </Button>
        );
    },
};
