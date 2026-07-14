import Image from "next/image";
import type { FieldErrors, FieldValues } from "react-hook-form";
import type { ChangeEvent, InputHTMLAttributes } from "react";
import { FolderAdd, Trash } from "iconsax-reactjs";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import FileInputSkeleton from "./FileInputSkeleton";

type FileInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "name"
> & {
  disabled?: boolean;
  label: string;
  name: string;
  placeholder?: string;
  dir?: "rtl" | "ltr";
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemove?: () => void;
  isRequired?: boolean;
  className?: string;
  wrapperClassName?: string;
  errors?: FieldErrors<FieldValues>;
  previewUrl?: string | null;
  loading?: boolean;
};

function FileInput({
  disabled,
  accept,
  label,
  placeholder,
  name,
  dir = "rtl",
  onChange,
  onRemove,
  isRequired,
  className,
  errors,
  previewUrl,
  wrapperClassName,
  loading,
  ...rest
}: FileInputProps) {
  const hasError = !!errors?.[name];

  if (loading) {
    return <FileInputSkeleton />;
  }

  const inputClasses = [
    "border border-gray-4 rounded-sm lg:rounded-lg grid place-items-center gap-y-3 py-6 lg:py-12 text-gray-7 [&_svg]:text-gray-7 hover:text-gray-8 hover:[&_svg]:text-primary hover:border-primary transition-all duration-300 ease-linear cursor-pointer",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`${wrapperClassName} `}>
      {previewUrl ? (
        <div className="border border-gray-4 rounded-sm lg:rounded-lg flex items-start gap-x-4 lg:gap-x-6 w-full relative">
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group relative block w-full h-27.5 lg:h-47.5 overflow-hidden rounded-md transition-opacity duration-300 ease-linear",
              disabled && "pointer-events-none opacity-60",
            )}
          >
            <Image
              fill
              src={previewUrl}
              alt={label}
              sizes="(min-width: 1024px) 768px, 100vw"
              className="object-cover object-center transition-all duration-300 ease-linear group-hover:scale-105"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 ease-linear group-hover:bg-black/20">
              <span className="text-xs font-semibold text-white opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100">
                مشاهده
              </span>
            </div>
          </a>

          {onRemove && (
            <Button
              type="button"
              variant="destructive"
              disabled={disabled}
              onClick={disabled ? undefined : onRemove}
              className={cn(
                "absolute top-2 inset-e-2 hover:bg-error-extraLight p-1 lg:p-1.75",
                disabled && "opacity-60 pointer-events-none",
              )}
            >
              <Trash className="size-4 lg:size-6" />
            </Button>
          )}
        </div>
      ) : (
        <>
          <label
            htmlFor={`file-upload-${name}`}
            className={cn(
              inputClasses,
              disabled && "pointer-events-none opacity-60",
            )}
          >
            <FolderAdd className="size-8 lg:size-14" />
            <span className="text-xs lg:text-base">{placeholder}</span>
            <input
              accept={accept}
              id={`file-upload-${name}`}
              type="file"
              className="sr-only"
              name={name}
              dir={dir}
              onChange={onChange}
              {...rest}
              disabled={disabled || !!previewUrl}
            />
          </label>
          {hasError && (
            <span className="text-xs text-error">
              {errors?.[name]?.message as string}
            </span>
          )}
        </>
      )}
    </div>
  );
}

export default FileInput;
