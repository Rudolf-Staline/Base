import { createComponent } from "@basekit/core";
import { SelectView, type SelectProps } from "./Select";
import { FieldShell } from "./Input";
export const ComboboxView = (props: SelectProps) => <SelectView {...props} />; export const Combobox = createComponent<SelectProps>("Combobox");
export const AutocompleteView = (props: SelectProps) => <SelectView {...props} />; export const Autocomplete = createComponent<SelectProps>("Autocomplete");
export type MultiSelectProps = Omit<SelectProps,"value"|"defaultValue"|"onValueChange"> & { values?: string[]; defaultValues?: string[]; onValuesChange?: (values: string[]) => void; searchable?: boolean; clearable?: boolean; onSearchChange?: (value:string)=>void };
export const MultiSelectView = ({ id, name, label, options, values, defaultValues, error, helperText, disabled, required, className, onValuesChange, testId }: MultiSelectProps) => <FieldShell id={id ?? name ?? "multiselect"} label={label} error={error} helperText={helperText} required={required} className={className}><select id={id ?? name ?? "multiselect"} name={name} multiple value={values} defaultValue={defaultValues} disabled={disabled} data-testid={testId} className="min-h-28 rounded-md border border-input bg-surface p-2 text-bk-sm" onChange={(e)=>onValuesChange?.(Array.from(e.currentTarget.selectedOptions).map(o=>o.value))}>{options.map(o=><option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>)}</select></FieldShell>;
export const MultiSelect = createComponent<MultiSelectProps>("MultiSelect");
