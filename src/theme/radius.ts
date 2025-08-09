// Radius tokens for consistent border radius values throughout the application
export const radius = {
  // Base radius values
  none: "0rem",
  sm: "0.125rem", // 2px
  base: "0.25rem", // 4px
  md: "0.375rem", // 6px
  lg: "0.5rem", // 8px
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  "3xl": "1.5rem", // 24px
  full: "9999px",
} as const;

// Semantic radius tokens
export const semanticRadius = {
  // Component radius
  component: {
    small: radius.sm,
    base: radius.base,
    large: radius.lg,
  },

  // Card radius
  card: {
    small: radius.lg,
    base: radius.xl,
    large: radius["2xl"],
  },

  // Button radius
  button: {
    small: radius.base,
    base: radius.lg,
    large: radius.xl,
  },

  // Input radius
  input: {
    small: radius.base,
    base: radius.lg,
    large: radius.xl,
  },

  // Modal radius
  modal: {
    small: radius.lg,
    base: radius.xl,
    large: radius["2xl"],
  },

  // Avatar radius
  avatar: {
    small: radius.full,
    base: radius.full,
    large: radius.full,
  },
} as const;

export type RadiusToken = keyof typeof radius;
export type SemanticRadiusToken = keyof typeof semanticRadius;

// Helper function to get radius value
export function getRadius(token: RadiusToken) {
  return radius[token];
}

// Helper function to get semantic radius value
export function getSemanticRadius(
  category: keyof typeof semanticRadius,
  token: string
) {
  return semanticRadius[category][
    token as keyof (typeof semanticRadius)[typeof category]
  ];
}
