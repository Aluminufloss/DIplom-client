"use client";

import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Form, Formik } from "formik";

import { FormTypes } from "../../models";
import media from "@/utils/media";
import { AppRoutes, STATIC_URLS } from "@/utils/constant";

import AuthService from "@/api/services/AuthService";

import Input from "@/components/UI/input";
import PrimaryButton from "@/components/UI/buttons/PrimaryButton";
import LinkButton from "@/components/UI/buttons/LinkButton";
import ChangeFormLink from "../ChangeFormLink";
import RememberMeButton from "../RememberMeButton";

const AuthorizationForm: React.FC = () => {
  const [hasError, setHasError] = React.useState(false);

  const router = useRouter();

  const handleFormSubmit = React.useCallback(
    async (values: { email: string; password: string }) => {
      try {
        if (!values.email || !values.password) {
          return;
        }

        const response = await AuthService.login(values.email, values.password);

        localStorage.setItem("accessToken", response.data.accessToken);

        router.push(AppRoutes.tasks);
      } catch (err) {
        setHasError(true);
      }
    },
    []
  );

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
            type="text"
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
          <div className="form__actions-container">
            <RememberMeButton textClassName="form__remember-me-btn"/>
            <LinkButton
              href={AppRoutes.sendChangePasswordLink}
              className="form__forgot-password-btn"
              title="Forgot password?"
            />
          </div>
          <PrimaryButton
            type="submit"
            title="Log in"
            onClick={() => {}}
            className="form__login-btn"
          />
          {hasError && (
            <p className="form__error-string">
              Check the correctness of the entered data.
            </p>
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

  overflow: hidden;

  width: 100%;
  max-width: 720px;

  padding: 48px 32px;

  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colorValues.lightGrey};

  box-shadow: rgba(192, 194, 195, 0.1) 0px 8px 24px;

  .form {
    &__email-input {
      margin-top: 24px;
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
      ${(props) => props.theme.typography.fnLabel2};
      ${(props) => props.theme.typography.fnRegular};
      color: ${(props) => props.theme.colorValues.error};

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
