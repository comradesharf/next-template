import { i18n } from "@lingui/core";
import { render } from "@react-email/render";
import type { Decorator } from "@storybook/react";
import { use } from "react";

export const withRoot: Decorator = (Story, ctx) => {
    const { getI18nInstance } = use(import("app-i18n/messages"));
    const $i18n = getI18nInstance(ctx.globals.locale);

    i18n.loadAndActivate({
        locale: $i18n.locale,
        messages: $i18n.messages,
    });

    const doc = use(render(<Story />));

    return (
        <iframe
            srcDoc={doc}
            title="email"
            style={{
                width: "100dvw",
                height: "100dvh",
            }}
        />
    );
};
