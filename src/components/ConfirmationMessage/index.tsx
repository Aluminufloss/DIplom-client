import React from "react";
import styled from "styled-components";
import ReusableImage from "../UI/image";
import { STATIC_URLS } from "@/utils/constant";

type PropsType = {
  isSuccess: boolean;
  message: string;
};

const ConfirmationMessage: React.FC<PropsType> = (props) => {
  return (
    <StyledMessage>
      <ReusableImage
        src={`${STATIC_URLS.LOGO}/logo_big.png`}
        alt="App logo"
        width={228}
        height={60}
      />
      {props.isSuccess ? (
        <ReusableImage
          src={`${STATIC_URLS.BACKGROUND}/success.png`}
          alt="Success"
          width={120}
          height={120}
          className="form__image"
        />
      ) : (
        <ReusableImage
          src={`${STATIC_URLS.BACKGROUND}/error.png`}
          alt="Success"
          width={160}
          height={160}
          className="form__image"
        />
      )}
      <p className="form__message">{props.message}</p>
    </StyledMessage>
  );
};

const StyledMessage = styled.div`
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
    &__message {
      color: ${(props) => props.theme.colorValues.darkGrey};
      ${(props) => props.theme.typography.fnTitle3};
      ${(props) => props.theme.typography.fnMedium};

      margin-top: 28px;
    }

    &__image {
      margin-top: 18px;
    }
  }
`;

export default ConfirmationMessage;
