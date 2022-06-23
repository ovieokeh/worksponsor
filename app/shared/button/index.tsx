import { Link } from "@remix-run/react";
import { Rings } from "react-loader-spinner";

import styles from "./button.css";

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

type ButtonProps = {
  as?: "link" | "button";
  text: string;
  href?: string;
  variant?: "primary" | "secondary" | "lean";
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  isActive?: boolean;
  onClick?: React.MouseEventHandler;
  [x: string]: any;
};
export default function Button({
  as = "button",
  variant = "primary",
  type = "button",
  href = "",
  className = "",
  disabled = false,
  isLoading,
  isActive,
  text,
  size,
  onClick,
  ...rest
}: ButtonProps) {
  if (as === "link" && href) {
    return (
      <Link
        className={`button button--${variant} ${
          disabled ? "button--disabled" : ""
        } ${className}
        ${size ? `button--${size}` : ""}
        ${isActive ? `button--active` : ""}
        `}
        to={href}
        prefetch="intent"
        {...rest}
      >
        {text}
        {isLoading && <Rings height={18} width={18} color="#d34e04" />}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`button button--${variant} ${
        disabled ? "button--disabled" : ""
      } ${className}
      ${size ? `button--${size}` : ""}
      ${isActive ? `button--active` : ""}
      `}
      disabled={disabled}
      {...rest}
    >
      {text}
      {isLoading && <Rings height={18} width={18} color="#d34e04" />}
    </button>
  );
}
