import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  Button,
  ButtonView,
  CalendarView,
  CheckboxGroupView,
  CheckboxView,
  DataTableView,
  DateInputView,
  DatePickerView,
  DropzoneView,
  FileInputView,
  InputView,
  MultiSelectView,
  NumberInputView,
  PasswordInputView,
  RadioGroup,
  RadioGroupView,
  RangeSliderView,
  RenderNode,
  SearchInputView,
  SelectView,
  SliderView,
  Text,
  TextInput,
  TextareaView,
  TimePickerView,
  defaultRegistry,
  type DataTableColumn,
} from "@basekit/ui";

const options = [
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" },
];

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
    render(<InputView id="email" label="Email" error="Required" onChangeValue={onChangeValue} />);
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
    const { rerender } = render(<DateInputView label="Date" clearable value="" onValueChange={onValueChange} />);
    expect(screen.queryByLabelText("Effacer la date")).toBeNull();

    rerender(<DateInputView label="Date" clearable value="2026-06-13" onValueChange={onValueChange} />);
    fireEvent.click(screen.getByLabelText("Effacer la date"));
    expect(onValueChange).toHaveBeenCalledWith("");

    rerender(<DateInputView label="Date" clearable disabled value="2026-06-13" onValueChange={onValueChange} />);
    expect(screen.queryByLabelText("Effacer la date")).toBeNull();
  });
});

type Row = { id: string; name: string; qty: number };
const columns: DataTableColumn<Row>[] = [
  { id: "name", header: "Name", accessor: "name" },
  { id: "qty", header: "Qty", cell: (row) => Text({ value: row.qty, tone: "success" }) },
];

describe("DataTableView", () => {
  it("shows the empty state when there are no rows", () => {
    render(<DataTableView<Row> rows={[]} columns={columns} emptyText="Nothing here" />);
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });

  it("renders rows, including declarative UINode cells", () => {
    render(<DataTableView<Row> rows={[{ id: "1", name: "Alpha", qty: 7 }]} columns={columns} rowKey="id" />);
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();
  });
});

