import type { Meta, StoryObj } from "@storybook/react";
import { BellRingIcon } from "lucide-react";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "#app/_components/alert.tsx";

const meta: Meta<typeof Alert> = {
    component: Alert,
    // @ts-ignore
    subcomponents: { AlertTitle, AlertDescription },
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
            <Alert>
                <BellRingIcon className="size-5" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                    You can add components to your app using the cli.
                </AlertDescription>
            </Alert>
        );
    },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Primary: Story = {};

export const Destructive: Story = {
    render: function Component() {
        return (
            <Alert variant="destructive">
                <BellRingIcon className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    Your session has expired. Please log in again.
                </AlertDescription>
            </Alert>
        );
    },
};
