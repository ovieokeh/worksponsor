import { Link } from "@remix-run/react";
import { Rings } from "react-loader-spinner";

type ButtonProps = {
  as?: "link" | "button";
  text: string;
  href?: string;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
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
  text,
  onClick,
  ...rest
}: ButtonProps) {
  if (as === "link" && href) {
    return (
      <Link
        className={`button button--${variant} ${
          disabled ? "button--disabled" : ""
        } ${className}`}
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
      } ${className}`}
      disabled={disabled}
      {...rest}
    >
      {text}
      {isLoading && <Rings height={18} width={18} color="#d34e04" />}
    </button>
  );
}
