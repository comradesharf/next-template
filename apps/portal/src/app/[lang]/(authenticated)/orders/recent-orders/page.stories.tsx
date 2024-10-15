import { type Meta, type StoryObj, composeStories } from '@storybook/react';
import { mocked } from '@storybook/test';
import * as layouts from '#app/[lang]/(authenticated)/layout.stories.tsx';
import Page from '#app/[lang]/(authenticated)/orders/recent-orders/page.tsx';
import { getSession } from '#app/_libs/decorators.tsx';
import { getCurrentSession } from '#app/_queries/auths.ts';

const { Primary: Layout } = composeStories(layouts);

const meta = {
    component: Page,
    parameters: {
        nextjs: {
            appDirectory: true,
            navigation: {
                segments: [['breadcrumbs', 'orders/recent-orders', 'c']],
            },
        },
    },
    decorators: [
        (Story, ctx) => (
            <Layout>
                <Story />
            </Layout>
        ),
    ],
    beforeEach(ctx) {
        mocked(getCurrentSession).mockResolvedValue(
            getSession(ctx.globals.user),
        );
    },
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof Page>;

export const Primary: Story = {};
