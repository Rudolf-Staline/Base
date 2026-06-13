export type ColorToken = "background" | "surface" | "surfaceRaised" | "surfaceOverlay" | "primary" | "accent" | "success" | "warning" | "danger" | "neutral" | "muted" | "text" | "textMuted" | "textInverted" | "border" | "borderStrong";
export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export type Radius = "none" | "sm" | "md" | "lg" | "xl" | "full";
export type Shadow = "none" | "sm" | "md" | "lg";
export type Tone = "neutral" | "primary" | "accent" | "success" | "warning" | "danger";
export type Variant = "solid" | "soft" | "outline" | "ghost";
export type Align = "start" | "center" | "end" | "stretch";
export type Justify = "start" | "center" | "end" | "between";

export const lightColors: Record<ColorToken, string> = {
  background: "#f8fafc", surface: "#ffffff", surfaceRaised: "#f1f5f9", surfaceOverlay: "#ffffff", primary: "#2563eb", accent: "#7c3aed", success: "#16a34a", warning: "#d97706", danger: "#dc2626", neutral: "#0f172a", muted: "#e2e8f0", text: "#0f172a", textMuted: "#64748b", textInverted: "#ffffff", border: "#cbd5e1", borderStrong: "#94a3b8",
};
export const darkColors: Record<ColorToken, string> = {
  background: "#020617", surface: "#0f172a", surfaceRaised: "#1e293b", surfaceOverlay: "#1e293b", primary: "#60a5fa", accent: "#a78bfa", success: "#4ade80", warning: "#fbbf24", danger: "#f87171", neutral: "#f8fafc", muted: "#334155", text: "#f8fafc", textMuted: "#94a3b8", textInverted: "#020617", border: "#475569", borderStrong: "#64748b",
};
export const spacing: Record<Size, string> = { xs: "0.25rem", sm: "0.5rem", md: "1rem", lg: "1.5rem", xl: "2rem" };
export const fontSizes: Record<Size, string> = { xs: "0.75rem", sm: "0.875rem", md: "1rem", lg: "1.125rem", xl: "1.25rem" };
export const radii: Record<Radius, string> = { none: "0", sm: "0.25rem", md: "0.5rem", lg: "0.75rem", xl: "1rem", full: "9999px" };
export const shadows: Record<Shadow, string> = { none: "none", sm: "0 1px 2px rgb(15 23 42 / .08)", md: "0 10px 20px rgb(15 23 42 / .10)", lg: "0 20px 40px rgb(15 23 42 / .16)" };
export const variants: Record<Variant, Variant> = { solid: "solid", soft: "soft", outline: "outline", ghost: "ghost" };
export const zIndex = { dropdown: 1000, modal: 1100, toast: 1200 } as const;
export const transitions = { fast: "120ms ease", normal: "180ms ease", slow: "260ms ease" } as const;
export const themeCssVariables = (theme: Record<ColorToken, string> = lightColors) => Object.fromEntries(Object.entries(theme).map(([key, value]) => [`--bk-${key}`, value])) as Record<`--bk-${ColorToken}`, string>;
