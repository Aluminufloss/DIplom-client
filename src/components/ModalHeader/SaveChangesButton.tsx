import styled from "styled-components";

type PropsType = {
  onSaveChanges: () => void
}

const SaveChangesButton: React.FC<PropsType> = (props) => {
  return (
    <StyledButton onClick={props.onSaveChanges}>
      Save
    </StyledButton>
  )
};

const StyledButton = styled.button`
  
`;

export default SaveChangesButton;