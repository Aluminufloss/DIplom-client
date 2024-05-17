"use client";

import React from "react";
import { Provider } from "react-redux";
import styled from "styled-components";

import { store } from "@/store";

import TabbedSidebar from "@/components/SidebarModals/TabbedSidebar";
import UserSidebar from "@/components/SidebarModals/UserSidebar";
import TaskModal from "@/components/Modals/TaskModal";
import SnackBar from "@/components/UI/snackbar";
import Header from "../../components/Header";

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
        <TaskModal />
          <div className="content">{children}</div>
        <SnackBar />
      </StyledLayout>
    </Provider>
  );
};

const StyledLayout = styled.div`
  position: relative;
  overflow-x: hidden;

  height: 100vh;

  .content {
    width: 100vw;

    margin-top: 77px;
    margin-bottom: 20px;
  }
`;

export default TasksLayout;
