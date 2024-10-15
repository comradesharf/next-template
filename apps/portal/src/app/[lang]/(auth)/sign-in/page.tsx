'use client';

import { type SignIn, SignInSchema } from '@comradesharf/schemas/SignInSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trans, t } from '@lingui/macro';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { signIn } from '#app/_actions/signIn.ts';
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
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '#app/_components/form.tsx';
import { Input } from '#app/_components/input.tsx';
import {
    ServerErrorMessage,
    ServerErrorMessageDescription,
} from '#app/_components/server-error-message.tsx';

export interface PageProps {
    searchParams: { [key: string]: string | string[] | undefined };
    params: { lang: string };
}

export default function Page(_props: PageProps) {
    const { form, handleSubmitWithAction, action } = useHookFormAction(
        signIn,
        zodResolver(SignInSchema),
    );

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>
                    <Trans>Sign In</Trans>
                </CardTitle>
                <CardDescription>
                    <Trans>
                        Enter your username and password to access your account.
                    </Trans>
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={handleSubmitWithAction}>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <FormField<SignIn>
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            <Trans>Email</Trans>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder={t`Enter your username`}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                name="email"
                            />
                            <FormField<SignIn>
                                render={({ field }) => (
                                    <FormItem>
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
                        </div>
                        <ServerErrorMessage action={action}>
                            <ServerErrorMessageDescription />
                        </ServerErrorMessage>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button className="w-full" type="submit">
                            <Trans>Sign In</Trans>
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}
