import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "#app/_components/button.tsx";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "#app/_components/form.tsx";
import { Label } from "#app/_components/label.tsx";
import { Switch } from "#app/_components/switch.tsx";
import { Toaster } from "#app/_components/toaster.tsx";
import { toast } from "#app/_hooks/use-toast.ts";

const meta: Meta<typeof Switch> = {
    component: Switch,
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
    render: function Component() {
        return (
            <div className="flex items-center space-x-2">
                <Switch id="airplane-mode" />
                <Label htmlFor="airplane-mode">Airplane Mode</Label>
            </div>
        );
    },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Primary: Story = {};

const FormSchema = z.object({
    marketing_emails: z.boolean().default(false).optional(),
    security_emails: z.boolean(),
});

export const InForm: Story = {
    render: function Component() {
        const form = useForm<z.infer<typeof FormSchema>>({
            resolver: zodResolver(FormSchema),
            defaultValues: {
                security_emails: true,
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
                    className="w-full space-y-6"
                >
                    <div>
                        <h3 className="mb-4 font-medium text-lg">
                            Email Notifications
                        </h3>
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="marketing_emails"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-xs">
                                        <div className="space-y-0.5">
                                            <FormLabel>
                                                Marketing emails
                                            </FormLabel>
                                            <FormDescription>
                                                Receive emails about new
                                                products, features, and more.
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="security_emails"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-xs">
                                        <div className="space-y-0.5">
                                            <FormLabel>
                                                Security emails
                                            </FormLabel>
                                            <FormDescription>
                                                Receive emails about your
                                                account security.
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                disabled
                                                aria-readonly
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        );
    },
};
