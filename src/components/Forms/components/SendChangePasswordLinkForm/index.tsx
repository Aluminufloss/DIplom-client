"use client";

import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { Form, Formik } from "formik";

import { STATIC_URLS } from "@/utils/constant";
import media from "@/utils/media";

import AuthService from "@/api/services/AuthService";

import Input from "@/components/UI/input";
import PrimaryButton from "@/components/UI/buttons/PrimaryButton";
import ConfirmationMessageModal from "@/components/ConfirmationMessageModal";

const SendChangePasswordLinkForm: React.FC = () => {
  const [isSuccess, setIsSuccess] = React.useState(true);

  const confirmationMessage = isSuccess
    ? `Письмо для смены пароля было успешно отправлено на вашу почту.
       Нажнимет кнопку для возрата на страницу входа`
    : `Что-то пошло не так с отправкой вашего письма, попробуйте сделать это позже. Нажмите кнопку для возвращения на страницу входа`;

  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    React.useState(false);

  const handleFormSubmit = React.useCallback(
    async (values: { email: string }) => {
      try {
        if (!values.email) {
          return;
        }

        await AuthService.sendChangePasswordLink(values.email);

        setIsSuccess(true);
        setIsConfirmationModalVisible(true);
      } catch (err) {
        setIsSuccess(false);
        setIsConfirmationModalVisible(true);
      }
    },
    []
  );

  return (
    <>
      {!isConfirmationModalVisible ? (
        <Formik initialValues={{ email: "" }} onSubmit={handleFormSubmit}>
          {({ values, isSubmitting, handleChange }) => (
            <StyledContainer>
              <Image
                src={`${STATIC_URLS.LOGO}/logo_big.png`}
                alt="App logo"
                width={228}
                height={60}
              />

              <span className="form__title">Смена пароля</span>

              <p className="form__text">
                Введите свой адресс электронной почты и мы отправим вам ссылку
                для смены пароля.
              </p>

              <Input
                name="email"
                type="email"
                value={values.email}
                className="form__input"
                onChange={handleChange}
                placeholder="Ввведите свой адрес электронной почты"
              />

              <PrimaryButton
                type="submit"
                title="Send link"
                isLoading={isSubmitting}
                className="form__login-btn"
              />
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
      color: ${(props) => props.theme.colorValues.grey};
      ${(props) => props.theme.typography.fnTitle3};
      ${(props) => props.theme.typography.fnSemiBold};

      margin-top: 12px;
    }

    &__text {
      color: ${(props) => props.theme.colorValues.darkGrey};
      ${(props) => props.theme.typography.fnTitle1};
      ${(props) => props.theme.typography.fnMedium};

      margin-top: 12px;

      max-width: 440px;
    }

    &__input {
      margin-top: 32px;
    }

    &__login-btn {
      margin-top: 32px;
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

export default SendChangePasswordLinkForm;
