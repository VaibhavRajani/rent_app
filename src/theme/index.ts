// Main theme index file - exports all theme tokens and provides unified interface
export * from "./colors";
export * from "./spacing";
export * from "./typography";
export * from "./radius";

import { colors, semanticColors } from "./colors";
import { spacing, semanticSpacing } from "./spacing";
import { typography, semanticTypography } from "./typography";
import { radius, semanticRadius } from "./radius";

// Theme configuration
export const theme = {
  colors,
  spacing,
  typography,
  radius,
  semanticColors,
  semanticSpacing,
  semanticTypography,
  semanticRadius,
} as const;

// Theme mode types
export type ThemeMode = "light" | "dark";

// Theme context interface
export interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

// Helper function to get theme value
export function getThemeValue(
  category: keyof typeof theme,
  token: string,
  mode?: ThemeMode
) {
  const themeCategory = theme[category];

  if (category === "semanticColors" && mode) {
    return semanticColors[mode][
      token as keyof (typeof semanticColors)[typeof mode]
    ];
  }

  if (category.startsWith("semantic")) {
    // Handle semantic tokens
    const semanticTokens = theme[category as keyof typeof theme];
    return semanticTokens[token as keyof typeof semanticTokens];
  }

  return themeCategory[token as keyof typeof themeCategory];
}

// CSS variable generator for theme tokens
export function generateCSSVariables(mode: ThemeMode = "light") {
  const variables: Record<string, string> = {};

  // Color variables
  Object.entries(semanticColors[mode]).forEach(([key, value]) => {
    variables[`--color-${key}`] = value;
  });

  // Spacing variables
  Object.entries(spacing).forEach(([key, value]) => {
    variables[`--spacing-${key}`] = value;
  });

  // Typography variables
  Object.entries(typography.fontSize).forEach(([key, value]) => {
    variables[`--font-size-${key}`] = value;
  });

  Object.entries(typography.fontWeight).forEach(([key, value]) => {
    variables[`--font-weight-${key}`] = value;
  });

  Object.entries(typography.lineHeight).forEach(([key, value]) => {
    variables[`--line-height-${key}`] = value;
  });

  // Radius variables
  Object.entries(radius).forEach(([key, value]) => {
    variables[`--radius-${key}`] = value;
  });

  return variables;
}

// Utility function to convert theme tokens to CSS custom properties
export function themeToCSS(themeTokens: Record<string, string>) {
  return Object.entries(themeTokens)
    .map(([key, value]) => `--${key}: ${value};`)
    .join("\n  ");
}
