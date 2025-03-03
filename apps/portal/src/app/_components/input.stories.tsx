import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "#app/_components/button.tsx";
import {
    Form,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "#app/_components/form.tsx";
import { ControlledInput, Input } from "#app/_components/input.tsx";
import { Label } from "#app/_components/label.tsx";
import { Toaster } from "#app/_components/toaster.tsx";
import { toast } from "#app/_hooks/use-toast.ts";

const meta: Meta<typeof Input> = {
    component: Input,
    tags: ["autodocs"],
    args: {},
    parameters: {
        layout: "padded",
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

type Story = StoryObj<typeof Input>;

export const Primary: Story = {
    args: {
        type: "email",
        placeholder: "Email",
    },
};

export const Email: Story = {
    args: {},
    render: function Component() {
        return (
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Picture</Label>
                <Input id="picture" type="file" />
            </div>
        );
    },
};

export const Disabled: Story = {
    args: {
        type: "email",
        placeholder: "Email",
        disabled: true,
    },
};

export const WithLabel: Story = {
    render: function Component() {
        return (
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Email" />
            </div>
        );
    },
};

export const WithButton: Story = {
    render: function Component() {
        return (
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="email" placeholder="Email" />
                <Button type="submit">Subscribe</Button>
            </div>
        );
    },
};

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
});

export const InForm: Story = {
    render: function Component() {
        const form = useForm<z.infer<typeof FormSchema>>({
            resolver: zodResolver(FormSchema),
            defaultValues: {
                username: "",
            },
        });

        function onSubmit(data: z.infer<typeof FormSchema>) {
            toast({
                title: "You submitted the following values:",
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
                    <FormField name="username">
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <ControlledInput placeholder="shadcn" />
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        );
    },
};
