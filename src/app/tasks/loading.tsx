"use client";

import { Discuss } from "react-loader-spinner";

const Loader: React.FC = () => {
  const overlayStyles = {
    width: "100%",
    height: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(0, 0, 0, 0.1)",

    borderRadius: "8px",
  }

  return (
    <div style={overlayStyles}>
      <Discuss
        height="90"
        width="90"
        ariaLabel="three-dots-loading"
        colors={["#ffffff", "#ffffff"]}
      />
    </div>
  );
}

export default Loader;
