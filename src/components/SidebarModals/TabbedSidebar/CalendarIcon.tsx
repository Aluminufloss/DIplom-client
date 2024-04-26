import React from "react";

type PropsType = {
  fill?: string;
};

const CalendarIcon: React.FC<PropsType> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={props.fill ?? "none"}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="24" height="24" fill="url(#pattern0_653_1692)" />
      <defs>
        <pattern
          id="pattern0_653_1692"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_653_1692" transform="scale(0.0208333)" />
        </pattern>
        <image
          id="image0_653_1692"
          width="48"
          height="48"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAwElEQVR4nO2ZSwrCQBBE3z3iUr27hNxMweQCJYFZDX7INHFaqQe1DdU9L5sZML+HqmT73kc8QIV8Am84ACOwPNnU3lmACThFyt86FFeVtcPQMsCYoLxKLi0D9NBGL3JvGUDJspneheUB6L91WSH+6Cf+NvIA+ARCyAphhULICmGFQsgKYYVCyAphhULICmGFQsgKYYVCKLrAOcFViiKXu1OC4ipZr/o3cwauSR44jjQylMeFHjrNZfPN5Y0xht15APcWtwwK5vMNAAAAAElFTkSuQmCC"
        />
      </defs>
    </svg>
  );
};

export default CalendarIcon;
