import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '#app/_components/button.tsx';
import {
    Calendar,
    ControlledCalendar,
    SelectedDate,
    SelectedDateRange,
} from '#app/_components/calendar.tsx';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '#app/_components/form.tsx';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '#app/_components/popover.tsx';
import { SubmitButton } from '#app/_components/submit-button.tsx';
import { Toaster } from '#app/_components/toaster.tsx';
import { toast } from '#app/_hooks/use-toast.ts';
import { cn } from '#app/_libs/cn.ts';

const meta: Meta<typeof Calendar> = {
    component: Calendar,
    tags: ['autodocs'],
    args: {},
    parameters: {
        layout: 'centered',
        docs: {
            story: {
                inline: true,
            },
        },
    },
    render: function Component() {
        const [date, setDate] = useState<Date | undefined>(new Date());

        return (
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
            />
        );
    },
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Primary: Story = {};

export const AsForm: Story = {
    render: function Component() {
        const form = useForm<z.infer<typeof FormSchema>>({
            resolver: zodResolver(FormSchema),
        });

        function onSubmit(data: z.infer<typeof FormSchema>) {
            toast({
                title: 'You submitted the following values:',
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">
                            {JSON.stringify(data, null, 2)}
                        </code>
                    </pre>
                ),
            });
        }

        return (
            <Form {...form}>
                <Toaster />
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField name="dob">
                        <FormItem className="flex flex-col">
                            <FormLabel>Date of birth</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                'w-[240px] pl-3 text-left font-normal',
                                            )}
                                        >
                                            <SelectedDate placeholder="Pick a date" />
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <ControlledCalendar
                                        mode="single"
                                        disabled={(date) =>
                                            date > new Date() ||
                                            date < new Date('1900-01-01')
                                        }
                                        // initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                Your date of birth is used to calculate your
                                age.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <SubmitButton type="submit">Submit</SubmitButton>
                </form>
            </Form>
        );
    },
};

const FormSchema = z.object({
    dob: z.date({
        required_error: 'A date of birth is required.',
    }),
});

export const AsFormRange: Story = {
    render: function Component() {
        const form = useForm<z.infer<typeof FormRangeSchema>>({
            resolver: zodResolver(FormRangeSchema),
        });

        async function onSubmit(data: z.infer<typeof FormRangeSchema>) {
            await new Promise((resolve) => {
                setTimeout(() => {
                    toast({
                        title: 'You submitted the following values:',
                        description: (
                            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                                <code className="text-white">
                                    {JSON.stringify(data, null, 2)}
                                </code>
                            </pre>
                        ),
                    });
                    resolve(null);
                }, 1000);
            });
        }

        return (
            <Form {...form}>
                <Toaster />
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField name="dob">
                        <FormItem className="flex flex-col">
                            <FormLabel>Date of birth</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="date"
                                        variant={'outline'}
                                        className={cn(
                                            'w-[300px] justify-start text-left font-normal',
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        <SelectedDateRange placeholder="Select a date range" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <ControlledCalendar
                                        mode="range"
                                        numberOfMonths={2}
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                Your date of birth is used to calculate your
                                age.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <SubmitButton type="submit">Submit</SubmitButton>
                </form>
            </Form>
        );
    },
};

const FormRangeSchema = z.object({
    dob: z.object({
        from: z.date({
            required_error: 'A date of birth is required.',
        }),
        to: z.date({
            required_error: 'A date of birth is required.',
        }),
    }),
});
