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

import { CalendarView, CheckboxGroupView, CheckboxView, DatePickerView, defaultRegistry, MultiSelectView, NumberInputView, PasswordInputView, RadioGroup, RadioGroupView, SearchInputView, SelectView, SliderView, TextareaView, TextInput } from "@basekit/ui";

describe("generic form controls", () => {
  it("RadioGroup change value", () => { const onValueChange=vi.fn(); render(<RadioGroupView label="Type" options={[{label:"Option A",value:"a"},{label:"Option B",value:"b"}]} onValueChange={onValueChange}/>); fireEvent.click(screen.getByText("Option B")); expect(onValueChange).toHaveBeenCalledWith("b"); });
  it("Checkbox checked/unchecked", () => { const onCheckedChange=vi.fn(); render(<CheckboxView label="Accept" onCheckedChange={onCheckedChange}/>); const cb=screen.getByLabelText("Accept"); fireEvent.click(cb); fireEvent.click(cb); expect(onCheckedChange).toHaveBeenNthCalledWith(1,true); expect(onCheckedChange).toHaveBeenNthCalledWith(2,false); });
  it("CheckboxGroup multiple values", () => { const onValuesChange=vi.fn(); render(<CheckboxGroupView label="Options" options={[{label:"Option A",value:"a"},{label:"Option B",value:"b"}]} onValuesChange={onValuesChange}/>); fireEvent.click(screen.getByLabelText("Option A")); fireEvent.click(screen.getByLabelText("Option B")); expect(onValuesChange).toHaveBeenLastCalledWith(["a","b"]); });
  it("Textarea onChangeValue", () => { const fn=vi.fn(); render(<TextareaView label="Description" onChangeValue={fn}/>); fireEvent.change(screen.getByLabelText("Description"),{target:{value:"hello"}}); expect(fn).toHaveBeenCalledWith("hello"); });
  it("PasswordInput toggle visibility", () => { const fn=vi.fn(); render(<PasswordInputView label="Password" onVisibleChange={fn}/>); expect(screen.getByLabelText("Password")).toHaveAttribute("type","password"); fireEvent.click(screen.getByText("Afficher")); expect(fn).toHaveBeenCalledWith(true); expect(screen.getByLabelText("Password")).toHaveAttribute("type","text"); });
  it("SearchInput clear", () => { const clear=vi.fn(); const val=vi.fn(); render(<SearchInputView label="Search" value="abc" clearable onClear={clear} onValueChange={val}/>); fireEvent.click(screen.getByText("Effacer")); expect(clear).toHaveBeenCalledOnce(); expect(val).toHaveBeenCalledWith(""); });
  it("NumberInput onNumberChange", () => { const fn=vi.fn(); render(<NumberInputView label="Qty" onNumberChange={fn}/>); fireEvent.change(screen.getByLabelText("Qty"),{target:{value:"4"}}); expect(fn).toHaveBeenCalledWith(4); });
  it("Calendar date select", () => { const fn=vi.fn(); render(<CalendarView month={new Date(2026,0,1)} onDateSelect={fn}/>); fireEvent.click(screen.getByText("15")); expect(fn.mock.calls[0][0]).toBe("2026-01-15"); });
  it("DatePicker clearable", () => { const fn=vi.fn(); render(<DatePickerView label="Date" value="2026-01-15" clearable onValueChange={fn}/>); fireEvent.click(screen.getByText("Effacer")); expect(fn).toHaveBeenCalledWith(""); });
  it("Select onValueChange", () => { const fn=vi.fn(); render(<SelectView label="Status" options={[{label:"Option A",value:"a"}]} onValueChange={fn}/>); fireEvent.change(screen.getByLabelText("Status"),{target:{value:"a"}}); expect(fn).toHaveBeenCalledWith("a"); });
  it("MultiSelect values", () => { const fn=vi.fn(); render(<MultiSelectView label="Multi" options={[{label:"Option A",value:"a"},{label:"Option B",value:"b"}]} onValuesChange={fn}/>); const select=screen.getByLabelText("Multi") as HTMLSelectElement; Array.from(select.options).forEach(o=>{ if(o.value==="a") o.selected=true; }); fireEvent.change(select); expect(fn).toHaveBeenCalledWith(["a"]); });
  it("Slider onValueChange", () => { const fn=vi.fn(); render(<SliderView label="Amount" defaultValue={1} onValueChange={fn}/>); fireEvent.change(screen.getByRole("slider"),{target:{value:"5"}}); expect(fn).toHaveBeenCalledWith(5); });
  it("renderer renders new declarative components", () => { render(<RenderNode node={RadioGroup({ label:"Type", options:[{label:"Option A", value:"a"}] })}/>); render(<RenderNode node={TextInput({ label:"Nom" })}/>); expect(screen.getByText("Option A")).toBeInTheDocument(); expect(screen.getByLabelText("Nom")).toBeInTheDocument(); });
  it("registry contains all new components", () => { for (const key of ["Radio","RadioGroup","CheckboxGroup","Calendar","DatePicker","DateRangePicker","TimePicker","TextInput","NumberInput","PasswordInput","SearchInput","EmailInput","PhoneInput","UrlInput","FileInput","Dropzone","MultiSelect","Combobox","Autocomplete","Slider","RangeSlider","FieldLabel","FieldHint","FieldError"]) expect(defaultRegistry[key]).toBeTruthy(); });
});
