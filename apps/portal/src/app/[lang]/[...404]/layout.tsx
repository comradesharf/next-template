import { withLingui } from '#app/_libs/locales/withLingui.tsx';

export interface LayoutProps {
    params: { lang: string };
}

export default withLingui<LayoutProps>(function Layout({ children }) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {children}
        </div>
    );
});
