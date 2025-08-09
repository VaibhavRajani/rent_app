# Theme System

This directory contains a comprehensive theme system for the rent application, providing consistent design tokens and theme-aware styling.

## Structure

```
src/theme/
├── colors.ts          # Color tokens and semantic colors
├── spacing.ts         # Spacing tokens and semantic spacing
├── typography.ts      # Typography tokens and semantic typography
├── radius.ts          # Border radius tokens
├── utils.ts           # Utility functions for theme-aware styling
├── ThemeProvider.tsx  # React context provider for theme state
├── index.ts           # Main exports and theme configuration
└── README.md          # This file
```

## Color Tokens

### Base Colors

- `colors.white` - Pure white (#ffffff)
- `colors.black` - Pure black (#000000)
- `colors.gray` - Gray scale (50-900)
- `colors.blue` - Blue scale (50-900)
- `colors.indigo` - Indigo scale (50-900)
- `colors.accent` - Accent colors (blue, cyan, teal)
- `colors.venmo` - Venmo brand colors

### Semantic Colors

Semantic colors are organized by theme mode (light/dark) and provide meaningful names:

```typescript
// Light mode semantic colors
semanticColors.light = {
  background: "#f8fafc",
  foreground: "#0f172a",
  primary: "#3b82f6",
  primaryForeground: "#ffffff",
  secondary: "#64748b",
  // ... more colors
};

// Dark mode semantic colors
semanticColors.dark = {
  background: "#020617",
  foreground: "#f8fafc",
  primary: "#3b82f6",
  primaryForeground: "#ffffff",
  secondary: "#64748b",
  // ... more colors
};
```

## Usage

### Using Theme Tokens in Components

```typescript
import { useTheme } from "@/theme/ThemeProvider";
import { getSemanticColorValue } from "@/theme/utils";

function MyComponent() {
  const { mode } = useTheme();

  // Get semantic color value
  const backgroundColor = getSemanticColorValue("background", mode);

  return <div style={{ backgroundColor }}>Content</div>;
}
```

### Using CSS Custom Properties

The theme system automatically generates CSS custom properties that can be used in CSS:

```css
.my-component {
  background-color: var(--background);
  color: var(--foreground);
  border: 1px solid var(--border);
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
}
```

### Theme-Aware Styling

```typescript
import { getBackgroundColor, getTextColor } from "@/theme/utils";

function ThemeAwareComponent() {
  const bgColor = getBackgroundColor("secondary");
  const textColor = getTextColor("primary");

  return (
    <div style={{ backgroundColor: bgColor, color: textColor }}>
      Theme-aware content
    </div>
  );
}
```

## Theme Provider

The `ThemeProvider` component manages theme state and provides theme context to the application:

```typescript
import { ThemeProvider } from "@/theme/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultMode="light">
      <YourApp />
    </ThemeProvider>
  );
}
```

### Using Theme Context

```typescript
import { useTheme } from "@/theme/ThemeProvider";

function ThemeToggle() {
  const { mode, toggleMode, setMode } = useTheme();

  return <button onClick={toggleMode}>Current theme: {mode}</button>;
}
```

## CSS Variables

The theme system generates CSS custom properties for all tokens:

### Color Variables

- `--background` - Primary background color
- `--foreground` - Primary foreground color
- `--primary` - Primary brand color
- `--secondary` - Secondary color
- `--accent` - Accent color
- `--muted` - Muted color
- `--border` - Border color
- `--input` - Input background color
- `--ring` - Focus ring color

### Additional Semantic Colors

- `--background-secondary` - Secondary background
- `--background-tertiary` - Tertiary background
- `--foreground-secondary` - Secondary foreground
- `--foreground-tertiary` - Tertiary foreground
- `--primary-hover` - Primary hover state
- `--secondary-hover` - Secondary hover state
- `--accent-hover` - Accent hover state

### Status Colors

- `--success` - Success color
- `--warning` - Warning color
- `--error` - Error color
- `--info` - Info color

### Venmo Colors

- `--venmo-primary` - Venmo primary color
- `--venmo-secondary` - Venmo secondary color
- `--venmo-hover` - Venmo hover color
- `--venmo-hover-secondary` - Venmo hover secondary color

## Best Practices

1. **Use semantic colors** instead of hardcoded hex values
2. **Leverage CSS custom properties** for theme-aware styling
3. **Use the theme context** for dynamic theme switching
4. **Follow the token naming conventions** for consistency
5. **Test both light and dark modes** when implementing new components

## Migration Guide

To migrate existing components to use the theme system:

1. Replace hardcoded hex colors with semantic color tokens
2. Use CSS custom properties for theme-aware styling
3. Update component props to accept theme variants
4. Test components in both light and dark modes

### Example Migration

Before:

```typescript
<div className="bg-blue-500 text-white border border-gray-200">Content</div>
```

After:

```typescript
<div className="bg-[var(--primary)] text-[var(--primary-foreground)] border border-[var(--border)]">
  Content
</div>
```

## Contributing

When adding new tokens or modifying existing ones:

1. Update the appropriate token file (colors.ts, spacing.ts, etc.)
2. Add corresponding CSS custom properties in globals.css
3. Update the theme index file if needed
4. Document new tokens in this README
5. Test the changes in both light and dark modes
