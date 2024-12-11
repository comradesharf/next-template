import type { Meta, StoryObj } from "@storybook/react";
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import {
    ToggleGroup,
    ToggleGroupItem,
} from "#app/_components/toggle-group.tsx";

const meta: Meta<typeof ToggleGroup> = {
    component: ToggleGroup,
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
            <ToggleGroup type="multiple">
                <ToggleGroupItem value="bold" aria-label="Toggle bold">
                    <BoldIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic">
                    <ItalicIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="underline"
                    aria-label="Toggle underline"
                >
                    <UnderlineIcon className="h-4 w-4" />
                </ToggleGroupItem>
            </ToggleGroup>
        );
    },
};

export default meta;

type Story = StoryObj<typeof ToggleGroup>;

export const Primary: Story = {};

export const Disabled: Story = {
    render: function Component() {
        return (
            <ToggleGroup type="multiple" disabled>
                <ToggleGroupItem value="bold" aria-label="Toggle bold">
                    <BoldIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic">
                    <ItalicIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="strikethrough"
                    aria-label="Toggle strikethrough"
                >
                    <UnderlineIcon className="h-4 w-4" />
                </ToggleGroupItem>
            </ToggleGroup>
        );
    },
};

export const Large: Story = {
    render: function Component() {
        return (
            <ToggleGroup type="multiple" size="lg">
                <ToggleGroupItem value="bold" aria-label="Toggle bold">
                    <BoldIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic">
                    <ItalicIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="strikethrough"
                    aria-label="Toggle strikethrough"
                >
                    <UnderlineIcon className="h-4 w-4" />
                </ToggleGroupItem>
            </ToggleGroup>
        );
    },
};

export const Small: Story = {
    render: function Component() {
        return (
            <ToggleGroup size={"sm"} type="multiple">
                <ToggleGroupItem value="bold" aria-label="Toggle bold">
                    <BoldIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic">
                    <ItalicIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="underline"
                    aria-label="Toggle underline"
                >
                    <UnderlineIcon className="h-4 w-4" />
                </ToggleGroupItem>
            </ToggleGroup>
        );
    },
};

export const Single: Story = {
    render: function Component() {
        return (
            <ToggleGroup type="single">
                <ToggleGroupItem value="bold" aria-label="Toggle bold">
                    <BoldIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic">
                    <ItalicIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="underline"
                    aria-label="Toggle underline"
                >
                    <UnderlineIcon className="h-4 w-4" />
                </ToggleGroupItem>
            </ToggleGroup>
        );
    },
};

export const Outline: Story = {
    render: function Component() {
        return (
            <ToggleGroup variant="outline" type="multiple">
                <ToggleGroupItem value="bold" aria-label="Toggle bold">
                    <BoldIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic">
                    <ItalicIcon className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="underline"
                    aria-label="Toggle underline"
                >
                    <UnderlineIcon className="h-4 w-4" />
                </ToggleGroupItem>
            </ToggleGroup>
        );
    },
};
