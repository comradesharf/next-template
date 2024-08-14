import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent } from '#app/_components/card.tsx';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '#app/_components/carousel.tsx';

const meta: Meta<typeof Carousel> = {
    component: Carousel,
    subcomponents: {
        CarouselContent,
        CarouselItem,
        CarouselNext,
        CarouselPrevious,
    } as Meta['subcomponents'],
    tags: ['autodocs'],
    args: {},
    parameters: {
        layout: 'padded',
        docs: {
            story: {
                inline: true,
            },
        },
    },
    render: function Component() {
        return (
            <Carousel className="w-full max-w-xs">
                <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: this is sample code
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <span className="text-4xl font-semibold">
                                            {index + 1}
                                        </span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        );
    },
};

export default meta;

type Story = StoryObj<typeof Carousel>;

export const Primary: Story = {};

export const Sizes: Story = {
    render: function Component() {
        return (
            <Carousel
                opts={{
                    align: 'start',
                }}
                className="w-full max-w-sm"
            >
                <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem
                            // biome-ignore lint/suspicious/noArrayIndexKey: this is sample code
                            key={index}
                            className="md:basis-1/2 lg:basis-1/3"
                        >
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <span className="text-3xl font-semibold">
                                            {index + 1}
                                        </span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        );
    },
};

export const Spacing: Story = {
    render: function Component() {
        return (
            <Carousel className="w-full max-w-sm">
                <CarouselContent className="-ml-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem
                            // biome-ignore lint/suspicious/noArrayIndexKey: this is sample code
                            key={index}
                            className="pl-1 md:basis-1/2 lg:basis-1/3"
                        >
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <span className="text-2xl font-semibold">
                                            {index + 1}
                                        </span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        );
    },
};

export const Orientation: Story = {
    render: function Component() {
        return (
            <Carousel
                opts={{
                    align: 'start',
                }}
                orientation="vertical"
                className="w-full max-w-xs"
            >
                <CarouselContent className="-mt-1 h-[200px]">
                    {Array.from({ length: 5 }).map((_, index) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: This is a static list
                        <CarouselItem key={index} className="pt-1 md:basis-1/2">
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex items-center justify-center p-6">
                                        <span className="text-3xl font-semibold">
                                            {index + 1}
                                        </span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        );
    },
};
