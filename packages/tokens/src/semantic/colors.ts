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
    primary: primitiveColors.blue[600],
    primaryHover: primitiveColors.blue[700],
  },

  feedback: {
    danger: primitiveColors.red[600],
    success: primitiveColors.green[600],
    warning: primitiveColors.amber[600],
  },
} as const;