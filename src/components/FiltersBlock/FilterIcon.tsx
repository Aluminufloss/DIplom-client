import React from "react";

type PropsType = {
  fill?: string;
  className?: string;
};

const FilterIcon: React.FC<PropsType> = (props) => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="red"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_701_1706"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="36"
        height="36"
      >
        <rect width="36" height="36" fill="#DFDFDF" />
      </mask>
      <g mask="url(#mask0_701_1706)">
        <path
          d="M16.5 31.5V22.5H19.5V25.5H31.5V28.5H19.5V31.5H16.5ZM4.5 28.5V25.5H13.5V28.5H4.5ZM10.5 22.5V19.5H4.5V16.5H10.5V13.5H13.5V22.5H10.5ZM16.5 19.5V16.5H31.5V19.5H16.5ZM22.5 13.5V4.5H25.5V7.5H31.5V10.5H25.5V13.5H22.5ZM4.5 10.5V7.5H19.5V10.5H4.5Z"
          fill={props.fill ?? "#DFDFDF"}
          className={props.className}
        />
      </g>
    </svg>
  );
};

export default FilterIcon;