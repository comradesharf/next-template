import { type Meta, type StoryObj, composeStories } from '@storybook/react';
import * as layouts from '#app/[lang]/(auth)/layout.stories.tsx';
import NotFound from '#app/[lang]/(auth)/not-found.tsx';

const { Primary: Layout } = composeStories(layouts);

const meta = {
    component: NotFound,
    parameters: {},
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
