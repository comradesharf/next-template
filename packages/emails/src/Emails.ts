import { render } from '@react-email/render';
import nodemailer from 'nodemailer';
import type { ReactElement } from 'react';

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
    extends Pick<nodemailer.SendMailOptions, 'to' | 'subject' | 'attachments'> {
    node: ReactElement;
}

export async function sendMail({
    to,
    subject,
    node,
    attachments,
}: SendMailOptions) {
    return transporter.sendMail({
        to,
        subject,
        from: process.env.SMTP_FROM,
        html: await render(node),
        attachments,
    });
}

/**
 * Send multiple emails in parallel. This function will limit the number of parallel requests to 100.
 * @param options
 */
export function sendMails(options: SendMailOptions[]) {
    return Promise.all(options.map((option) => sendMail(option)));
}
