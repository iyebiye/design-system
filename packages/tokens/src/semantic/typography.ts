import { typography } from "../primitives/typography";

export const textStyles = {
  heading: {
    fontFamily: typography.fontFamily.sans,
    fontWeight: typography.fontWeight.bold,
  },

  body: {
    fontFamily: typography.fontFamily.sans,
    fontWeight: typography.fontWeight.regular,
  },

  label: {
    fontFamily: typography.fontFamily.sans,
    fontWeight: typography.fontWeight.medium,
  },
} as const;