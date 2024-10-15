import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react';
import {
    ArrowUpIcon,
    BookmarkIcon,
    CalendarIcon,
    CheckCircleIcon,
    CheckIcon,
    ChevronsUpDownIcon,
    CircleIcon,
    MoreHorizontalIcon,
    TagIcon,
    TrashIcon,
    UserIcon,
    XCircleIcon,
} from 'lucide-react';
import { type ComponentType, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '#app/_components/button.tsx';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '#app/_components/command.tsx';
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from '#app/_components/drawer.tsx';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '#app/_components/dropdown-menu.tsx';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '#app/_components/form.tsx';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '#app/_components/popover.tsx';
import { Toaster } from '#app/_components/toaster.tsx';
import { useMediaQuery } from '#app/_hooks/use-media-query.ts';
import { toast } from '#app/_hooks/use-toast.ts';
import { cn } from '#app/_libs/cn.ts';

const frameworks = [
    {
        value: 'next.js',
        label: 'Next.js',
    },
    {
        value: 'sveltekit',
        label: 'SvelteKit',
    },
    {
        value: 'nuxt.js',
        label: 'Nuxt.js',
    },
    {
        value: 'remix',
        label: 'Remix',
    },
    {
        value: 'astro',
        label: 'Astro',
    },
];

const meta: Meta = {
    tags: ['autodocs'],
    args: {},
    parameters: {
        layout: 'padded',
        docs: {
            story: {
                inline: true,
            },
        },
    },
    render: function Component() {
        const [open, setOpen] = useState(false);
        const [value, setValue] = useState('');

        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                    >
                        {value
                            ? frameworks.find(
                                  (framework) => framework.value === value,
                              )?.label
                            : 'Select framework...'}
                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search framework..." />
                        <CommandList>
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                                {frameworks.map((framework) => (
                                    <CommandItem
                                        key={framework.value}
                                        value={framework.value}
                                        onSelect={(currentValue) => {
                                            setValue(
                                                currentValue === value
                                                    ? ''
                                                    : currentValue,
                                            );
                                            setOpen(false);
                                        }}
                                    >
                                        <CheckIcon
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                value === framework.value
                                                    ? 'opacity-100'
                                                    : 'opacity-0',
                                            )}
                                        />
                                        {framework.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        );
    },
};

export default meta;

type Story = StoryObj;

export const Primary: Story = {};

const FormSchema = z.object({
    language: z.string({
        required_error: 'Please select a language.',
    }),
});

const languages = [
    { label: 'English', value: 'en' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
    { label: 'Spanish', value: 'es' },
    { label: 'Portuguese', value: 'pt' },
    { label: 'Russian', value: 'ru' },
    { label: 'Japanese', value: 'ja' },
    { label: 'Korean', value: 'ko' },
    { label: 'Chinese', value: 'zh' },
] as const;

export const AsForm: Story = {
    render: function Component() {
        const form = useForm<z.infer<typeof FormSchema>>({
            resolver: zodResolver(FormSchema),
        });

        function onSubmit(data: z.infer<typeof FormSchema>) {
            toast({
                title: 'You submitted the following values:',
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">
                            {JSON.stringify(data, null, 2)}
                        </code>
                    </pre>
                ),
            });
        }

        return (
            <Form {...form}>
                <Toaster />
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="language"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Language</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    'w-[200px] justify-between',
                                                    !field.value &&
                                                        'text-muted-foreground',
                                                )}
                                            >
                                                {field.value
                                                    ? languages.find(
                                                          (language) =>
                                                              language.value ===
                                                              field.value,
                                                      )?.label
                                                    : 'Select language'}
                                                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                        <Command>
                                            <CommandInput placeholder="Search language..." />
                                            <CommandList>
                                                <CommandEmpty>
                                                    No language found.
                                                </CommandEmpty>
                                                <CommandGroup>
                                                    {languages.map(
                                                        (language) => (
                                                            <CommandItem
                                                                value={
                                                                    language.label
                                                                }
                                                                key={
                                                                    language.value
                                                                }
                                                                onSelect={() => {
                                                                    form.setValue(
                                                                        'language',
                                                                        language.value,
                                                                    );
                                                                }}
                                                            >
                                                                <CheckIcon
                                                                    className={cn(
                                                                        'mr-2 h-4 w-4',
                                                                        language.value ===
                                                                            field.value
                                                                            ? 'opacity-100'
                                                                            : 'opacity-0',
                                                                    )}
                                                                />
                                                                {language.label}
                                                            </CommandItem>
                                                        ),
                                                    )}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    This is the language that will be used in
                                    the dashboard.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        );
    },
};

