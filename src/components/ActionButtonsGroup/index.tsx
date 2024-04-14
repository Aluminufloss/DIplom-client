"use client"

import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

import { AppPaths, STATIC_URLS } from "@/utils/constant";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";

import { toggleTabbedSidebarVisibility } from "@/store/slices/TabbedSidebar";

import ActionItem from "@/components/UI/actionItem";

const ActionButtonsGroup: React.FC = (props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <StyledContainer>
      <ActionItem
        onClick={() => dispatch(toggleTabbedSidebarVisibility())}
        imageSrc={`${STATIC_URLS.SVG_ICONS}/menu.svg`}
        imageAlt="menu icon"
      />
      <ActionItem
        onClick={() => router.push(AppPaths.tasks)}
        imageSrc={`${STATIC_URLS.SVG_ICONS}/home.svg`}
        imageAlt="home icon"
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default ActionButtonsGroup;
