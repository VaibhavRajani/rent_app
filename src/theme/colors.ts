// Color tokens for the theme system
export const colors = {
  // Base colors
  white: "#ffffff",
  black: "#000000",

  // Gray scale
  gray: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },

  // Blue scale
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },

  // Indigo scale
  indigo: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
  },

  // Accent colors
  accent: {
    blue: "#0ea5e9",
    cyan: "#06b6d4",
    teal: "#14b8a6",
  },

  // Venmo brand colors
  venmo: {
    primary: "#008CFF",
    secondary: "#0066CC",
    hover: "#0077E6",
    hoverSecondary: "#0055B3",
  },
} as const;

// Semantic color tokens
export const semanticColors = {
  light: {
    // Background colors
    background: colors.gray[50],
    backgroundSecondary: colors.white,
    backgroundTertiary: colors.gray[100],

    // Foreground colors
    foreground: colors.gray[900],
    foregroundSecondary: colors.gray[700],
    foregroundTertiary: colors.gray[500],

    // Primary colors
    primary: colors.blue[500],
    primaryForeground: colors.white,
    primaryHover: colors.blue[600],

    // Secondary colors
    secondary: colors.gray[500],
    secondaryForeground: colors.gray[100],
    secondaryHover: colors.gray[600],

    // Accent colors
    accent: colors.accent.blue,
    accentForeground: colors.white,
    accentHover: colors.blue[600],

    // Muted colors
    muted: colors.gray[100],
    mutedForeground: colors.gray[500],

    // Border colors
    border: colors.gray[200],
    borderSecondary: colors.gray[300],

    // Input colors
    input: colors.white,
    inputBorder: colors.gray[300],

    // Ring colors
    ring: colors.blue[500],

    // Status colors
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: colors.blue[500],
  },

  dark: {
    // Background colors
    background: colors.gray[900],
    backgroundSecondary: colors.gray[800],
    backgroundTertiary: colors.gray[700],

    // Foreground colors
    foreground: colors.gray[50],
    foregroundSecondary: colors.gray[300],
    foregroundTertiary: colors.gray[400],

    // Primary colors
    primary: colors.blue[500],
    primaryForeground: colors.white,
    primaryHover: colors.blue[400],

    // Secondary colors
    secondary: colors.gray[500],
    secondaryForeground: colors.gray[800],
    secondaryHover: colors.gray[400],

    // Accent colors
    accent: colors.accent.blue,
    accentForeground: colors.white,
    accentHover: colors.blue[400],

    // Muted colors
    muted: colors.gray[800],
    mutedForeground: colors.gray[400],

    // Border colors
    border: colors.gray[700],
    borderSecondary: colors.gray[600],

    // Input colors
    input: colors.gray[800],
    inputBorder: colors.gray[600],

    // Ring colors
    ring: colors.blue[500],

    // Status colors
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: colors.blue[400],
  },
} as const;

// Type definitions for better TypeScript support
export type ColorToken = keyof typeof colors;
export type SemanticColorToken = keyof typeof semanticColors.light;
export type ThemeMode = "light" | "dark";

// Helper function to get semantic color
export function getSemanticColor(
  token: SemanticColorToken,
  mode: ThemeMode = "light"
) {
  return semanticColors[mode][token];
}

// Helper function to get base color
export function getColor(token: ColorToken) {
  return colors[token];
}
