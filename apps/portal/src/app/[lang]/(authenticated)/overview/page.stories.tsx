import type { Meta, StoryObj } from '@storybook/react';
import BreadCrumbs from '#app/[lang]/(authenticated)/@breadcrumbs/[...breadcrumbs]/page.tsx';
import Layout from '#app/[lang]/(authenticated)/layout.tsx';
import Page from '#app/[lang]/(authenticated)/overview/page.tsx';

const meta = {
    component: Page,
    parameters: {},
    decorators: [
        (Story, ctx) => (
            <Layout
                {...ctx.args}
                breadcrumbs={
                    <BreadCrumbs
                        params={{
                            breadcrumbs: [ctx.globals.lang, 'Overview'],
                            lang: ctx.globals.lang,
                        }}
                        searchParams={{}}
                    />
                }
                params={{
                    lang: ctx.globals.lang,
                }}
            >
                <Story />
            </Layout>
        ),
    ],
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof Page>;

export const Primary: Story = {};
