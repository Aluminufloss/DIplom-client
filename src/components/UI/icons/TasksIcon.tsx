import React from "react";

type PropsType = {
  fill?: string;
};

const TasksIcon: React.FC<PropsType> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="24" height="24" fill="url(#pattern0_538_777)" />
      <defs>
        <pattern
          id="pattern0_538_777"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_538_777" transform="scale(0.0208333)" />
        </pattern>
        <image
          id="image0_538_777"
          width="48"
          height="48"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA0UlEQVR4nO2YQQrCMBBF3zkirr26SsGDiWJ7gUohbjJN6dA4Bf0PZte+zzAJgQEhxBxHoAMGYFxZ07c34LSD14Q8HAFlPbMjymvoNoR86hroNXjGW6s+0GsYG1WU16AG0ARoeoTW4r0DrbxhQWoATWAZHaEK7rvTN3jMXoFew6VB0DnQazgA9w0h078p0DtLyt16xt7nf9IOXiFEgbYSWLSVQFsJXC9nybe8YUFqgH+dwFq8DbTyhgWpATSBZXSEKrjvjrYSaCvB3AOmrYQQv8gb2E3iXn4Lk+cAAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  );
};

export default TasksIcon;
