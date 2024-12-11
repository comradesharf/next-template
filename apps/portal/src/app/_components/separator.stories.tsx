import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "#app/_components/separator.tsx";

const meta: Meta<typeof Separator> = {
    component: Separator,
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
            <div>
                <div className="space-y-1">
                    <h4 className="font-medium text-sm leading-none">
                        Radix Primitives
                    </h4>
                    <p className="text-muted-foreground text-sm">
                        An open-source UI component library.
                    </p>
                </div>
                <Separator className="my-4" />
                <div className="flex h-5 items-center space-x-4 text-sm">
                    <div>Blog</div>
                    <Separator orientation="vertical" />
                    <div>Docs</div>
                    <Separator orientation="vertical" />
                    <div>Source</div>
                </div>
            </div>
        );
    },
};

export default meta;

type Story = StoryObj<typeof Separator>;

export const Primary: Story = {};
