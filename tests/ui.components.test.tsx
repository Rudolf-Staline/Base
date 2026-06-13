import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  ButtonView,
  DateInputView,
  DataTableView,
  InputView,
  RenderNode,
  Button,
  Text,
  type DataTableColumn,
} from "@basekit/ui";

describe("ButtonView", () => {
  it("renders text and fires onClick", () => {
    const onClick = vi.fn();
    render(<ButtonView text="Save" onClick={onClick} />);
    fireEvent.click(screen.getByText("Save"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("is disabled and unclickable while loading", () => {
    const onClick = vi.fn();
    render(<ButtonView text="Save" loading onClick={onClick} />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe("InputView", () => {
  it("emits value-first changes and links label + error for a11y", () => {
    const onChangeValue = vi.fn();
    render(
      <InputView
        id="email"
        label="Email"
        error="Required"
        onChangeValue={onChangeValue}
      />,
    );
    const input = screen.getByLabelText("Email", { exact: false });
    fireEvent.change(input, { target: { value: "a@b.co" } });
    expect(onChangeValue).toHaveBeenCalledWith("a@b.co");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });
});

describe("DateInputView", () => {
  it("shows a clear button only when clearable, valued and enabled", () => {
    const onValueChange = vi.fn();
    const { rerender } = render(
      <DateInputView
        label="Date"
        clearable
        value=""
        onValueChange={onValueChange}
      />,
    );
    expect(screen.queryByLabelText("Effacer la date")).toBeNull();

    rerender(
      <DateInputView
        label="Date"
        clearable
        value="2026-06-13"
        onValueChange={onValueChange}
      />,
    );
    const clear = screen.getByLabelText("Effacer la date");
    fireEvent.click(clear);
    expect(onValueChange).toHaveBeenCalledWith("");

    rerender(
      <DateInputView
        label="Date"
        clearable
        disabled
        value="2026-06-13"
        onValueChange={onValueChange}
      />,
    );
    expect(screen.queryByLabelText("Effacer la date")).toBeNull();
  });
});

type Row = { id: string; name: string; qty: number };
const columns: DataTableColumn<Row>[] = [
  { id: "name", header: "Name", accessor: "name" },
  {
    id: "qty",
    header: "Qty",
    cell: (row) => Text({ value: row.qty, tone: "success" }),
  },
];

describe("DataTableView", () => {
  it("shows the empty state when there are no rows", () => {
    render(
      <DataTableView<Row>
        rows={[]}
        columns={columns}
        emptyText="Nothing here"
      />,
    );
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });

  it("renders rows, including declarative UINode cells", () => {
    const rows: Row[] = [{ id: "1", name: "Alpha", qty: 7 }];
    render(<DataTableView<Row> rows={rows} columns={columns} rowKey="id" />);
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();
  });
});

describe("RenderNode", () => {
  it("renders a declarative Button factory through the default registry", () => {
    render(
      <RenderNode node={Button({ text: "Declarative", tone: "primary" })} />,
    );
    expect(screen.getByText("Declarative")).toBeInTheDocument();
  });
});
