import type { Meta, StoryObj } from '@storybook/react';
import Layout from '#app/[lang]/(auth)/sign-up/layout.tsx';
import Page from '#app/[lang]/(auth)/sign-up/page.tsx';

const meta = {
    component: Page,
    parameters: {},
    decorators: [
        (Story, ctx) => (
            <Layout {...ctx.args}>
                <Story />
            </Layout>
        ),
    ],
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof Page>;

export const Primary: Story = {};
