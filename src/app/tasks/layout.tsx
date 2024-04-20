"use client";

import React from "react";
import { Provider } from "react-redux";
import styled from "styled-components";

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
  React.useEffect(() => {
    (async () => {
      const response = await fetch("/tasks/api");
      const data = await response.json();

      localStorage.setItem("accessToken", data.accessToken);
    })();
  }, []);


  return (
    <Provider store={store}>
      <StyledLayout>
        <Header />
        <TabbedSidebar />
        <TaskSidebar />
        <UserSidebar />
        <div className={"content"}>{children}</div>
      </StyledLayout>
    </Provider>
  );
};

const StyledLayout = styled.div`
  position: relative;

  .content {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 77px;
  }
`;

export default TasksLayout;
