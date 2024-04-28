import React from "react";
import { Transition } from "react-transition-group";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { SnackbarCloseReason } from "@mui/base/useSnackbar";
import CloseIcon from "@mui/icons-material/Close";
import { Snackbar } from "@mui/base/Snackbar";
import { styled } from "@mui/system";

type PropsType = {
  title: string;
  description: string;
};

const positioningStyles = {
  entering: "translateX(0)",
  entered: "translateX(0)",
  exiting: "translateX(500px)",
  exited: "translateX(500px)",
  unmounted: "translateX(500px)",
};

const SnackBar: React.FC<PropsType> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [exited, setExited] = React.useState(true);
  const nodeRef = React.useRef(null);

  const handleClose = (_: any, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleOnEnter = () => {
    setExited(false);
  };

  const handleOnExited = () => {
    setExited(true);
  };

  return (
    <React.Fragment>
      <button type="button" onClick={handleClick}>
        Open snackbar
      </button>
      <StyledSnackbar
        autoHideDuration={2000}
        open={open}
        onClose={handleClose}
        exited={exited}
      >
        <Transition
          timeout={{ enter: 400, exit: 400 }}
          in={open}
          appear
          unmountOnExit
          onEnter={handleOnEnter}
          onExited={handleOnExited}
          nodeRef={nodeRef}
        >
          {(status) => (
            <div
              style={{
                transform: positioningStyles[status],
                transition: "transform 300ms ease",
              }}
              ref={nodeRef}
              className="content"
            >
              <CheckRoundedIcon
                sx={{
                  color: "success.main",
                  flexShrink: 0,
                  width: "16px",
                  height: "16px",
                }}
              />
              <div className="snackbar-message">
                <p className="snackbar-title">{props.title}</p>
                <p className="snackbar-description">{props.description}</p>
              </div>
              <CloseIcon
                onClick={handleClose}
                className="snackbar-close-icon"
              />
            </div>
          )}
        </Transition>
      </StyledSnackbar>
    </React.Fragment>
  );
};

const StyledSnackbar = styled(Snackbar)`
  position: fixed;
  z-index: 5500;
  display: flex;
  bottom: 16px;
  right: 16px;
  max-width: 400px;
  min-width: 300px;

  .content {
    position: relative;
    display: flex;
    gap: 8px;

    overflow: hidden;

    background-color: #fff;

    border-radius: 8px;
    border: 1px solid #DFDFDF;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 8px;

    padding: 16px;
    color: #000;

    font-weight: 500;

    text-align: start;

    & .snackbar-message {
      flex: 1 1 0%;

      max-width: 100%;
    }

    & .snackbar-title {
      margin: 0;
      color: rgba(0, 0, 0, 0.86);
      line-height: 1.5rem;
      margin-right: 0.5rem;

      font-size: 16px;
    }

    & .snackbar-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.86);
      font-size: 14px;
    }

    & .snackbar-close-icon {
      cursor: pointer;
      flex-shrink: 0;
      padding: 2px;
      border-radius: 4px;
    }
  }
`;

export default SnackBar;