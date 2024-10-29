import type { SignUp } from '@comradesharf/schemas/SignUpSchema';
import { Trans, t } from '@lingui/macro';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { Form } from '#app/[lang]/(auth)/sign-up/_components/form.tsx';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '#app/_components/card.tsx';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '#app/_components/form.tsx';
import { ControlledInput } from '#app/_components/input.tsx';
import {
    ServerErrorMessage,
    ServerErrorMessageDescription,
} from '#app/_components/server-error-message.tsx';
import { SubmitButton } from '#app/_components/submit-button.tsx';
import { assertUnauthenticated } from '#app/_libs/asserts.ts';
import { withLocale } from '#app/_libs/locales/withLocale.tsx';
import { getCurrentSession } from '#app/_queries/auths.ts';

export interface PageProps {
    params: Promise<{ lang: string | string[] | undefined }>;
}

export default withLocale(async function Page(_props: PageProps) {
    const session = await getCurrentSession();
    assertUnauthenticated(session);

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
                <Form>
                    <div className="grid w-full items-center gap-4">
                        <FormField<SignUp> name="display_name" defaultValue="">
                            <FormItem className="flex flex-col space-y-1.5">
                                <FormLabel>
                                    <Trans>Display name</Trans>
                                </FormLabel>
                                <FormControl>
                                    <ControlledInput autoComplete="username" />
                                </FormControl>
                                <FormDescription>
                                    <Trans>
                                        This is your public display name.
                                    </Trans>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <FormField<SignUp> name="email" defaultValue="">
                            <FormItem className="flex flex-col space-y-1.5">
                                <FormLabel>
                                    <Trans>Email</Trans>
                                </FormLabel>
                                <FormControl>
                                    <ControlledInput autoComplete="email" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <FormField<SignUp> name="password" defaultValue="">
                            <FormItem className="flex flex-col space-y-1.5">
                                <FormLabel>
                                    <Trans>Password</Trans>
                                </FormLabel>
                                <FormControl>
                                    <ControlledInput
                                        type="password"
                                        placeholder={t`Enter your password`}
                                        autoComplete="new-password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <FormField<SignUp>
                            name="confirm_password"
                            defaultValue=""
                        >
                            <FormItem className="flex flex-col space-y-1.5">
                                <FormLabel>
                                    <Trans>Confirm Password</Trans>
                                </FormLabel>
                                <FormControl>
                                    <ControlledInput
                                        type="password"
                                        placeholder={t`Confirm your password`}
                                        autoComplete="current-password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                    </div>
                    <ServerErrorMessage>
                        <ServerErrorMessageDescription />
                    </ServerErrorMessage>
                    <SubmitButton className="w-full mt-4">
                        <Mail className="mr-2 h-4 w-4" />
                        <Trans>Sign up with Email</Trans>
                    </SubmitButton>
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
});
