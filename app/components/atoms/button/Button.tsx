import React, { FC, ReactNode, useMemo } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  variant?: "primary" | "secondary" | "tertiary";
  children: ReactNode;
} & JSX.IntrinsicElements["button"];

const Button: FC<ButtonProps> = ({
  variant = "primary",
  className,
  children,
  ...props
}) => {
  const buttonVariantStyle = useMemo(() => {
    if (variant === "primary") {
      return styles["primary"];
    }
    if (variant === "secondary") {
      return styles["secondary"];
    }
    if (variant === "tertiary") {
      return styles["tertiary"];
    }
  }, [variant]);

  return (
    <button
      className={`${styles["btn"]} ${buttonVariantStyle} px-2 ${
        className ? className : ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
