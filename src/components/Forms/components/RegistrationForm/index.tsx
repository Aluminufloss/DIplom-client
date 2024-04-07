"use client";

import React from "react";
import styled from "styled-components";
import { Form, Formik } from "formik";
import Image from "next/image";

import { FormTypes } from "../../models";
import { AppRoutes, STATIC_URLS } from "@/utils/constant";
import { validationRegSchema } from "../../utils/validationRegSchema";

import PrimaryButton from "@/components/UI/buttons/PrimaryButton";
import InputWithValidation from "../InputWithValidation";
import ChangeFormLink from "../ChangeFormLink";
import AuthService from "@/api/services/AuthService";
import { useRouter } from "next/navigation";
import media from "@/utils/media";

type PropsType = {};

type SubmitParamsType = {
  email: string;
  password: string;
  username: string;
};

const RegistrationForm: React.FC<PropsType> = () => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const router = useRouter();

  const handleFormSubmit = React.useCallback(
    async (values: SubmitParamsType) => {
      try {
        const response = await AuthService.registration(
          values.email,
          values.password,
          values.username
        );

        localStorage.setItem("accessToken", response.data.accessToken);

        router.push(AppRoutes.tasks);
      } catch (err) {

      }
    },
    []
  );

  return (
    <Formik
      initialValues={{
        email: "",
        username: "",
        password: "",
        passwordAgain: "",
      }}
      validateOnChange={isSubmitted}
      validateOnBlur={false}
      validationSchema={validationRegSchema}
      onSubmit={handleFormSubmit}
    >
      {({ values, errors, touched, handleChange }) => (
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
            inputClassname="form__email-input form__input"
            errorString={errors.email}
            isTouched={touched.email}
            onChange={handleChange}
            labelText="Enter your email"
          />

          <InputWithValidation
            inputName="username"
            inputType="text"
            inputValue={values.username}
            inputClassname="form__username-input form__input"
            errorString={errors.username}
            isTouched={touched.username}
            onChange={handleChange}
            labelText="Enter your username"
          />

          <InputWithValidation
            inputName="password"
            inputType="password"
            inputValue={values.password}
            inputClassname="form__input"
            errorStringClassName="form__error-string"
            errorString={errors.password}
            isTouched={touched.password}
            onChange={handleChange}
            labelText="Enter your password"
          />

          <InputWithValidation
            inputName="passwordAgain"
            inputType="password"
            inputValue={values.passwordAgain}
            inputClassname="form__input"
            errorString={errors.passwordAgain}
            isTouched={touched.passwordAgain}
            onChange={handleChange}
            labelText="Confirm your password"
          />
          <PrimaryButton
            title="Log in"
            type="submit"
            onClick={() => {}}
            className="form__login-btn"
          />
          <ChangeFormLink
            type={FormTypes.registration}
            linkText="Login"
            question="Have an account?"
            className="form__link"
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

  box-shadow: rgba(192, 194, 195, 0.1) 0px 8px 24px;

  justify-content: space-between;

  position: relative;

  width: 100%;
  max-height: 90vh;

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

    &__forgot-password-btn {
      align-self: flex-end;
    }

    &__link {
      margin-top: 32px;
    }

    &__login-btn {
      margin-top: 12px;
    }
  }

  ${media.desktop} {
    padding: 0;
    border: none;
    box-shadow: none;

    .form {
      &__title {
        ${(props) => props.theme.typography.fnTitle1};
        max-width: 260px;
      }

      &__input {
        ${(props) => props.theme.typography.fnLabel2}
      }

      &__link {
        ${(props) => props.theme.typography.fnLabel2}
      }

      &__error-string {
        ${(props) => props.theme.typography.fnLabel2}
      }
    }
  }
`;

export default RegistrationForm;
