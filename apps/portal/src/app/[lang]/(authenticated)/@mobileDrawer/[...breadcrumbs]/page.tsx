import {
    Cog,
    Home,
    LineChart,
    Package,
    Package2,
    PanelLeft,
    Settings,
    ShoppingCart,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '#app/_components/button.tsx';
import { Sheet, SheetContent, SheetTrigger } from '#app/_components/sheet.tsx';
import { cn } from '#app/_libs/cn.ts';
import { withLocale } from '#app/_libs/locales/withLocale.tsx';

export interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
    params: Promise<{ lang: string; breadcrumbs: string[] }>;
}

export default withLocale<PageProps>(async function Page({ params }) {
    const {
        breadcrumbs: [_lang, head],
    } = await params;

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                    <PanelLeft className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                    <Link
                        href="#"
                        className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                    >
                        <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    <Link
                        href="/overview"
                        className={cn(
                            'flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground',
                            {
                                'text-foreground': head === 'overview',
                            },
                        )}
                    >
                        <Home className="h-5 w-5" />
                        Overview
                    </Link>
                    <Link
                        href="/orders"
                        className={cn(
                            'flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground',
                            {
                                'text-foreground': head === 'orders',
                            },
                        )}
                    >
                        <ShoppingCart className="h-5 w-5" />
                        Orders
                    </Link>
                    <Link
                        href="#"
                        className={cn(
                            'flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground',
                            {
                                'text-foreground': head === 'products',
                            },
                        )}
                    >
                        <Package className="h-5 w-5" />
                        Products
                    </Link>
                    <Link
                        href="#"
                        className={cn(
                            'flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground',
                            {
                                'text-foreground': head === 'settings',
                            },
                        )}
                    >
                        <Settings className="h-5 w-5" />
                        Settings
                    </Link>
                </nav>
            </SheetContent>
        </Sheet>
    );
});
