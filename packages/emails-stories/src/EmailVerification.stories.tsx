import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { EmailVerification } from "app-emails/EmailVerification";

const meta = {
    component: EmailVerification,
    args: {
        username: faker.internet.username(),
        otp: faker.string.numeric(6),
    },
} satisfies Meta<typeof EmailVerification>;

export default meta;

type Story = StoryObj<typeof EmailVerification>;

export const Primary: Story = {};
