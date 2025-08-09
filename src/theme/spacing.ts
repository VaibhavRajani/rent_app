// Spacing tokens for consistent spacing throughout the application
export const spacing = {
  // Base spacing units (in rem)
  0: "0rem",
  1: "0.25rem", // 4px
  2: "0.5rem", // 8px
  3: "0.75rem", // 12px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  8: "2rem", // 32px
  10: "2.5rem", // 40px
  12: "3rem", // 48px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
  32: "8rem", // 128px
  40: "10rem", // 160px
  48: "12rem", // 192px
  56: "14rem", // 224px
  64: "16rem", // 256px
} as const;

// Semantic spacing tokens
export const semanticSpacing = {
  // Component spacing
  component: {
    padding: spacing[4],
    paddingSmall: spacing[3],
    paddingLarge: spacing[6],
    margin: spacing[4],
    marginSmall: spacing[2],
    marginLarge: spacing[8],
  },

  // Layout spacing
  layout: {
    section: spacing[12],
    sectionSmall: spacing[8],
    sectionLarge: spacing[16],
    container: spacing[4],
    containerSmall: spacing[2],
    containerLarge: spacing[6],
  },

  // Form spacing
  form: {
    field: spacing[4],
    fieldSmall: spacing[3],
    fieldLarge: spacing[6],
    group: spacing[6],
    groupSmall: spacing[4],
    groupLarge: spacing[8],
  },

  // Card spacing
  card: {
    padding: spacing[6],
    paddingSmall: spacing[4],
    paddingLarge: spacing[8],
    margin: spacing[4],
    marginSmall: spacing[2],
    marginLarge: spacing[6],
  },

  // Button spacing
  button: {
    padding: spacing[3],
    paddingSmall: spacing[2],
    paddingLarge: spacing[4],
    margin: spacing[2],
    marginSmall: spacing[1],
    marginLarge: spacing[3],
  },
} as const;

export type SpacingToken = keyof typeof spacing;
export type SemanticSpacingToken = keyof typeof semanticSpacing;

// Helper function to get spacing value
export function getSpacing(token: SpacingToken) {
  return spacing[token];
}

// Helper function to get semantic spacing value
export function getSemanticSpacing(
  category: keyof typeof semanticSpacing,
  token: string
) {
  return semanticSpacing[category][
    token as keyof (typeof semanticSpacing)[typeof category]
  ];
}
