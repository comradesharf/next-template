import type { Meta, StoryObj } from '@storybook/react';
import ErrorComp from '#app/[lang]/onboarding/error.tsx';
import Layout from '#app/[lang]/onboarding/layout.tsx';

const meta = {
    component: ErrorComp,
    parameters: {},
    decorators: [
        (Story, ctx) => (
            <Layout {...(ctx.args as any)}>
                <Story />
            </Layout>
        ),
    ],
} satisfies Meta<typeof ErrorComp>;

export default meta;

type Story = StoryObj<typeof ErrorComp>;

export const Primary: Story = {};
