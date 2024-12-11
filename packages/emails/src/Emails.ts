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

interface RenderEmailOptions {
    render: () => ReactElement;
    locale: string;
}

function renderEmail({ locale, render: $render }: RenderEmailOptions) {
    return withI18n(locale, () => {
        const node = $render();
        return Promise.all([
            render(node),
            render(node, {
                plainText: true,
            }),
        ]);
    });
}

export interface SendMailOptions
    extends Omit<nodemailer.SendMailOptions, "html">,
        RenderEmailOptions {}

/**
 * Send an email. This function will render the email and send it in the background. It will also capture any errors that occur.
 *
 */
export function sendMail({ render, ...options }: SendMailOptions) {
    setImmediate(async () => {
        let html: string;
        let text: string;

        try {
            [html, text] = await renderEmail({
                render,
                locale: options.locale,
            });
        } catch (e) {
            Sentry.captureException(e, (ctx) => {
                ctx.setTag("email", "render");
                ctx.setExtras(options);
                return ctx;
            });
            return;
        }

        try {
            await transporter.sendMail({
                ...options,
                html,
                text,
            });
        } catch (e) {
            Sentry.captureException(e, (ctx) => {
                ctx.setTag("email", "send");
                ctx.setExtras(options);
                return ctx;
            });
        }
    });
}
