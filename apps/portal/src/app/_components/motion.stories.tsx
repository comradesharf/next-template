import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import * as motion from "#app/_components/motion.tsx";

const meta: Meta<typeof motion.MotionProvider> = {
    component: motion.MotionProvider,
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
};

export default meta;

type Story = StoryObj<typeof motion.MotionProvider>;

export const TextAlternatingSlideIn: Story = {
    render() {
        return (
            <motion.TextAlternatingSlideIn
                text={faker.lorem.words({ min: 1, max: 5 })}
                className="text-heading-1"
            />
        );
    },
};

export const SlideInGroup: Story = {
    render() {
        return (
            <motion.SlideInGroup>
                {faker.helpers.multiple((_, index) => (
                    <motion.SlideInItem key={index} className="text-heading-4">
                        {faker.word.adjective()}
                    </motion.SlideInItem>
                ))}
            </motion.SlideInGroup>
        );
    },
};
