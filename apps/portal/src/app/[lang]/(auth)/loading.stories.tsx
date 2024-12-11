import { type Meta, type StoryObj, composeStories } from "@storybook/react";
import * as layouts from "#app/[lang]/(auth)/layout.stories.tsx";
import Loading from "#app/[lang]/(auth)/loading.tsx";

const { Primary: Layout } = composeStories(layouts);

const meta = {
    component: Loading,
    parameters: {},
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
