import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DrawerView, ModalView } from "@basekit/ui";

describe("dialog layers", () => {
  it("traps focus inside a modal and restores the trigger on close", () => {
    const Harness = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Open modal
          </button>
          <ModalView
            open={open}
            onClose={() => setOpen(false)}
            title="Settings"
          >
            <input aria-label="First field" />
            <button type="button">Last action</button>
          </ModalView>
        </>
      );
    };

    render(<Harness />);
    const trigger = screen.getByRole("button", { name: "Open modal" });
    trigger.focus();
    fireEvent.click(trigger);

    const dialog = screen.getByRole("dialog", { name: "Settings" });
    expect(dialog).toHaveFocus();

    const close = screen.getByRole("button", { name: "Fermer" });
    const last = screen.getByRole("button", { name: "Last action" });

    close.focus();
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(last).toHaveFocus();

    last.focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(close).toHaveFocus();

    fireEvent.click(close);
    expect(trigger).toHaveFocus();
  });

  it("labels a drawer, locks scrolling and closes on Escape", () => {
    const onClose = vi.fn();
    const previousOverflow = document.body.style.overflow;
    const { unmount } = render(
      <DrawerView
        open
        onClose={onClose}
        title="Filters"
        description="Narrow the visible results"
      >
        Content
      </DrawerView>,
    );

    const dialog = screen.getByRole("dialog", { name: "Filters" });
    expect(dialog).toHaveAccessibleDescription("Narrow the visible results");
    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledOnce();

    unmount();
    expect(document.body.style.overflow).toBe(previousOverflow);
  });

  it("keeps Escape inert when closeOnEscape is disabled", () => {
    const onClose = vi.fn();
    render(
      <ModalView
        open
        onClose={onClose}
        aria-label="Persistent dialog"
        closeOnEscape={false}
      >
        Content
      </ModalView>,
    );

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });
});
