import type { Meta, StoryObj } from '@storybook/react';
import BreadCrumbs from '#app/[lang]/(authenticated)/@breadcrumbs/[...breadcrumbs]/page.tsx';
import Layout from '#app/[lang]/(authenticated)/layout.tsx';
import NotFound from '#app/[lang]/(authenticated)/not-found.tsx';

const meta = {
    component: NotFound,
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
} satisfies Meta<typeof NotFound>;

export default meta;

type Story = StoryObj<typeof NotFound>;

export const Primary: Story = {};
