import { type Meta, type StoryObj, composeStories } from "@storybook/react";
import ErrorComp from "#app/[lang]/(auth)/error.tsx";
import * as layouts from "#app/[lang]/(auth)/layout.stories.tsx";

const { Primary: Layout } = composeStories(layouts);

const meta = {
    component: ErrorComp,
    parameters: {},
    decorators: [
        (Story) => (
            <Layout>
                <Story />
            </Layout>
        ),
    ],
} satisfies Meta<typeof ErrorComp>;

export default meta;

type Story = StoryObj<typeof ErrorComp>;

export const Primary: Story = {};
