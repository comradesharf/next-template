import type { Meta, StoryObj } from "@storybook/react";
import { toast } from "sonner";
import { Button } from "#app/_components/button.tsx";
import { Toaster } from "#app/_components/sonner.tsx";

const meta: Meta<typeof Toaster> = {
    component: Toaster,
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
    decorators: (Story) => (
        <>
            <Story />
            <Toaster />
        </>
    ),
    render: function Component() {
        return (
            <Button
                variant="outline"
                onClick={() =>
                    toast("Event has been created", {
                        description: "Sunday, December 03, 2023 at 9:00 AM",
                        action: {
                            label: "Undo",
                            onClick: () => console.log("Undo"),
                        },
                    })
                }
            >
                Show Toast
            </Button>
        );
    },
};

export default meta;

type Story = StoryObj<typeof Toaster>;

export const Primary: Story = {};
