import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Loader: React.FC = () => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: "500" }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
