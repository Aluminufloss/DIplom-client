import React from "react";
import styled from "styled-components";

import { STATIC_URLS } from "@/utils/constant";

import ActionItem from "@/components/UI/actionItem";

type PropsType = {
  className?: string;
};

const AdditionalActionButtonsGroup: React.FC<PropsType> = (props) => {

  return (
    <StyledContainer className={props.className}>
      <ActionItem
        onClick={() => {}}
        imageSrc={`${STATIC_URLS.SVG_ICONS}/notification.svg`}
        imageAlt="Notification icon"
        clasName="action__item"
      />
      <ActionItem
        onClick={() => {}}
        imageSrc={`${STATIC_URLS.SVG_ICONS}/help.svg`}
        imageAlt="Help icon"
        clasName="action__item"
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  align-items: center;

  .action__item {
    margin-right: 16px;
  }
`;

export default AdditionalActionButtonsGroup;
