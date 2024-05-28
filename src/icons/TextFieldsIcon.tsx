import { FC } from "react";

import { SvgIconConstituentValues } from "types/common";

export const TextFieldsIcon: FC<SvgIconConstituentValues> = ({
  fill,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_8086_5380)">
      <path
        d="M2.5 5.5C2.5 6.33 3.17 7 4 7H7.5V17.5C7.5 18.33 8.17 19 9 19C9.83 19 10.5 18.33 10.5 17.5V7H14C14.83 7 15.5 6.33 15.5 5.5C15.5 4.67 14.83 4 14 4H4C3.17 4 2.5 4.67 2.5 5.5ZM20 9H14C13.17 9 12.5 9.67 12.5 10.5C12.5 11.33 13.17 12 14 12H15.5V17.5C15.5 18.33 16.17 19 17 19C17.83 19 18.5 18.33 18.5 17.5V12H20C20.83 12 21.5 11.33 21.5 10.5C21.5 9.67 20.83 9 20 9Z"
        fill={fill || "#646965"}
      />
    </g>
    <defs>
      <clipPath id="clip0_8086_5380">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
