"use client";

import { Discuss } from "react-loader-spinner";

const OVERLAY_STYLES = {
  width: "100%",
  height: "100vh",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  backgroundColor: "rgba(0, 0, 0, 0.05)",

  borderRadius: "8px",
}

const Loader: React.FC = () => {
  return (
    <div style={OVERLAY_STYLES}>
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
