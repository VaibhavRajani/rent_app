// Utility functions for theme-aware styling
import { semanticColors, ThemeMode } from "./colors";

/**
 * Get a CSS custom property value with fallback
 */
export function getCSSVariable(property: string, fallback?: string): string {
  if (typeof window === "undefined") return fallback || "";

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(property)
    .trim();

  return value || fallback || "";
}

/**
 * Get a semantic color value for the current theme
 */
export function getSemanticColorValue(
  token: keyof typeof semanticColors.light,
  mode?: ThemeMode
): string {
  if (typeof window === "undefined") {
    return semanticColors.light[token];
  }

  const currentMode =
    mode ||
    (document.documentElement.getAttribute("data-theme") as ThemeMode) ||
    "light";
  return semanticColors[currentMode][token];
}

/**
 * Generate CSS custom properties for a component
 */
export function generateComponentCSS(
  componentTokens: Record<string, string>
): string {
  return Object.entries(componentTokens)
    .map(([key, value]) => `--${key}: ${value};`)
    .join("\n  ");
}

/**
 * Create a theme-aware class name
 */
export function createThemeClass(
  baseClass: string,
  themeVariants: Record<ThemeMode, string>
): string {
  const classes = [baseClass];

  Object.entries(themeVariants).forEach(([mode, variant]) => {
    classes.push(`${baseClass}--${mode}`);
  });

  return classes.join(" ");
}

/**
 * Get theme-aware background color
 */
export function getBackgroundColor(
  variant: "primary" | "secondary" | "tertiary" = "primary"
): string {
  const property = `--background${variant === "primary" ? "" : `-${variant}`}`;
  return getCSSVariable(property, semanticColors.light.background);
}

/**
 * Get theme-aware text color
 */
export function getTextColor(
  variant: "primary" | "secondary" | "tertiary" = "primary"
): string {
  const property = `--foreground${variant === "primary" ? "" : `-${variant}`}`;
  return getCSSVariable(property, semanticColors.light.foreground);
}

/**
 * Get theme-aware border color
 */
export function getBorderColor(
  variant: "primary" | "secondary" = "primary"
): string {
  const property = `--border${variant === "primary" ? "" : `-${variant}`}`;
  return getCSSVariable(property, semanticColors.light.border);
}

/**
 * Check if the current theme is dark mode
 */
export function isDarkMode(): boolean {
  if (typeof window === "undefined") return false;

  const theme = document.documentElement.getAttribute("data-theme");
  return (
    theme === "dark" ||
    (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
}

/**
 * Get theme-aware gradient classes
 */
export function getGradientClasses(
  type: "primary" | "secondary" | "accent" = "primary"
): string {
  const gradients = {
    primary: "bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)]",
    secondary:
      "bg-gradient-to-r from-[var(--secondary)] to-[var(--secondary-hover)]",
    accent: "bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)]",
  };

  return gradients[type];
}
