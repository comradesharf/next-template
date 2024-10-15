import Loading from "#app/[lang]/(auth)/sign-in/loading.tsx";
import Layout from "#app/[lang]/(auth)/sign-in/layout.tsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
    component: Loading,
    parameters: {},
    decorators: [
(Story, ctx) => (
            <Layout {...(ctx.args as any)}>
                <Story/>
            </Layout>
        ),
    ],
} satisfies Meta<typeof Loading>;

export default meta;

type Story = StoryObj<typeof Loading>;

export const Primary: Story = {};
