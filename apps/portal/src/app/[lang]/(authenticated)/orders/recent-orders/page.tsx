import { Trans } from '@lingui/macro';
import {
    ChevronLeft,
    ChevronRight,
    Copy,
    CreditCard,
    File,
    ListFilter,
    MoreVertical,
    Truck,
} from 'lucide-react';
import { Badge } from '#app/_components/badge.tsx';
import { Button } from '#app/_components/button.tsx';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '#app/_components/card.tsx';
import { DateTimeFormatter } from '#app/_components/date-time.tsx';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '#app/_components/dropdown-menu.tsx';
import { NumberFormatter } from '#app/_components/number.tsx';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from '#app/_components/pagination.tsx';
import { Progress } from '#app/_components/progress.tsx';
import { Separator } from '#app/_components/separator.tsx';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '#app/_components/table.tsx';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '#app/_components/tabs.tsx';
import { assertAuthenticated } from '#app/_libs/asserts.ts';
import { withLocale } from '#app/_libs/locales/withLocale.tsx';
import { getCurrentSession } from '#app/_queries/auths.ts';

export default withLocale(async function Page() {
    const session = await getCurrentSession();
    assertAuthenticated(session);

    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                    <Card
                        className="sm:col-span-2"
                        x-chunk="dashboard-05-chunk-0"
                    >
                        <CardHeader className="pb-3">
                            <CardTitle>
                                <Trans>Your Orders</Trans>
                            </CardTitle>
                            <CardDescription className="text-balance max-w-lg leading-relaxed">
                                <Trans>
                                    Introducing Our Dynamic Orders Dashboard for
                                    Seamless Management and Insightful Analysis.
                                </Trans>
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button>
                                <Trans>Create New Order</Trans>
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card x-chunk="dashboard-05-chunk-1">
                        <CardHeader className="pb-2">
                            <CardDescription>
                                <Trans>This Week</Trans>
                            </CardDescription>
                            <CardTitle className="text-4xl">
                                <NumberFormatter
                                    number="1329"
                                    variant="currency"
                                    options={{
                                        currency: 'USD',
                                        maximumFractionDigits: 0,
                                    }}
                                />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-muted-foreground">
                                +
                                <NumberFormatter
                                    number="25"
                                    options={{
                                        style: 'unit',
                                        unit: 'percent',
                                        unitDisplay: 'narrow',
                                    }}
                                />{' '}
                                from last week
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Progress value={25} aria-label="25% increase" />
                        </CardFooter>
                    </Card>
                    <Card x-chunk="dashboard-05-chunk-2">
                        <CardHeader className="pb-2">
                            <CardDescription>This Month</CardDescription>
                            <CardTitle className="text-4xl">
                                <NumberFormatter
                                    number="5329"
                                    variant="currency"
                                    options={{
                                        currency: 'USD',
                                        maximumFractionDigits: 0,
                                    }}
                                />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-muted-foreground">
                                +
                                <NumberFormatter
                                    number="10"
                                    options={{
                                        style: 'unit',
                                        unit: 'percent',
                                        unitDisplay: 'narrow',
                                    }}
                                />{' '}
                                from last month
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Progress value={12} aria-label="12% increase" />
                        </CardFooter>
                    </Card>
                </div>
                <Tabs defaultValue="week">
                    <div className="flex items-center">
                        <TabsList>
                            <TabsTrigger value="week">Week</TabsTrigger>
                            <TabsTrigger value="month">Month</TabsTrigger>
                            <TabsTrigger value="year">Year</TabsTrigger>
                        </TabsList>
                        <div className="ml-auto flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-7 gap-1 text-sm"
                                    >
                                        <ListFilter className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only">
                                            Filter
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        <Trans>Filter by</Trans>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem checked>
                                        <Trans>Fulfilled</Trans>
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>
                                        <Trans>Declined</Trans>
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>
                                        <Trans>Refunded</Trans>
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-7 gap-1 text-sm"
                            >
                                <File className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only">
                                    <Trans>Export</Trans>
                                </span>
                            </Button>
                        </div>
                    </div>
                    <TabsContent value="week">
                        <Card x-chunk="dashboard-05-chunk-3">
                            <CardHeader className="px-7">
                                <CardTitle>
                                    <Trans>Orders</Trans>
                                </CardTitle>
                                <CardDescription>
                                    <Trans>
                                        Recent orders from your store.
                                    </Trans>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Customer</TableHead>
                                            <TableHead className="hidden sm:table-cell">
                                                Type
                                            </TableHead>
                                            <TableHead className="hidden sm:table-cell">
                                                Status
                                            </TableHead>
                                            <TableHead className="hidden md:table-cell">
                                                Date
                                            </TableHead>
                                            <TableHead className="text-right">
                                                Amount
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow className="bg-accent">
                                            <TableCell>
                                                <div className="font-medium">
                                                    Liam Johnson
                                                </div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    liam@example.com
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                Sale
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge
                                                    className="text-xs"
                                                    variant="secondary"
                                                >
                                                    Fulfilled
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <DateTimeFormatter
                                                    date={new Date()}
                                                />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <NumberFormatter
                                                    number="250.00"
                                                    variant="currency"
                                                    options={{
                                                        currency: 'USD',
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <div className="font-medium">
                                                    Olivia Smith
                                                </div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    olivia@example.com
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                Refund
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge
                                                    className="text-xs"
                                                    variant="outline"
                                                >
                                                    Declined
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <DateTimeFormatter
                                                    date={new Date()}
                                                />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <NumberFormatter
                                                    number="150.00"
                                                    variant="currency"
                                                    options={{
                                                        currency: 'USD',
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>
                                                <div className="font-medium">
                                                    Noah Williams
                                                </div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    noah@example.com
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                Subscription
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge
                                                    className="text-xs"
                                                    variant="secondary"
                                                >
                                                    Fulfilled
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <DateTimeFormatter
                                                    date={new Date()}
                                                />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <NumberFormatter
                                                    number="350.00"
                                                    variant="currency"
                                                    options={{
                                                        currency: 'USD',
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <div className="font-medium">
                                                    Emma Brown
                                                </div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    emma@example.com
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                Sale
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge
                                                    className="text-xs"
                                                    variant="secondary"
                                                >
                                                    Fulfilled
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <DateTimeFormatter
                                                    date={new Date()}
                                                />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <NumberFormatter
                                                    number="450.00"
                                                    variant="currency"
                                                    options={{
                                                        currency: 'USD',
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <div className="font-medium">
                                                    Liam Johnson
                                                </div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    liam@example.com
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                Sale
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge
                                                    className="text-xs"
                                                    variant="secondary"
                                                >
                                                    Fulfilled
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <DateTimeFormatter
                                                    date={new Date()}
                                                />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <NumberFormatter
                                                    number="250.00"
                                                    variant="currency"
                                                    options={{
                                                        currency: 'USD',
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <div className="font-medium">
                                                    Olivia Smith
                                                </div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    olivia@example.com
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                Refund
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge
                                                    className="text-xs"
                                                    variant="outline"
                                                >
                                                    Declined
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <DateTimeFormatter
                                                    date={new Date()}
                                                />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <NumberFormatter
                                                    number="150.00"
                                                    variant="currency"
                                                    options={{
                                                        currency: 'USD',
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <div className="font-medium">
                                                    Emma Brown
                                                </div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    emma@example.com
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Trans>Sale</Trans>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge
                                                    className="text-xs"
                                                    variant="secondary"
                                                >
                                                    <Trans>Fulfilled</Trans>
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <DateTimeFormatter
                                                    date={new Date()}
                                                />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <NumberFormatter
                                                    number="450.00"
                                                    variant="currency"
                                                    options={{
                                                        currency: 'USD',
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
            <div>
                <Card
                    className="overflow-hidden"
                    x-chunk="dashboard-05-chunk-4"
                >
                    <CardHeader className="flex flex-row items-start bg-muted/50">
                        <div className="grid gap-0.5">
                            <CardTitle className="group flex items-center gap-2 text-lg">
                                Order Oe31b70H
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                >
                                    <Copy className="h-3 w-3" />
                                    <span className="sr-only">
                                        Copy Order ID
                                    </span>
                                </Button>
                            </CardTitle>
                            <CardDescription>
                                Date: <DateTimeFormatter date={new Date()} />
                            </CardDescription>
                        </div>
                        <div className="ml-auto flex items-center gap-1">
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-8 gap-1"
                            >
                                <Truck className="h-3.5 w-3.5" />
                                <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                                    <Trans>Track Order</Trans>
                                </span>
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="h-8 w-8"
                                    >
                                        <MoreVertical className="h-3.5 w-3.5" />
                                        <span className="sr-only">
                                            <Trans>More</Trans>
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                        <Trans>Edit</Trans>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Trans>Export</Trans>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Trans>Trash</Trans>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 text-sm">
                        <div className="grid gap-3">
                            <div className="font-semibold">
                                <Trans>Order Details</Trans>
                            </div>
                            <ul className="grid gap-3">
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        Glimmer Lamps x{' '}
                                        <NumberFormatter number="2" />
                                    </span>
                                    <NumberFormatter
                                        number="250.00"
                                        variant="currency"
                                        options={{
                                            currency: 'USD',
                                        }}
                                    />
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        Aqua Filters x{' '}
                                        <NumberFormatter number="1" />
                                    </span>
                                    <NumberFormatter
                                        number="49.00"
                                        variant="currency"
                                        options={{
                                            currency: 'USD',
                                        }}
                                    />
                                </li>
                            </ul>
                            <Separator className="my-2" />
                            <ul className="grid gap-3">
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        <Trans>Subtotal</Trans>
                                    </span>
                                    <NumberFormatter
                                        number="299.00"
                                        variant="currency"
                                        options={{
                                            currency: 'USD',
                                        }}
                                    />
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        <Trans>Shipping</Trans>
                                    </span>
                                    <NumberFormatter
                                        number="5.00"
                                        variant="currency"
                                        options={{
                                            currency: 'USD',
                                        }}
                                    />
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        <Trans>Tax</Trans>
                                    </span>
                                    <NumberFormatter
                                        number="25.00"
                                        variant="currency"
                                        options={{
                                            currency: 'USD',
                                        }}
                                    />
                                </li>
                                <li className="flex items-center justify-between font-semibold">
                                    <span className="text-muted-foreground">
                                        <Trans>Total</Trans>
                                    </span>
                                    <NumberFormatter
                                        number="329.00"
                                        variant="currency"
                                        options={{
                                            currency: 'USD',
                                        }}
                                    />
                                </li>
                            </ul>
                        </div>
                        <Separator className="my-4" />
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-3">
                                <div className="font-semibold">
                                    <Trans>Shipping Information</Trans>
                                </div>
                                <address className="grid gap-0.5 not-italic text-muted-foreground">
                                    <span>Liam Johnson</span>
                                    <span>1234 Main St.</span>
                                    <span>Anytown, CA 12345</span>
                                </address>
                            </div>
                            <div className="grid auto-rows-max gap-3">
                                <div className="font-semibold">
                                    <Trans>Billing Information</Trans>
                                </div>
                                <div className="text-muted-foreground">
                                    <Trans>Same as shipping address</Trans>
                                </div>
                            </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="grid gap-3">
                            <div className="font-semibold">
                                <Trans>Customer Information</Trans>
                            </div>
                            <dl className="grid gap-3">
                                <div className="flex items-center justify-between">
                                    <dt className="text-muted-foreground">
                                        <Trans>Customer</Trans>
                                    </dt>
                                    <dd>Liam Johnson</dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="text-muted-foreground">
                                        Email
                                    </dt>
                                    <dd>
                                        <a href="mailto:">liam@acme.com</a>
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="text-muted-foreground">
                                        Phone
                                    </dt>
                                    <dd>
                                        <a href="tel:">+1 234 567 890</a>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                        <Separator className="my-4" />
                        <div className="grid gap-3">
                            <div className="font-semibold">
                                <Trans>Payment Information</Trans>
                            </div>
                            <dl className="grid gap-3">
                                <div className="flex items-center justify-between">
                                    <dt className="flex items-center gap-1 text-muted-foreground">
                                        <CreditCard className="h-4 w-4" />
                                        Visa
                                    </dt>
                                    <dd>**** **** **** 4532</dd>
                                </div>
                            </dl>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                        <div className="text-xs text-muted-foreground">
                            <Trans>
                                Updated{' '}
                                <DateTimeFormatter
                                    date={new Date('2023-8-23')}
                                    variant="date"
                                />
                            </Trans>
                        </div>
                        <Pagination className="ml-auto mr-0 w-auto">
                            <PaginationContent>
                                <PaginationItem>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="h-6 w-6"
                                    >
                                        <ChevronLeft className="h-3.5 w-3.5" />
                                        <span className="sr-only">
                                            <Trans>Previous Order</Trans>
                                        </span>
                                    </Button>
                                </PaginationItem>
                                <PaginationItem>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="h-6 w-6"
                                    >
                                        <ChevronRight className="h-3.5 w-3.5" />
                                        <span className="sr-only">
                                            <Trans>Next Order</Trans>
                                        </span>
                                    </Button>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </CardFooter>
                </Card>
            </div>
        </main>
    );
});
