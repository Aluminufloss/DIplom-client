"use client";

import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

import { STATIC_URLS } from "@/utils/constant";

import Input from "@/components/UI/input";
import PrimaryButton from "@/components/UI/buttons/PrimaryButton";
import LinkButton from "@/components/UI/buttons/LinkButton";

type PropsType = {};

const AuthorizationForm: React.FC<PropsType> = () => {
  const onChange = () => {};

  return (
    <StyledContainer>
      <Image
        src={`${STATIC_URLS.LOGO}/logo_big.png`}
        alt="App logo"
        width={228}
        height={60}
      />
      <Input
        onChange={onChange}
        placeholder="Email or username"
        className="form__email-input"
      />
      <Input
        onChange={onChange}
        placeholder="Password"
        className="form__password-input"
      />
      <LinkButton
        href="#"
        className="form__forgot-password-btn"
        title="Forgot password?"
      />
      <PrimaryButton
        title="Log in"
        onClick={() => {}}
        className="form__login-btn"
      />
      <div className="form__additional-action">
        <span className="form__additional-action--text">
          Don’t have an account?
          <LinkButton
            href="#"
            className="form__additional-action--link"
            title="Sign up."
          />
        </span>
      </div>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: hidden;

  width: 100%;

  padding: 72px 32px;

  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colorValues.lightGrey};

  .form {
    &__email-input {
      margin-top: 24px;
    }

    &__password-input {
      margin-top: 20px;
    }

    &__forgot-password-btn {
      margin-top: 16px;

      align-self: flex-end;
    }

    &__login-btn {
      margin-top: 20px;
    }

    &__additional-action {
      margin-top: 72px;

      &--link {
        margin-left: 4px;
      }
    }
  }
`;

export default AuthorizationForm;
