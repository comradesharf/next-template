import { render } from "@react-email/render";
import * as Sentry from "@sentry/nextjs";
import nodemailer from "nodemailer";
import type { ReactElement } from "react";
import { withI18n } from "#locales/i18n.tsx";

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
    from: process.env.SMTP_FROM,
});

export interface SendMailOptions
    extends Omit<nodemailer.SendMailOptions, "html"> {
    nodeFn: () => ReactElement;
    locale: string;
}

/**
 * Send an email. This function will render the email and send it in the background. It will also capture any errors that occur.
 *
 * @param node
 * @param rest
 */
export function sendMail({ nodeFn, locale, ...rest }: SendMailOptions) {
    const node = withI18n(locale, () => nodeFn());

    setImmediate(async () => {
        let html: string;
        let text: string;

        try {
            [html, text] = await Promise.all([
                render(node),
                render(node, {
                    plainText: true,
                }),
            ]);
        } catch (e) {
            Sentry.captureException(e, (ctx) => {
                ctx.setTag("email", "render");
                ctx.setExtras(rest);
                return ctx;
            });
            return;
        }

        try {
            await transporter.sendMail({
                ...rest,
                html,
                text,
            });
        } catch (e) {
            Sentry.captureException(e, (ctx) => {
                ctx.setTag("email", "send");
                ctx.setExtras(rest);
                return ctx;
            });
        }
    });
}
