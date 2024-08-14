import type { Meta, StoryObj } from '@storybook/react';
import Page from '#app/[lang]/(auth)/sign-in/page.tsx';
import { inter } from '#libs/Fonts.ts';
import { withAppendClassNamesToBody, withI18n } from '#libs/decorators.tsx';

const meta = {
    component: Page,
    parameters: {},
    decorators: [
        withAppendClassNamesToBody(
            'antialiased',
            '[font-synthesis-weight:none]',
            inter.variable,
        ),
        withI18n,
    ],
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof Page>;

export const Primary: Story = {};
