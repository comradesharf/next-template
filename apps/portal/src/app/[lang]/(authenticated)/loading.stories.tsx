import { type Meta, type StoryObj, composeStories } from "@storybook/react";
import * as layouts from "#app/[lang]/(authenticated)/layout.stories.tsx";
import Loading from "#app/[lang]/(authenticated)/loading.tsx";

const { Primary: Layout } = composeStories(layouts);

const meta = {
    component: Loading,
    parameters: {
        nextjs: {
            appDirectory: true,
            navigation: {
                segments: [["breadcrumbs", "orders/recent-orders", "c"]],
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
} satisfies Meta<typeof Loading>;

export default meta;

type Story = StoryObj<typeof Loading>;

export const Primary: Story = {};