describe("generic form controls", () => {
  it("RadioGroup supports uncontrolled and controlled changes", () => {
    const onValueChange = vi.fn();
    const { rerender } = render(<RadioGroupView label="Type" options={options} onValueChange={onValueChange} />);
    fireEvent.click(screen.getByText("Option B"));
    expect(onValueChange).toHaveBeenCalledWith("b");

    rerender(<RadioGroupView label="Type" options={options} value="a" onValueChange={onValueChange} />);
    expect(screen.getByLabelText("Option A")).toBeChecked();
  });

  it("Checkbox and CheckboxGroup emit checked values", () => {
    const checked = vi.fn();
    render(<CheckboxView label="Accept" onCheckedChange={checked} />);
    fireEvent.click(screen.getByLabelText("Accept"));
    expect(checked).toHaveBeenCalledWith(true);

    const values = vi.fn();
    render(<CheckboxGroupView label="Options" options={options} onValuesChange={values} />);
    fireEvent.click(screen.getByLabelText("Option A"));
    fireEvent.click(screen.getByLabelText("Option B"));
    expect(values).toHaveBeenLastCalledWith(["a", "b"]);
  });

  it("Textarea onChangeValue", () => {
    const onChangeValue = vi.fn();
    render(<TextareaView label="Description" onChangeValue={onChangeValue} />);
    fireEvent.change(screen.getByLabelText("Description"), { target: { value: "hello" } });
    expect(onChangeValue).toHaveBeenCalledWith("hello");
  });

  it("NumberInput maps empty values to null", () => {
    const onNumberChange = vi.fn();
    render(<NumberInputView label="Quantité" onNumberChange={onNumberChange} />);
    fireEvent.change(screen.getByLabelText("Quantité"), { target: { value: "4" } });
    fireEvent.change(screen.getByLabelText("Quantité"), { target: { value: "" } });
    expect(onNumberChange).toHaveBeenNthCalledWith(1, 4);
    expect(onNumberChange).toHaveBeenNthCalledWith(2, null);
  });

  it("PasswordInput toggles visibility with an aria-label", () => {
    const onVisibleChange = vi.fn();
    render(<PasswordInputView label="Password" onVisibleChange={onVisibleChange} />);
    expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password");
    fireEvent.click(screen.getByLabelText("Afficher le mot de passe"));
    expect(onVisibleChange).toHaveBeenCalledWith(true);
    expect(screen.getByLabelText("Password")).toHaveAttribute("type", "text");
  });

  it("SearchInput clear emits empty value", () => {
    const clear = vi.fn();
    const onValueChange = vi.fn();
    render(<SearchInputView label="Search" value="abc" clearable onClear={clear} onValueChange={onValueChange} />);
    fireEvent.click(screen.getByLabelText("Effacer la recherche"));
    expect(clear).toHaveBeenCalledOnce();
    expect(onValueChange).toHaveBeenCalledWith("");
  });

  it("FileInput reports accepted and rejected files", () => {
    const accepted = vi.fn();
    const rejected = vi.fn();
    render(<FileInputView label="Fichier" maxSize={2} onFilesChange={accepted} onRejectedFilesChange={rejected} />);
    const small = new File(["a"], "small.txt", { type: "text/plain" });
    const large = new File(["large"], "large.txt", { type: "text/plain" });
    fireEvent.change(screen.getByLabelText("Fichier"), { target: { files: [small, large] } });
    expect(accepted).toHaveBeenCalledWith([small]);
    expect(rejected).toHaveBeenCalledWith([large]);
  });

  it("Dropzone accepts dropped files", () => {
    const onFilesChange = vi.fn();
    render(<DropzoneView onFilesChange={onFilesChange} />);
    const file = new File(["a"], "item.txt", { type: "text/plain" });
    fireEvent.drop(screen.getByRole("button"), { dataTransfer: { files: [file] } });
    expect(onFilesChange).toHaveBeenCalledWith([file]);
  });

  it("Calendar disables min/max dates", () => {
    const onDateSelect = vi.fn();
    render(<CalendarView month={new Date(2026, 0, 1)} minDate="2026-01-10" maxDate="2026-01-20" onDateSelect={onDateSelect} />);
    expect(screen.getByRole("button", { name: /January 1, 2026/i })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: /January 15, 2026/i }));
    expect(onDateSelect).toHaveBeenCalledWith("2026-01-15", expect.any(Date));
  });

  it("DatePicker clears and selects", () => {
    const onValueChange = vi.fn();
    render(<DatePickerView label="Date" value="2026-01-15" clearable onValueChange={onValueChange} />);
    fireEvent.click(screen.getByLabelText("Effacer la date"));
    expect(onValueChange).toHaveBeenCalledWith("");
  });

  it("TimePicker emits value changes", () => {
    const onValueChange = vi.fn();
    render(<TimePickerView label="Heure" onValueChange={onValueChange} />);
    fireEvent.change(screen.getByLabelText("Heure"), { target: { value: "12:30" } });
    expect(onValueChange).toHaveBeenCalledWith("12:30");
  });

  it("Select, MultiSelect, Slider and RangeSlider emit values", () => {
    const select = vi.fn();
    render(<SelectView label="Statut" options={options} onValueChange={select} />);
    fireEvent.change(screen.getByLabelText("Statut"), { target: { value: "a" } });
    expect(select).toHaveBeenCalledWith("a");

    const multi = vi.fn();
    render(<MultiSelectView label="Multi" options={options} onValuesChange={multi} />);
    const multiSelect = screen.getByLabelText("Multi") as HTMLSelectElement;
    multiSelect.options[0].selected = true;
    fireEvent.change(multiSelect);
    expect(multi).toHaveBeenCalledWith(["a"]);

    const slider = vi.fn();
    render(<SliderView label="Amount" defaultValue={1} onValueChange={slider} />);
    fireEvent.change(screen.getByRole("slider", { name: "Amount" }), { target: { value: "5" } });
    expect(slider).toHaveBeenCalledWith(5);

    const range = vi.fn();
    render(<RangeSliderView label="Range" defaultValue={[1, 9]} onValueChange={range} />);
    fireEvent.change(screen.getAllByRole("slider", { name: "Range" })[0], { target: { value: "3" } });
    expect(range).toHaveBeenCalledWith([3, 9]);
  });
});

describe("registry and declarative renderer", () => {
  it("renders declarative components through the default registry", () => {
    render(<RenderNode node={Button({ text: "Declarative", tone: "primary" })} />);
    render(<RenderNode node={RadioGroup({ label: "Type", options: [{ label: "Option A", value: "a" }] })} />);
    render(<RenderNode node={TextInput({ label: "Utilisateur" })} />);
    expect(screen.getByText("Declarative")).toBeInTheDocument();
    expect(screen.getByText("Option A")).toBeInTheDocument();
    expect(screen.getByLabelText("Utilisateur")).toBeInTheDocument();
  });

  it("registry contains the public interactive components", () => {
    const keys = [
      "Radio", "RadioGroup", "Checkbox", "CheckboxGroup", "Calendar", "DatePicker", "TimePicker",
      "TextInput", "NumberInput", "PasswordInput", "SearchInput", "EmailInput", "PhoneInput", "UrlInput",
      "FileInput", "Dropzone", "MultiSelect", "Combobox", "Autocomplete", "Slider", "RangeSlider",
      "FieldLabel", "FieldHint", "FieldError",
    ];
    for (const key of keys) expect(defaultRegistry[key]).toBeTruthy();
    expect(defaultRegistry.DateRangePicker).toBeUndefined();
  });
});
