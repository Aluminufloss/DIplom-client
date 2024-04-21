import styled from "styled-components";
import ReusableImage from "../UI/image";
import { STATIC_URLS } from "@/utils/constant";

type PropsType = {
  onCancelChanges: () => void;
};

const CancelChangesButton: React.FC<PropsType> = (props) => {
  return (
    <StyledButton onClick={props.onCancelChanges}>
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
`;

export default CancelChangesButton;
