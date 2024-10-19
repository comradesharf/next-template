import { type Meta, type StoryObj, composeStories } from '@storybook/react';
import * as breadcrumbs from '#app/[lang]/(authenticated)/@breadcrumbs/[...breadcrumbs]/page.stories.tsx';
import * as desktopNav from '#app/[lang]/(authenticated)/@desktopNav/[...breadcrumbs]/page.stories.tsx';
import * as mobileDrawer from '#app/[lang]/(authenticated)/@mobileDrawer/[...breadcrumbs]/page.stories.tsx';
import Layout from '#app/[lang]/(authenticated)/layout.tsx';

const { Primary: Breadcrumbs } = composeStories(breadcrumbs);

const { Primary: DesktopNav } = composeStories(desktopNav);

const { Primary: MobileDrawer } = composeStories(mobileDrawer);

const meta = {
    component: Layout,
    args: {
        breadcrumbs: <Breadcrumbs />,
        desktopNav: <DesktopNav />,
        mobileDrawer: <MobileDrawer />,
    },
    parameters: {
        nextjs: {
            appDirectory: true,
            navigation: {
                segments: [['breadcrumbs', 'orders/recent-orders', 'c']],
            },
        },
    },
    decorators: [],
} satisfies Meta<typeof Layout>;

export default meta;

type Story = StoryObj<typeof Layout>;

export const Primary: Story = {};
