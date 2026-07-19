import { useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn, createComponent } from "@basekit/core";
import { useDialogLayer } from "../internal/useDialogLayer";
import { IconButtonView } from "../primitives/Button";

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  /** Accessible name used when no visible title is provided. */
  "aria-label"?: string;
  /** Close when clicking the backdrop (default true). */
  dismissable?: boolean;
  /** Close when pressing Escape (default true). */
  closeOnEscape?: boolean;
  className?: string;
};

const sizeClass = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export const ModalView = ({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  "aria-label": ariaLabel,
  dismissable = true,
  closeOnEscape = true,
  className,
}: ModalProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const hasHeader = title != null || description != null;

  useDialogLayer({
    open,
    onClose,
    containerRef: panelRef,
    closeOnEscape,
  });

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={dismissable ? onClose : undefined}
        aria-hidden
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title != null ? titleId : undefined}
        aria-describedby={description != null ? descriptionId : undefined}
        aria-label={title == null ? ariaLabel : undefined}
        tabIndex={-1}
        className={cn(
          "relative w-full rounded-xl border border-border bg-surface shadow-strong outline-none",
          sizeClass[size],
          className,
        )}
      >
        {hasHeader ? (
          <div className="flex items-start justify-between gap-4 border-b border-border p-5">
            <div className="space-y-1">
              {title != null && (
                <h2
                  id={titleId}
                  className="text-lg font-semibold text-foreground"
                >
                  {title}
                </h2>
              )}
              {description != null && (
                <p
                  id={descriptionId}
                  className="text-bk-sm text-muted-foreground"
                >
                  {description}
                </p>
              )}
            </div>
            <IconButtonView
              icon="close"
              aria-label="Fermer"
              onClick={onClose}
              size="sm"
            />
          </div>
        ) : (
          <IconButtonView
            icon="close"
            aria-label="Fermer"
            onClick={onClose}
            size="sm"
            className="absolute right-3 top-3"
          />
        )}
        <div className={cn("p-5", !hasHeader && "pr-14")}>{children}</div>
        {footer != null && (
          <div className="flex items-center justify-end gap-2 border-t border-border p-5">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};

export const Modal = createComponent<ModalProps>("Modal");

/* Drawer — side sheet, shares the overlay mechanics ------------------- */

export type DrawerProps = Omit<ModalProps, "size"> & {
  side?: "left" | "right";
  width?: string;
};

export const DrawerView = ({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  side = "right",
  width = "22rem",
  "aria-label": ariaLabel,
  dismissable = true,
  closeOnEscape = true,
  className,
}: DrawerProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useDialogLayer({
    open,
    onClose,
    containerRef: panelRef,
    closeOnEscape,
  });

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-drawer">
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={dismissable ? onClose : undefined}
        aria-hidden
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title != null ? titleId : undefined}
        aria-describedby={description != null ? descriptionId : undefined}
        aria-label={title == null ? ariaLabel : undefined}
        tabIndex={-1}
        className={cn(
          "absolute inset-y-0 flex w-full flex-col border-border bg-surface shadow-strong outline-none",
          side === "right" ? "right-0 border-l" : "left-0 border-r",
          className,
        )}
        style={{ maxWidth: width }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border p-5">
          <div className="space-y-1">
            {title != null && (
              <h2
                id={titleId}
                className="text-lg font-semibold text-foreground"
              >
                {title}
              </h2>
            )}
            {description != null && (
              <p
                id={descriptionId}
                className="text-bk-sm text-muted-foreground"
              >
                {description}
              </p>
            )}
          </div>
          <IconButtonView
            icon="close"
            aria-label="Fermer"
            onClick={onClose}
            size="sm"
          />
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
        {footer != null && (
          <div className="border-t border-border p-5">{footer}</div>
        )}
      </div>
    </div>,
    document.body,
  );
};

export const Drawer = createComponent<DrawerProps>("Drawer");
