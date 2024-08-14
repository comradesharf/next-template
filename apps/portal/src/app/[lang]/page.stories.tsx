import type { Meta, StoryObj } from '@storybook/react';
import Page from '#app/[lang]/page.tsx';
import { inter } from '#libs/Fonts.ts';
import { withAppendClassNamesToBody } from '#libs/decorators.tsx';

const meta: Meta<typeof Page> = {
    component: Page,
    decorators: [
        withAppendClassNamesToBody(
            'antialiased',
            '[font-synthesis-weight:none]',
            inter.variable,
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof Page>;

export const Primary: Story = {};
