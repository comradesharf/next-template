import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "#app/_components/badge.tsx";

const meta: Meta<typeof Badge> = {
    component: Badge,
    tags: ["autodocs"],
    args: {
        variant: "default",
    },
    argTypes: {
        variant: {
            control: {
                type: "select",
            },
            options: ["default", "secondary", "destructive", "outline"],
        },
    },
    parameters: {
        layout: "padded",
        docs: {
            story: {
                inline: true,
            },
        },
    },
    render(args) {
        return <Badge {...args}>Badge</Badge>;
    },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Primary: Story = {};

export const Secondary: Story = {
    args: {
        variant: "secondary",
    },
};

export const Outline: Story = {
    args: {
        variant: "outline",
    },
};

export const Destructive: Story = {
    args: {
        variant: "destructive",
    },
};
