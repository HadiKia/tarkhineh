import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InfoCircle } from "iconsax-reactjs";

type TextFieldProps = React.ComponentProps<typeof Input> & {
  id: string;
  label: string;
  description?: string;
  error?: string;
};

const TextField = ({
  id,
  label,
  description,
  error,
  ...inputProps
}: TextFieldProps) => {
  const hasError = Boolean(error);

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
        has-[input:not(:placeholder-shown)]:[&>label]:top-0
        has-[input:not(:placeholder-shown)]:[&>label]:-mt-1.75
        lg:has-[input:not(:placeholder-shown)]:[&>label]:-mt-2
        has-[input:not(:placeholder-shown)]:[&>label]:bg-background
        has-[input:not(:placeholder-shown)]:[&>label]:text-[10px]
        lg:has-[input:not(:placeholder-shown)]:[&>label]:text-xs
        
      "
    >
      <FieldLabel
        htmlFor={id}
        className="absolute top-1.75 ms-4 px-1 text-xs lg:text-base font-normal w-fit! transition-all duration-300 ease-linear"
      >
        {label}
      </FieldLabel>

      <Input id={id} aria-invalid={Boolean(error)} {...inputProps} />

      {(description || error) && (
        <FieldDescription aria-invalid={hasError}>
          <InfoCircle className="h-3 w-3" />
          {error || description}
        </FieldDescription>
      )}
    </Field>
  );
};

export default TextField;
