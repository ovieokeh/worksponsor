import { Link } from "@remix-run/react";

type ButtonProps = {
  as?: "link" | "button";
  text: string;
  href?: string;
  variant?: "primary" | "secondary";
  onClick?: React.MouseEventHandler;
};
export default function Button({
  as = "button",
  variant = "primary",
  href = "",
  text,
  onClick,
}: ButtonProps) {
  if (as === "link" && href) {
    return (
      <Link className={`button button--${variant}`} to={href}>
        {text}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`button button--${variant}`}
    >
      {text}
    </button>
  );
}
