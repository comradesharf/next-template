'use client';

import { useLingui } from '@lingui/react';
import { createContext, useContext } from 'react';

const Context = createContext<{
    format?: Intl.DateTimeFormatOptions;
}>({});

export const DateTimeI18nContext = Context.Provider;

export interface DateTimeProps extends Intl.DateTimeFormatOptions {
    className?: string;
    date: Date;
}

export function DateTimeFormatter({
    className,
    date,
    ...props
}: DateTimeProps) {
    // const { i18n } = useLingui();
    // console.log(i18n);
    // const { format } = useContext(Context);
    // return i18n.date(date, { ...format, ...props });

    return null;
}
