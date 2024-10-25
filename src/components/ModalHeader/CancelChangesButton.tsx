import styled from "styled-components";

import { STATIC_URLS } from "@/utils/constant";

import ReusableImage from "../UI/image";

type PropsType = {
  isDisabled: boolean;
  onCancelChanges: () => void;
};

const CancelChangesButton: React.FC<PropsType> = (props) => {
  return (
    <StyledButton
      onClick={props.onCancelChanges}
      type="button"
      disabled={props.isDisabled}
    >
      <ReusableImage
        src={`${STATIC_URLS.SVG_ICONS}/arrow.svg`}
        width={32}
        height={32}
        alt="Arrow icon"
      />
    </StyledButton>
  );
};

const StyledButton = styled.button`
  position: absolute;
  left: 16px;
  top: 12px;

  cursor: pointer;

  transition: scale 0.5s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export default CancelChangesButton;
