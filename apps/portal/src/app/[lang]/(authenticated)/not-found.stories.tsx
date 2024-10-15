import { type Meta, type StoryObj, composeStories } from '@storybook/react';
import * as layouts from '#app/[lang]/(authenticated)/layout.stories.tsx';
import NotFound from '#app/[lang]/(authenticated)/not-found.tsx';

const { Primary: Layout } = composeStories(layouts);

const meta = {
    component: NotFound,
    parameters: {
        nextjs: {
            appDirectory: true,
            navigation: {
                segments: [['breadcrumbs', 'orders/recent-orders', 'c']],
            },
        },
    },
    decorators: [
        (Story) => (
            <Layout>
                <Story />
            </Layout>
        ),
    ],
} satisfies Meta<typeof NotFound>;

export default meta;

type Story = StoryObj<typeof NotFound>;

export const Primary: Story = {};
