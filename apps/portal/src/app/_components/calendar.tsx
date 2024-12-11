"use client";

import { composeEventHandlers } from "@radix-ui/primitive";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import type * as React from "react";
import { DayPicker } from "react-day-picker";
import { buttonVariants } from "#app/_components/button.tsx";
import type {
    DateTimeFormatterProps,
    DateTimeRangeFormatterProps,
} from "#app/_components/date-time.shared.tsx";
import {
    DateTimeFormatter,
    DateTimeRangeFormatter,
    useDateFnsLocale,
} from "#app/_components/date-time.tsx";
import { useFormField } from "#app/_components/form.tsx";
import { cn } from "#app/_libs/cn.ts";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    timeZone,
    ...props
}: CalendarProps) {
    const { data } = useSession();

    const timezone =
        data?.user.timezone ?? process.env.NEXT_PUBLIC_DEFAULT_USER_TZ;

    const locale = useDateFnsLocale();

    return (
        <DayPicker
            {...props}
            locale={locale}
            timeZone={timezone ?? timezone}
            showOutsideDays={showOutsideDays}
            className={cn("p-3", className)}
            classNames={{
                months: "flex relative gap-x-2.5",
                month: "space-y-4",
                month_caption: "flex justify-start pt-1 relative items-center",
                caption_label: "text-sm font-medium aria-[hidden=true]:hidden",
                nav: "space-x-1 flex items-center absolute right-0 z-10",
                button_previous: cn(
                    buttonVariants({ variant: "outline" }),
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                ),
                button_next: cn(
                    buttonVariants({ variant: "outline" }),
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                ),
                month_grid: "w-full border-collapse space-y-1",
                weekdays: "flex",
                weekday:
                    "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
                week: "flex w-full mt-2",
                day: cn(
                    "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
                    props.mode === "range"
                        ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                        : "[&:has([aria-selected])]:rounded-md",
                ),
                day_button: cn(
                    buttonVariants({ variant: "ghost" }),
                    "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
                ),
                range_start: "day-range-start",
                range_end: "day-range-end",
                selected:
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                today: "bg-accent text-accent-foreground",
                outside:
                    "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                disabled: "text-muted-foreground opacity-50",
                day_range_middle:
                    "aria-selected:bg-accent aria-selected:text-accent-foreground",
                hidden: "invisible",
                dropdown: "dropdown",
                dropdowns: "flex gap-x-1",
                ...classNames,
            }}
            components={{
                Chevron: (props) => {
                    if (props.orientation === "left") {
                        return <ChevronLeftIcon className="h-4 w-4" />;
                    }
                    return <ChevronRightIcon className="h-4 w-4" />;
                },
            }}
        />
    );
}
Calendar.displayName = "Calendar";

function ControlledCalendar(props: CalendarProps) {
    const { controller } = useFormField();

    return (
        <Calendar
            {...props}
            // @ts-expect-error
            selected={controller.field.value}
            onSelect={composeEventHandlers(
                controller.field.onChange,
                // @ts-expect-error
                props.onSelect,
            )}
        />
    );
}

export interface SelectedDateProps
    extends Omit<DateTimeFormatterProps, "date"> {
    placeholder?: string;
}

function SelectedDate(props: SelectedDateProps) {
    const { controller } = useFormField();
    if (!controller.field.value) {
        return props.placeholder ?? null;
    }
    return <DateTimeFormatter {...props} date={controller.field.value} />;
}

export interface SelectedDateRangeProps
    extends Omit<DateTimeRangeFormatterProps, "range"> {
    placeholder?: string;
}

function SelectedDateRange(props: SelectedDateRangeProps) {
    const { controller } = useFormField();

    if (
        !controller.field.value ||
        !controller.field.value.from ||
        !controller.field.value.to
    ) {
        return props.placeholder ?? null;
    }

    return (
        <DateTimeRangeFormatter
            {...props}
            range={[controller.field.value.from, controller.field.value.to]}
        />
    );
}

export { Calendar, ControlledCalendar, SelectedDate, SelectedDateRange };
