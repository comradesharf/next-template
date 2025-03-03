import type { Meta, StoryObj } from "@storybook/react";
import { ChevronDownIcon, SlashIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "#app/_components/breadcrumb.tsx";
import { Button } from "#app/_components/button.tsx";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "#app/_components/drawer.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "#app/_components/dropdown-menu.tsx";
import { useMediaQuery } from "#app/_hooks/use-media-query.ts";

const meta: Meta<typeof Breadcrumb> = {
    component: Breadcrumb,
    subcomponents: {
        BreadcrumbEllipsis,
        BreadcrumbItem,
        BreadcrumbLink,
        BreadcrumbList,
        BreadcrumbPage,
        BreadcrumbSeparator,
    } as Meta["subcomponents"],
    tags: ["autodocs"],
    args: {},
    parameters: {
        layout: "padded",
        docs: {
            story: {
                inline: true,
            },
        },
    },
    render: function Component() {
        return (
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-1">
                                <BreadcrumbEllipsis className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                <DropdownMenuItem>
                                    Documentation
                                </DropdownMenuItem>
                                <DropdownMenuItem>Themes</DropdownMenuItem>
                                <DropdownMenuItem>GitHub</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/docs/components">
                            Components
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        );
    },
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Primary: Story = {};

const items = [
    { href: "#", label: "Home" },
    { href: "#", label: "Documentation" },
    { href: "#", label: "Building Your Application" },
    { href: "#", label: "Data Fetching" },
    { label: "Caching and Revalidating" },
];

const ITEMS_TO_DISPLAY = 3;

export const Responsive: Story = {
    render: function Component() {
        const [open, setOpen] = useState(false);

        const isDesktop = useMediaQuery("(min-width: 768px)");

        return (
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={items[0].href}>
                            {items[0].label}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    {items.length > ITEMS_TO_DISPLAY ? (
                        <>
                            <BreadcrumbItem>
                                {isDesktop ? (
                                    <DropdownMenu
                                        open={open}
                                        onOpenChange={setOpen}
                                    >
                                        <DropdownMenuTrigger
                                            className="flex items-center gap-1"
                                            aria-label="Toggle menu"
                                        >
                                            <BreadcrumbEllipsis className="h-4 w-4" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start">
                                            {items
                                                .slice(1, -2)
                                                .map((item, index) => (
                                                    <DropdownMenuItem
                                                        // biome-ignore lint/suspicious/noArrayIndexKey: this is sample code
                                                        key={index}
                                                    >
                                                        <Link
                                                            href={
                                                                item.href
                                                                    ? item.href
                                                                    : "#"
                                                            }
                                                        >
                                                            {item.label}
                                                        </Link>
                                                    </DropdownMenuItem>
                                                ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) : (
                                    <Drawer open={open} onOpenChange={setOpen}>
                                        <DrawerTrigger aria-label="Toggle Menu">
                                            <BreadcrumbEllipsis className="h-4 w-4" />
                                        </DrawerTrigger>
                                        <DrawerContent>
                                            <DrawerHeader className="text-left">
                                                <DrawerTitle>
                                                    Navigate to
                                                </DrawerTitle>
                                                <DrawerDescription>
                                                    Select a page to navigate
                                                    to.
                                                </DrawerDescription>
                                            </DrawerHeader>
                                            <div className="grid gap-1 px-4">
                                                {items
                                                    .slice(1, -2)
                                                    .map((item, index) => (
                                                        <Link
                                                            // biome-ignore lint/suspicious/noArrayIndexKey: this is sample code
                                                            key={index}
                                                            href={
                                                                item.href
                                                                    ? item.href
                                                                    : "#"
                                                            }
                                                            className="py-1 text-sm"
                                                        >
                                                            {item.label}
                                                        </Link>
                                                    ))}
                                            </div>
                                            <DrawerFooter className="pt-4">
                                                <DrawerClose asChild>
                                                    <Button variant="outline">
                                                        Close
                                                    </Button>
                                                </DrawerClose>
                                            </DrawerFooter>
                                        </DrawerContent>
                                    </Drawer>
                                )}
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </>
                    ) : null}
                    {items.slice(-ITEMS_TO_DISPLAY + 1).map((item, index) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: this is sample code
                        <BreadcrumbItem key={index}>
                            {item.href ? (
                                <>
                                    <BreadcrumbLink
                                        asChild
                                        className="max-w-20 truncate md:max-w-none"
                                    >
                                        <Link href={item.href}>
                                            {item.label}
                                        </Link>
                                    </BreadcrumbLink>
                                    <BreadcrumbSeparator />
                                </>
                            ) : (
                                <BreadcrumbPage className="max-w-20 truncate md:max-w-none">
                                    {item.label}
                                </BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        );
    },
};

export const LinkComponent: Story = {
    render: function Component() {
        return (
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/components">Components</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        );
    },
};

export const Collapsed: Story = {
    render: function Component() {
        return (
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbEllipsis />
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/docs/components">Components</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        );
    },
};

export const Dropdown: Story = {
    render: function Component() {
        return (
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <SlashIcon />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-1">
                                Components
                                <ChevronDownIcon className="h-4 w-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                <DropdownMenuItem>
                                    Documentation
                                </DropdownMenuItem>
                                <DropdownMenuItem>Themes</DropdownMenuItem>
                                <DropdownMenuItem>GitHub</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <SlashIcon />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        );
    },
};

export const CustomSeparator: Story = {
    render: function Component() {
        return (
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <SlashIcon />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/components">
                            Components
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <SlashIcon />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        );
    },
};
