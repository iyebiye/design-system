import { primitiveColors } from "../primitives/colors";

export const semanticColors = {
  background: {
    default: primitiveColors.gray[0],
    subtle: primitiveColors.gray[50],
    surface: primitiveColors.gray[100],
  },

  text: {
    primary: primitiveColors.gray[900],
    secondary: primitiveColors.gray[600],
    muted: primitiveColors.gray[500],
    inverse: primitiveColors.gray[0],
  },

  border: {
    default: primitiveColors.gray[200],
    strong: primitiveColors.gray[300],
  },

  action: {
    primary: primitiveColors.gray[950],
    primaryHover: primitiveColors.gray[900],

    secondary: primitiveColors.gray[100],
    secondaryHover: primitiveColors.gray[200],

    ghost: "transparent",
    ghostHover: primitiveColors.gray[100],

    destructive: primitiveColors.red[600],
    destructiveHover: primitiveColors.red[500],

    disabled: primitiveColors.gray[200],
    disabledText: primitiveColors.gray[500],
  },

  feedback: {
    danger: primitiveColors.red[600],
    success: primitiveColors.green[600],
    warning: primitiveColors.amber[600],
  },
} as const;