import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

import { AppPaths, STATIC_URLS } from "@/utils/constant";

import PrimaryButton from "../UI/buttons/PrimaryButton";
import ReusableImage from "../UI/image";

type PropsType = {
  isSuccess: boolean;
  message: string;
};

const ConfirmationMessageModal: React.FC<PropsType> = (props) => {
  const router = useRouter();

  const imagePath = props.isSuccess
    ? `${STATIC_URLS.BACKGROUND}/success.png`
    : `${STATIC_URLS.BACKGROUND}/error.png`;

  return (
    <StyledMessage>
      <ReusableImage
        src={`${STATIC_URLS.LOGO}/logo_big.png`}
        alt="App logo"
        width={228}
        height={60}
      />
      <ReusableImage
        src={imagePath}
        alt="Success"
        width={80}
        height={80}
        className="form__image"
      />
      <p className="form__message">{props.message}</p>
      <PrimaryButton
        title="Go back to login"
        onClick={() =>router.push(AppPaths.login)}
        className="form__goback-btn"
      />
      <div className="backdrop" />
    </StyledMessage>
  );
};

const StyledMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 440px;

  padding: 48px 32px;

  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colorValues.lightGrey};

  box-shadow: rgba(192, 194, 195, 0.1) 0px 8px 24px;

  .form {
    &__message {
      color: ${(props) => props.theme.colorValues.darkGrey};
      ${(props) => props.theme.typography.fnTitle1};
      ${(props) => props.theme.typography.fnMedium};

      margin-top: 16px;
    }

    &__image {
      margin-top: 18px;
    }

    &__goback-btn {
      margin-top: 16px;
    }
  }
`;

export default ConfirmationMessageModal;
