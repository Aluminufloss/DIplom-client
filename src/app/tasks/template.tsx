"use client";

import React from "react";
import styled from "styled-components";

import { useAppSelector } from "@/utils/hooks/useAppSelector";

const TasksTemplate = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const tabbedSidebarVisibility = useAppSelector((state) => state.tabbedSidebar.isViewVisible);
  
  return (
    <StyledLayout $isSidebarOpen={tabbedSidebarVisibility} className="content">
      {children}
    </StyledLayout>
  );
};

const StyledLayout = styled.div<{ $isSidebarOpen: boolean }>`
  width: 100%;
  height: 100%;

  padding: 24px 92px 48px ${props => props.$isSidebarOpen ? "290px" : "92px"};

  transition: padding-left 0.5s ease;
`;

export default TasksTemplate;
