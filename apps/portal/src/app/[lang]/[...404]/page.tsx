import { NotFound } from '#app/_components/not-found.tsx';
import { withLingui } from '#libs/locales/withLingui.tsx';

export interface PageProps {
    searchParams: { [key: string]: string | string[] | undefined };
    params: { lang: string };
}

export default withLingui<PageProps>(function Page() {
    return <NotFound />;
});
