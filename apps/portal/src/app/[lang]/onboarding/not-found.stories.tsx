import type { Meta, StoryObj } from '@storybook/react';
import Layout from '#app/[lang]/onboarding/layout.tsx';
import NotFound from '#app/[lang]/onboarding/not-found.tsx';

const meta = {
    component: NotFound,
    parameters: {},
    decorators: [
        (Story, ctx) => (
            <Layout {...(ctx.args as any)}>
                <Story />
            </Layout>
        ),
    ],
} satisfies Meta<typeof NotFound>;

export default meta;

type Story = StoryObj<typeof NotFound>;

export const Primary: Story = {};
