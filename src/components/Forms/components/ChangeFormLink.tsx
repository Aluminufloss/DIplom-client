import React from "react";
import styled from "styled-components";

import { AppRoutes } from "@/utils/constant";

import LinkButton from "@/components/UI/buttons/LinkButton";
import { FormTypes } from "../models";

type PropsType = {
  question: string;
  linkText: string;
  type: FormTypes;
};

const ChangeFormLink: React.FC<PropsType> = (props) => {
  const link =
    props.type === FormTypes.registration
      ? AppRoutes.login
      : AppRoutes.registration;

  return (
    <StyledContainer>
      <span className="additional-action--text">{props.question}</span>
      <LinkButton
        href={link}
        className="additional-action--link"
        title={props.linkText}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  align-items: center;

  margin-top: 72px;

  .additional-action {
    &--text {
      color: ${(props) => props.theme.colorValues.grey};
    }

    &--link {
      margin-left: 4px;
    }
  }
`;

export default ChangeFormLink;
