import React from "react";
import styled from "styled-components";

type PropsType = {
  inputValue: string;
  handleBlur: () => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
};

const CreateInput: React.FC<PropsType> = (props) => {
  return (
    <StyledInput
      type="text"
      value={props.inputValue}
      onChange={props.handleChange}
      onBlur={props.handleBlur}
      onKeyDown={props.handleKeyDown}
      className={props.className}
      autoFocus
    />
  );
};

const StyledInput = styled.input`
  width: 100%;

  background-color: ${(props) => props.theme.colorValues.sidebarWhite};
`;

export default CreateInput;
