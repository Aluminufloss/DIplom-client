import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

type PropsType = {
  isOpen: boolean;
};

const LoaderWithOverlay: React.FC<PropsType> = (props) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: "500" }}
      open={props.isOpen}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoaderWithOverlay;
