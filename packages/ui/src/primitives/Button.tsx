import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn, createComponent } from "@basekit/core";
import type { Radius, Size, Tone, Variant } from "@basekit/tokens";
import {
  controlSizeStyles,
  focusRing,
  Icon,
  iconButtonSizeStyles,
  interactiveToneStyles,
  radiusStyles,
  renderIcon,
  type IconSlot,
} from "../internal";

export type ButtonProps = {
  id?: string;
  className?: string;
  children?: ReactNode;
  text?: string;
  type?: "button" | "submit" | "reset";
  tone?: Tone;
  variant?: Variant;
  size?: Size;
  radius?: Radius;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  hidden?: boolean;
  iconLeft?: IconSlot;
  iconRight?: IconSlot;
  /** Square, icon-sized control (used by IconButton). */
  square?: boolean;
  testId?: string;
  title?: string;
  "aria-label"?: string;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  onMouseEnter?: ButtonHTMLAttributes<HTMLButtonElement>["onMouseEnter"];
  onMouseLeave?: ButtonHTMLAttributes<HTMLButtonElement>["onMouseLeave"];
  onFocus?: ButtonHTMLAttributes<HTMLButtonElement>["onFocus"];
  onBlur?: ButtonHTMLAttributes<HTMLButtonElement>["onBlur"];
};

const base =
  "relative inline-flex items-center justify-center whitespace-nowrap font-medium " +
  "transition-colors select-none disabled:pointer-events-none disabled:opacity-55";

export const ButtonView = forwardRef<HTMLButtonElement, ButtonProps>(
  function ButtonView(
    {
      id,
      className,
      children,
      text,
      type = "button",
      tone = "primary",
      variant = "solid",
      size = "md",
      radius = "md",
      disabled,
      loading,
      fullWidth,
      hidden,
      iconLeft,
      iconRight,
      square,
      testId,
      title,
      onClick,
      ...rest
    },
    ref,
  ) {
    if (hidden) return null;
    const label = children ?? text;
    return (
      <button
        ref={ref}
        id={id}
        type={type}
        title={title}
        data-testid={testId}
        data-loading={loading || undefined}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        aria-label={rest["aria-label"]}
        onClick={onClick}
        onMouseEnter={rest.onMouseEnter}
        onMouseLeave={rest.onMouseLeave}
        onFocus={rest.onFocus}
        onBlur={rest.onBlur}
        className={cn(
          base,
          focusRing,
          square ? iconButtonSizeStyles[size] : controlSizeStyles[size],
          radiusStyles[radius],
          interactiveToneStyles[variant][tone],
          fullWidth && "w-full",
          className,
        )}
      >
        {loading && (
          <Icon name="spinner" className="absolute animate-spin" aria-hidden />
        )}
        <span
          className={cn(
            "inline-flex items-center gap-2",
            loading && "invisible",
          )}
        >
          {renderIcon(iconLeft)}
          {label != null && <span>{label}</span>}
          {renderIcon(iconRight)}
        </span>
      </button>
    );
  },
);

export const Button = createComponent<ButtonProps>("Button");

/* ------------------------------------------------------------------ */
/* IconButton                                                          */
/* ------------------------------------------------------------------ */

export type IconButtonProps = Omit<
  ButtonProps,
  "text" | "iconLeft" | "iconRight" | "fullWidth" | "children"
> & {
  icon: IconSlot;
  /** Required for accessibility — icon-only buttons need a label. */
  "aria-label": string;
};

export const IconButtonView = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButtonView(
    {
      icon,
      tone = "neutral",
      variant = "ghost",
      size = "md",
      radius = "md",
      className,
      loading,
      ...rest
    },
    ref,
  ) {
    return (
      <ButtonView
        ref={ref}
        tone={tone}
        variant={variant}
        size={size}
        radius={radius}
        loading={loading}
        square
        className={className}
        {...rest}
      >
        {renderIcon(icon)}
      </ButtonView>
    );
  },
);

export const IconButton = createComponent<IconButtonProps>("IconButton");
