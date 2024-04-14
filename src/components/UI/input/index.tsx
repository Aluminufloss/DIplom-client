import React, { forwardRef } from "react";
import { Field } from "formik";
import styled from "styled-components";

type PropsType = {
  value: string;
  placeholder?: string;
  type?: "email" | "password" | "text";
  id?: string;
  name?: string;
  width?: number;
  forwardedRef?: React.RefObject<HTMLInputElement>;
  className?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: () => void;
};

const Input: React.FC<PropsType> = forwardRef<HTMLInputElement, PropsType>(
  (props, ref) => {
    return (
      <StyledInput
        ref={ref}
        id={props.id}
        name={props.name}
        type={props.type}
        value={props.value}
        width={props.width}
        placeholder={props.placeholder}
        className={props.className}
        onChange={props.onChange}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      />
    );
  }
);

const StyledInput = styled(Field)<PropsType>`
  ${(props) => props.theme.typography.fnMedium};
  ${(props) => props.theme.typography.fnLabel2};

  width: ${(props) => (props.width ? `${props.width}px` : "100%")};

  padding: 12px 16px;

  color: ${(props) => props.theme.colorValues.black};

  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colorValues.lightGrey};

  &::placeholder {
    color: ${(props) => props.theme.colorValues.darkGrey};
  }
`;

export default Input;
