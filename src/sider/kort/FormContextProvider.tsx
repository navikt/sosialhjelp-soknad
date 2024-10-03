import React from "react";
import {useForm, FormProvider as RHFProvider, useFormContext, UseFormReturn, FieldValues} from "react-hook-form";

interface FormContextProps {
    children: React.ReactNode;
}

export const FormContext = ({children}: FormContextProps) => {
    const methods = useForm(); // Initialize react-hook-form here

    return <RHFProvider {...methods}>{children}</RHFProvider>;
};

// Custom hook to get form context values
export const useFormContextValues = <TFieldValues extends FieldValues>(): UseFormReturn<TFieldValues> => {
    const context = useFormContext<TFieldValues>();
    if (!context) {
        throw new Error("useFormContextValues must be used within a FormProvider");
    }
    return context;
};
