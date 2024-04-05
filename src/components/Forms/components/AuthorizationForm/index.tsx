"use client";

import React from "react";
import styled from "styled-components";
import Image from "next/image";

import { STATIC_URLS } from "@/utils/constant";

import Input from "@/components/UI/input";
import PrimaryButton from "@/components/UI/buttons/PrimaryButton";
import LinkButton from "@/components/UI/buttons/LinkButton";
import ChangeFormLink from "../ChangeFormLink";
import { FormTypes } from "../../models";
import { Form, Formik } from "formik";

type PropsType = {};

const AuthorizationForm: React.FC<PropsType> = () => {
  const handleFormSubmit = React.useCallback(() => {}, []);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={handleFormSubmit}
    >
      {({ values, handleChange }) => (
        <StyledContainer>
          <Image
            src={`${STATIC_URLS.LOGO}/logo_big.png`}
            alt="App logo"
            width={228}
            height={60}
          />
          <Input
            name="email"
            value={values.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="form__email-input"
          />
          <Input
            name="password"
            value={values.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="form__password-input"
          />
          <LinkButton
            href="#"
            className="form__forgot-password-btn"
            title="Forgot password?"
          />
          <PrimaryButton
            type="submit"
            title="Log in"
            onClick={() => {}}
            className="form__login-btn"
          />
          <ChangeFormLink
            type={FormTypes.login}
            linkText="Sign up."
            question="Don't have an account?"
          />
        </StyledContainer>
      )}
    </Formik>
  );
};

const StyledContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: hidden;

  width: 100%;

  padding: 48px 32px;

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
  }
`;

export default AuthorizationForm;
