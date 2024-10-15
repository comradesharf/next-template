import type { Meta, StoryObj } from '@storybook/react';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { Bar, BarChart, ResponsiveContainer } from 'recharts';
import { Button } from '#app/_components/button.tsx';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '#app/_components/dialog.tsx';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '#app/_components/drawer.tsx';
import { Input } from '#app/_components/input.tsx';
import { Label } from '#app/_components/label.tsx';
import { useMediaQuery } from '#app/_hooks/use-media-query.ts';
import { cn } from '#app/_libs/cn.ts';

const data = [
    {
        goal: 400,
    },
    {
        goal: 300,
    },
    {
        goal: 200,
    },
    {
        goal: 300,
    },
    {
        goal: 200,
    },
    {
        goal: 278,
    },
    {
        goal: 189,
    },
    {
        goal: 239,
    },
    {
        goal: 300,
    },
    {
        goal: 200,
    },
    {
        goal: 278,
    },
    {
        goal: 189,
    },
    {
        goal: 349,
    },
];

const meta: Meta<typeof Drawer> = {
    component: Drawer,
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
        const [goal, setGoal] = useState(350);

        function onClick(adjustment: number) {
            setGoal(Math.max(200, Math.min(400, goal + adjustment)));
        }

        return (
            <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="outline">Open Drawer</Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                            <DrawerTitle>Move Goal</DrawerTitle>
                            <DrawerDescription>
                                Set your daily activity goal.
                            </DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4 pb-0">
                            <div className="flex items-center justify-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 shrink-0 rounded-full"
                                    onClick={() => onClick(-10)}
                                    disabled={goal <= 200}
                                >
                                    <MinusIcon className="h-4 w-4" />
                                    <span className="sr-only">Decrease</span>
                                </Button>
                                <div className="flex-1 text-center">
                                    <div className="text-7xl font-bold tracking-tighter">
                                        {goal}
                                    </div>
                                    <div className="text-[0.70rem] uppercase text-muted-foreground">
                                        Calories/day
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 shrink-0 rounded-full"
                                    onClick={() => onClick(10)}
                                    disabled={goal >= 400}
                                >
                                    <PlusIcon className="h-4 w-4" />
                                    <span className="sr-only">Increase</span>
                                </Button>
                            </div>
                            <div className="mt-3 h-[120px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data}>
                                        <Bar
                                            dataKey="goal"
                                            style={{
                                                fill: 'hsl(var(--foreground))',
                                                opacity: 0.9,
                                            }}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <DrawerFooter>
                            <Button>Submit</Button>
                            <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>
        );
    },
};

export default meta;

type Story = StoryObj<typeof Drawer>;

export const Primary: Story = {};

export const Responsive: Story = {
    render: function Component() {
        const [open, setOpen] = useState(false);
        const isDesktop = useMediaQuery('(min-width: 768px)');

        if (isDesktop) {
            return (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">Edit Profile</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save
                                when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <ProfileForm />
                    </DialogContent>
                </Dialog>
            );
        }

        return (
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button variant="outline">Edit Profile</Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader className="text-left">
                        <DrawerTitle>Edit profile</DrawerTitle>
                        <DrawerDescription>
                            Make changes to your profile here. Click save when
                            you're done.
                        </DrawerDescription>
                    </DrawerHeader>
                    <ProfileForm className="px-4" />
                    <DrawerFooter className="pt-2">
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        );
    },
};

function ProfileForm({ className }: React.ComponentProps<'form'>) {
    return (
        <form className={cn('grid items-start gap-4', className)}>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    type="email"
                    id="email"
                    defaultValue="shadcn@example.com"
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@shadcn" />
            </div>
            <Button type="submit">Save changes</Button>
        </form>
    );
}
