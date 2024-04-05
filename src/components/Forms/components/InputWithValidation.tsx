import React from "react";
import styled from "styled-components";
import cn from "classnames";

import { InputType } from "../models";

import Input from "@/components/UI/input";

type PropsType = {
  inputName: string;
  inputType: InputType;
  inputValue: string;
  labelText: string;
  inputClassname?: string;
  errorString?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const InputWithValidation: React.FC<PropsType> = (props) => {
  const isInputEmpty = !props.inputValue.length;

  return (
    <StyledInput>
      <label
        htmlFor={props.inputName}
        className={cn(!isInputEmpty && "input__label--active", "input__label")}
      >
        {props.labelText}
      </label>
      <span
        className={cn(
          !isInputEmpty ? "input__text--visible" : "input__text--hidden"
        )}
      >
        {props.inputValue}
      </span>
      <Input
        name={props.inputName}
        type={props.inputType}
        value={props.inputValue}
        onChange={props.onChange}
        className={cn(props.inputClassname, "input")}
      />
      <p className="input__error">{props.errorString}</p>
    </StyledInput>
  );
};

const StyledInput = styled.div`
  position: relative;
  width: 100%;

  .input {
		margin-bottom: 4px;

    &__label {
      position: absolute;
      pointer-events: none;
      top: 12px;
      left: 16px;

      ${(props) => props.theme.typography.fnMedium};
      ${(props) => props.theme.typography.fnLabel2};

      color: ${(props) => props.theme.colorValues.darkGrey};

      transition: all 0.2s ease;

      &--active {
        top: 5px;
      }
    }

    &__text--visible {
      position: absolute;
      bottom: 5px;
      left: 16px;

      opacity: 1;
    }

    &__text--hidden {
      opacity: 0;
    }

    &__error {
      ${(props) => props.theme.typography.fnRegular};
      ${(props) => props.theme.typography.fnLabel2};

			margin-bottom: 10px;
    }
  }
`;

export default InputWithValidation;
