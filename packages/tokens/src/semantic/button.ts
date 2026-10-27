import { primitiveColors } from "../primitives/colors";

export const buttonColors = {
  primary: {
    background: primitiveColors.gray[950],
    backgroundHover: primitiveColors.gray[900],
    text: primitiveColors.gray[0],
  },

  secondary: {
    background: primitiveColors.gray[100],
    backgroundHover: primitiveColors.gray[200],
    text: primitiveColors.gray[950],
  },

  ghost: {
    background: "transparent",
    backgroundHover: primitiveColors.gray[100],
    text: primitiveColors.gray[950],
  },

  destructive: {
    background: primitiveColors.red[600],
    backgroundHover: primitiveColors.red[500],
    text: primitiveColors.gray[0],
  },

  disabled: {
    background: primitiveColors.gray[200],
    text: primitiveColors.gray[500],
  },
} as const;