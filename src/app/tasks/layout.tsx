"use client";

import { Provider } from "react-redux";
import styled from "styled-components";

import { store } from "@/store";

import Header from "./components/header";
import TabbedSidebar from "@/components/SidebarModals/TabbedSidebar";
import TaskSidebar from "@/components/SidebarModals/TaskSidebar";
import UserSidebar from "@/components/SidebarModals/UserSidebar";

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
        <TaskSidebar />
        <UserSidebar />
        {children}
      </StyledLayout>
    </Provider>
  );
};

const StyledLayout = styled.div`
  position: relative;
`;

export default TasksLayout;
