import * as React from 'react';
import { useForm, UseFormReturn, SubmitHandler, UseFormProps } from 'react-hook-form';

type FormProps<TFormValues> = {
  onSubmit: any;
  children?: React.ReactNode;
  options?: UseFormProps<TFormValues>;
  id?: string;
};

export const Form = <TFormValues extends Record<string, unknown> = Record<string, unknown>>({
  children,
  options,
  id,
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({ ...options });
  return (
    <form id={id}>
      {children}
    </form>
  );
};
