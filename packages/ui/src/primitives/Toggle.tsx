import { forwardRef, useId, type ReactNode } from "react";
import { cn, createComponent } from "@basekit/core";
import { Icon } from "../internal";

export type CheckboxProps = {
  id?: string;
  name?: string;
  label?: ReactNode;
  description?: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  hidden?: boolean;
  className?: string;
  testId?: string;
  onChange?: (checked: boolean) => void;
};

export const CheckboxView = forwardRef<HTMLInputElement, CheckboxProps>(
  function CheckboxView(
    {
      id,
      name,
      label,
      description,
      checked,
      defaultChecked,
      disabled,
      required,
      hidden,
      className,
      testId,
      onChange,
    },
    ref,
  ) {
    const generatedId = useId();
    const id_ = id ?? name ?? generatedId;
    if (hidden) return null;
    return (
      <label
        htmlFor={id_}
        className={cn(
          "flex cursor-pointer items-start gap-2.5",
          disabled && "cursor-not-allowed opacity-60",
          className,
        )}
      >
        <span className="relative mt-0.5 inline-flex h-5 w-5">
          <input
            ref={ref}
            id={id_}
            name={name}
            type="checkbox"
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            required={required}
            data-testid={testId}
            className="peer sr-only"
            onChange={(event) => onChange?.(event.target.checked)}
          />
          <span
            className={cn(
              "h-5 w-5 rounded-md border border-input bg-surface transition-colors",
              "peer-checked:border-primary peer-checked:bg-primary",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
            )}
            aria-hidden
          />
          <Icon
            name="check"
            size={14}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-foreground opacity-0 transition-opacity peer-checked:opacity-100"
            aria-hidden
          />
        </span>
        {(label != null || description != null) && (
          <span className="flex flex-col">
            {label != null && (
              <span className="text-bk-sm font-medium text-foreground">
                {label}
              </span>
            )}
            {description != null && (
              <span className="text-bk-sm text-muted-foreground">
                {description}
              </span>
            )}
          </span>
        )}
      </label>
    );
  },
);

export const Checkbox = createComponent<CheckboxProps>("Checkbox");

/* ------------------------------------------------------------------ */
/* Switch                                                              */
/* ------------------------------------------------------------------ */

export type SwitchProps = Omit<CheckboxProps, "description">;

export const SwitchView = forwardRef<HTMLInputElement, SwitchProps>(
  function SwitchView(
    {
      id,
      name,
      label,
      checked,
      defaultChecked,
      disabled,
      hidden,
      className,
      testId,
      onChange,
    },
    ref,
  ) {
    const generatedId = useId();
    const id_ = id ?? name ?? generatedId;
    if (hidden) return null;
    return (
      <label
        htmlFor={id_}
        className={cn(
          "flex cursor-pointer items-center gap-2.5",
          disabled && "cursor-not-allowed opacity-60",
          className,
        )}
      >
        <span className="relative inline-flex">
          <input
            ref={ref}
            id={id_}
            name={name}
            type="checkbox"
            role="switch"
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            data-testid={testId}
            className="peer sr-only"
            onChange={(event) => onChange?.(event.target.checked)}
          />
          <span
            className={cn(
              "h-6 w-10 rounded-full bg-input transition-colors peer-checked:bg-primary",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
            )}
            aria-hidden
          />
          <span className="pointer-events-none absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-surface shadow-sm transition-transform peer-checked:translate-x-4" />
        </span>
        {label != null && (
          <span className="text-bk-sm font-medium text-foreground">
            {label}
          </span>
        )}
      </label>
    );
  },
);

export const Switch = createComponent<SwitchProps>("Switch");
