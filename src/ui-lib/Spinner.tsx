import classNames from "classnames";
import React from "react";

interface SpinnerProps {
  className?: string;
  centered?: boolean;
  fullScreen?: boolean;
  sizeClassName?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  className,
  centered,
  fullScreen,
  sizeClassName = "text-2xl",
}) => {
  return (
    <div
      className={classNames(className, sizeClassName, "text-pink-500", {
        "grid place-items-center": centered,
        "fixed inset-0": fullScreen,
      })}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.5em"
        height="1.5em"
        stroke="currentColor"
        viewBox="0 0 38 38"
      >
        <g
          fill="none"
          fillRule="evenodd"
          strokeWidth="2"
          transform="translate(1 1)"
        >
          <circle cx="18" cy="18" r="18" strokeOpacity="0.5"></circle>
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              dur="1s"
              from="0 18 18"
              repeatCount="indefinite"
              to="360 18 18"
              type="rotate"
            />
          </path>
        </g>
      </svg>
    </div>
  );
};
export default Spinner;
