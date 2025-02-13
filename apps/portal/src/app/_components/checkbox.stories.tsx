import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "#app/_components/button.tsx";
import { Checkbox, ControlledCheckbox } from "#app/_components/checkbox.tsx";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "#app/_components/form.tsx";
import { Toaster } from "#app/_components/toaster.tsx";
import { toast } from "#app/_hooks/use-toast.ts";

const meta: Meta<typeof Checkbox> = {
    component: Checkbox,
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
    render: function Component() {
        return (
            <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                    htmlFor="terms"
                    className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Accept terms and conditions
                </label>
            </div>
        );
    },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Primary: Story = {};

const items = [
    {
        id: "recents",
        label: "Recents",
    },
    {
        id: "home",
        label: "Home",
    },
    {
        id: "applications",
        label: "Applications",
    },
    {
        id: "desktop",
        label: "Desktop",
    },
    {
        id: "downloads",
        label: "Downloads",
    },
    {
        id: "documents",
        label: "Documents",
    },
] as const;

const FormSchema2 = z.object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
});

export const AsForm2: Story = {
    render: function Component() {
        const form = useForm<z.infer<typeof FormSchema2>>({
            resolver: zodResolver(FormSchema2),
            defaultValues: {
                items: ["recents", "home"],
            },
        });

        function onSubmit(data: z.infer<typeof FormSchema2>) {
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
                <Toaster />
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="items"
                        render={() => (
                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-base">
                                        Sidebar
                                    </FormLabel>
                                    <FormDescription>
                                        Select the items you want to display in
                                        the sidebar.
                                    </FormDescription>
                                </div>
                                {items.map((item) => (
                                    <FormField
                                        key={item.id}
                                        control={form.control}
                                        name="items"
                                    >
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <ControlledCheckbox
                                                value={item.id}
                                            />
                                            <FormLabel className="font-normal">
                                                {item.label}
                                            </FormLabel>
                                        </FormItem>
                                    </FormField>
                                ))}
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

const FormSchema1 = z.object({
    mobile: z.boolean().default(false).optional(),
});

export const AsForm1: Story = {
    render: function Component() {
        const form = useForm<z.infer<typeof FormSchema1>>({
            resolver: zodResolver(FormSchema1),
            defaultValues: {
                mobile: true,
            },
        });

        function onSubmit(data: z.infer<typeof FormSchema1>) {
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
                <Toaster />
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="mobile"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Use different settings for my mobile
                                        devices
                                    </FormLabel>
                                    <FormDescription>
                                        You can manage your mobile notifications
                                        in the{" "}
                                        <Link href="/examples/forms">
                                            mobile settings
                                        </Link>{" "}
                                        page.
                                    </FormDescription>
                                </div>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        );
    },
};

export const Disabled: Story = {
    render: function Component() {
        return (
            <div className="flex items-center space-x-2">
                <Checkbox id="terms2" disabled />
                <label
                    htmlFor="terms2"
                    className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Accept terms and conditions
                </label>
            </div>
        );
    },
};

export const WithText: Story = {
    render: function Component() {
        return (
            <div className="items-top flex space-x-2">
                <Checkbox id="terms1" />
                <div className="grid gap-1.5 leading-none">
                    <label
                        htmlFor="terms1"
                        className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Accept terms and conditions
                    </label>
                    <p className="text-muted-foreground text-sm">
                        You agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
            </div>
        );
    },
};
