import React from "react";

type PropsType = {
  fill?: string;
};

const AnalyticsIcon: React.FC<PropsType> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={props.fill ?? "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" fill="url(#pattern0_538_772)" />
      <defs>
        <pattern
          id="pattern0_538_772"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_538_772" transform="scale(0.0208333)" />
        </pattern>
        <image
          id="image0_538_772"
          width="48"
          height="48"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAlElEQVR4nO3WQQrDIBRF0bu8hux/A7X7eKWDTAppg4j5ae8Bh4qPr19BkqQaVuABZGc0YKGw9mHz27hTWA6OsmKAk8UKnCxVKtDbz1MlQG8/T5UAvRuJAQaxAngHfuQIrZP7eUYHmN3PMzrA7I3EAG+sAB4hvMSxC2EbjQ8ZvsRc6jPXJs/btXxZ9LXYrcA8SdIfewI5kMIk8MMJrAAAAABJRU5ErkJggg=="
        />
      </defs>
    </svg>
  );
};

export default AnalyticsIcon;
