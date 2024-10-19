'use client';

import { useFormField } from '#app/_components/form.tsx';

import * as React from 'react';
import { cn } from '#app/_libs/cn.ts';

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    'border-input placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
                    className,
                )}
                ref={ref}
                {...props}
            />
        );
    },
);
Textarea.displayName = 'Textarea';

function ControlledTextarea(props: TextareaProps) {
    const { controller } = useFormField();
    return (
        <Textarea
            {...props}
            value={controller.field.value}
            onChange={controller.field.onChange}
        />
    );
}

export { Textarea, ControlledTextarea };
