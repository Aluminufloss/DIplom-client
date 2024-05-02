"use client";

import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { Form, Formik } from "formik";
import axios from "axios";
import { useRouter } from "next/navigation";

import { AppPaths, STATIC_URLS } from "@/utils/constant";
import media from "@/utils/media";
import { validationRegSchema } from "../../utils/validationRegSchema";

import AuthService from "@/api/services/AuthService";

import InputWithValidation from "../InputWithValidation";
import PrimaryButton from "@/components/UI/buttons/PrimaryButton";
import ErrorString from "../ErrorString";

type PropsType = {
  searchParams: string[];
};

const ChangePasswordForm: React.FC<PropsType> = (props) => {
  const [isPasswordsVisible, setIsPasswordsVisible] = React.useState(false);
  const [error, setError] = React.useState("");

  const router = useRouter();

  const urlString = props.searchParams[0];

  const handleFormSubmit = React.useCallback(
    async (values: { password: string; passwordAgain: string }) => {
      try {
        setError("");
        if (!values.passwordAgain || !values.password) {
          return;
        }

        await AuthService.changePassword(values.password, urlString);

        router.push(AppPaths.login);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response && err.response.data) {
          setError(err.response.data.message);
        } else {
          console.warn("An error occurred:", err);
        }
      }
    },
    [urlString]
  );

  return (
    <>
      <Formik
        initialValues={{ password: "", passwordAgain: "" }}
        validationSchema={validationRegSchema}
        validateOnChange={!!error.length}
        onSubmit={handleFormSubmit}
      >
        {({ values, touched, errors, isSubmitting, handleChange }) => (
          <StyledContainer>
            <Image
              src={`${STATIC_URLS.LOGO}/logo_big.png`}
              alt="App logo"
              width={228}
              height={60}
            />

            <span className="form__title">Смена пароля</span>

            <p className="form__description">Введите новый пароль</p>

            <InputWithValidation
              inputName="password"
              inputType={isPasswordsVisible ? "text" : "password"}
              inputValue={values.password}
              inputClassname="form__input"
              errorString={errors.password}
              isTouched={touched.password}
              labelText="Введите пароль"
              shouldShowPasswordText={isPasswordsVisible}
              onChange={handleChange}
            />

            <InputWithValidation
              inputName="passwordAgain"
              inputType={isPasswordsVisible ? "text" : "password"}
              inputValue={values.passwordAgain}
              inputClassname="form__input"
              errorString={errors.passwordAgain}
              isTouched={touched.passwordAgain}
              labelText="Введите пароль ещё раз"
              shouldShowPasswordText={isPasswordsVisible}
              onChange={handleChange}
            />

            <div className="form__show-passwords">
              <input
                type="checkbox"
                className="form__show-passwords--checkbox"
                onClick={() => setIsPasswordsVisible((prev) => !prev)}
              />
              <span className="form__show-passwords--text">Показать пароли</span>
            </div>

            <PrimaryButton
              type="submit"
              title="Сменить пароль"
              onClick={() => handleFormSubmit(values)}
              isLoading={isSubmitting}
              className="form__login-btn"
            />

            {!!error.length && (
              <ErrorString text={error} className="form__error-string" />
            )}
          </StyledContainer>
        )}
      </Formik>
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
      margin-bottom: 16px;
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
