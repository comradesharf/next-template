import type { SignIn } from '@comradesharf/schemas/SignInSchema';
import { Trans, t } from '@lingui/macro';
import Link from 'next/link';
import { Form } from '#app/[lang]/(auth)/sign-in/_components/form.tsx';
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
    FormControl,
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
import { assertUnauthenticated } from '#app/_libs/asserts.ts';
import { withLocale } from '#app/_libs/locales/withLocale.tsx';
import { getCurrentSession } from '#app/_queries/auths.ts';

export interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
    params: Promise<{ lang: string }>;
}

export default withLocale(async function Page(_props: PageProps) {
    const session = await getCurrentSession();
    assertUnauthenticated(session);

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
            <Form>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <FormField<SignIn> name="email" defaultValue="">
                            <FormItem>
                                <FormLabel>
                                    <Trans>Email</Trans>
                                </FormLabel>
                                <FormControl>
                                    <ControlledInput
                                        placeholder={t`Enter your username`}
                                        autoComplete="email"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <FormField<SignIn> name="password" defaultValue="">
                            <FormItem>
                                <FormLabel>
                                    <Trans>Password</Trans>
                                </FormLabel>
                                <FormControl>
                                    <ControlledInput
                                        type="password"
                                        placeholder={t`Enter your password`}
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
                    <Button className="w-full mt-4" type="submit">
                        <Trans>Sign In</Trans>
                    </Button>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <p className="text-sm text-gray-600">
                        <Trans>
                            Don't have an account?{' '}
                            <Link
                                href="/sign-up"
                                className="text-blue-600 hover:underline"
                            >
                                Sign up
                            </Link>
                        </Trans>
                    </p>
                </CardFooter>
            </Form>
        </Card>
    );
});
