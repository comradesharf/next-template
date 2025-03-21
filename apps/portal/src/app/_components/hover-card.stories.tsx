import type { Meta, StoryObj } from "@storybook/react";
import { CalendarIcon } from "lucide-react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "#app/_components/avatar.tsx";
import { Button } from "#app/_components/button.tsx";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "#app/_components/hover-card.tsx";

const meta: Meta<typeof HoverCard> = {
    component: HoverCard,
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
            <HoverCard>
                <HoverCardTrigger asChild>
                    <Button variant="link">@nextjs</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                        <Avatar>
                            <AvatarImage src="https://github.com/vercel.png" />
                            <AvatarFallback>VC</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <h4 className="font-semibold text-sm">@nextjs</h4>
                            <p className="text-sm">
                                The React Framework – created and maintained by
                                @vercel.
                            </p>
                            <div className="flex items-center pt-2">
                                <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                                <span className="text-muted-foreground text-xs">
                                    Joined December 2021
                                </span>
                            </div>
                        </div>
                    </div>
                </HoverCardContent>
            </HoverCard>
        );
    },
};

export default meta;

type Story = StoryObj<typeof HoverCard>;

export const Primary: Story = {};
