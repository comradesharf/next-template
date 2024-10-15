import Page from "#app/[lang]/(auth)/sign-in/page.tsx";
import Layout from "#app/[lang]/(auth)/sign-in/layout.tsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
    component: Page,
    parameters: {},
    decorators: [
(Story, ctx) => (
            <Layout {...ctx.args}>
                <Story/>
            </Layout>
        ),
    ],
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof Page>;

export const Primary: Story = {};
