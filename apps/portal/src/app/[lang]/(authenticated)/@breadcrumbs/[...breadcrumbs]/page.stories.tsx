import type { Meta, StoryObj } from '@storybook/react';
import { useParams, useSearchParams } from 'next/navigation';
import Page from '#app/[lang]/(authenticated)/@breadcrumbs/[...breadcrumbs]/page.tsx';

const meta = {
    component: Page,
    parameters: {
        layout: 'centered',
        docs: {
            story: {
                inline: true,
            },
        },
        nextjs: {
            appDirectory: true,
            navigation: {
                segments: [['breadcrumbs', 'orders/recent-orders', 'c']],
            },
        },
    },
    decorators: [],
    args: {},
    render: (_args, ctx) => {
        const searchParams = useSearchParams();

        const { breadcrumbs } = useParams();

        return (
            <Page
                params={{
                    lang: ctx.globals.lang,
                    breadcrumbs: [ctx.globals.lang, ...breadcrumbs] as string[],
                }}
                searchParams={Object.fromEntries(searchParams.entries())}
            />
        );
    },
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof Page>;

export const Primary: Story = {};
