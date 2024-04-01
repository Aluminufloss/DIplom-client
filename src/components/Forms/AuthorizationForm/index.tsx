"use client";

import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

import Input from "@/components/UI/input";
import PrimaryButton from "@/components/UI/buttons/PrimaryButton";
import { STATIC_URLS } from "@/utils/constant";

type PropsType = {};

const AuthorizationForm: React.FC<PropsType> = () => {
  const onChange = () => {};

  return (
    <StyledContainer>
      <Image
        src={`${STATIC_URLS.LOGO}/logo_big.png`}
        alt="App logo"
        width={228}
        height={60}
      />
      <Input onChange={onChange} placeholder="Email or username" />
      <Input onChange={onChange} placeholder="Password" />
      <Link href="/" className="form__forgot-password-btn">
        Forgot password?
      </Link>
      <PrimaryButton title="Log in" onClick={() => {}} />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  .form__forgot-password-btn {
    ${(props) => props.theme.typography.fnSemiBold};
    ${(props) => props.theme.typography.fnTitle1};

    color: ${(props) => props.theme.colorValues.primary};

    align-self: flex-end;

    text-decoration: none;
  }
`;

export default AuthorizationForm;
