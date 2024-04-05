"use client";

import React from "react";
import styled from "styled-components";
import { Form, Formik } from "formik";
import Image from "next/image";

import { STATIC_URLS } from "@/utils/constant";
import { validationRegSchema } from "../../utils/validationRegSchema";

import Input from "@/components/UI/input";
import PrimaryButton from "@/components/UI/buttons/PrimaryButton";
import LinkButton from "@/components/UI/buttons/LinkButton";
import ChangeFormLink from "../ChangeFormLink";
import { FormTypes } from "../../models";
import InputWithValidation from "../InputWithValidation";

type PropsType = {};

const RegistrationForm: React.FC<PropsType> = () => {
  const handleFormSubmit = React.useCallback(() => {}, []);

  return (
    <Formik
      initialValues={{
        email: "",
        username: "",
        password: "",
        passwordAgain: "",
      }}
      validationSchema={validationRegSchema}
      onSubmit={handleFormSubmit}
      validateOnChange
    >
      {({ values, errors, handleChange }) => (
        <StyledContainer>
          <Image
            src={`${STATIC_URLS.LOGO}/logo_big.png`}
            alt="App logo"
            width={228}
            height={60}
            className="form__logo"
          />
          <p className="form__title">Sign up to manage your deals right now.</p>
          <InputWithValidation
            inputName="email"
            inputType="email"
            inputValue={values.email}
            inputClassname="form__email-input"
            errorString={errors.email}
            onChange={handleChange}
            labelText="Enter your email"
          />

          <InputWithValidation
            inputName="username"
            inputType="text"
            inputValue={values.username}
            inputClassname="form__username-input"
            errorString={errors.username}
            onChange={handleChange}
            labelText="Enter your username"
          />

          <InputWithValidation
            inputName="password"
            inputType="password"
            inputValue={values.password}
            inputClassname="form__password-input"
            errorString={errors.password}
            onChange={handleChange}
            labelText="Enter your password"
          />

          <InputWithValidation
            inputName="passwordAgain"
            inputType="password"
            inputValue={values.passwordAgain}
            inputClassname="form__password-input"
            errorString={errors.passwordAgain}
            onChange={handleChange}
            labelText="Confirm your password"
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
          <ChangeFormLink
            type={FormTypes.registration}
            linkText="Login"
            question="Have an account?"
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
    &__logo {
      margin-bottom: 10px;
    }

    &__title {
      ${(props) => props.theme.typography.fnSemiBold};
      ${(props) => props.theme.typography.fnTitle2};
      color: ${(props) => props.theme.colorValues.darkGrey};

      text-align: center;

      max-width: 300px;

      margin-bottom: 16px;
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

export default RegistrationForm;
