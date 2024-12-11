import { type Meta, type StoryObj, composeStories } from "@storybook/react";
import * as layouts from "#app/[lang]/(auth)/layout.stories.tsx";
import Page from "#app/[lang]/(auth)/verify-email/[token]/page.tsx";

const { Primary: Layout } = composeStories(layouts);

const meta = {
    component: Page,
    parameters: {},
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
