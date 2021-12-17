import * as React from 'react';
import { useForm, UseFormReturn, SubmitHandler, UseFormProps } from 'react-hook-form';

type FormProps<TFormValues> = {
  onSubmit: SubmitHandler<TFormValues>;
  children?: React.ReactNode;
  options?: UseFormProps<TFormValues>;
  id?: string;
};

export const Form = <TFormValues extends Record<string, unknown> = Record<string, unknown>>({
  onSubmit,
  children,
  options,
  id,
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({ ...options });
  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} id={id}>
      {children}
    </form>
  );
};
