import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { Progress } from "#app/_components/progress.tsx";

const meta: Meta<typeof Progress> = {
    component: Progress,
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
        const [progress, setProgress] = useState(13);

        useEffect(() => {
            const timer = setTimeout(() => setProgress(66), 500);
            return () => clearTimeout(timer);
        }, []);

        return <Progress value={progress} className="w-[60%]" />;
    },
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Primary: Story = {};
