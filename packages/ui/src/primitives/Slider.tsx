import { createComponent } from "@basekit/core";
import { FieldShell } from "./Input";
export type SliderProps = { value?: number; defaultValue?: number; min?: number; max?: number; step?: number; disabled?: boolean; label?: React.ReactNode; helperText?: React.ReactNode; error?: React.ReactNode; onValueChange?: (value:number)=>void; testId?: string };
export const SliderView = ({ label, helperText, error, onValueChange, testId, ...props }: SliderProps) => <FieldShell id={testId ?? "slider"} label={label} helperText={helperText} error={error}><input data-testid={testId} type="range" className="w-full accent-primary" {...props} onChange={(e)=>onValueChange?.(Number(e.currentTarget.value))}/></FieldShell>;
export const Slider = createComponent<SliderProps>("Slider");
export type RangeSliderProps = SliderProps & { value?: [number,number]; defaultValue?: [number,number]; onValueChange?: (value:[number,number])=>void };
export const RangeSliderView = ({ value, defaultValue, onValueChange, ...props }: RangeSliderProps) => <div className="space-y-2"><SliderView {...props} value={value?.[0]} defaultValue={defaultValue?.[0]} onValueChange={(v)=>onValueChange?.([v, value?.[1] ?? defaultValue?.[1] ?? props.max ?? 100])}/><SliderView {...props} value={value?.[1]} defaultValue={defaultValue?.[1]} onValueChange={(v)=>onValueChange?.([value?.[0] ?? defaultValue?.[0] ?? props.min ?? 0, v])}/></div>;
export const RangeSlider = createComponent<RangeSliderProps>("RangeSlider");
