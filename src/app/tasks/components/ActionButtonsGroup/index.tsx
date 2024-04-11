import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

import { AppPaths, STATIC_URLS } from "@/utils/constant";
import { useAppDispatch } from "@/utils/hooks/useAppDispatch";

import { toggleTabbedSidebarVisibility } from "@/store/slices/TabbedSidebar";

import ActionItem from "@/components/UI/actionItem";

type PropsType = {
  className?: string;
};

const ActionButtonsGroup: React.FC<PropsType> = (props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <StyledContainer className={props.className}>
      <ActionItem
        onClick={() => dispatch(toggleTabbedSidebarVisibility())}
        imageSrc={`${STATIC_URLS.SVG_ICONS}/menu.svg`}
        imageAlt="menu icon"
        clasName="action__item"
      />
      <ActionItem
        onClick={() => router.push(AppPaths.tasks)}
        imageSrc={`${STATIC_URLS.SVG_ICONS}/home.svg`}
        imageAlt="home icon"
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

export default ActionButtonsGroup;
