import { type Meta, type StoryObj, composeStories } from "@storybook/react";
import ErrorComp from "#app/[lang]/(authenticated)/error.tsx";
import * as layouts from "#app/[lang]/(authenticated)/layout.stories.tsx";

const { Primary: Layout } = composeStories(layouts);

const meta = {
    component: ErrorComp,
    parameters: {
        nextjs: {
            appDirectory: true,
            navigation: {
                segments: [["breadcrumbs", "orders/recent-orders", "c"]],
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
} satisfies Meta<typeof ErrorComp>;

export default meta;

type Story = StoryObj<typeof ErrorComp>;

export const Primary: Story = {};
