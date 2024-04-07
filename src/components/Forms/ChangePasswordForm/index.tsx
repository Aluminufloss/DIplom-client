"use client";

import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Form, Formik } from "formik";

import { STATIC_URLS } from "@/utils/constant";
import media from "@/utils/media";

import InputWithValidation from "../components/InputWithValidation";
import AuthService from "@/api/services/AuthService";
import PrimaryButton from "@/components/UI/buttons/PrimaryButton";

type PropsType = {
  searchParams: string[];
};

const ChangePasswordForm: React.FC<PropsType> = (props) => {
  const [hasError, setHasError] = React.useState(false);
  const [isPasswordsVisible, setIsPasswordsVisible] = React.useState(false);
  const router = useRouter();

  const email = props.searchParams[1].replace("%40", "@");

  const handleFormSubmit = React.useCallback(
    async (values: { password: string; passwordAgain: string }) => {
      try {
        if (!values.passwordAgain || !values.password) {
          return;
        }
        
        await AuthService.changePassword(values.password, email);
      } catch (err) {
        setHasError(true);
      }
    },
    [email]
  );

  return (
    <Formik
      initialValues={{ password: "", passwordAgain: "" }}
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
            onChange={handleChange}
            labelText="Enter your new password"
          />

          <InputWithValidation
            inputName="passwordAgain"
            inputType="password"
            inputValue={values.passwordAgain}
            inputClassname="form__input"
            errorString={errors.passwordAgain}
            isTouched={touched.passwordAgain}
            onChange={handleChange}
            labelText="Enter your password again"
          />

          <div className="form__show-passwords">
            <input type="checkbox" className="form__show-passwords--checkbox" />
            <span className="form__show-passwords--text">Show passwords</span>
          </div>

          <PrimaryButton
            type="submit"
            title="Change password"
            onClick={() => {}}
            className="form__login-btn"
          />

          {hasError && (
            <p className="form__error-string">
              Check the correctness of the entered data.
            </p>
          )}
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
