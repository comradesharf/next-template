import { Slot } from '@radix-ui/react-slot';
import { ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react';
import * as React from 'react';
import { cn } from '#libs/cn.ts';

const Breadcrumb = React.forwardRef<
    HTMLElement,
    React.ComponentPropsWithoutRef<'nav'> & {
        separator?: React.ReactNode;
    }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = 'Breadcrumb';

const BreadcrumbList = React.forwardRef<
    HTMLOListElement,
    React.ComponentPropsWithoutRef<'ol'>
>(({ className, ...props }, ref) => (
    <ol
        ref={ref}
        className={cn(
            'text-muted-foreground flex flex-wrap items-center gap-1.5 break-words text-sm sm:gap-2.5',
            className,
        )}
        {...props}
    />
));
BreadcrumbList.displayName = 'BreadcrumbList';

const BreadcrumbItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentPropsWithoutRef<'li'>
>(({ className, ...props }, ref) => (
    <li
        ref={ref}
        className={cn('inline-flex items-center gap-1.5', className)}
        {...props}
    />
));
BreadcrumbItem.displayName = 'BreadcrumbItem';

const BreadcrumbLink = React.forwardRef<
    HTMLAnchorElement,
    React.ComponentPropsWithoutRef<'a'> & {
        asChild?: boolean;
    }
>(({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a';

    return (
        <Comp
            ref={ref}
            className={cn('hover:text-foreground transition-colors', className)}
            {...props}
        />
    );
});
BreadcrumbLink.displayName = 'BreadcrumbLink';

const BreadcrumbPage = React.forwardRef<
    HTMLAnchorElement,
    React.ComponentPropsWithoutRef<'a'>
>(({ className, ...props }, ref) => (
    <a
        ref={ref}
        aria-disabled="true"
        aria-current="page"
        className={cn('text-foreground font-normal', className)}
        {...props}
    />
));
BreadcrumbPage.displayName = 'BreadcrumbPage';

const BreadcrumbSeparator = ({
    children,
    className,
    ...props
}: React.ComponentProps<'span'>) => (
    <section
        aria-hidden="true"
        tabIndex={-1}
        className={cn('[&>svg]:size-3.5', className)}
        {...props}
    >
        {children ?? <ChevronRightIcon />}
    </section>
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

const BreadcrumbEllipsis = ({
    className,
    ...props
}: React.ComponentProps<'span'>) => (
    <span
        role="presentation"
        tabIndex={-1}
        aria-hidden="true"
        className={cn('flex h-9 w-9 items-center justify-center', className)}
        {...props}
    >
        <MoreHorizontalIcon className="h-4 w-4" />
        <span className="sr-only">More</span>
    </span>
);
BreadcrumbEllipsis.displayName = 'BreadcrumbElipssis';

export {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
};
