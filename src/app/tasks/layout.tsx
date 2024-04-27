"use client";

import React from "react";
import { Provider } from "react-redux";
import styled from "styled-components";

import { store } from "@/store";

import Header from "../../components/Header";
import TabbedSidebar from "@/components/SidebarModals/TabbedSidebar";
import UserSidebar from "@/components/SidebarModals/UserSidebar";
import TaskModal from "@/components/Modals/TaskModal";

const TasksLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Provider store={store}>
      <StyledLayout>
        <Header />
        <TabbedSidebar />
        <UserSidebar />
        <TaskModal/>
        <div className="content">{children}</div>
      </StyledLayout>
    </Provider>
  );
};

const StyledLayout = styled.div`
  position: relative;

  height: 100vh;

  .content {
    width: 100%;
    height: 100%;

    margin-top: 77px;
  }
`;

export default TasksLayout;
