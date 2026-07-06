"use client"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InfoCircle } from "iconsax-reactjs";
import TextFieldSkeleton from "./TextFieldSkeleton";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type TextFieldProps = React.ComponentProps<typeof Input> & {
  id: string;
  label: string;
  description?: string;
  error?: string;
  loading?: boolean;
};

const TextField = ({
  id,
  label,
  description,
  error,
  loading,
  ...inputProps
}: TextFieldProps) => {
  const [enableTransition, setEnableTransition] = useState(false);

  const hasError = Boolean(error);

    useEffect(() => {
    if (!loading) {
      requestAnimationFrame(() => {
        setEnableTransition(true);
      });
    }
  }, [loading]);

  if (loading) {
    return <TextFieldSkeleton />;
  }



  return (
    <Field
      data-invalid={hasError}
      className="
        focus-within:[&>label]:top-0
        focus-within:[&>label]:-mt-1.75
        lg:focus-within:[&>label]:-mt-2
        focus-within:[&>label]:bg-background
        focus-within:[&>label]:text-[10px]
        lg:focus-within:[&>label]:text-xs
        focus-within:[&>label]:text-gray-7
        has-[input:not(:placeholder-shown)]:[&>label]:top-0
        has-[input:not(:placeholder-shown)]:[&>label]:-mt-1.75
        lg:has-[input:not(:placeholder-shown)]:[&>label]:-mt-2
        has-[input:not(:placeholder-shown)]:[&>label]:bg-background
        has-[input:not(:placeholder-shown)]:[&>label]:text-[10px]
        lg:has-[input:not(:placeholder-shown)]:[&>label]:text-xs
        has-[input:not(:placeholder-shown)]:[&>label]:text-gray-7
      "
    >
      <FieldLabel
        htmlFor={id}
        className={cn(
          "absolute top-1.75 ms-4 px-1 text-xs lg:text-base text-gray-4 font-normal w-fit! transition-all duration-300 ease-linear z-1",
          enableTransition
            ? "transition-all duration-300 ease-linear"
            : "transition-none",
        )}
      >
        {label}
      </FieldLabel>

      <Input id={id} aria-invalid={Boolean(error)} {...inputProps} />

      {(description || error) && (
        <FieldDescription aria-invalid={hasError}>
          <InfoCircle className="h-4 w-4" />
          {error || description}
        </FieldDescription>
      )}
    </Field>
  );
};

export default TextField;
