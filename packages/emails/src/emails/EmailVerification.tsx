import { Platforms } from '@comradesharf/core/Platforms';
import { Trans, t } from '@lingui/macro';
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
} from '@react-email/components';
import { getI18nInstance } from '#locales/i18n.ts';

export interface Props {
    username: string;
    otp: string;
    lang: string;
}

export function EmailVerification({
    username = 'Tan Boon',
    otp = '12345',
    lang = 'en',
}: Props) {
    const i18n = getI18nInstance(lang);

    return (
        <Html lang={lang}>
            <Head>
                <Font
                    fontFamily="Roboto"
                    fallbackFontFamily="Verdana"
                    webFont={{
                        url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
                        format: 'woff2',
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                />
            </Head>
            <Preview>{t(i18n)`Verify email for ${Platforms.Name}`}</Preview>
            <Tailwind>
                <Body className="bg-gray-100 font-sans p-4 mx-auto">
                    <Container className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                        <Heading className="text-2xl font-bold text-gray-800 mb-4">
                            <Trans i18n={i18n}>Verify Your Email Address</Trans>
                        </Heading>
                        <Section className="text-gray-600 mb-6">
                            <Trans i18n={i18n}>Hello {username},</Trans>
                        </Section>
                        <Section className="text-gray-600 mb-6">
                            <Trans i18n={i18n}>
                                Thank you for signing up with {Platforms.Name}.
                                To complete your registration, please verify
                                your email address by entering the OTP below:
                            </Trans>
                        </Section>
                        <Section className="bg-gray-100 mb-6">
                            <Text className="text-gray-800 inline-block text-3xl font-bold tracking-widest leading-10 mx-auto w-full text-center !mb-0">
                                {otp}
                            </Text>
                            <Text className="text-center !mt-0 text-sm text-gray-500">
                                <Trans i18n={i18n}>
                                    (Valid for 30 minutes)
                                </Trans>
                            </Text>
                        </Section>
                        <Section className="text-gray-600 mb-4">
                            <Trans i18n={i18n}>
                                If you didn't create an account with us, please
                                ignore this email or contact our support team if
                                you have any questions.
                            </Trans>
                        </Section>
                        <Hr className="border-gray-300 mb-4" />
                        <Section className="text-sm text-gray-500">
                            <Trans i18n={i18n}>
                                Need help? Contact us at{' '}
                                <Link
                                    href={Platforms.MailtoSupportEmail}
                                    className="text-blue-500"
                                >
                                    {Platforms.SupportEmail}
                                </Link>
                            </Trans>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}

// color: "#000",
//     display: "inline-block",
//     fontFamily: "HelveticaNeue-Bold",
//     fontSize: "32px",
//     fontWeight: 700,
//     letterSpacing: "6px",
//     lineHeight: "40px",
//     paddingBottom: "8px",
//     paddingTop: "8px",
//     margin: "0 auto",
//     width: "100%",
//     textAlign: "center" as const,

export default EmailVerification;
