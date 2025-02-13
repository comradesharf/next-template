"use client";

import type { InputHTMLAttributes } from "react";
import {
    type UsePhoneInputConfig,
    defaultCountries,
    usePhoneInput,
} from "react-international-phone";
import { useFormField } from "#app/_components/form.tsx";
import { Input } from "#app/_components/input.tsx";

export interface PhoneInputProps
    extends Omit<
            InputHTMLAttributes<HTMLInputElement>,
            keyof UsePhoneInputConfig
        >,
        UsePhoneInputConfig {}

function PhoneInput({
    countries = defaultCountries,
    defaultCountry,
    value,
    preferredCountries,
    prefix,
    defaultMask,
    charAfterDialCode,
    historySaveDebounceMS,
    disableCountryGuess,
    disableDialCodePrefill,
    forceDialCode,
    disableDialCodeAndPrefix,
    disableFormatting,
    onChange,
    inputRef,
    ...props
}: PhoneInputProps) {
    const {
        inputValue,
        inputRef: $inputRef,
        handlePhoneValueChange,
        phone,
    } = usePhoneInput({
        countries,
        defaultCountry,
        value,
        preferredCountries,
        prefix,
        defaultMask,
        charAfterDialCode,
        historySaveDebounceMS,
        disableCountryGuess,
        disableDialCodePrefill,
        forceDialCode,
        disableDialCodeAndPrefix,
        disableFormatting,
        onChange,
        inputRef,
    });

    return (
        <Input
            {...props}
            onChange={handlePhoneValueChange}
            value={inputValue}
            type="tel"
            ref={$inputRef}
            data-phone={phone}
        />
    );
}

function ControlledPhoneInput(props: PhoneInputProps) {
    const { error, formItemId, formDescriptionId, formMessageId, controller } =
        useFormField();

    return (
        <PhoneInput
            {...props}
            {...controller.field}
            type="tel"
            id={formItemId}
            aria-describedby={
                !error
                    ? `${formDescriptionId}`
                    : `${formDescriptionId} ${formMessageId}`
            }
            aria-invalid={!!error}
            value={controller.field.value?.phone}
            onChange={(data) => {
                controller.field.onChange(data.phone);
            }}
        />
    );
}

export { PhoneInput, ControlledPhoneInput };
