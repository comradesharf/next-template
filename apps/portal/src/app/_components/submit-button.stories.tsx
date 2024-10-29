import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { Form } from '#app/_components/form.tsx';
import { SubmitButton } from '#app/_components/submit-button.tsx';
import { Toaster } from '#app/_components/toaster.tsx';
import { toast } from '#app/_hooks/use-toast.ts';

const meta: Meta<typeof SubmitButton> = {
    component: SubmitButton,
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
        const form = useForm();

        async function onSubmit() {
            await new Promise((resolve) => {
                setTimeout(() => {
                    toast({
                        title: 'You submitted the following values:',
                        description: (
                            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                                <code className="text-white">Hola!</code>
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
                    <SubmitButton>Invoke</SubmitButton>
                </form>
            </Form>
        );
    },
};

export default meta;

type Story = StoryObj<typeof SubmitButton>;

export const Primary: Story = {};
