"use client";

import React from "react";
import { Provider } from "react-redux";
import styled from "styled-components";

import { UserResponseType } from "@/models";
import { store } from "@/store";
import { typedFetchWrapper } from "@/utils/typedFetchWrapper";

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
      const response = await typedFetchWrapper<UserResponseType>({ url: "/tasks/api" });

      localStorage.setItem("accessToken", response.accessToken);
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
