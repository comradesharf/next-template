import { Trans } from '@lingui/macro';
import {
    Check,
    Globe,
    Home,
    Package,
    Package2,
    Settings,
    ShoppingCart,
} from 'lucide-react';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '#app/_components/dropdown-menu.tsx';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '#app/_components/tooltip.tsx';
import { cn } from '#app/_libs/cn.ts';
import { SupportedLocales } from '#app/_libs/locales/SupportedLocales.ts';
import { withLocale } from '#app/_libs/locales/withLocale.tsx';

export interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
    params: Promise<{ lang: string; breadcrumbs: string[] }>;
}

export default withLocale<PageProps>(async function Page({ params }) {
    const {
        breadcrumbs: [_lang, head, ...rest],
        lang,
    } = await params;

    const selectedLanguage = SupportedLocales.find(
        (locale) => locale.value === lang,
    )?.title;

    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
                <Link
                    href="#"
                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                    <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                    <span className="sr-only">Acme Inc</span>
                </Link>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/overview"
                            className={cn(
                                'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                                {
                                    'bg-accent text-accent-foreground':
                                        head === 'overview',
                                },
                            )}
                        >
                            <Home className="h-5 w-5" />
                            <span className="sr-only">
                                <Trans>Overview</Trans>
                            </span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        <Trans>Overview</Trans>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/orders"
                            className={cn(
                                'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                                {
                                    'bg-accent text-accent-foreground':
                                        head === 'orders',
                                },
                            )}
                        >
                            <ShoppingCart className="h-5 w-5" />
                            <span className="sr-only">
                                <Trans>Orders</Trans>
                            </span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        <Trans>Orders</Trans>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/products"
                            className={cn(
                                'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                                {
                                    'bg-accent text-accent-foreground':
                                        head === 'products',
                                },
                            )}
                        >
                            <Package className="h-5 w-5" />
                            <span className="sr-only">
                                <Trans>Products</Trans>
                            </span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        <Trans>Products</Trans>
                    </TooltipContent>
                </Tooltip>
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
                <Tooltip>
                    <DropdownMenu>
                        <TooltipTrigger asChild>
                            <DropdownMenuTrigger className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                                <Globe className="h-4 w-4" />
                                <span className="sr-only">
                                    <Trans>Select language</Trans>
                                </span>
                            </DropdownMenuTrigger>
                        </TooltipTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            {SupportedLocales.map((language) => {
                                const href = [
                                    language.value,
                                    head,
                                    ...rest,
                                ].join('/');

                                return (
                                    <DropdownMenuItem
                                        key={language.value}
                                        asChild
                                    >
                                        <Link href={`/${href}`}>
                                            <Check
                                                className={cn(
                                                    'mr-2 h-4 w-4 opacity-0',
                                                    {
                                                        'opacity-100':
                                                            language.value ===
                                                            lang,
                                                    },
                                                )}
                                            />
                                            {language.title}
                                        </Link>
                                    </DropdownMenuItem>
                                );
                            })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <TooltipContent>
                        <p>
                            <Trans>Selected: {selectedLanguage}</Trans>
                        </p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/settings"
                            className={cn(
                                'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                                {
                                    'bg-accent text-accent-foreground':
                                        head === 'settings',
                                },
                            )}
                        >
                            <Settings className="h-5 w-5" />
                            <span className="sr-only">
                                <Trans>Settings</Trans>
                            </span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        <Trans>Settings</Trans>
                    </TooltipContent>
                </Tooltip>
            </nav>
        </aside>
    );
});
