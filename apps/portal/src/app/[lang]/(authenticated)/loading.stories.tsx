import type { Meta, StoryObj } from '@storybook/react';
import BreadCrumbs from '#app/[lang]/(authenticated)/@breadcrumbs/[...breadcrumbs]/page.tsx';
import Layout from '#app/[lang]/(authenticated)/layout.tsx';
import Loading from '#app/[lang]/(authenticated)/loading.tsx';

const meta = {
    component: Loading,
    parameters: {},
    decorators: [
        (Story, ctx) => (
            <Layout
                {...ctx.args}
                breadcrumbs={
                    <BreadCrumbs
                        params={{
                            breadcrumbs: [
                                ctx.globals.lang,
                                'Orders',
                                'Recent Orders',
                            ],
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
} satisfies Meta<typeof Loading>;

export default meta;

type Story = StoryObj<typeof Loading>;

export const Primary: Story = {};
