import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '#app/_components/button.tsx';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '#app/_components/form.tsx';
import { Label } from '#app/_components/label.tsx';
import { Textarea } from '#app/_components/textarea.tsx';
import { Toaster } from '#app/_components/toaster.tsx';
import { toast } from '#app/_hooks/use-toast.ts';

const meta: Meta<typeof Textarea> = {
    component: Textarea,
    tags: ['autodocs'],
    args: {
        placeholder: 'Type something...',
    },
    parameters: {
        layout: 'padded',
        docs: {
            story: {
                inline: true,
            },
        },
    },
    decorators: (Story) => (
        <>
            <Story />
            <Toaster />
        </>
    ),
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Primary: Story = {};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

export const WithLabel: Story = {
    render: function Component() {
        return (
            <div className="grid w-full gap-1.5">
                <Label htmlFor="message">Your message</Label>
                <Textarea placeholder="Type your message here." id="message" />
            </div>
        );
    },
};

export const WithText: Story = {
    render: function Component() {
        return (
            <div className="grid w-full gap-1.5">
                <Label htmlFor="message-2">Your Message</Label>
                <Textarea
                    placeholder="Type your message here."
                    id="message-2"
                />
                <p className="text-sm text-muted-foreground">
                    Your message will be copied to the support team.
                </p>
            </div>
        );
    },
};

export const WithButton: Story = {
    render: function Component() {
        return (
            <div className="grid w-full gap-2">
                <Textarea placeholder="Type your message here." />
                <Button>Send message</Button>
            </div>
        );
    },
};

const FormSchema = z.object({
    bio: z
        .string()
        .min(10, {
            message: 'Bio must be at least 10 characters.',
        })
        .max(160, {
            message: 'Bio must not be longer than 30 characters.',
        }),
});

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
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-2/3 space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bio</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tell us a little bit about yourself"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    You can <span>@mention</span> other users
                                    and organizations.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        );
    },
};
