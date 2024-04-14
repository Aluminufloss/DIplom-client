import React from "react";
import cn from "classnames";
import styled from "styled-components";

type PropsType = {
  name: string;
  className?: string;
  textClassName?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const RememberMeButton: React.FC<PropsType> = (props) => {
  return (
    <StyledCheckBox className={cn(props.className)}>
      <input
        name={props.name}
        type="checkbox"
        className="input"
        onChange={props.onChange}
      />
      <span className={cn("text", props.textClassName)}>Remember me</span>
    </StyledCheckBox>
  );
};

const StyledCheckBox = styled.div`
  display: flex;
  align-items: center;

  .text {
    ${(props) => props.theme.colorValues.black};
    ${(props) => props.theme.typography.fnLabel2};
  }

  .input {
    width: 18px;
    height: 18px;

    border-radius: 5px;

    margin-right: 6px;

    border: solid 1px ${(props) => props.theme.colorValues.black};
  }

  input[type="checkbox"] {
    accent-color: ${(props) => props.theme.colorValues.primary};
  }
`;

export default RememberMeButton;
