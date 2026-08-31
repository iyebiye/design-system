export interface DesignSystemTheme {
  colors?: {
    primary?: string;
    primaryHover?: string;

    background?: string;
    backgroundSubtle?: string;
    surface?: string;

    text?: string;
    textSecondary?: string;
    textMuted?: string;
    textInverse?: string;

    border?: string;
    borderStrong?: string;

    danger?: string;
    success?: string;
    warning?: string;
  };
}