import React from "react";
import cn from "classnames";
import styled from "styled-components";

type PropsType = {
  className?: string;
};

const RememberMeButton: React.FC<PropsType> = (props) => {
  return (
    <StyledCheckBox className={cn(props.className)}>
      <input type="checkbox" className="input" />
      <span className="text">Remember me</span>
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
    accent-color: ${props => props.theme.colorValues.primary};
  }
`;

export default RememberMeButton;
