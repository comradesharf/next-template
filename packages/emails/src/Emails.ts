import { render } from "@react-email/render";
import { withI18n } from "app-i18n/lingui";
import nodemailer from "nodemailer";
import type { ReactElement } from "react";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    pool: true,
    maxMessages: Number.POSITIVE_INFINITY,
    maxConnections: 20,
});

export interface SendMailOptions
    extends Omit<nodemailer.SendMailOptions, "html"> {
    node: ReactElement;
}

/**
 * Send an email. This function will render the email and send it in the background. It will also capture any errors that occur.
 *
 */
export async function sendMail(
    fn: () => Promise<SendMailOptions> | SendMailOptions,
    locale = "en",
) {
    return withI18n(locale, async () => {
        const { node, from = process.env.SMTP_FROM, ...options } = await fn();

        const [html, text] = await Promise.all([
            render(node),
            render(node, {
                plainText: true,
            }),
        ]);

        await transporter.sendMail({
            ...options,
            html,
            text,
            from,
        });
    });
}
