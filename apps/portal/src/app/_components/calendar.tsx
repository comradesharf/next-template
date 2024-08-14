'use client';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { buttonVariants } from '#app/_components/button.tsx';
import { cn } from '#libs/cn.ts';

import type * as React from 'react';
import { DayPicker } from 'react-day-picker';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    ...props
}: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn('p-3', className)}
            classNames={{
                months: 'flex flex-col relative',
                month: 'space-y-4',
                month_caption: 'flex justify-start pt-1 relative items-center',
                caption_label: 'text-sm font-medium',
                nav: 'space-x-1 flex items-center absolute right-0',
                button_previous: cn(
                    buttonVariants({ variant: 'outline' }),
                    'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                ),
                button_next: cn(
                    buttonVariants({ variant: 'outline' }),
                    'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                ),
                month_grid: 'w-full border-collapse space-y-1',
                weekdays: 'flex',
                weekday:
                    'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
                week: 'flex w-full mt-2',
                day: cn(
                    'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
                    props.mode === 'range'
                        ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
                        : '[&:has([aria-selected])]:rounded-md',
                ),
                day_button: cn(
                    buttonVariants({ variant: 'ghost' }),
                    'h-8 w-8 p-0 font-normal aria-selected:opacity-100',
                ),
                range_start: 'day-range-start',
                range_end: 'day-range-end',
                selected:
                    'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
                today: 'bg-accent text-accent-foreground',
                outside:
                    'day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
                disabled: 'text-muted-foreground opacity-50',
                day_range_middle:
                    'aria-selected:bg-accent aria-selected:text-accent-foreground',
                hidden: 'invisible',
                ...classNames,
            }}
            components={{
                Chevron: (props) => {
                    if (props.orientation === 'left') {
                        return <ChevronLeftIcon className="h-4 w-4" />;
                    }
                    return <ChevronRightIcon className="h-4 w-4" />;
                },
            }}
            {...props}
        />
    );
}
Calendar.displayName = 'Calendar';

export { Calendar };
