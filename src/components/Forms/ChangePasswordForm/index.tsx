"use client";

import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { Form, Formik } from "formik";

import { AppRoutes, STATIC_URLS } from "@/utils/constant";
import media from "@/utils/media";
import { validationRegSchema } from "../utils/validationRegSchema";

import AuthService from "@/api/services/AuthService";

import InputWithValidation from "../components/InputWithValidation";
import PrimaryButton from "@/components/UI/buttons/PrimaryButton";
import ConfirmationMessageModal from "@/components/ConfirmationMessageModal";

type PropsType = {
  searchParams: string[];
};

const ChangePasswordForm: React.FC<PropsType> = (props) => {
  const [isPasswordsVisible, setIsPasswordsVisible] = React.useState(false);
  const [isConfirmationMessageVisible, setIsConfirmationMessageVisible] =
    React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(true);

  const confirmationMessage = isSuccess
    ? `You’ve successfully changed password.
       Press button to go back on login page`
    : `Something went wrong with changing your password.,
       Try it later. Press button to go back on login page`;

  const email = props.searchParams[1].replace("%40", "@");

  const handleFormSubmit = React.useCallback(
    async (values: { password: string; passwordAgain: string }) => {
      try {
        if (!values.passwordAgain || !values.password) {
          return;
        }

        const response = await AuthService.changePassword(
          values.password,
          email
        );
        console.log("res", response);

        setIsSuccess(true);
        setIsConfirmationMessageVisible(true);
      } catch (err) {
        console.log(err);
        setIsSuccess(false);
        setIsConfirmationMessageVisible(true);
      }
    },
    [email]
  );

  return (
    <>
      {!isConfirmationMessageVisible ? (
        <Formik
          initialValues={{ password: "", passwordAgain: "" }}
          validationSchema={validationRegSchema}
          onSubmit={handleFormSubmit}
        >
          {({ values, touched, errors, handleChange }) => (
            <StyledContainer>
              <Image
                src={`${STATIC_URLS.LOGO}/logo_big.png`}
                alt="App logo"
                width={228}
                height={60}
              />

              <span className="form__title">Password change</span>

              <p className="form__description">Enter new password</p>

              <InputWithValidation
                inputName="password"
                inputType="password"
                inputValue={values.password}
                inputClassname="form__input"
                errorString={errors.password}
                isTouched={touched.password}
                labelText="Enter your new password"
                shouldShowPasswordText={isPasswordsVisible}
                onChange={handleChange}
              />

              <InputWithValidation
                inputName="passwordAgain"
                inputType="password"
                inputValue={values.passwordAgain}
                inputClassname="form__input"
                errorString={errors.passwordAgain}
                isTouched={touched.passwordAgain}
                labelText="Enter your password again"
                shouldShowPasswordText={isPasswordsVisible}
                onChange={handleChange}
              />

              <div className="form__show-passwords">
                <input
                  type="checkbox"
                  className="form__show-passwords--checkbox"
                  onClick={() => setIsPasswordsVisible((prev) => !prev)}
                />
                <span className="form__show-passwords--text">
                  Show passwords
                </span>
              </div>

              <PrimaryButton
                type="submit"
                title="Change password"
                className="form__login-btn"
              />

              {!isSuccess && (
                <p className="form__error-string">
                  Check the correctness of the entered data.
                </p>
              )}
            </StyledContainer>
          )}
        </Formik>
      ) : (
        <ConfirmationMessageModal
          message={confirmationMessage}
          isSuccess={isSuccess}
        />
      )}
    </>
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

  .form {
    &__title {
      color: ${(props) => props.theme.colorValues.darkGrey};
      ${(props) => props.theme.typography.fnTitle3};
      ${(props) => props.theme.typography.fnSemiBold};

      margin-top: 12px;
    }

    &__description {
      color: ${(props) => props.theme.colorValues.darkGrey};
      ${(props) => props.theme.typography.fnTitle1};
      ${(props) => props.theme.typography.fnMedium};

      margin-top: 12px;
      margin-bottom: 16px;
    }

    &__login-btn {
      margin-top: 16px;
    }

    &__show-passwords {
      display: flex;
      align-items: center;
      align-self: flex-start;

      &--checkbox {
        margin-right: 6px;
      }
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
    }
  }
`;

export default ChangePasswordForm;
