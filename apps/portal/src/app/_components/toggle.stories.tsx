import type { Meta, StoryObj } from "@storybook/react";
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import { Toggle } from "#app/_components/toggle.tsx";

const meta: Meta<typeof Toggle> = {
    component: Toggle,
    tags: ["autodocs"],
    args: {},
    parameters: {
        layout: "padded",
        docs: {
            story: {
                inline: true,
            },
        },
    },
    render: function Component() {
        return (
            <Toggle aria-label="Toggle italic">
                <BoldIcon className="h-4 w-4" />
            </Toggle>
        );
    },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Primary: Story = {};

export const Outline: Story = {
    render: function Component() {
        return (
            <Toggle variant="outline" aria-label="Toggle italic">
                <ItalicIcon className="h-4 w-4" />
            </Toggle>
        );
    },
};

export const WithText: Story = {
    render: function Component() {
        return (
            <Toggle aria-label="Toggle italic">
                <ItalicIcon className="mr-2 h-4 w-4" />
                Italic
            </Toggle>
        );
    },
};

export const Small: Story = {
    render: function Component() {
        return (
            <Toggle size="sm" aria-label="Toggle italic">
                <ItalicIcon className="h-4 w-4" />
            </Toggle>
        );
    },
};

export const Large: Story = {
    render: function Component() {
        return (
            <Toggle size="lg" aria-label="Toggle italic">
                <ItalicIcon className="h-4 w-4" />
            </Toggle>
        );
    },
};

export const Disabled: Story = {
    render: function Component() {
        return (
            <Toggle aria-label="Toggle italic" disabled>
                <UnderlineIcon className="h-4 w-4" />
            </Toggle>
        );
    },
};
