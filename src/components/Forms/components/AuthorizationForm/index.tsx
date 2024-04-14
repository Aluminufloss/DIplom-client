"use client";

import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";

import { FormTypes } from "../../models";
import media from "@/utils/media";
import { AppRoutes, STATIC_URLS } from "@/utils/constant";

import AuthService from "@/api/services/AuthService";

import PrimaryButton from "@/components/UI/buttons/PrimaryButton";
import LinkButton from "@/components/UI/buttons/LinkButton";
import ReusableImage from "@/components/UI/image";
import InputWithValidation from "../InputWithValidation";
import RememberMeButton from "../RememberMeButton";
import ChangeFormLink from "../ChangeFormLink";
import ErrorString from "../ErrorString";

type FormParamsType = {
  email: string;
  password: string;
  shouldRememberMe?: boolean;
};

const AuthorizationForm: React.FC = () => {
  const [isDataCorrect, setIsDataCorrect] = React.useState(true);

  const initialFormParams: FormParamsType = React.useMemo(() => {
    return {
      email: "",
      password: "",
      shouldRememberMe: false,
    };
  }, []);

  const router = useRouter();

  const handleFormSubmit = React.useCallback(async (values: FormParamsType) => {
    try {
      if (!values.email || !values.password) {
        return;
      }

      const response = await AuthService.login(values.email, values.password);

      localStorage.setItem("accessToken", response.data.accessToken);

      router.push(AppRoutes.tasks);
    } catch (err) {
      setIsDataCorrect(false);
    }
  }, []);

  return (
    <Formik initialValues={initialFormParams} onSubmit={handleFormSubmit}>
      {({ values, isSubmitting, handleChange }) => (
        <StyledContainer>
          <ReusableImage
            src={`${STATIC_URLS.LOGO}/logo_big.png`}
            alt="App logo"
            width={228}
            height={60}
            className="form__logo"
          />
          <InputWithValidation
            inputName="email"
            inputValue={values.email}
            inputType="email"
            labelText="Email"
            onChange={handleChange}
          />
          <InputWithValidation
            inputName="password"
            inputValue={values.password}
            inputType="password"
            labelText="Password"
            onChange={handleChange}
          />
          <div className="form__actions-container">
            <RememberMeButton
              name="shouldRememberMe"
              textClassName="form__remember-me-btn"
              onChange={handleChange}
            />
            <LinkButton
              href={AppRoutes.sendChangePasswordLink}
              className="form__forgot-password-btn"
              title="Forgot password?"
            />
          </div>
          <PrimaryButton
            type="submit"
            title="Log in"
            isLoading={isSubmitting}
            className="form__login-btn"
          />
          {!isDataCorrect && (
            <ErrorString
              text="Check the correctness of the entered data."
              className="form__error-string"
            />
          )}
          <ChangeFormLink
            type={FormTypes.login}
            linkText="Sign up."
            question="Don't have an account?"
            className="form__change-form-link"
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

  width: 100%;
  max-width: 720px;

  padding: 48px 32px;

  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colorValues.lightGrey};

  box-shadow: rgba(192, 194, 195, 0.1) 0px 8px 24px;

  overflow: hidden;

  .form {
    &__logo {
      margin-bottom: 24px;
    }

    &__actions-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      width: 100%;

      margin-top: 16px;
    }

    &__password-input {
      margin-top: 20px;
    }

    &__forgot-password-btn {
      align-self: flex-end;
    }

    &__login-btn {
      margin-top: 20px;
    }

    &__error-string {
      margin-top: 16px;
    }
  }

  ${media.desktop} {
    padding: 0;
    border: none;
    box-shadow: none;

    .form {
      &__error-string {
        ${(props) => props.theme.typography.fnLabel1}
      }

      &__forgot-password-btn {
        ${(props) => props.theme.typography.fnLabel1}
      }

      &__remember-me-btn {
        ${(props) => props.theme.typography.fnLabel1}
      }

      &__change-form-link {
        ${(props) => props.theme.typography.fnLabel1}
      }
    }
  }
`;

export default AuthorizationForm;
