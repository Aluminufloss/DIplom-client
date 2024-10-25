import styled from "styled-components";

type PropsType = {
  isDisabled: boolean;
  onSaveChanges: () => void;
};

const SaveChangesButton: React.FC<PropsType> = (props) => {
  return (
    <StyledButton
      onClick={props.onSaveChanges}
      type="button"
      disabled={props.isDisabled}
    >
      Сохранить
    </StyledButton>
  );
};

const StyledButton = styled.button`
  color: ${(props) => props.theme.colorValues.black};
  ${(props) => props.theme.typography.fnTitle2};
  ${(props) => props.theme.typography.fnSemiBold};

  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);

  cursor: pointer;

  transition: color 0.1s linear;

  &:hover {
    color: ${(props) => props.theme.colorValues.orangeSecondary};
    text-decoration: underline;
  }
`;

export default SaveChangesButton;
