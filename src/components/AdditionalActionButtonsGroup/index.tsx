"use client";

import React from "react";
import styled from "styled-components";

import { STATIC_URLS } from "@/utils/constant";

import ActionItem from "@/components/UI/actionItem";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";

const AdditionalActionButtonsGroup: React.FC = (props) => {
  const dispatch = useAppDispatch();

  return (
    <StyledContainer>
      <ActionItem
        onClick={() => {}}
        imageSrc={`${STATIC_URLS.SVG_ICONS}/notification.svg`}
        imageAlt="Notification icon"
      />
      <ActionItem
        onClick={() => {}}
        imageSrc={`${STATIC_URLS.SVG_ICONS}/help.svg`}
        imageAlt="Help icon"
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default AdditionalActionButtonsGroup;
