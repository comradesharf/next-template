import { type Meta, type StoryObj, composeStories } from "@storybook/react";
import * as layouts from "#app/[lang]/(authenticated)/layout.stories.tsx";
import Page from "#app/[lang]/(authenticated)/overview/page.tsx";

const { Primary: Layout } = composeStories(layouts);

const meta = {
    component: Page,
    parameters: {
        nextjs: {
            appDirectory: true,
            navigation: {
                segments: [["breadcrumbs", "overview", "c"]],
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
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof Page>;

export const Primary: Story = {};
