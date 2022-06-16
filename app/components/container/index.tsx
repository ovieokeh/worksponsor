import type { FunctionComponent } from "react";

import styles from "./container.css";

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

const Container: FunctionComponent<{ [x: string]: any }> = ({
  children,
  className = "",
  ...rest
}) => {
  return (
    <div className={`container ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
};

export default Container;
