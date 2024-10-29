import type { VerifyEmail } from '@comradesharf/schemas/VerifyEmailSchema';
import { Trans } from '@lingui/macro';
import { Form } from '#app/[lang]/(auth)/verify-email/[token]/_components/form.tsx';
import {
    Card,
    CardContent,
    CardDescription,
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
import {
    ControlledInputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '#app/_components/input-otp.tsx';
import {
    ServerErrorMessage,
    ServerErrorMessageDescription,
} from '#app/_components/server-error-message.tsx';
import { SubmitButton } from '#app/_components/submit-button.tsx';
import { withLocale } from '#app/_libs/locales/withLocale.tsx';
import { getSignUpSessionById } from '#app/_queries/sign-up-sessions.ts';

export interface PageProps {
    params: Promise<{ lang: string; token: string }>;
}

export default withLocale(async function Page({ params }: PageProps) {
    const { token } = await params;

    const session = await getSignUpSessionById(token);

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>
                    <Trans>Verify Your Email</Trans>
                </CardTitle>
                <CardDescription>
                    <Trans>
                        Please enter the one-time password sent to your email to
                        verify your account.
                    </Trans>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form className="space-y-4" session={session._id}>
                    <FormField<VerifyEmail> name="otp">
                        <FormItem>
                            <FormLabel>
                                <Trans>One-Time Password</Trans>
                            </FormLabel>
                            <FormControl>
                                <ControlledInputOTP maxLength={5}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                    </InputOTPGroup>
                                </ControlledInputOTP>
                            </FormControl>
                            <FormDescription>
                                <Trans>
                                    Please enter the one-time password sent to
                                    your phone.
                                </Trans>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <ServerErrorMessage>
                        <ServerErrorMessageDescription />
                    </ServerErrorMessage>
                    <SubmitButton>
                        <Trans>Submit</Trans>
                    </SubmitButton>
                </Form>
            </CardContent>
        </Card>
    );
});
