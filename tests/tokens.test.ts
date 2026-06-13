import { describe, expect, it } from "vitest";
import {
  buildThemeStylesheet,
  colorCssVariables,
  darkColors,
  lightColors,
  radii,
  shadows,
  spacing,
  basekitPreset,
} from "@basekit/tokens";

describe("tokens", () => {
  it("exposes light and dark colour scales with the same roles", () => {
    expect(Object.keys(lightColors)).toEqual(Object.keys(darkColors));
    expect(lightColors.primary).toMatch(/^#/);
  });

  it("exposes scales for spacing, radius and shadows", () => {
    expect(spacing.md).toBe("1rem");
    expect(radii.full).toBe("9999px");
    expect(shadows.none).toBe("none");
  });

  it("derives soft and hover tints as CSS variables", () => {
    const vars = colorCssVariables(lightColors);
    expect(vars["--bk-primary"]).toBe(lightColors.primary);
    expect(vars["--bk-primary-soft"]).toContain("color-mix");
    expect(vars["--bk-primary-hover"]).toContain("color-mix");
  });

  it("builds a stylesheet with :root and .dark blocks", () => {
    const css = buildThemeStylesheet();
    expect(css).toContain(":root {");
    expect(css).toContain(".dark {");
    expect(css).toContain("--bk-background");
  });

  it("maps semantic colours to css variables in the tailwind preset", () => {
    const colors = basekitPreset.theme.extend.colors;
    expect(colors.primary.DEFAULT).toBe("var(--bk-primary)");
    expect(colors.border).toBe("var(--bk-border)");
  });
});
