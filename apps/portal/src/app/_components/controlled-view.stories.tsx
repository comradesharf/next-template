import { Trans } from "@lingui/react/macro";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { Checkbox } from "#app/_components/checkbox.tsx";
import {
    ControlledView,
    ControlledViewContainer,
    ControlledViewTrigger,
} from "#app/_components/controlled-view.tsx";
import { Label } from "#app/_components/label.tsx";
import { MotionButton } from "#app/_components/motion-button.tsx";

const meta: Meta<typeof ControlledView> = {
    component: ControlledView,
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
            <ControlledView>
                <div className="flex items-center gap-10">
                    <div className="flex items-start gap-x-5 space-y-0 lg:items-center">
                        <ControlledViewTrigger>
                            <Checkbox id="checkbox" />
                        </ControlledViewTrigger>
                        <Label htmlFor="checkbox">
                            <Trans>Manage input</Trans>
                        </Label>
                    </div>
                    <ControlledViewContainer>
                        <MotionButton>Hello</MotionButton>
                    </ControlledViewContainer>
                </div>
            </ControlledView>
        );
    },
};

export default meta;

type Story = StoryObj<typeof ControlledView>;

export const Primary: Story = {
    async play({ canvasElement }) {
        const element = within(canvasElement);

        const checkbox = await element.findByRole(
            "checkbox",
            {
                name: /manage input/i,
            },
            {
                timeout: 5000,
            },
        );

        await expect(checkbox).toBeVisible();

        const button = element.getByRole("button", {
            name: /hello/i,
        });
        await expect(button).toBeVisible();

        await userEvent.click(checkbox);
        await expect(button).not.toBeVisible();
    },
};
