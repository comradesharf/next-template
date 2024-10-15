'use client';

import { type SignUp, SignUpSchema } from '@comradesharf/schemas/SignUpSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trans, t } from '@lingui/macro';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { signUp } from '#app/_actions/signUp.ts';
import { Button } from '#app/_components/button.tsx';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '#app/_components/card.tsx';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '#app/_components/form.tsx';
import { Input } from '#app/_components/input.tsx';

export interface PageProps {
    searchParams: { [key: string]: string | string[] | undefined };
    params: { lang: string };
}

export default function Page(_props: PageProps) {
    const { form, handleSubmitWithAction } = useHookFormAction(
        signUp,
        zodResolver(SignUpSchema),
    );

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>
                    <Trans>Sign Up</Trans>
                </CardTitle>
                <CardDescription>
                    <Trans>Create a new account to get started.</Trans>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={handleSubmitWithAction}>
                        <div className="grid w-full items-center gap-4">
                            <FormField<SignUp>
                                render={({ field }) => (
                                    <FormItem className="flex flex-col space-y-1.5">
                                        <FormLabel>
                                            <Trans>Display name</Trans>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            <Trans>
                                                This is your public display
                                                name.
                                            </Trans>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                name="display_name"
                            />
                            <FormField<SignUp>
                                render={({ field }) => (
                                    <FormItem className="flex flex-col space-y-1.5">
                                        <FormLabel>
                                            <Trans>Email</Trans>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                name="email"
                            />
                            <FormField<SignUp>
                                render={({ field }) => (
                                    <FormItem className="flex flex-col space-y-1.5">
                                        <FormLabel>
                                            <Trans>Password</Trans>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="password"
                                                placeholder={t`Enter your password`}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                name="password"
                            />
                            <FormField<SignUp>
                                render={({ field }) => (
                                    <FormItem className="flex flex-col space-y-1.5">
                                        <FormLabel>
                                            <Trans>Confirm Password</Trans>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="password"
                                                placeholder={t`Confirm your password`}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                name="confirm_password"
                            />
                        </div>
                        <Button className="w-full mt-4" type="submit">
                            <Mail className="mr-2 h-4 w-4" />
                            <Trans>Sign up with Email</Trans>
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex flex-col items-center">
                <p className="text-sm text-gray-600">
                    <Trans>
                        Already have an account?{' '}
                        <Link
                            href="/sign-in"
                            className="text-blue-600 hover:underline"
                        >
                            Sign in
                        </Link>
                    </Trans>
                </p>
            </CardFooter>
        </Card>
    );
}
