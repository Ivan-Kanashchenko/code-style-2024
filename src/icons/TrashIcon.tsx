import { FC } from "react";

import { SvgIconConstituentValues } from "types/common";

export const TrashIcon: FC<SvgIconConstituentValues> = ({ fill, ...props }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_9_91)">
      <path
        d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z"
        fill={fill || "black"}
      />
    </g>
    <defs>
      <clipPath id="clip0_9_91">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
