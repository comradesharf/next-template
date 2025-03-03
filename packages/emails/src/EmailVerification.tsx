import { Trans, useLingui } from "@lingui/react/macro";
import {
    Body,
    Container,
    Font,
    Head,
    Heading,
    Hr,
    Html,
    Link,
    Preview,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";
import * as Platforms from "app-core/Platforms";

export interface Props {
    username: string;
    otp: string;
}

export function EmailVerification({ username, otp }: Props) {
    const { t, i18n } = useLingui();

    return (
        <Html lang={i18n.locale}>
            <Head>
                <Font
                    fontFamily="Roboto"
                    fallbackFontFamily="Verdana"
                    webFont={{
                        url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
                        format: "woff2",
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                />
            </Head>
            <Preview>{t`Verify email for ${Platforms.Name}`}</Preview>
            <Tailwind>
                <Body className="mx-auto bg-gray-100 p-4 font-sans">
                    <Container className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                        <Heading className="mb-4 font-bold text-2xl text-gray-800">
                            <Trans>Verify Your Email Address</Trans>
                        </Heading>
                        <Section className="mb-6 text-gray-600">
                            <Text>
                                <Trans>Hello {username},</Trans>
                            </Text>
                        </Section>
                        <Section className="mb-6 text-gray-600">
                            <Text>
                                <Trans>
                                    Thank you for signing up with{" "}
                                    {Platforms.Name}. To complete your
                                    registration, please verify your email
                                    address by entering the OTP below:
                                </Trans>
                            </Text>
                        </Section>
                        <Section className="mb-6 bg-gray-100">
                            <Text className="!mb-0 mx-auto inline-block w-full text-center font-bold text-3xl text-gray-800 leading-10 tracking-widest">
                                {otp}
                            </Text>
                            <Text className="!mt-0 text-center text-gray-500 text-sm">
                                <Trans>(Valid for 30 minutes)</Trans>
                            </Text>
                        </Section>
                        <Section className="mb-4 text-gray-600">
                            <Text>
                                <Trans>
                                    If you didn't create an account with us,
                                    please ignore this email or contact our
                                    support team if you have any questions.
                                </Trans>
                            </Text>
                        </Section>

                        <Hr className="mb-4 border-gray-300" />

                        <Section className="text-gray-500 text-sm">
                            <Text>
                                <Trans>
                                    Need help? Contact us at{" "}
                                    <Link
                                        href={Platforms.MailtoSupportEmail}
                                        className="text-blue-500"
                                    >
                                        {Platforms.SupportEmail}
                                    </Link>
                                </Trans>
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}

export default EmailVerification;
