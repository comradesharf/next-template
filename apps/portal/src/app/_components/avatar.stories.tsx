import type { Meta, StoryObj } from "@storybook/react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "#app/_components/avatar.tsx";

const meta: Meta<typeof Avatar> = {
    component: Avatar,
    subcomponents: { AvatarImage, AvatarFallback } as Meta["subcomponents"],
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
            <Avatar>
                <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        );
    },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Primary: Story = {};
