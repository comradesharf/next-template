import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';
import Page from '#app/[lang]/(authenticated)/@mobileDrawer/[...breadcrumbs]/page.tsx';

const meta = {
    component: Page,
    parameters: {
        layout: 'centered',
        docs: {
            story: {
                inline: true,
            },
        },
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
    decorators: [],
    args: {
        params: {
            breadcrumbs: faker.helpers.multiple(() => faker.commerce.product()),
            lang: 'en',
        },
    },
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof Page>;

export const Primary: Story = {};
