import React, { forwardRef, ReactNode, useMemo, ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  variant?: "primary" | "secondary" | "tertiary";
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, children, ...props }, ref) => {
    const buttonVariantStyle = useMemo(() => {
      switch (variant) {
        case "secondary":
          return styles.secondary;
        case "tertiary":
          return styles.tertiary;
        case "primary":
        default:
          return styles.primary;
      }
    }, [variant]);

    return (
      <button
        ref={ref} // ⬅ тепер ref правильно типізований
        className={`${styles.btn} ${buttonVariantStyle} px-2 ${className || ""}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
