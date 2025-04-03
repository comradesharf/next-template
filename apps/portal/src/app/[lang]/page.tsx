import { Trans } from "@lingui/react/macro";
import { withLocale } from "#app/_components/locales.tsx";

export interface PageProps {
    params: Promise<{ lang: string }>;
}

export default withLocale(function Page(_props: PageProps) {
    return (
        <div>
            <Trans>Hello World</Trans>
        </div>
    );
});
