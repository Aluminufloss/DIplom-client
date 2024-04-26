import React from "react";

type PropsType = {
  fill?: string;
};

const PlannedIcon: React.FC<PropsType> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 2V6"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 2V6"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 10H21"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="5" y="12" width="2" height="2" fill="#171717" />
      <rect x="5" y="15" width="2" height="2" fill="#171717" />
      <rect x="5" y="18" width="2" height="2" fill="#171717" />
      <rect x="9" y="18" width="2" height="2" fill="#171717" />
      <rect x="9" y="15" width="2" height="2" fill="#171717" />
      <rect x="13" y="15" width="2" height="2" fill="#171717" />
      <rect x="13" y="18" width="2" height="2" fill="#171717" />
      <rect x="17" y="15" width="2" height="2" fill="#171717" />
      <rect x="9" y="12" width="2" height="2" fill="#171717" />
      <rect x="13" y="12" width="2" height="2" fill="#171717" />
      <rect x="17" y="12" width="2" height="2" fill="#171717" />
    </svg>
  );
};

export default PlannedIcon;
