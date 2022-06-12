import type { FunctionComponent } from "react";

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
