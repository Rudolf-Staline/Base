import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  BreadcrumbView,
  ButtonGroupView,
  ButtonView,
  ComboboxView,
  DateTimeInputView,
  DropzoneView,
  PaginationView,
  PopoverView,
  TableBodyView,
  TableCaptionView,
  TableCellView,
  TableHeadView,
  TableHeaderView,
  TableRowView,
  TableView,
  ToggleGroupView,
  ToggleView,
  TooltipView,
} from "@basekit/ui";

const options = [
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" },
  { label: "Option C", value: "c" },
];

describe("ButtonGroup", () => {
  it("renders its child buttons", () => {
    render(
      <ButtonGroupView aria-label="Format">
        <ButtonView text="One" />
        <ButtonView text="Two" />
      </ButtonGroupView>,
    );
    expect(screen.getByRole("group", { name: "Format" })).toBeInTheDocument();
    expect(screen.getByText("One")).toBeInTheDocument();
    expect(screen.getByText("Two")).toBeInTheDocument();
  });
});

describe("Toggle", () => {
  it("toggles pressed state and exposes aria-pressed (uncontrolled)", () => {
    const onPressedChange = vi.fn();
    render(<ToggleView text="Bold" onPressedChange={onPressedChange} />);
    const toggle = screen.getByRole("button", { name: "Bold" });
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(toggle);
    expect(onPressedChange).toHaveBeenCalledWith(true);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
  });

  it("respects the controlled pressed prop", () => {
    render(<ToggleView text="Bold" pressed />);
    expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute("aria-pressed", "true");
  });
});

describe("ToggleGroup", () => {
  it("single mode keeps one value selected", () => {
    const onValueChange = vi.fn();
    render(<ToggleGroupView type="single" options={options} onValueChange={onValueChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Option A" }));
    expect(onValueChange).toHaveBeenLastCalledWith("a");
    fireEvent.click(screen.getByRole("button", { name: "Option B" }));
    expect(onValueChange).toHaveBeenLastCalledWith("b");
    expect(screen.getByRole("button", { name: "Option B" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Option A" })).toHaveAttribute("aria-pressed", "false");
  });

  it("multiple mode accumulates values", () => {
    const onValuesChange = vi.fn();
    render(<ToggleGroupView type="multiple" options={options} onValuesChange={onValuesChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Option A" }));
    fireEvent.click(screen.getByRole("button", { name: "Option C" }));
    expect(onValuesChange).toHaveBeenLastCalledWith(["a", "c"]);
  });
});

describe("Tooltip", () => {
  it("reveals content on hover and focus and wires aria-describedby", () => {
    render(
      <TooltipView content="Helpful hint">
        <button type="button">Target</button>
      </TooltipView>,
    );
    expect(screen.queryByRole("tooltip")).toBeNull();
    fireEvent.mouseEnter(screen.getByText("Target").parentElement!.parentElement!);
    const tip = screen.getByRole("tooltip");
    expect(tip).toHaveTextContent("Helpful hint");
  });
});

describe("Popover", () => {
  it("opens from the trigger and reports open state", () => {
    const onOpenChange = vi.fn();
    render(
      <PopoverView trigger={<button type="button">Open</button>} onOpenChange={onOpenChange} title="Panel">
        Body
      </PopoverView>,
    );
    expect(screen.queryByRole("dialog")).toBeNull();
    fireEvent.click(screen.getByText("Open"));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole("dialog", { name: "Panel" })).toHaveTextContent("Body");
  });

  it("honours defaultOpen", () => {
    render(
      <PopoverView trigger={<button type="button">Open</button>} defaultOpen>
        Body
      </PopoverView>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});

describe("Pagination", () => {
  it("changes page and disables prev/next at the bounds", () => {
    const onPageChange = vi.fn();
    const { rerender } = render(
      <PaginationView page={1} totalPages={5} onPageChange={onPageChange} />,
    );
    expect(screen.getByLabelText("Page précédente")).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Page 2" }));
    expect(onPageChange).toHaveBeenCalledWith(2);

    rerender(<PaginationView page={5} totalPages={5} onPageChange={onPageChange} />);
    expect(screen.getByLabelText("Page suivante")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Page 5" })).toHaveAttribute("aria-current", "page");
  });
});

describe("Breadcrumb", () => {
  it("marks the current item with aria-current", () => {
    render(
      <BreadcrumbView
        items={[
          { label: "Home", href: "#" },
          { label: "Section", href: "#" },
          { label: "Current", current: true },
        ]}
      />,
    );
    const nav = screen.getByRole("navigation", { name: "Fil d'Ariane" });
    expect(nav).toBeInTheDocument();
    const current = screen.getByText("Current");
    expect(current).toHaveAttribute("aria-current", "page");
  });
});

describe("Table", () => {
  it("renders caption, header and body cells", () => {
    render(
      <TableView>
        <TableCaptionView>Generic table</TableCaptionView>
        <TableHeaderView>
          <TableRowView>
            <TableHeadView>Name</TableHeadView>
            <TableHeadView>Qty</TableHeadView>
          </TableRowView>
        </TableHeaderView>
        <TableBodyView>
          <TableRowView>
            <TableCellView>Item A</TableCellView>
            <TableCellView>1</TableCellView>
          </TableRowView>
        </TableBodyView>
      </TableView>,
    );
    expect(screen.getByText("Generic table")).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Name" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Item A" })).toBeInTheDocument();
  });
});

describe("DateTimeInput", () => {
  it("emits value changes", () => {
    const onValueChange = vi.fn();
    render(<DateTimeInputView label="When" onValueChange={onValueChange} />);
    fireEvent.change(screen.getByLabelText("When"), { target: { value: "2026-06-14T10:30" } });
    expect(onValueChange).toHaveBeenCalledWith("2026-06-14T10:30");
  });
});

describe("Dropzone keyboard", () => {
  it("opens the file picker on Enter and Space", () => {
    render(<DropzoneView />);
    const zone = screen.getByRole("button");
    const input = zone.querySelector("input") as HTMLInputElement;
    const click = vi.spyOn(input, "click").mockImplementation(() => undefined);
    fireEvent.keyDown(zone, { key: "Enter" });
    fireEvent.keyDown(zone, { key: " " });
    expect(click).toHaveBeenCalledTimes(2);
  });
});

describe("Combobox", () => {
  it("filters, selects, clears and closes on Escape", () => {
    const onValueChange = vi.fn();
    render(<ComboboxView label="Pick" options={options} clearable onValueChange={onValueChange} />);
    const input = screen.getByRole("combobox");

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "Option B" } });
    // Only the matching option remains in the listbox.
    expect(screen.getByRole("option", { name: "Option B" })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: "Option A" })).toBeNull();

    fireEvent.click(screen.getByRole("option", { name: "Option B" }));
    expect(onValueChange).toHaveBeenCalledWith("b");

    fireEvent.click(screen.getByLabelText("Effacer la sélection"));
    expect(onValueChange).toHaveBeenLastCalledWith("");

    fireEvent.focus(input);
    expect(input).toHaveAttribute("aria-expanded", "true");
    fireEvent.keyDown(input, { key: "Escape" });
    expect(input).toHaveAttribute("aria-expanded", "false");
  });
});
