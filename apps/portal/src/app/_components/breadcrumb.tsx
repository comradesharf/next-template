import { Slot } from "@radix-ui/react-slot";
import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "#app/_libs/cn.ts";

const Breadcrumb = ({
    ref,
    ...props
}: React.ComponentProps<"nav"> & {
    separator?: React.ReactNode;
}) => <nav ref={ref} aria-label="breadcrumb" {...props} />;
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = ({
    className,
    ref,
    ...props
}: React.ComponentProps<"ol">) => (
    <ol
        ref={ref}
        className={cn(
            "flex flex-wrap items-center gap-1.5 break-words text-muted-foreground text-sm sm:gap-2.5",
            className,
        )}
        {...props}
    />
);
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = ({
    className,
    ref,
    ...props
}: React.ComponentProps<"li">) => (
    <li
        ref={ref}
        className={cn("inline-flex items-center gap-1.5", className)}
        {...props}
    />
);
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = ({
    asChild,
    className,
    ref,
    ...props
}: React.ComponentProps<"a"> & {
    asChild?: boolean;
}) => {
    const Comp = asChild ? Slot : "a";

    return (
        <Comp
            ref={ref}
            className={cn("transition-colors hover:text-foreground", className)}
            {...props}
        />
    );
};
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = ({
    className,
    ref,
    ...props
}: React.ComponentProps<"a">) => (
    <a
        ref={ref}
        aria-disabled="true"
        aria-current="page"
        className={cn("font-normal text-foreground", className)}
        {...props}
    />
);
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({
    children,
    className,
    ...props
}: React.ComponentProps<"span">) => (
    <section
        aria-hidden="true"
        tabIndex={-1}
        className={cn("[&>svg]:size-3.5", className)}
        {...props}
    >
        {children ?? <ChevronRightIcon />}
    </section>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({
    className,
    ...props
}: React.ComponentProps<"span">) => (
    <span
        role="presentation"
        tabIndex={-1}
        aria-hidden="true"
        className={cn("flex h-9 w-9 items-center justify-center", className)}
        {...props}
    >
        <MoreHorizontalIcon className="h-4 w-4" />
        <span className="sr-only">More</span>
    </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

export {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
};
