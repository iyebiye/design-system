import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./button.module.css";


export type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  children,
  startIcon,
  endIcon,
  className,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const classes = [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={classes}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}

      {!loading && startIcon}

      <span>{children}</span>

      {!loading && endIcon}
    </button>
  );
}
