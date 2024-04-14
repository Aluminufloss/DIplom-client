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
  errorStringClassName?: string;
  errorString?: string;
  isTouched?: boolean;
  shouldShowPasswordText?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const InputWithValidation: React.FC<PropsType> = (props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isInputFocused, setIsInputFocused] = React.useState(false);
  const isInputEmpty = !props.inputValue.length;

  const hasError = props.errorString;

  return (
    <StyledInput>
      <label
        htmlFor={props.inputName}
        className={cn(
          !isInputEmpty && "input__label--active",
          "input__label",
          hasError && "input__label--error"
        )}
      >
        {props.labelText}
      </label>
      <Input
        name={props.inputName}
        type={props.inputType}
        value={props.inputValue}
        onChange={props.onChange}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        forwardedRef={inputRef}
        className={cn(
          props.inputClassname,
          "input",
          !isInputEmpty && "input--active",
          isInputFocused && "input--focused",
          hasError && "input--error"
        )}
      />
      <p className={cn("input__error-string", props.errorStringClassName)}>
        {props.errorString}
      </p>
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
      padding-right: 50px;

      pointer-events: none;

      top: 12px;
      left: 16px;

      background-color: ${(props) => props.theme.colorValues.white};

      ${(props) => props.theme.typography.fnMedium};
      ${(props) => props.theme.typography.fnLabel2};

      color: ${(props) => props.theme.colorValues.darkGrey};

      transition: all 0.2s ease;

      &--active {
        top: -9px;
        padding: 0 5px;

        font-size: 12px;
      }

      &--error {
        color: ${(props) => props.theme.colorValues.redSecondary};
      }
    }

    &__text--visible {
      position: absolute;
      top: 22px;
      left: 16px;

      opacity: 1;

      -webkit-text-security: disc;
    }

    &--focused {
      border-color: ${(props) => props.theme.colorValues.primary};
    }

    &--error {
      border-color: ${(props) => props.theme.colorValues.redSecondary};
    }

    &__text--hidden {
      opacity: 0;
    }

    &__text--no-secure {
      -webkit-text-security: none;
    }

    &__error-string {
      ${(props) => props.theme.typography.fnRegular};
      ${(props) => props.theme.typography.fnLabel1};

      color: ${(props) => props.theme.colorValues.redSecondary};

      margin-bottom: 16px;
    }
  }
`;

export default InputWithValidation;
