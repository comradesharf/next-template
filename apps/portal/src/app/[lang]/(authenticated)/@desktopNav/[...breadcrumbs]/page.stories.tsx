import type { Meta, StoryObj } from "@storybook/react";
import { useParams, useSearchParams } from "next/navigation";
import Page from "#app/[lang]/(authenticated)/@desktopNav/[...breadcrumbs]/page.tsx";

const meta = {
    component: Page,
    parameters: {
        nextjs: {
            appDirectory: true,
            navigation: {
                segments: [["breadcrumbs", "orders/recent-orders", "c"]],
            },
        },
    },
    decorators: [],
    args: {},
    render: (_args, ctx) => {
        const searchParams = useSearchParams();

        const { breadcrumbs } = useParams<{ breadcrumbs: string[] }>();

        return (
            <Page
                params={Promise.resolve({
                    lang: ctx.globals.lang,
                    breadcrumbs: [ctx.globals.lang, ...breadcrumbs] as string[],
                })}
                searchParams={Promise.resolve(
                    Object.fromEntries(searchParams.entries()),
                )}
            />
        );
    },
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof Page>;

export const Primary: Story = {};
