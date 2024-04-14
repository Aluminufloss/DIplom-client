"use client";

import React from "react";
import { Provider } from "react-redux";
import styled, { css } from "styled-components";
import cn from "classnames";

import { useDidUpdate } from "@/utils/hooks/useDidUpdate";

import { store } from "@/store";

import Header from "../../components/Header";
import TabbedSidebar from "@/components/SidebarModals/TabbedSidebar";
import TaskSidebar from "@/components/SidebarModals/TaskSidebar";
import UserSidebar from "@/components/SidebarModals/UserSidebar";

const TasksLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const headerRef = React.useRef<HTMLHeadElement>(null);

  useDidUpdate(() => {
    setHeaderHeight(headerRef.current?.clientHeight);
  }, []);

  return (
    <Provider store={store}>
      <StyledLayout $headerHeight={headerHeight}>
        <Header ref={headerRef} />
        <TabbedSidebar className={cn(headerHeight && "sidebar")} />
        <TaskSidebar />
        <UserSidebar />
        <div className={"content"}>{children}</div>
      </StyledLayout>
    </Provider>
  );
};

const StyledLayout = styled.div<{ $headerHeight: number }>`
  position: relative;


  .content {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    ${(props) =>
      props.$headerHeight &&
      css`
        margin-top: ${props.$headerHeight + 24}px;
      `}
  }

  .sidebar {
    ${(props) =>
      props.$headerHeight &&
      css`
        top: ${props.$headerHeight}px;
      `}
  }
`;

export default TasksLayout;
