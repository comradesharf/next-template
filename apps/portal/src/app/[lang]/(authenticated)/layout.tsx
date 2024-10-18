import { Trans, t } from '@lingui/macro';
import { Search } from 'lucide-react';
import Image from 'next/image';
import type { PropsWithChildren, ReactNode } from 'react';
import { Button } from '#app/_components/button.tsx';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '#app/_components/dropdown-menu.tsx';
import { Input } from '#app/_components/input.tsx';
import { SignOutButton } from '#app/_components/sign-out-button.tsx';
import { withLocale } from '#app/_libs/locales/withLocale.tsx';

export interface LayoutProps extends PropsWithChildren {
    params: { lang: string };
    breadcrumbs: ReactNode;
    mobileDrawer: ReactNode;
    desktopNav: ReactNode;
}

export default withLocale(function Layout({
    children,
    breadcrumbs,
    mobileDrawer,
    desktopNav,
}: LayoutProps) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            {desktopNav}
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    {mobileDrawer}
                    {breadcrumbs}
                    <div className="relative ml-auto flex-1 md:grow-0">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder={t`Search...`}
                            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="overflow-hidden rounded-full"
                            >
                                <Image
                                    src="/placeholder-user.jpg"
                                    width={36}
                                    height={36}
                                    alt={t`Avatar`}
                                    className="overflow-hidden rounded-full"
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>
                                <Trans>My Account</Trans>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Trans>Settings</Trans>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Trans>Support</Trans>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <SignOutButton asChild>
                                <DropdownMenuItem>
                                    <Trans>Logout</Trans>
                                </DropdownMenuItem>
                            </SignOutButton>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                {children}
            </div>
        </div>
    );
});
