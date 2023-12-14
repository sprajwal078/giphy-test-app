import classNames from "classnames";
import React from "react";

export interface BtnProps {
  color?: "pink" | "red" | "lightgray" | "custom";
  size?: "sm" | "md" | "lg" | "xl" | "custom";
  type?: "submit" | "button" | "reset";
  clear?: boolean;
  disabled?: boolean;
  roundedClassName?: string;
  className?: string;
  onClick?: (e?: any) => void;
  children?: React.ReactNode;
}

const Btn: React.FC<BtnProps> = ({
  children,
  className,
  onClick,
  color = "pink",
  size = "md",
  type = "button",
  disabled,
  roundedClassName = "rounded-xl",
  clear,
}) => {
  return (
    <button
      className={classNames(
        className,
        roundedClassName,
        "inline-flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed",
        {
          "bg-pink-500 text-white outline-2 focus:outline focus:outline-teal-100":
            color === "pink",
          "bg-red-500 text-white": color === "red",
          "bg-neutral-200": color === "lightgray",
          "px-4 py-2 min-w-[5rem]": size === "md",
          "px-5 py-3 text-base": size === "lg",
          "bg-transparent": clear,
        }
      )}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Btn;
