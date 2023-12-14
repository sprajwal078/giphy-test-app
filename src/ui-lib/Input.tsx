import classNames from "classnames";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const Input: React.FC<InputProps> = ({ className, hasError, ...props }) => {
  return (
    <input
      {...props}
      className={classNames(
        "block w-full rounded-lg ",
        "focus:border-pink-400 focus:bg-gray-50 focus:ring-0 form-input  focus:outline-2 focus:outline-offset-1 focus:outline-pink-400",
        {
          "border-black-300": !hasError,
          "border-red-500": hasError,
        },
        className
      )}
    />
  );
};
export default Input;
