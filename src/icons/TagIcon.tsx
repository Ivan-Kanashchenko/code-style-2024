import { FC } from "react";

import { SvgIconConstituentValues } from "types/common";

export const TagIcon: FC<SvgIconConstituentValues> = props => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="tag_black_24dp" clipPath="url(#clip0_2932_4871)">
      <g id="Group">
        <path
          id="Vector"
          d="M20 9C20 8.45 19.55 8 19 8H16V5C16 4.45 15.55 4 15 4C14.45 4 14 4.45 14 5V8H10V5C10 4.45 9.55 4 9 4C8.45 4 8 4.45 8 5V8H5C4.45 8 4 8.45 4 9C4 9.55 4.45 10 5 10H8V14H5C4.45 14 4 14.45 4 15C4 15.55 4.45 16 5 16H8V19C8 19.55 8.45 20 9 20C9.55 20 10 19.55 10 19V16H14V19C14 19.55 14.45 20 15 20C15.55 20 16 19.55 16 19V16H19C19.55 16 20 15.55 20 15C20 14.45 19.55 14 19 14H16V10H19C19.55 10 20 9.55 20 9ZM14 14H10V10H14V14Z"
          fill="#646965"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_2932_4871">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