export const Responsive: Story = {
    render: function Component() {
        const [open, setOpen] = useState(false);
        const isDesktop = useMediaQuery('(min-width: 768px)');
        const [selectedStatus, setSelectedStatus] = useState<Status | null>(
            null,
        );

        if (isDesktop) {
            return (
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-[150px] justify-start"
                        >
                            {selectedStatus ? (
                                <>{selectedStatus.label}</>
                            ) : (
                                <>+ Set status</>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0" align="start">
                        <StatusList
                            setOpen={setOpen}
                            setSelectedStatus={setSelectedStatus}
                        />
                    </PopoverContent>
                </Popover>
            );
        }

        return (
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-[150px] justify-start"
                    >
                        {selectedStatus ? (
                            <>{selectedStatus.label}</>
                        ) : (
                            <>+ Set status</>
                        )}
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="mt-4 border-t">
                        <StatusList
                            setOpen={setOpen}
                            setSelectedStatus={setSelectedStatus}
                        />
                    </div>
                </DrawerContent>
            </Drawer>
        );
    },
};

function StatusList({
    setOpen,
    setSelectedStatus,
}: {
    setOpen: (open: boolean) => void;
    setSelectedStatus: (status: Status | null) => void;
}) {
    return (
        <Command>
            <CommandInput placeholder="Filter status..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                    {statuses.map((status) => (
                        <CommandItem
                            key={status.value}
                            value={status.value}
                            onSelect={(value) => {
                                setSelectedStatus(
                                    statuses.find(
                                        (priority) => priority.value === value,
                                    ) || null,
                                );
                                setOpen(false);
                            }}
                        >
                            {status.label}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    );
}

const labels = [
    'feature',
    'bug',
    'enhancement',
    'documentation',
    'design',
    'question',
    'maintenance',
];

export const AsDropdown: Story = {
    render: function Component() {
        const [label, setLabel] = useState('feature');
        const [open, setOpen] = useState(false);

        return (
            <div className="flex w-full flex-col items-start justify-between rounded-md border px-4 py-3 sm:flex-row sm:items-center">
                <p className="text-sm font-medium leading-none">
                    <span className="bg-primary text-primary-foreground mr-2 rounded-lg px-2 py-1 text-xs">
                        {label}
                    </span>
                    <span className="text-muted-foreground">
                        Create a new project
                    </span>
                </p>
                <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                            <MoreHorizontalIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <UserIcon className="mr-2 h-4 w-4" />
                                Assign to...
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                Set due date...
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    <TagIcon className="mr-2 h-4 w-4" />
                                    Apply label
                                </DropdownMenuSubTrigger>
                                <DropdownMenuSubContent className="p-0">
                                    <Command>
                                        <CommandInput
                                            placeholder="Filter label..."
                                            autoFocus={true}
                                        />
                                        <CommandList>
                                            <CommandEmpty>
                                                No label found.
                                            </CommandEmpty>
                                            <CommandGroup>
                                                {labels.map((label) => (
                                                    <CommandItem
                                                        key={label}
                                                        value={label}
                                                        onSelect={(value) => {
                                                            setLabel(value);
                                                            setOpen(false);
                                                        }}
                                                    >
                                                        {label}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                                <TrashIcon className="mr-2 h-4 w-4" />
                                Delete
                                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        );
    },
};

type Status = {
    value: string;
    label: string;
    icon: ComponentType<{
        className?: string;
    }>;
};

const statuses: Status[] = [
    {
        value: 'backlog',
        label: 'Backlog',
        icon: BookmarkIcon,
    },
    {
        value: 'todo',
        label: 'Todo',
        icon: CircleIcon,
    },
    {
        value: 'in progress',
        label: 'In Progress',
        icon: ArrowUpIcon,
    },
    {
        value: 'done',
        label: 'Done',
        icon: CheckCircleIcon,
    },
    {
        value: 'canceled',
        label: 'Canceled',
        icon: XCircleIcon,
    },
];

export const AsPopover: Story = {
    render: function Component() {
        const [open, setOpen] = useState(false);
        const [selectedStatus, setSelectedStatus] = useState<Status | null>(
            null,
        );

        return (
            <div className="flex items-center space-x-4">
                <p className="text-muted-foreground text-sm">Status</p>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-[150px] justify-start"
                        >
                            {selectedStatus ? (
                                <>
                                    <selectedStatus.icon className="mr-2 h-4 w-4 shrink-0" />
                                    {selectedStatus.label}
                                </>
                            ) : (
                                <>+ Set status</>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0" side="right" align="start">
                        <Command>
                            <CommandInput placeholder="Change status..." />
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                    {statuses.map((status) => (
                                        <CommandItem
                                            key={status.value}
                                            value={status.value}
                                            onSelect={(value) => {
                                                setSelectedStatus(
                                                    statuses.find(
                                                        (priority) =>
                                                            priority.value ===
                                                            value,
                                                    ) || null,
                                                );
                                                setOpen(false);
                                            }}
                                        >
                                            <status.icon
                                                className={cn(
                                                    'mr-2 h-4 w-4',
                                                    status.value ===
                                                        selectedStatus?.value
                                                        ? 'opacity-100'
                                                        : 'opacity-40',
                                                )}
                                            />
                                            <span>{status.label}</span>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        );
    },
};
