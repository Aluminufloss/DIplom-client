"use client";

import React from "react";
import styled from "styled-components";

type PropsType = {
  width?: number;
  className?: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const Input: React.FC<PropsType> = (props) => {
  return (
    <StyledInput
      width={props.width}
      onChange={props.onChange}
      placeholder={props.placeholder}
      className={props.className}
    />
  );
};

const StyledInput = styled.input<PropsType>`
  ${(props) => props.theme.typography.fnMedium};
  ${(props) => props.theme.typography.fnTitle1};

  width: ${(props) => (props.width ? `${props.width}px` : "100%")};

  padding: 12px 16px;

  color: ${(props) => props.theme.colorValues.black};

  border-radius: 5px;
  border: 1px solid ${props => props.theme.colorValues.lightGrey};

  &::placeholder {
    color: ${(props) => props.theme.colorValues.lightGrey};
  }
`;

export default Input;
