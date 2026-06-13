import { lightColors } from "@basekit/tokens";
export default { theme: { extend: { colors: Object.fromEntries(Object.entries(lightColors).map(([key]) => [key, `var(--bk-${key})`])) } } };
