import type { Meta, StoryObj } from '@storybook/react';
import BreadCrumbs from '#app/[lang]/(authenticated)/@breadcrumbs/[...breadcrumbs]/page.tsx';
import ErrorComp from '#app/[lang]/(authenticated)/error.tsx';
import Layout from '#app/[lang]/(authenticated)/layout.tsx';

const meta = {
    component: ErrorComp,
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
} satisfies Meta<typeof ErrorComp>;

export default meta;

type Story = StoryObj<typeof ErrorComp>;

export const Primary: Story = {};
