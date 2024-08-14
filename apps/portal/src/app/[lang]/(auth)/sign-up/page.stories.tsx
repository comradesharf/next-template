import type { Meta, StoryObj } from '@storybook/react';
import Page from '#app/[lang]/(auth)/sign-up/page.tsx';
import { inter } from '#libs/Fonts.ts';
import { withAppendClassNamesToBody, withI18n } from '#libs/decorators.tsx';

const meta = {
    component: Page,
    parameters: {},
    decorators: [
        withI18n,
        withAppendClassNamesToBody(
            'antialiased',
            '[font-synthesis-weight:none]',
            inter.variable,
        ),
    ],
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof Page>;

export const Primary: Story = {};
