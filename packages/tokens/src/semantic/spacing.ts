import { spacing } from "../primitives/spacing";

export const semanticSpacing = {
  component: {
    xs: spacing[1],
    sm: spacing[2],
    md: spacing[3],
    lg: spacing[4],
    xl: spacing[6],
  },

  layout: {
    xs: spacing[2],
    sm: spacing[4],
    md: spacing[6],
    lg: spacing[8],
    xl: spacing[12],
    "2xl": spacing[16],
    "3xl": spacing[24],
    "4xl": spacing[32],
  },
} as const;
