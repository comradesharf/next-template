import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';
import { AspectRatio } from '#app/_components/aspect-ratio.tsx';

const meta: Meta<typeof AspectRatio> = {
    component: AspectRatio,
    tags: ['autodocs'],
    args: {
        ratio: 16 / 9,
    },
    parameters: {
        layout: 'padded',
        docs: {
            story: {
                inline: true,
            },
        },
    },
    render(args) {
        return (
            <AspectRatio {...args} className="bg-muted">
                <Image
                    src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                    alt="Photo by Drew Beamer"
                    fill
                    className="rounded-md object-cover"
                />
            </AspectRatio>
        );
    },
};

export default meta;

type Story = StoryObj<typeof AspectRatio>;

export const Primary: Story = {};
