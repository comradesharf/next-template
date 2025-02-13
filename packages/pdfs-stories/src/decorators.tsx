import { i18n } from "@lingui/core";
import { PDFViewer } from "@react-pdf/renderer";
import type { Decorator } from "@storybook/react";
import { use } from "react";

export const withRoot: Decorator = (Story, ctx) => {
    const { getI18nInstance } = use(import("app-i18n/messages"));
    const $i18n = getI18nInstance(ctx.globals.locale);

    i18n.loadAndActivate({
        locale: $i18n.locale,
        messages: $i18n.messages,
    });

    return (
        <PDFViewer
            style={{
                width: "100dvw",
                height: "100dvh",
            }}
        >
            <Story />
        </PDFViewer>
    );
};
