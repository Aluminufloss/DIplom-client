"use client";

import React, { Suspense } from "react";
import { Provider } from "react-redux";
import styled from "styled-components";

import { store } from "@/store";

import Header from "../../components/Header";
import TabbedSidebar from "@/components/SidebarModals/TabbedSidebar";
import UserSidebar from "@/components/SidebarModals/UserSidebar";
import TaskModal from "@/components/Modals/TaskModal";
import Loading from "./loading";

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
        <Suspense fallback={<Loading />}>
          <div className="content">{children}</div>
        </Suspense>
      </StyledLayout>
    </Provider>
  );
};

const StyledLayout = styled.div`
  position: relative;
  overflow-x: hidden;

  .content {
    width: 100vw;
    height: 100%;

    margin-top: 77px;
  }
`;

export default TasksLayout;
